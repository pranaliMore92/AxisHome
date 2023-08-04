import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DataSharingService } from 'src/services/data-sharing.service';
import { UtilityserviceService } from 'src/services/utilityservice.service';
import { ValidationService } from 'src/services/validation.service';
import { InsuredNomineeComponent as ModalComponent } from '../modals/insured-nominee/insured-nominee.component';
var $: any

@Component({
  selector: 'app-additional-coverage',
  templateUrl: './additional-coverage.component.html',
  styleUrls: ['./additional-coverage.component.css']
})
export class AdditionalCoverageComponent implements OnInit {

  isShow = false;
  addonCoverageForm: FormGroup;
  paForm: FormGroup;
  countUpdated: boolean = false;
  allTotal = 0;
  masterData: any;
  currentFormData: any;
  propInsTypeForm: any;
  contentTypeForm: any;
  propertyTypeForm: any;
  isaddoncalculate: boolean = false;
  addons: any = [];
  showPA = false;
  personalAccidentCover = [{ "relation": "Self", "val": "500000" }, { "relation": "Self with Spouse", "val": "1000000" }];
  defaultValuesArray = [
    {
      // field: 'field_1290',
      img_name: 'removal_of_debris.png',
      // field: 'field_1934',
      functionName: 'debrisValue',
      type: 'structure'
    },
    {
      // field: 'field_1186',
      img_name: 'mech_electrical_break.png',
      // field: 'field_1353',
      functionName: 'breakdownValue',
      type: 'content'
    }
  ];
  showPAField: any;

  constructor(
    private ref: ChangeDetectorRef,
    private fb: FormBuilder,
    private validationService: ValidationService,
    private dataSharingService: DataSharingService,
    private matDialog: MatDialog,
    private utility: UtilityserviceService) {
  }

  ngOnInit() {
    // this.toggleCoverage();
    //  setInterval(function () {
    //   if (this.utility.getLS("customer") != "") {
    //   if(this.utility.getLS("customer") == "1"){
    //   this.addonCoverageForm.controls.addon.instrument_name.setValue("0");
    //   }
    // }
    //   if((this.utility.getLS("customer")!= undefined)){
    //   if(this.utility.getLS("customer") == "1"){
    //     this.addonCoverageForm.controls.addon.instrument_name.setValue("0");
    //   }
    // }
    // }, 1000);
    this.getSharedData();

  }

  getSharedData() {
    
    this.dataSharingService.sharedFormData$.
      subscribe(data => {

        this.masterData = JSON.parse(this.utility.getLS('master_data'));
        this.currentFormData = data.find(item => item.formName === 'addonCoverageForm');
        this.propInsTypeForm = data.find(item => item.formName === 'propInsTypeForm');
        this.contentTypeForm = data.find(item => item.formName === 'contentTypeForm');
        this.propertyTypeForm = data.find(item => item.formName === 'propertyTypeForm');
        if(!this.utility.isUndefinedOrNull(this.utility.getLS("addons"))){
         if(this.utility.getLS("showtotal")=="true"){
            this.addons = this.arrangeInorder(this.createAddonArray(this.currentFormData));
          }
         else{
          this.addons = JSON.parse(this.utility.getLS('addons'));
         }
         
        }else{
          this.addons = this.arrangeInorder(this.createAddonArray(this.currentFormData));
        }
        // this.addons = this.arrangeInorder(this.createAddonArray(this.currentFormData));
        console.log(this.addons);
        var BaggageIndex = this.addons.findIndex(x => x.label === "Baggage");

        this.addons[BaggageIndex].isDisabled = true;

        // let defaultFormValuess = this.currentFormData ? this.currentFormData.formValues : [];
        let defaultFormValuess = this.addons || [];

        this.addonCoverageForm = this.createForm(defaultFormValuess);
        this.paForm = this.createPAForm();
      });
  }

  arrangeInorder(addons) {
    const insForm = this.propInsTypeForm;
    const type = insForm ? insForm.formValues.propInsType === 'both' ? 'bothId' : `${insForm.formValues.propInsType}Id` : '';
    return addons.sort((a, b) => a[type] - b[type]);
  }

  createAddonArray(currentFormData) {
    
    let addonArray = [];
    let formType; let propType; let selectType;
    let type;
    if (this.propInsTypeForm) {
      type = this.propInsTypeForm.formValues.propInsType;
      formType = 'IsVisibleIn' + (type === 'both' ? 'StructureContent' : type.charAt(0).toUpperCase() + type.slice(1));
      selectType = 'IsSelectedIn' + (type === 'both' ? 'StructureContent' : type.charAt(0).toUpperCase() + type.slice(1));
    }
    if (this.propertyTypeForm) {
      let type = this.propertyTypeForm.formValues.propType;
      propType = 'IsVisibleIn' + type.charAt(0).toUpperCase() + type.slice(1);
    }
    if (currentFormData) {
      addonArray = [...currentFormData.formValues];
      addonArray.forEach((element, i) => {
        const checkVisible = this.checkVisibility(element, formType, propType, true);
        //const checkIsAdded = checkVisible ? element.isAdded ? true : this.checkIsAdded(element.isAdded, selectType, element.instrument_name.replace(/\D/g, '')) || this.checkTenure(element)
        //: false;
        const getTotal = checkVisible ? this.checkTotal(element.isAdded, type, element.instrument_name, element.img) || element.total : 0;
        addonArray[i] = {
          instrument_name: element.instrument_name,
          label: element.label,
          value: element.value,
          isVisible: checkVisible,
          countable: (!element.countable ? false : true),
          isAdded: element.isAdded,
          total: getTotal,
          count: element.isAdded ? 1 : element.count ? element.count : 0,
          img: element.img,
          ToolTip: element.ToolTip,
          defaultSI: element.defaultSI ? element.defaultSI : this.checkDefaultValues(element, type),
          cvrName: element.cvrName,
          contentId: element.contentId,
          structureId: element.structureId,
          bothId: element.bothId,
          CvrType: element.CvrType,
          isDisabled: element.isDisabled
        };
        if (addonArray[i].instrument_name === 'field_1184' || addonArray[i].instrument_name === 'field_1348') {
          const total = addonArray[i].count ? this.propInsTypeForm ? this.propInsTypeForm.formValues.structure_value : 0 : 0;
          addonArray[i].value = total;
          addonArray[i].total = addonArray[i].isVisible ? this.getPlainValue(total) : 0;
        }
        // if (addonArray[i].instrument_name === 'field_1185' || addonArray[i].instrument_name === 'field_2489')
        if (addonArray[i].img === 'content_all_risk.png') {
          const total = addonArray[i].count ? this.contentTypeForm ? this.contentTypeForm.total : 0 : 0;
          addonArray[i].total = addonArray[i].isVisible ? this.getPlainValue(total) : 0;
        }
      });
    } else {
      this.masterData.AddonCvrDetails.forEach((data, i) => {
        const checkIsAdded = this.checkIsAdded(false, selectType, data.CvrCode) || this.checkTenure(data);
        const getTotal = this.checkTotal(checkIsAdded, type, `field_${data.CvrCode}`, data.CvrImageName);
        const isVisible = (this.checkVisibility(data, formType, propType, false) && data.IsVisibleOnScreen);
        addonArray.push({
          instrument_name: `field_${data.CvrCode}`,
          label: data.CvrDisplayName,
          value: data.SliderIncrementer,
          isVisible: isVisible,
          countable: (!data.SliderIncrementer ? false : true),
          isAdded: checkIsAdded,
          total: isVisible && data.CvrImageName == 'personal_liability.png' ? 10000 : getTotal,
          count: checkIsAdded ? 1 : 0,
          img: data.CvrImageName,
          ToolTip: data.ToolTip,
          defaultSI: this.checkDefaultValues(data, type),
          cvrName: data.CvrName,
          contentId: data.CTCvrID,
          structureId: data.STCvrID,
          bothId: data.StCtCvrID,
          CvrType: data.CvrType,
          isDisabled: (data.CvrDisplayName == "Additional living expenses") ? true : false
        });
      });
    }
    return addonArray;
  }

  checkTotal(isAdded, insuranceType, fieldName, imgName) {
    let total = 0;
    if (isAdded) {
      if (insuranceType === 'both') {
        total = this.getstructureSi(fieldName, imgName) + this.getcontentSi(fieldName, imgName);
      } else {
        total = this[`get${insuranceType}Si`](fieldName, imgName);
      }
    }
    // if (isAdded && insuranceType === 'structure' && fieldName === 'field_1348') {
    //   total = this.propInsTypeForm ? this.propInsTypeForm.formValues.structure_value : 0;
    // } else if (isAdded && insuranceType === 'content' && fieldName === 'field_2489') {
    //   total = this.contentTypeForm ? this.contentTypeForm.total : 0;
    // } else if (isAdded && insuranceType === 'both' && fieldName === 'field_1348') {
    //   total = this.propInsTypeForm ? this.propInsTypeForm.formValues.structure_value : 0;
    // } else if (isAdded && insuranceType === 'both' && fieldName === 'field_2489') {
    //   total = this.contentTypeForm ? this.contentTypeForm.total : 0;
    // }
    return total;
  }

  getstructureSi(fieldName, imgName) {
    let total = 0;
    if (fieldName === 'field_1184' || fieldName === 'field_1348') {
      total = this.propInsTypeForm ? this.getPlainValue(this.propInsTypeForm.formValues.structure_value) : 0;
    }
    return total;
  }

  getcontentSi(fieldName, imgName) {
    let total = 0;
    if (imgName === 'content_all_risk.png') {
      total = this.contentTypeForm ? this.getPlainValue(this.contentTypeForm.total) : 0;
    }
    return total;
  }
  checkIsAdded(currentState, nextState, coverCode) {
    const data = this.masterData.AddonCvrDetails.find(d => d.CvrCode == coverCode);
    return data[nextState] ? data[nextState] : currentState;
  }

  checkDefaultValues(data, type) {
    let instrument_name;
    let image_name;
    if (data.CvrCode) {
      // coverCode = data.CvrCode;
      instrument_name = `field_${data.CvrCode}`;
      image_name = data.CvrImageName
    } else {
      instrument_name = `field_${data.instrument_name.replace(/\D/g, '')}`;
      image_name = data.img
    }
    const obj = this.defaultValuesArray.find(d => d.img_name === image_name);
    // const obj = this.defaultValuesArray.find(d =>  type === 'both' || d.type === type);
    return obj ? image_name === obj.img_name ? this[obj.functionName](data, obj.img_name, image_name) : data.DefaultSi : data.DefaultSi;
  }

  debrisValue(data, fieldImgName, image_name) {
    let defaultValue = 0;
    if (fieldImgName === image_name) {
      const value = this.propInsTypeForm ? this.propInsTypeForm.formValues.structure_value : 0;
      const defaultSum = this.getDefaultValue(value);
      defaultValue = ((defaultSum * 10) / 100);
    }
    return defaultValue;
  }

  breakdownValue(data, fieldImgName, image_name) {
    let defaultValue = 0;
    if (fieldImgName === image_name) {
      defaultValue = this.contentTypeForm ? this.getPlainValue(this.contentTypeForm.formValues.durable) : 0;
    }
    return defaultValue || data.DefaultSi || data.defaultSI || 0;
  }

  checkVisibility(data, formType, propType, isExistingData) {
    const coverCode = isExistingData ? data.instrument_name.replace(/\D/g, '') : data.CvrCode;
    const isVisible = this.masterData.AddonCvrDetails.find(d => d.CvrCode == coverCode);
    return (isVisible[formType] && isVisible.IsVisibleOnScreen && isVisible[propType]) && this.checkTenure(data);
  }

  checkTenure(data) {
    // console.log("Inside check tenure ", this.propInsTypeForm)
    // console.log("This is something very important.............", this.propInsTypeForm);
    let isTenure = false;
    //  debugger;
    if (this.propInsTypeForm) {
      if (this.propertyTypeForm) {
        if (this.propertyTypeForm.formValues.propType == 'rented' && !this.propInsTypeForm.formValues.hasOwnProperty('tenure')) {
          isTenure = true;
          // isTenure = this.propInsTypeForm.formValues.tenure == 5;
          this.propInsTypeForm.formValues.tenure = "5";
        } else {
          isTenure = this.propInsTypeForm.formValues.tenure == 10 && data['CvrType'] == 'All' || this.propInsTypeForm.formValues.tenure == 5 && data['CvrType'] == 'CHP' || data['CvrType'] == 'All';
        }
      }
    }
    // if(this.propertyTypeForm) {
    //   isTenure = this.propertyTypeForm.formValues.propType == 'rented';
    // }
    return isTenure;
  }

  submitAddonType() {
    //this.utility.setLS("KYC_customerDetails","");
    //this.utility.setLS("IsKYCPopUpOpened","false");
    
    if (this.isValidForm(this.addons)) {
      this.allTotal = this.total();
      this.isShow = true;
      const additionalInfo = { total: this.allTotal };

      this.utility.setLS("addons", JSON.stringify(this.addons));
      this.dataSharingService.setSharedFormData(this.addons, 'addonCoverageForm', 'planDetails', additionalInfo);
      console.log('Form Values', this.addonCoverageForm.value, this.addons);
      window.history.pushState(null, "", window.location.href);

      // window.onpopstate = function(){
      //   window.history.pushState(null,"",window.location.href);
      // };
      //$("#message").text("Succesfull").delay(2000)
    }
    this.utility.setLS("Chooseplan", "");
  }

  isValidForm(addons) {
    
    let obj = this.addonCoverageForm.value;
    let errorsObj = [];
    let selectedPlan = this.propInsTypeForm ? this.propInsTypeForm.formValues.propInsType : '';
    let mandatoryCovers = [{
      propType: 'structure',
      images: ['additional_living'],
      error: 'Atleast one cover of the following is mandatory: Additional living expenses'
    },
    // {
    //   propType: 'content',
    //   images: ['content_all_risk', 'fine_arts'],
    //   error: 'Atleast one cover of the following is mandatory: Content All Risk, Cover for fine Arts'
    // },
    {
      propType: 'both',
      images: ['additional_living', 'content_all_risk'],
      error: 'Atleast one cover of the following is mandatory: Content All Risk, Additional living expenses'
    }]
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const data = addons.find(data => data.instrument_name === key);

        // if ((data.instrument_name != 'field_2489' || data.instrument_name != 'field_1185')
        // && (data.instrument_name != 'field_1348' || data.instrument_name != 'field_1184')) {
        if ((data.img != 'content_all_risk.png')) {

          if (!data.total && data.isAdded && data.count) {
            const msgText = `Please enter value for ${data.label}`;
            errorsObj.push({ field: key, msg: msgText });
          }
          this.utility.setLS("Addons", data.label);
          //  if(data.label == "Personal Accident (Optional Cover)"){
          //   if(this.homeQuoteRequest.StructureSI)
          //  }
          if (parseFloat(data.defaultSI) < parseFloat((obj[key]).toString().includes(',') ? obj[key].replace(/,/g, '') : obj[key])) {
            const msgText = `${data.label} cannot be more than ${data.defaultSI}`;
            errorsObj.push({ field: key, msg: msgText });
          }
          console.log("Image name is", data.img, obj[key]);
          if (data.img == 'additional_rent_expense.png' || data.img == 'loss_of_rent.png') {
            if (this.getPlainValue(obj[key]) && this.getPlainValue(obj[key]) < 5000) {
              const msgText = `${data.label} cannot be less than Rs.5,000`;
              errorsObj.push({ field: key, msg: msgText });
            }
          }
          if (data.img == 'mech_electrical_break.png' || data.img == 'mech_electrical_break.png') {
            if (this.getPlainValue(obj[key]) && this.getPlainValue(obj[key]) < 10000) {
              const msgText = `${data.label} cannot be less than Rs.10,000`;
              errorsObj.push({ field: key, msg: msgText });
            }
          }

          if (data.img == 'baggage.png' || data.img == 'baggage.png') {
            if (this.getPlainValue(obj[key]) && this.getPlainValue(obj[key]) < 10000) {
              const msgText = `${data.label} cannot be less than Rs.10,000`;
              errorsObj.push({ field: key, msg: msgText });
            }
          }
          //uncomment later
          mandatoryCovers.forEach(element => {
            if (element.propType == selectedPlan) {
              element.images.forEach(img => {
                if (data.img == `${img}.png`) {
                  if (!this.getPlainValue(obj[key])) {
                    errorsObj.push({ field: key, msg: element.error });
                  }
                }
              });
            }
          });
          //closed
          // if (data.img == 'personal_liability.png') {
          //   if (!this.getPlainValue(obj[key])) {
          //     const msgText = `${data.label} is required`;
          //     errorsObj.push({field: key, msg: msgText});
          //   }
          //   if (this.getPlainValue(obj[key]) && this.getPlainValue(obj[key]) < 10000) {
          //     const msgText = `${data.label} cannot be less than Rs.10,000`;
          //     errorsObj.push({field: key, msg: msgText});
          //   }
          // }
        }
      }
    }

    // console.log(`You have selected ${this.propInsTypeForm.formValues.propInsType} plan`);
    return errorsObj.length ? this.showError(errorsObj[0]) : true;
  }

  showError(data) {
    this.utility.showAlertMessage("Alert", data.msg);
    const fieldName = data.field;
    const value = this.currentFormData ? this.currentFormData.formValues.find((d, i) => {
      if (d.instrument_name === fieldName) {
        this.addonCoverageForm.get(fieldName).patchValue(d.total === 0 ? ' ' : d.total);
        // data.
        if (d.total == 0) {
          this.filterAndUpdate('removeAll', fieldName);
        } else {
          this.addons[i].total = d.total || 0;
          this.addons[i].count = d.count;
        }
      }
    }) : 0;
    // this.addonCoverageForm.patchValue({d: ''});
    // if (!value) {
    //   this.filterAndUpdate('removeAll', fieldName);
    // }
    return false;
  }
  editAddonType() {
    this.isShow = false;
    console.log("Addon coverage form values are as follows ", this.addonCoverageForm)
  }

  createForm(values) {
    const fields = {};
    this.addons.forEach((addon, i) => {
      if (addon.isVisible) {
        // const value = values[addon.content_name];
        // if ((addon.instrument_name === 'field_1185' || addon.instrument_name === 'field_2489')
        // || (addon.instrument_name === 'field_1184' || addon.instrument_name === 'field_1348')) 

        if ((addon.img === 'content_all_risk.png')) {
          fields[addon.instrument_name] = [{ value: values.length ? !values[i].total ? '' : values[i].total : '', disabled: true }];
        } else {
          fields[addon.instrument_name] = [{ value: values.length ? !values[i].total ? '' : values[i].total : '', disabled: false }];
        }
      }
    });
    return this.fb.group(fields);
  }

  createPAForm() {
    return this.fb.group({
      NomineeName: ['']
      // RelationshipWithInsured: ['']
    });
  }

  filterAndUpdate(action, addonName) {
    this.addons.filter(addon => {
      if (addon.instrument_name === addonName) {
        addon.count = this.updateCount(action, addon);
        addon.total = addon.count * addon.value;
        addon.isAdded = addon.count ? true : false;
        this.addonCoverageForm.get(addonName).patchValue(!addon.total ? '' : addon.total);
        // addon.value = addon.total ? addon.value : 0;
        // if (addonName === 'field_1934' && addon.isAdded) {
        //   const defaultSum = this.getDefaultValue(this.propInsTypeForm.formValues.structure_value);
        //   addon.defaultSI = ((defaultSum * 10) / 100);
        // }
        console.log(addonName, addon.count);
      }
    });
  }

  getDefaultValue(defaultValue) {
    return this.propInsTypeForm ? this.getPlainValue(defaultValue) : 0;
  }

  getPlainValue(value) {
    return parseFloat(value ? value.toString().includes(',') ? value.replace(/,/g, '') : value : 0);
  }

  updateCount(action, addonValues) {
    let count;
    if (action === 'add') {
      count = addonValues.count += 1;
    } else if (action === 'removeAll') {
      count = 0;
    } else {
      count = addonValues.count > 0 ? (addonValues.count -= 1) : addonValues.count;
    }
    return count;
  }

  toggleCoverage(addonDetails) {
debugger
    let baggageIndex = this.addons.findIndex(x => x.label === "Baggage");
    console.log(addonDetails);
    let isBaggageVisible = false;
    let checkedBaggage = false;
    let anyselected = false;
    let PaSelected = false;

    //  if(addonDetails.cvrName == "Home Contents All Risk" && addonDetails.isAdded == true || addonDetails.isAdded == false){
    //   this.utility.setLS(this.addons, addonDetails.cvrName);
    //   return
    //  }
    //  else if(addonDetails.cvrName == "Rent for alternate accomodation" && addonDetails.isAdded == true ||addonDetails.isAdded == false){
    //   this.utility.setLS(this.addons, addonDetails.cvrName);
    //   return
    //  }
    //  else if(addonDetails.cvrName == "Mechanical / electrical breakdown" && addonDetails.isAdded == true || addonDetails.isAdded == false){
    //   this.utility.setLS(this.addons, addonDetails.cvrName);
    //   return
    //  }
    this.addons.forEach((addon, i) => {
      if (addonDetails.instrument_name === addon.instrument_name) {
        // this.addons[i].isAdded = !this.addons[i].isAdded;
        this.addons[i].count = !this.addons[i].count ? (this.addons[i].count += 1) : this.addons[i].count ? 0 : (this.addons[i].count += 1);
        // console.log(this.addons[i]);
        this.countUpdated = !this.countUpdated;
        // If field name if All Risk covers
        if (addonDetails.instrument_name === 'field_1184' || addonDetails.instrument_name === 'field_1348') {
          this.addons[i].total = this.propInsTypeForm ? this.getPlainValue(this.propInsTypeForm.formValues.structure_value) : 0;
          this.addonCoverageForm.get(addonDetails.instrument_name).patchValue(this.addons[i].total);
          // this.addons[i].DefaultSi = parseFloat(this.addons[i].total.replace(/,/g, ''));
        }
        // if (addonDetails.instrument_name === 'field_1185' || addonDetails.instrument_name === 'field_2489')
        if (addonDetails.img === 'content_all_risk.png') {
          this.addons[i].total = this.utility.getLS("total");
          this.addonCoverageForm.get(addonDetails.instrument_name).patchValue(this.addons[i].total);
          console.log()
        }
        // this.addons[i].total = this.addons[i].total || this.addons[i].defaultSI;
        // this.addonCoverageForm.get(addonDetails.instrument_name).patchValue(this.addons[i].defaultSI);
        addon.isAdded = !addon.isAdded;
        if (!addon.isAdded) {
          this.addons[i].total = 0;
          if (!addon.countable) { this.addons[i].value = 0; }
          this.addonCoverageForm.get(addonDetails.instrument_name).patchValue(!addon.total ? '' : addon.total);
        }
        // if(addon.img === 'personal_liability.png') {
        //   this.addons[i].total = 10000;
        //   this.addons[i].count = 1;
        //   this.addons[i].value = 10000;
        //   this.addons[i].isAdded = true;
        //   this.addonCoverageForm.get(addonDetails.instrument_name).patchValue(this.addons[i].total);
        // } 

      }
      // if(addon['instrument_name'] == "field_2489" || addon['instrument_name'] == "field_1353" ||
      // addon['instrument_name'] == "field_1363"){
      //             if(!addon['count']) counter++;
      // }else if(addon['instrument_name'] == "field_3456"){
      //             paIndex = i;
      // } else

      if (addon.isVisible === true) {
        if (addon.isAdded === true && checkedBaggage === false) {
          isBaggageVisible = false;
        }
        if (addon.isAdded === true && addon['img'] != "baggage.png") {
          anyselected = true;
        }
        if (addon['img'] == "baggage.png" && checkedBaggage === false && addon.isAdded === true) {
          checkedBaggage = true;
          isBaggageVisible = addon.isAdded;
        }
        if (addon['img'] == "personal_accident.png" && checkedBaggage === false) {
          if (addon.isAdded) {
            checkedBaggage = true;
            PaSelected = true;
            isBaggageVisible = true;
          } else {
            PaSelected = false;
            checkedBaggage = false;
            isBaggageVisible = false;

          }

        }

      }

    });

    this.addons[baggageIndex].isDisabled = false;
    if (!anyselected || PaSelected) {
      this.addons[baggageIndex].isDisabled = true;
    }
    if (isBaggageVisible || !anyselected) {
      this.addons[baggageIndex].isAdded = true;
      this.addons[baggageIndex]['count'] = 1;
    } else {
      this.addons[baggageIndex].isAdded = false;
      this.addons[baggageIndex]['count'] = 0;
    }

    console.log('Bagge state is ' + this.addons[baggageIndex].isAdded)
    this.isaddoncalculate = true;
    this.ref.detectChanges();

  }

  checkInput(addonDetails) {
    let fieldName = addonDetails.instrument_name;
    this.addons.forEach((addon, i) => {
      if (fieldName === addon.instrument_name) {
        console.log('This value we want', this.addonCoverageForm.value[fieldName]);
        if (this.addonCoverageForm.value[fieldName]) {
          // this.addons[i].isAdded = true;
          if (!addon.isAdded) {
            addon.count += this.mentainCount(this.addonCoverageForm.value[fieldName], addon);
          }
          addon.value = this.addonCoverageForm.value[fieldName];
          
          addon.total = addon.count * parseFloat(addon.value.replace(/,/g, ''));
          console.log(this.addons[i]);
          // fieldName = this.addons[i].img === "personal_accident.png" ?? this.addons[i].instrument_name;
          if (this.addons[i].img === "personal_accident.png") {
            const dialogConfig = new MatDialogConfig();
            // The user can't close the dialog by clicking outside its body
            dialogConfig.disableClose = true;
            dialogConfig.id = "modal-component";
            dialogConfig.height = "auto";
            dialogConfig.width = "800px";
            dialogConfig.data = `${this.addonCoverageForm.get(`${addon.instrument_name}`).value}`
            const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
            const sub = modalDialog.componentInstance.onAdd.subscribe((data) => {
              if (data !== 'success') {
                this.addons[i].isAdded = this.addons[i].isAdded || false;
                this.addons[i].count = this.addons[i].count || 0;
                this.addons[i].total = this.addons[i].total || 0;
                this.addons[i].value = this.addons[i].value || 0;
                this.countUpdated = this.countUpdated || false;
                let finalValue = this.addons[i].value || '';
                this.addonCoverageForm.get(fieldName).patchValue(finalValue);
                // localStorage.removeItem('insured_details');
              }
            });
          }
        } else {
          this.addons[i].isAdded = false;
          this.addons[i].count = 0;
          this.addons[i].total = 0;
          this.addons[i].value = 0;
          this.countUpdated = false;
          console.log(this.addons[i]);
        }
      }
    });
  }

  mentainCount(formField, addon) {
    let textCount = 0;
    if (formField.length) {
      for (let i = 0; i < formField.length; i++) {
        textCount = 1;
      }
      textCount = textCount ? 1 : 0;
    }
    addon.isAdded = true;
    this.countUpdated = true;
    return textCount;
  }
  get formValues() {
    return this.addonCoverageForm.value;
  }

  total() {
    let sum = 0;
    const obj = this.addonCoverageForm.getRawValue();
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        // sum += Number(obj[key]);
        sum += obj[key] ? parseFloat((obj[key]).toString().includes(',') ? obj[key].replace(/,/g, '') : obj[key]) : 0;
      }
    }
    return sum;
    // this.allTotal = (this.addons || []).reduce((total: number, addon: any) => total + this.getAddonTotal(addon), 0);
    // this.allTotal = (this.addons || []).reduce((total: number, addon: any) => total + (addon.total ? parseFloat(addon.total.replace(/,/g, '')): 0), 0);
  }

  // getAddonTotal(addon) {
  //   let total = 0
  //   // if (addon.instrument_name === 'field_1348' || addon.instrument_name === 'field_2489') {
  //   total = parseFloat(addon.total.toString().includes(',') ? addon.total.replace(/,/g, '') : addon.total);
  //   // } else {
  //   //   total = Number(addon.total);
  //   // }
  //   return total;
  // }
  tooltiptoggle(tooltip) {
    tooltip.toggle();
    event.stopImmediatePropagation(); event.stopPropagation(); event.preventDefault();
  }
  editPersonalAccicent() {
    this.showPA != this.showPA;
  }
}
