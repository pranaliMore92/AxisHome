import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CityList, StatesModel } from 'src/models/StatesModel';
import { usermodel } from 'src/models/usermodel';
import { ApiserviceService } from 'src/services/apiservice.service';
import { DataSharingService } from 'src/services/data-sharing.service';
import { UtilityserviceService } from 'src/services/utilityservice.service';
import { ValidationService } from 'src/services/validation.service';
declare var $: any;

@Component({
  selector: 'app-property-type',
  templateUrl: './property-type.component.html',
  styleUrls: ['./property-type.component.css']
})
export class PropertyTypeComponent implements OnInit {

  userModel: usermodel = new usermodel();
  stateList: Array<StatesModel>;
  cityList: Array<CityList>;
  propertyType: string = "owned";
  ownedTooltip: any;
  rentedTooltip: any;
  isShow = false;
  propertyTypeForm: FormGroup;
  masterData: any;
  currentFormData: any;
  validPin = false;
  additionalDetails: any = { additionalInfo: null };
  flowtype: any;
  StateID: any;
  StatesMasterList: StatesModel[];

  constructor(private fb: FormBuilder,
    private validationService: ValidationService,
    private dataSharingService: DataSharingService, public utilityservice: UtilityserviceService, public _serverapiService: ApiserviceService, public _router: Router) { }

  async ngOnInit() {
    await this.utilityservice.getPolicyPlanDetails();
   
    this.getSharedData();
    this.utilityservice.setLS("",'master_data');
   
    this.flowtype = this.utilityservice.getLS("flowtype");
    this.masterData = JSON.parse(this.utilityservice.getLS('master_data'));

    this.ownedTooltip = this.masterData.ToolTipDetails.find(data => data.Name == 'OwnedType');
    this.rentedTooltip = this.masterData.ToolTipDetails.find(data => data.Name == 'RentedType');

    if (!this.utilityservice.isUndefinedOrNull(this.utilityservice.getLS('userdetails'))) {
      this.userModel = JSON.parse(this.utilityservice.getLS('userdetails'))
      console.log(this.userModel);
    }
    if (!this.utilityservice.isUndefinedOrNull(this.utilityservice.getLS('propType'))) {
      this.getPropType(this.utilityservice.getLS('propType'));
    } else {
      this.utilityservice.setLS('propType', this.propertyType);
    }
    await this.GetAllStates();
  }
  Ownedproperty(val){
    
    if(val == "owned"){
    this.utilityservice.setLS("rented", val);
    this.utilityservice.setLS("addons", "");
   // this.utilityservice.setLS("tenureselect","");
    }
    else{
      this.utilityservice.setLS("rented", val);
      this.utilityservice.setLS("addons", "");
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.utilityservice.CheckFieldsContent();

    }, 100);
  }
  getSharedData() {
    this.dataSharingService.sharedFormData$.
      subscribe(data => {
        let defaultValues = {};
        console.log(data);
        this.currentFormData = data.find(item => item.formName === 'propertyTypeForm');
        defaultValues = this.currentFormData ? this.currentFormData.formValues : defaultValues;
        this.propertyTypeForm = this.createForm(defaultValues);
        this.validPin = this.currentFormData ? this.currentFormData.formValues.house_pincode === this.propertyTypeForm.value.house_pincode :
          false;
      });
  }
  createForm(values) {
    console.log(this.userModel.riskPincode);

    return this.fb.group({
      propType: [values.propType || 'owned', [Validators.required]],
      house_pincode: [values.house_pincode || this.userModel.riskPincode, [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });
  }
  isValidForm(validity) {

    let errors = validity[0]; let isValid = validity[1];
    if (!this.validPin) {
      errors.push('Please enter a valid pincode');
      isValid = false;
    }
    if (errors.length) { this.utilityservice.showAlertMessage("Alert", errors[0]); }
    return isValid;
  }

  editPropertyType() {
    this.isShow = false;
  }

  callAPITokenService() {
    if (this.utilityservice.isUndefinedOrNull(this.utilityservice.getLS('homeToken'))) {
      $(".spinner").delay(100).fadeIn(100);
      $(".backdrop").delay(100).fadeIn(100);

      this._serverapiService.GetAPIToken().subscribe((res) => {
        this.utilityservice.setLS('homeToken', res);
        $(".spinner").delay(100).fadeOut(100);
        $(".backdrop").delay(100).fadeOut(100);
      }, err => {
        $(".spinner").delay(100).fadeOut(100);
        $(".backdrop").delay(100).fadeOut(100);
        this.utilityservice.showAlertMessage("Alert", 'Sorry Something went wrong');
      });
    }
  }
  getPropType(type) {
    this.propertyType = type;
    this.utilityservice.setLS("propType", type)
  }
  async GetAllStates() {
    let StatesPromis = new Promise((res, rej) => {
      this._serverapiService.GetAllStates().subscribe(data => {
        this.StatesMasterList = data;
        res(0);
      }, (error) => {
        $(".spinner").delay(100).fadeOut(100);
        $(".backdrop").delay(100).fadeOut(100);
        this.utilityservice.showAlertMessage("Alert", "Something went wrong.");
        rej();
      });
    });
    await StatesPromis;
  }
  submitPropertyType(from?: any) {
    
    
    // debugger;
    


    if (this.StatesMasterList.find(obj => obj.StateId === Number(this.userModel.StateCode))) {
      this.userModel.StateTxt = this.StatesMasterList.find(obj => obj.StateId === Number(this.userModel.StateCode)).StateName;
    }
    if (this.StatesMasterList.find(obj => obj.StateId === Number(this.userModel.StateCode))) {
      this.utilityservice.setLS("selectedStateData", JSON.stringify(this.StatesMasterList.find(obj => obj.StateId === Number(this.userModel.StateCode))));
    }
    const inputForm = this.propertyTypeForm;
    const nextInputForm: any = {};
    let isFormValid;
    if (from && this.currentFormData === undefined) {
      return;
    } else {
      const isValid = this.isValidForm(this.validationService.validateForm(inputForm));
      if (isValid) {
        // console.log('Valid form', inputForm.value);
        // const nextForm = inputForm.value.propType === 'owned' ? 'propInsTypeForm' : 'contentTypeForm';
        const checkCurrentForm = this.dataSharingService.sharedFormData.find(item => item.formName === 'propertyTypeForm');
        if (checkCurrentForm) {
          this.additionalDetails.additionalInfo = checkCurrentForm.additionalInfo;
        }
        this.dataSharingService.setSharedFormData(inputForm.value, 'propertyTypeForm', 'propInsTypeForm', this.additionalDetails);
        this.isShow = true;
        //  debugger;
        if (inputForm.value.propType === 'rented') {
          
          Object.assign(nextInputForm, { propInsType: 'content', structure_value: 0 });
          const nextFormName = 'contentTypeForm';
          this.dataSharingService.setSharedFormData(nextInputForm, 'propInsTypeForm', nextFormName);
          
        }
      } else {
        console.log('Invalid form');
      }
     
    }
    
    window.history.pushState(null, "", window.location.href);

    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };
    $("#message").text("Succesfull").delay(2000)
    
  }

  get formValues() {
    return this.propertyTypeForm.value;
  }
  getStateCityByPin(pin): void {
    if (!this.utilityservice.isUndefinedOrNull(pin)) {
      console.log(pin.length);

      if (pin.length == 6) {
        // debugger
        $(".spinner").delay(100).fadeIn(100);
        $(".backdrop").delay(100).fadeIn(100);
        this._serverapiService.getStateCityByPincode(pin).subscribe((data) => {
          console.log('getStateCityByPin' + JSON.stringify(data));
          if (data.StatusCode == 0) {
            this.userModel.StateCode = 0;
            this.utilityservice.showAlertMessage("Alert", "Kindly enter proper pincode");
            this.validPin = false;
          } else {

            const cityStateDetails = {
              city: data.CityList,
              stateDetails: {
                state: data.StateName,
                stateId: data.StateId
              }
            };
            this.additionalDetails.additionalInfo = cityStateDetails;

            this.userModel.StateCode = parseInt(data.StateId);
            this.userModel.StateTxt = data.StateName;
            this.cityList = data.CityList;
            this.userModel.CityCode = parseInt(data.CityList[0].CityID);
            this.userModel.CityTxt = (data.CityList[0].CityName);
            this.userModel.riskPincode = pin;
            this.validPin = true;
            this.utilityservice.setLS("userdetails", JSON.stringify(this.userModel))

          }
          // debugger
          $(".spinner").delay(100).fadeOut(100);
          $(".backdrop").delay(100).fadeOut(100);
        });
      }
    }
  }

}
