import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { SlickCarouselComponent } from "ngx-slick-carousel";
// import { environment } from "src/environments/environment.prod";

import { KYCResponseModel } from "src/models/KYCResponseModel";
import { CustomerDetails, ProposalRequestModel } from "src/models/ProposalRequestModel";
import { QuoteRequestModel } from "src/models/quoteRequestModel";
import { CityList, StatesModel } from "src/models/StatesModel";
import { usermodel } from "src/models/usermodel";
import { ApiserviceService } from "src/services/apiservice.service";
import { DataSharingService } from "src/services/data-sharing.service";
import { UtilityserviceService } from "src/services/utilityservice.service";
import { environment } from 'src/environments/environment';

import { ValidationService } from "src/services/validation.service";
import * as  uuid from 'uuid';
declare var $: any;
declare var AJL: any;
declare var bootbox: any;
@Component({
  selector: 'app-choose-plan',
  templateUrl: './choose-plan.component.html',
  styleUrls: ['./choose-plan.component.css']
})
export class ChoosePlanComponent implements OnInit {

  stateList: Array<StatesModel>;
  cityList: Array<CityList>;
  @ViewChild('slickModal', { static: false }) slickModal: SlickCarouselComponent;
  isShow = false;
  premiumData: any;
  masterData: any;
  sharedData: any;
  quoteData: any;
  requestForQuote: any;
  selectedIndex: number = null;
  selectedPlan: any;
  sumInsured: any = 0;
  slideConfig: any;
  planType: any = '';
  propInsTypeForm: any;
  propertyTypeForm: any;
  flowtype: any;  //to get flow information (Assisted/Non-Assisted)
  IsKYCPopUpOpened: boolean = false;   //flag to set if user opend/filled KYC popups
  homeQuoteRequest: QuoteRequestModel = new QuoteRequestModel();
  KYCResponseModel: KYCResponseModel = new KYCResponseModel();
  proposalRequest: ProposalRequestModel = new ProposalRequestModel;
  //  premiumData: any;
  // userDetails: usermodel = new usermodel();
  userDetails: usermodel = new usermodel();
  userModel: usermodel = new usermodel;
  number: number;
  isOdd: boolean;
  Value: string;
  rented: string;
  selectedInde: number;
  Indexselect: any;
  planselected: boolean = false;
  showpremiumdetails: boolean = false;

  constructor(
    public api: ApiserviceService,
    public validate: ValidationService,
    public utility: UtilityserviceService,
    private dataSharingService: DataSharingService, private datePipe: DatePipe) { }

  async ngOnInit() {
    this.proposalRequest.CustomerDetails = new CustomerDetails();
    if (!this.utility.isUndefinedOrNull(this.utility.getLS('userdetails'))) {
      this.userDetails = JSON.parse(this.utility.getLS('userdetails'))
    }
    console.log("this.userDetails", this.userDetails);
    await this.callAPITokenService();
    this.getSharedData();
    // if (!this.utility.isUndefinedOrNull(this.utility.getLS('premiumData'))) {
    //   this.premiumData = JSON.parse(this.utility.getLS('premiumData'));
    // }
    this.Indexselect = (this.utility.getLS('tenureselect'));
    this.selectedIndex = Number(this.utility.getLS('selectedTenure'));

    const modal = document.getElementById('myNav1');
    window.addEventListener('click', (e: any) => {
      if (e.target.classList.value === 'modal-body-content') {
        modal.style.height = '0%';
      }
    });

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.utility.CheckFieldsContent();
    }, 100);
  }
  async callAPITokenService() {
    let Tokenpromise = new Promise((res, rej) => {
      this.api.GetAPIToken().subscribe(data => {
        try {
          this.utility.setLS("bearer", data);
          let res1 = data;
          res(res1);
        }
        catch (ex) {
          this.utility.showAlertMessage("Alert", "Something went wrong. While creating token.");
          rej(false);
        }
      }), (error) => {
        this.utility.showAlertMessage("Alert", "Something went wrong. While creating token.");
        return;
      };
    });
    await Tokenpromise;
  }
  // get isOdd(){
  // // return this.propInsTypeForm.formValues.tenure%2===1;

  // }
  // async createRequestBody(data) {

  //   this.premiumData = [];
  //   // let addonCoversArray = [];
  //   // const requestBody = {};
  //   const propInsTypeForm = this.findFormDetails('propInsTypeForm');
  //   const contentTypeForm = this.findFormDetails('contentTypeForm');
  //   // const addonCoverageForm = this.findFormDetails('addonCoverageForm');
  //   // const policyType = propInsTypeForm ? propInsTypeForm.formValues.propInsType : '';
  //   // if (policyType) {
  //   //   const structure = this.getPlainValue(propInsTypeForm.formValues.structure_value);
  //   //   const content = this.getContentValue(propInsTypeForm.formValues.propInsType, contentTypeForm);
  //   //   this.sumInsured = policyType === 'both' ? (structure + content) : eval(policyType);
  //   //   // }
  //   //   addonCoversArray = this.getAddonCovers('premium', addonCoverageForm);
  //   //   if (this.sumInsured) {

  //   //     Object.assign(requestBody, { SumInsured: this.sumInsured || 0 });
  //   //     Object.assign(requestBody, addonCoversArray.length > 0 ? { addonCovers: addonCoversArray } : requestBody);
  //   //     let finalPolicyType = policyType === 'both' ? 'HomeStructureContent' : `Home${policyType.charAt(0).toUpperCase() + policyType.slice(1)}`;

  //   //     Object.assign(requestBody, { HomePolicyType: finalPolicyType });
  //   //     this.getPremiums(requestBody, 'SaveEditQuote');
  //   //   }
  //   // }
  //   console.log('Finally we got the sum insured', this.sumInsured);

  //   console.log("this.propInsTypeForm.tenure", propInsTypeForm.formValues.tenure);
  //   const policyType = propInsTypeForm ? propInsTypeForm.formValues.propInsType : '';
  //   console.log("policyType", policyType);

  //   if (policyType) {

  //     $(".spinner").delay(100).fadeIn(100);
  //     $(".backdrop").delay(100).fadeIn(100);
  //     const structure = this.getPlainValue(propInsTypeForm.formValues.structure_value);
  //     const content = this.getContentValue(propInsTypeForm.formValues.propInsType, contentTypeForm);
  //     this.sumInsured = policyType === 'both' ? (structure + content) : eval(policyType);
  //     // debugger;
  //     $(".spinner").delay(100).fadeOut(100);
  //     $(".backdrop").delay(100).fadeOut(100);
  //     if (this.sumInsured) {
  //       if (!this.utility.isUndefinedOrNull(propInsTypeForm.formValues.tenure)) {
  //         if (propInsTypeForm.formValues.tenure == 10) {
  //           for (let i = 5; i <= propInsTypeForm.formValues.tenure; i++) {
  //             await this.createRequestForQuote(i).then((response) => {
  //               if (response)
  //                 this.getPremiums(response).then(res => {
  //                   this.premiumData.push(res);
  //                 });

  //             })

  //           }

  //         } else {

  //           for (let i = 1; i <= propInsTypeForm.formValues.tenure; i++) {

  //             await this.createRequestForQuote(i).then(async (response) => {

  //               if (response)
  //                 await this.getPremiums(response).then(res => {
  //                   this.premiumData.push(res);
  //                 });

  //             })

  //           }
  //           $(".spinner").delay(100).fadeOut(100);
  //           $(".backdrop").delay(100).fadeOut(100);

  //         }

  //       }
  //       // else {
  //       //  
  //       // }
  //     }
  //     console.log("premiumData", this.premiumData);

  //   }
  //   this.slideConfig = {
  //     dots: false,
  //     infinite: false,
  //     mobileFirst: false,
  //     respondTo: 'window',
  //     speed: 300,
  //     swipe: false,
  //     slidesToShow: 5,
  //     slidesToScroll: 1,
  //     responsive: [
  //       {
  //         breakpoint: 1200,
  //         settings: {
  //           slidesToShow: 4
  //         }
  //       },
  //       {
  //         breakpoint: 992,
  //         settings: {
  //           slidesToShow: 3
  //         }
  //       },
  //       {
  //         breakpoint: 768,
  //         settings: {
  //           slidesToShow: 2,
  //           swipe: true
  //         }
  //       },
  //       {
  //         breakpoint: 476,
  //         settings: {
  //           slidesToShow: 1,
  //           swipe: true
  //         }
  //       }
  //     ]
  //   };
  // }


  async createRequestBody(data) {
    // this.utility.setLS("selectedTenure","");
    this.premiumData = [];
    // let addonCoversArray = [];
    // const requestBody = {};
    const propInsTypeForm = this.findFormDetails('propInsTypeForm');
    const contentTypeForm = this.findFormDetails('contentTypeForm');
    // const addonCoverageForm = this.findFormDetails('addonCoverageForm');
    // const policyType = propInsTypeForm ? propInsTypeForm.formValues.propInsType : '';
    // if (policyType) {
    //   const structure = this.getPlainValue(propInsTypeForm.formValues.structure_value);
    //   const content = this.getContentValue(propInsTypeForm.formValues.propInsType, contentTypeForm);
    //   this.sumInsured = policyType === 'both' ? (structure + content) : eval(policyType);
    //   // }
    //   addonCoversArray = this.getAddonCovers('premium', addonCoverageForm);
    //   if (this.sumInsured) {

    //     Object.assign(requestBody, { SumInsured: this.sumInsured || 0 });
    //     Object.assign(requestBody, addonCoversArray.length > 0 ? { addonCovers: addonCoversArray } : requestBody);
    //     let finalPolicyType = policyType === 'both' ? 'HomeStructureContent' : `Home${policyType.charAt(0).toUpperCase() + policyType.slice(1)}`;

    //     Object.assign(requestBody, { HomePolicyType: finalPolicyType });
    //     this.getPremiums(requestBody, 'SaveEditQuote');
    //   }
    // }
    console.log('Finally we got the sum insured', this.sumInsured);

    console.log("this.propInsTypeForm.tenure", propInsTypeForm.formValues.tenure);
    const policyType = propInsTypeForm ? propInsTypeForm.formValues.propInsType : '';
    console.log("policyType", policyType);

    if (policyType) {
      $(".spinner").delay(100).fadeIn(100);
      $(".backdrop").delay(100).fadeIn(100);
      const structure = this.getPlainValue(propInsTypeForm.formValues.structure_value);
      const content = this.getContentValue(propInsTypeForm.formValues.propInsType, contentTypeForm);
      this.sumInsured = policyType === 'both' ? (structure + content) : eval(policyType);

      if (this.sumInsured) {
        if (!this.utility.isUndefinedOrNull(propInsTypeForm.formValues.tenure)) {

          await this.createRequestForQuote(1).then(async (response) => {
            if (response)
              await this.getPremiums(response).then(res => {
                Object.assign(res, { tenure: '1' });
                this.premiumData.push(res);
              });

          })

          await this.createRequestForQuote(3).then(async (response) => {
            if (response)
              await this.getPremiums(response).then(res => {
                Object.assign(res, { tenure: '3' });
                this.premiumData.push(res);
              });

          })
          await this.createRequestForQuote(5).then(async (response) => {
            if (response)
              await this.getPremiums(response).then(res => {
                Object.assign(res, { tenure: '5' });
                this.premiumData.push(res);
              });

          })

          $(".spinner").delay(100).fadeOut(100);
          $(".backdrop").delay(100).fadeOut(100);

        }
      }

      this.utility.setLS("premiumData", JSON.stringify(this.premiumData));

      $(".spinner").delay(100).fadeOut(100);
      $(".backdrop").delay(100).fadeOut(100);
    }
    this.slideConfig = {
      dots: false,
      infinite: false,
      mobileFirst: false,
      respondTo: 'window',
      speed: 300,
      swipe: false,
      slidesToShow: 5,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            swipe: true
          }
        },
        {
          breakpoint: 476,
          settings: {
            slidesToShow: 1,
            swipe: true
          }
        }
      ]
    };
  }

  checkAddons(addonsData) {

    let data = addonsData.formValues.filter(element => (element.img == "additional_rent_expense.png" && element.total > 0) || (element.img == "loss_of_rent.png" && element.total > 0));
    return data.length ? true : false;
  }
  findFormDetails(searchFormName) {
    return this.sharedData.find(item => item.formName === searchFormName) || { 'formValues': '' };
  }

  // getStructureValue(value) {
  //   return value ? parseFloat(value.replace(/,/g, '')) : 0;
  // }

  getContentValue(propInsType, contentTypeForm) {
    let contentValue;
    if (propInsType === 'content' || propInsType === 'both') {
      contentValue = contentTypeForm.total ? contentTypeForm.total : '0';
      // contentValue = parseFloat(contentValue.replace(/,/g, ''));
    }
    return parseFloat(contentValue || 0);
  }

  getAddonsValue(value) {
    return value ? value : 0;
  }
  getSharedData() {

    this.dataSharingService.sharedFormData$.
      subscribe(data => {
        this.isShow = false;
        this.masterData = JSON.parse(this.utility.getLS('master_data'));

        console.log(this.masterData);
        this.sharedData = data;
        console.log(data);
        this.createRequestBody(data);
        this.propInsTypeForm = this.findFormDetails('propInsTypeForm').formValues;
        this.propertyTypeForm = this.findFormDetails('propertyTypeForm').formValues;
        // debugger;
        if (this.propertyTypeForm) {
          if (this.propertyTypeForm.propType == 'rented') {
            this.planType = 'CHP';

          } else {
            this.planType = this.propInsTypeForm.propInsType == 'structure' ? this.getPlanType() : 'CHP';
          }
        }
      });
  }

  getPlanType() {
    return this.propInsTypeForm ? this.propInsTypeForm.tenure == 5 ? 'CHP' : this.propInsTypeForm.tenure == 10 ? 'BGR' : '' : '';
  }

  getSelectedIndex(data) {
    let index;

    this.premiumData.find((d, i) => {
      if (d.Tenure === data.Tenure) {
        index = i + 1;
      }
    });
    return index;
  }

  async choosePlan() {
    
    if (this.planselected == false) {
      this.utility.showAlertMessage("Alert", 'Please select a suitable plan for you.');
      return;
    }
    if (!this.selectedPlan) {
      this.utility.showAlertMessage("Alert", 'Please select a suitable plan for you.');
      return;
    }
    if (!this.utility.isUndefinedOrNull(this.utility.getLS("IsKYCPopUpOpened"))) {
      this.IsKYCPopUpOpened = this.utility.getLS("IsKYCPopUpOpened") == "true" ? true : false;
    }

    this.flowtype = this.utility.getLS("flowtype");
    if (this.flowtype == 'A' && this.IsKYCPopUpOpened == false) {
      this.getAJL();
    } else {
      this.KYCCustomerDetail();
    }
    this.utility.setLS("Chooseplan", "1");
  }
  async getAJL() {

    let Tokenpromise = new Promise((res, rej) => {

      this.api.GetAPITokenKYC().subscribe(async data => {

        try {

          let res1 = data;

          await AJL.aryafns.initMod(data.replace("Bearer ", ""), this.getKycDetails.bind(this), environment.KYCEnv);

          this.IsKYCPopUpOpened = true;

          res(res1);

        }

        catch (ex) {

          rej(false);

        }

      }), (error) => {

      };

    });

    await Tokenpromise;

  }
  getKycDetails(customerDetails, statusMessage) {


    if (statusMessage == "Success" && customerDetails.api_response.status == true) {
      var CustomerDetails = JSON.stringify(customerDetails);
      this.IsKYCPopUpOpened = true;
      this.utility.setLS("IsKYCPopUpOpened", this.IsKYCPopUpOpened.toString());
      sessionStorage.setItem("KYC_customerDetails", CustomerDetails);
      console.log(CustomerDetails);
      this.KYCResponseModel = customerDetails;
      if (!this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.full_name)) {
        var title = this.KYCResponseModel.api_response.kyc_details.full_name.split(" ")[0];
        if (title.toUpperCase() == "MR") {
          this.proposalRequest.CustomerDetails.CustomerTitle = "Mr.";
          $('#ddCustTitle').prop('disabled', true);
        } else if (title.toUpperCase() == "MRS") {
          this.proposalRequest.CustomerDetails.CustomerTitle = "Mrs.";
          $('#ddCustTitle').prop('disabled', true);
        } else if (title.toUpperCase() == "M/S") {
          this.proposalRequest.CustomerDetails.CustomerTitle = "M/S";
          $('#ddCustTitle').prop('disabled', true);
        } else if (title.toUpperCase() == "MS" || title.toUpperCase() == "MISS") {
          this.proposalRequest.CustomerDetails.CustomerTitle = "Ms.";
          $('#ddCustTitle').prop('disabled', true);
        }
      }
      else {
        this.proposalRequest.CustomerDetails.CustomerTitle = "0";
        $('#ddCustTitle').removeProp('disabled');
      }



      // if (!this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.full_name)) {
      //   var title = this.KYCResponseModel.api_response.kyc_details.full_name.split(" ")[0];
      //   if (title.toUpperCase() == "MR") {
      //     this.proposalRequest.CustomerDetails.CustomerTitle = "Mr.";
      //     // this.coversGroup.controls.ZeroDepricationPP.setValue(false);
      //     // this.proposalRequest.CustomerDetails.CustomerTitle = "Mr";

      //     // this.PersonalDetailForm.value.TitleValue = 'Mr.';
      //     // this.PersonalDetailForm.controls.TitleValue.setValue("Mr");
      //   } else if (title.toUpperCase() == "MRS") {
      //     this.proposalRequest.CustomerDetails.CustomerTitle = "Mrs.";
      //     // this.PersonalDetailForm.value.TitleValue = 'Mrs';
      //     // this.PersonalDetailForm.controls.TitleValue.setValue("Mrs");
      //   } else if (title.toUpperCase() == "M/S") {
      //     this.proposalRequest.CustomerDetails.CustomerTitle = "M/S";
      //     // this.PersonalDetailForm.value.TitleValue = 'M/S';
      //     // this.PersonalDetailForm.controls.TitleValue.setValue("M/S");
      //   } else if (title.toUpperCase() == "MS" || title.toUpperCase() == "MISS") {
      //     this.proposalRequest.CustomerDetails.CustomerTitle = "Ms";
      //     // this.PersonalDetailForm.value.TitleValue = 'Ms';
      //     // this.PersonalDetailForm.controls.TitleValue.setValue("Ms");
      //     $('#ddCustTitle').prop('disabled', true);
      //   }
      //   else {
      //     this.proposalRequest.CustomerDetails.CustomerTitle = "";
      //     $('#ddCustTitle').prop("disabled", false);

      //   }
      //   // this.AutoPopulateGender();
      //   // $("#ddlApplicantTitle").prop("disabled",true);
      // }
      // else {
      //   this.proposalRequest.CustomerDetails.CustomerTitle = "";
      //   $('#ddlApplicantTitle').removeProp('disabled');

      // }

      //Customer Name
      if (!this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.first_name) &&
        !this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.middle_name) &&
        !this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.last_name)) {
        this.proposalRequest.CustomerDetails.CustomerName = this.KYCResponseModel.api_response.kyc_details.first_name + " " + this.KYCResponseModel.api_response.kyc_details.middle_name + " " + this.KYCResponseModel.api_response.kyc_details.last_name;
        // this.PersonalDetailForm.value.CustomerName=this.KYCResponseModel.api_response.kyc_details.first_name + " " + this.KYCResponseModel.api_response.kyc_details.middle_name + " " + this.KYCResponseModel.api_response.kyc_details.last_name;
        // this.PersonalDetailForm.controls.CustomerName.setValue(this.KYCResponseModel.api_response.kyc_details.first_name + " " + this.KYCResponseModel.api_response.kyc_details.middle_name + " " + this.KYCResponseModel.api_response.kyc_details.last_name);

      }

      else if (!this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.first_name) &&
        !this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.last_name)) {
        this.proposalRequest.CustomerDetails.CustomerName = this.KYCResponseModel.api_response.kyc_details.first_name + " " + this.KYCResponseModel.api_response.kyc_details.last_name;
        // this.PersonalDetailForm.value.CustomerName=this.KYCResponseModel.api_response.kyc_details.first_name + " " + this.KYCResponseModel.api_response.kyc_details.last_name;
        // this.PersonalDetailForm.controls.CustomerName.setValue(this.KYCResponseModel.api_response.kyc_details.first_name + " " + this.KYCResponseModel.api_response.kyc_details.last_name);

      } else if (!this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.first_name)) {

        this.proposalRequest.CustomerDetails.CustomerName = this.KYCResponseModel.api_response.kyc_details.first_name;

        $('#txtCustName').removeProp('disabled');

      }
      else if (!this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.full_name)) {
        this.proposalRequest.CustomerDetails.CustomerName = this.KYCResponseModel.api_response.kyc_details.full_name.replace("  ", " ");

      }
      else if (this.KYCResponseModel.api_response.kyc_details.first_name != null) {
        this.proposalRequest.CustomerDetails.CustomerName = this.userModel.CustName.trim();
      }
      else {
        this.proposalRequest.CustomerDetails.CustomerName = "";
      }

      $("#txtCustName").prop("disabled", true);
      //Custome DOB
      if (!this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.dob)) {
        this.proposalRequest.CustomerDetails.DateOfBirth = this.datePipe.transform(this.utility.ConvertStringToDate(this.KYCResponseModel.api_response.kyc_details.dob), 'yyyy-MM-dd');
        // this.proposalRequest.CustomerDetails.DateOfBirth=setValue(this.datePipe.transform(this.utility.ConvertStringToDate(this.KYCResponseModel.api_response.kyc_details.dob), 'yyyy-MM-dd'));
      }
      else {
        this.proposalRequest.CustomerDetails.DateOfBirth = "";
      }

      //Customer Mob no
      if (!this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.mobile_number)) {
        this.proposalRequest.CustomerDetails.MobileNumber = this.KYCResponseModel.api_response.kyc_details.mobile_number;
        // this.PersonalDetailForm.controls.MobileNumber.setValue(this.KYCResponseModel.api_response.kyc_details.mobile_number);

      }
      else {
        this.proposalRequest.CustomerDetails.MobileNumber = this.userModel.MobileNo;
      }

      //Pan Card
      if (!this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.certificate_number) && !this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.certificate_type) && this.KYCResponseModel.api_response.kyc_details.certificate_type == "PAN") {
        this.proposalRequest.CustomerDetails.PANCardNo = this.KYCResponseModel.api_response.kyc_details.certificate_number;
        // this.PersonalDetailForm.value.PANCardNo=this.KYCResponseModel.api_response.kyc_details.certificate_number;
        // this.PersonalDetailForm.controls.PANCardNo.setValue(this.KYCResponseModel.api_response.kyc_details.certificate_number);
      }
      else {
        this.proposalRequest.CustomerDetails.PANCardNo = "";
      }

      //Address
      if (this.KYCResponseModel.api_response.kyc_details.alternate_address != null) {
        if (!this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.alternate_address.address_line_1) && !this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.alternate_address.address_line_2)) {
          this.proposalRequest.CustomerDetails.AddressLine1 = this.KYCResponseModel.api_response.kyc_details.alternate_address.address_line_1 + " " + this.KYCResponseModel.api_response.kyc_details.alternate_address.address_line_2;
        }
        else if (!this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.alternate_address.address_line_1)) {
          this.proposalRequest.CustomerDetails.AddressLine1 = this.KYCResponseModel.api_response.kyc_details.alternate_address.address_line_1;
        }
        else {
          this.proposalRequest.CustomerDetails.AddressLine1 = "";
        }

        //Pincode
        if (!this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.alternate_address.address_line_1)) {

          this.proposalRequest.CustomerDetails.PinCode = this.KYCResponseModel.api_response.kyc_details.alternate_address.pin_code;
          //  this.proposalRequest.CustomerDetails.PinCode =this.utility.isNum(this.KYCResponseModel.api_response.kyc_details.alternate_address.pin_code)==true?this.KYCResponseModel.api_response.kyc_details.alternate_address.pin_code:"";
          this.proposalRequest.CustomerDetails.PinCode = this.checknum(this.KYCResponseModel.api_response.kyc_details.alternate_address.pin_code) == true ? this.KYCResponseModel.api_response.kyc_details.alternate_address.pin_code : "";

          if (this.proposalRequest.CustomerDetails.PinCode != "") {
            this.api.getStates().subscribe((data) => {
              this.stateList = data;
              this.getStateCityByPin();
            });
          }
        }

        else {
          this.proposalRequest.CustomerDetails.PinCode = "";
        }
      }
      else {
        this.proposalRequest.CustomerDetails.AddressLine1 = "";
      }
      //Email
      if (!this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.email)) {
        this.proposalRequest.CustomerDetails.Email = this.KYCResponseModel.api_response.kyc_details.email;
        // this.PersonalDetailForm.controls.Email.setValue(this.Chiproposal.CustomerDetails.Email);
      }
      else {
        this.proposalRequest.CustomerDetails.Email = this.userModel.Email;
      }

      const additionalDetails = { additionalInfo: { sumInsured: this.sumInsured } };
      this.dataSharingService.setSharedFormData(this.selectedPlan, 'planDetails', 'customerDetailsForm', additionalDetails);
      this.isShow = true;
      window.location.reload();
    }
    else {
      this.IsKYCPopUpOpened = false;
      if (statusMessage == "Closed") {
        this.getAJL();
      }
      else if (statusMessage.includes("Error-400")) {
        this.getAJL();
      }
      else if (!this.utility.isUndefinedOrNull(customerDetails.api_response.message)) {
        this.showalertwithfunction("Alert", customerDetails.api_response.message, true);
      }
      $(".spinner").delay(100).fadeOut(100);
      $(".backdrop").delay(100).fadeOut(100);
      return;
    }

    // else{
    // //if user clicked on close then again show popup to get details
    //   this._serverapiService.GetAPITokenKYC().subscribe(data => {
    //     try {
    //       let res1 = data;
    //       AJL.aryafns.initMod(data.replace("Bearer ",""), this.getKycDetails.bind(this),"uat");
    //     }
    //     catch (ex) {
    //     }
    //   }), (error) => {
    //   };
    // }

  }
  KYCCustomerDetail() {
    if (this.utility.getLS("KYC_customerDetails") != "") {
      // debugger;
      this.KYCResponseModel = JSON.parse(this.utility.getLS("KYC_customerDetails"));
      // this.proposalRequest.CustomerDetails = new CustomerDetails();
      //Customer Title
      if (!this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.full_name)) {
        var title = this.KYCResponseModel.api_response.kyc_details.full_name.split(" ")[0];
        if (title.toUpperCase() == "MR") {
          this.proposalRequest.CustomerDetails.CustomerTitle = "Mr.";
          // this.customerDetailsForm.controls.title.setValue("Mr");
          // this.proposalRequest.CustomerDetails.CustomerTitle = "Mr";

          // this.PersonalDetailForm.value.TitleValue = 'Mr.';
          // this.PersonalDetailForm.controls.TitleValue.setValue("Mr");
        } else if (title.toUpperCase() == "MRS") {
          this.proposalRequest.CustomerDetails.CustomerTitle = "Mrs.";
          // this.customerDetailsForm.controls.title.setValue("Mrs.");
          // this.PersonalDetailForm.value.TitleValue = 'Mrs';
          // this.PersonalDetailForm.controls.TitleValue.setValue("Mrs");
        } else if (title.toUpperCase() == "M/S") {
          this.proposalRequest.CustomerDetails.CustomerTitle = "M/S";
          // this.PersonalDetailForm.value.TitleValue = 'M/S';
          // this.PersonalDetailForm.controls.TitleValue.setValue("M/S");
        } else if (title.toUpperCase() == "MS" || title.toUpperCase() == "MISS") {
          this.proposalRequest.CustomerDetails.CustomerTitle = "Ms";
          // this.PersonalDetailForm.value.TitleValue = 'Ms';
          // this.PersonalDetailForm.controls.TitleValue.setValue("Ms");
          $('#ddCustTitle').prop('disabled', true);
        }
        else {
          this.proposalRequest.CustomerDetails.CustomerTitle = "";
          $('#ddCustTitle').prop("disabled", false);

        }
        // this.AutoPopulateGender();
        // $("#ddlApplicantTitle").prop("disabled",true);
      }
      else {
        this.proposalRequest.CustomerDetails.CustomerTitle = "";
        $('#ddlApplicantTitle').removeProp('disabled');

      }

      //Customer Name
      if (!this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.first_name) &&
        !this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.middle_name) &&
        !this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.last_name)) {
        this.proposalRequest.CustomerDetails.CustomerName = this.KYCResponseModel.api_response.kyc_details.first_name + " " + this.KYCResponseModel.api_response.kyc_details.middle_name + " " + this.KYCResponseModel.api_response.kyc_details.last_name;
        // this.customerDetailsForm.controls.name.setValue( this.KYCResponseModel.api_response.kyc_details.first_name + " " + this.KYCResponseModel.api_response.kyc_details.middle_name + " " + this.KYCResponseModel.api_response.kyc_details.last_name);

        // this.PersonalDetailForm.value.CustomerName=this.KYCResponseModel.api_response.kyc_details.first_name + " " + this.KYCResponseModel.api_response.kyc_details.middle_name + " " + this.KYCResponseModel.api_response.kyc_details.last_name;
        // this.PersonalDetailForm.controls.CustomerName.setValue(this.KYCResponseModel.api_response.kyc_details.first_name + " " + this.KYCResponseModel.api_response.kyc_details.middle_name + " " + this.KYCResponseModel.api_response.kyc_details.last_name);

      }

      else if (!this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.first_name) &&
        !this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.last_name)) {
        this.proposalRequest.CustomerDetails.CustomerName = this.KYCResponseModel.api_response.kyc_details.first_name + " " + this.KYCResponseModel.api_response.kyc_details.last_name;
        // this.PersonalDetailForm.value.CustomerName=this.KYCResponseModel.api_response.kyc_details.first_name + " " + this.KYCResponseModel.api_response.kyc_details.last_name;
        // this.PersonalDetailForm.controls.CustomerName.setValue(this.KYCResponseModel.api_response.kyc_details.first_name + " " + this.KYCResponseModel.api_response.kyc_details.last_name);

      } else if (!this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.first_name)) {

        this.proposalRequest.CustomerDetails.CustomerName = this.KYCResponseModel.api_response.kyc_details.first_name;

        $('#txtCustName').removeProp('disabled');

      }
      else if (!this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.full_name)) {

        this.proposalRequest.CustomerDetails.CustomerName = this.KYCResponseModel.api_response.kyc_details.full_name.replace("  ", " ");

      }
      else if (this.KYCResponseModel.api_response.kyc_details.first_name != null) {
        this.proposalRequest.CustomerDetails.CustomerName = this.userModel.CustName.trim();

      }
      $("#txtCustName").prop("disabled", true);
      //Custome DOB
      if (!this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.dob)) {
        this.proposalRequest.CustomerDetails.DateOfBirth = this.datePipe.transform(this.utility.ConvertStringToDate(this.KYCResponseModel.api_response.kyc_details.dob), 'yyyy-MM-dd');
        // this.proposalRequest.CustomerDetails.DateOfBirth=setValue(this.datePipe.transform(this.utility.ConvertStringToDate(this.KYCResponseModel.api_response.kyc_details.dob), 'yyyy-MM-dd'));
      }
      else {
        this.proposalRequest.CustomerDetails.DateOfBirth = "";
      }

      //Customer Mob no
      if (!this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.mobile_number)) {
        this.proposalRequest.CustomerDetails.MobileNumber = this.KYCResponseModel.api_response.kyc_details.mobile_number;
        // this.PersonalDetailForm.controls.MobileNumber.setValue(this.KYCResponseModel.api_response.kyc_details.mobile_number);

      }
      else {
        this.proposalRequest.CustomerDetails.MobileNumber = this.userModel.MobileNo;
      }

      //Pan Card
      if (!this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.certificate_number) && !this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.certificate_type) && this.KYCResponseModel.api_response.kyc_details.certificate_type == "PAN") {
        this.proposalRequest.CustomerDetails.PANCardNo = this.KYCResponseModel.api_response.kyc_details.certificate_number;
        // this.PersonalDetailForm.value.PANCardNo=this.KYCResponseModel.api_response.kyc_details.certificate_number;
        // this.PersonalDetailForm.controls.PANCardNo.setValue(this.KYCResponseModel.api_response.kyc_details.certificate_number);
      }
      else {
        this.proposalRequest.CustomerDetails.PANCardNo = "";
      }

      //Address 
      if (this.KYCResponseModel.api_response.kyc_details.alternate_address != null) {
        if (!this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.alternate_address.address_line_1) && !this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.alternate_address.address_line_2)) {
          this.proposalRequest.CustomerDetails.AddressLine1 = this.KYCResponseModel.api_response.kyc_details.alternate_address.address_line_1 + " " + this.KYCResponseModel.api_response.kyc_details.alternate_address.address_line_2;
        }
        else if (!this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.alternate_address.address_line_1)) {
          this.proposalRequest.CustomerDetails.AddressLine1 = this.KYCResponseModel.api_response.kyc_details.alternate_address.address_line_1;
        }
        else {
          this.proposalRequest.CustomerDetails.AddressLine1 = "";
        }

        //Pincode
        if (!this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.alternate_address.address_line_1)) {

          this.proposalRequest.CustomerDetails.PinCode = this.KYCResponseModel.api_response.kyc_details.alternate_address.pin_code;
          //  this.proposalRequest.CustomerDetails.PinCode =this.utility.isNum(this.KYCResponseModel.api_response.kyc_details.alternate_address.pin_code)==true?this.KYCResponseModel.api_response.kyc_details.alternate_address.pin_code:"";
          this.proposalRequest.CustomerDetails.PinCode = this.checknum(this.KYCResponseModel.api_response.kyc_details.alternate_address.pin_code) == true ? this.KYCResponseModel.api_response.kyc_details.alternate_address.pin_code : "";

          if (this.proposalRequest.CustomerDetails.PinCode != "") {
            this.api.getStates().subscribe((data) => {
              this.stateList = data;
              this.getStateCityByPin();
            });
          }
        }
        else {
          this.proposalRequest.CustomerDetails.PinCode = "";
        }
      }
      else {
        this.userDetails = JSON.parse(this.utility.getLS("userdetails"));
        this.proposalRequest.CustomerDetails.AddressLine1 =
          //this.Members.at(0).patchValue({ 'insuredgender': this.memberDetails[0].insuredgender })
          this.proposalRequest.CustomerDetails.PinCode = this.userDetails.riskPincode;
      }
      //Email
      if (!this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.email)) {
        this.proposalRequest.CustomerDetails.Email = this.KYCResponseModel.api_response.kyc_details.email;
        // this.PersonalDetailForm.controls.Email.setValue(this.Chiproposal.CustomerDetails.Email);
      }
      else {
        this.proposalRequest.CustomerDetails.Email = this.userModel.Email;
      }

      const additionalDetails = { additionalInfo: { sumInsured: this.sumInsured } };
      this.dataSharingService.setSharedFormData(this.selectedPlan, 'planDetails', 'customerDetailsForm', additionalDetails);
      this.isShow = true;
      window.location.reload();

    }

  }
  showalertwithfunction(title: string, msg: string, callfun: boolean) {
    var _this = this;
    bootbox.hideAll();
    bootbox.alert({
      title: title,
      message: msg,
      backdrop: false,
      callback: function () {
        if (callfun) {
          _this.getAJL();
        }
      }
    }).bind(_this);
  }

  checknum(value) {
    return !/\D/.test(value);
  }
  getStateCityByPin(): void {
    //alert('Hi');
    var pin = this.proposalRequest.CustomerDetails.PinCode;
    if (!this.utility.isUndefinedOrNull(pin)) {
      if (pin.length == 6) {
        this.api.getStateCityByPincode(pin).subscribe((data) => {
          console.log('getStateCityByPin' + data);
          this.proposalRequest.CustomerDetails.StateCode = parseInt(data.StateId);
          //alert(data.CityList[0].CityID);
          this.api.getCitiesByStateId(data.StateId).subscribe((data1) => {
            this.cityList = data1.CityList;
            this.proposalRequest.CustomerDetails.CityCode = parseInt(data.CityList[0].CityID);
          });
        });
      }
    }
  }
  editPlanType() {
    this.isShow = true;
    setTimeout(() => {
      // $('slick-slide').slick('unslick');
      // $('slick-slide').slick('initSlick');
      this.slickModal.unslick();
      this.slickModal.initSlick();
    }, 1000);

  }
  showFAQ() {
    document.getElementById('myNav1').style.height = '100%';
  }

  closeFAQ() {
    document.getElementById('myNav1').style.height = '0%';
  }

  getPremiums(requestBody) {
    return this.callAPI(requestBody);

  }

  callAPI(requestBody) {
    this.rented = this.utility.getLS("rented")
    let quoteResponse = '';
    return new Promise((resolve, reject) => {
      this.api.calculateHomePremium(requestBody).subscribe((res: any) => {

        if (res.status == true) {

          $(".spinner").delay(100).fadeOut(100);
          $(".backdrop").delay(100).fadeOut(100);
          quoteResponse = res;
          // if (this.propInsTypeForm.tenure == 5) {
          //   this.premiumData = res.premiumDetails.slice(0, 5);
          // } else {
          //   if (res.premiumDetails.length < 10) {
          //     this.premiumData = res.premiumDetails;
          //     return;
          //   }
          //   this.premiumData = res.premiumDetails.slice(5, 10);
          // }
          // debugger;
          const planDetailsForm = this.findFormDetails('planDetails');
          if (planDetailsForm.formValues) {
            this.selectedIndex = this.getSelectedIndex(planDetailsForm.formValues);
            this.selectedPlan = this.premiumData[this.selectedIndex];
          } else {
            this.selectedPlan = this.premiumData[this.selectedIndex];
          }
          console.log(planDetailsForm);
          // res.sort(function (a, b) {
          //   if (a.Tenure < b.Tenure) return -1;
          //   if (a.Tenure > b.Tenure) return 1;
          //   return 0;
          // });
          setTimeout(() => {
            // $('slick-slide').slick('unslick');
            // $('slick-slide').slick('initSlick');

            this.slickModal.unslick();
            this.slickModal.initSlick();
          }, 1000);
          // this.selectedPlan=undefined;this.selectedIndex=null;
        } else {
          $(".spinner").delay(100).fadeOut(100);
          $(".backdrop").delay(100).fadeOut(100);
          quoteResponse = 'no data'
          this.premiumData = [];
          let msg = res.StatusDesc || res.ErrorText || res.StatusMsg;
          if (this.homeQuoteRequest.PolicyType != 'STRUCTURE AND CONTENT' && this.rented != "rented") {
            if (!msg) {
              // msg = 'Not able to get response from server, please try again later';
              msg = 'Service timeout, please try again later';
            }

            this.utility.showAlertMessage("Alert", msg);
          }
        }
        $(".spinner").delay(100).fadeOut(100);
        $(".backdrop").delay(100).fadeOut(100);
        resolve(res);
      });
    })

    // }

  }
  // getSelectedPremium(premiumDetails, index) {
  //   // debugger;
  //   this.selectedIndex = index;
  //   this.selectedPlan = premiumDetails;
  //   console.log("premiumDetails", premiumDetails);
  //   console.log("selectedIndex", this.selectedIndex);
  //   this.utility.setLS("selectedTenure", (this.selectedIndex + 1).toString())
  //   this.createRequestForQuote(premiumDetails);
  // }

  getSelectedPremium(premiumDetails, index) {

    if (index == 0) {
      this.selectedIndex = 1;
    } else if (index == 1) {
      this.selectedIndex = 3;
    } else {
      this.selectedIndex = 5;
    }
    //console.log(this.selectedIndex);
    this.selectedPlan = premiumDetails;
    this.Indexselect = this.selectedIndex.toString();
    // console.log("premiumDetails", premiumDetails);
    //console.log("selectedIndex", this.selectedIndex);
    this.utility.setLS("selectedTenure", (this.selectedIndex).toString())
    this.utility.setLS("tenureselect", (this.selectedIndex).toString());
    //this.utility.setLS("Indexselect", index);
    this.createRequestForQuote(index);
    this.planselected = true;
    this.showpremiumdetails = true;
  }


  getPolicyType() {
    const getInsuranaceType = this.findFormDetails('propInsTypeForm').formValues.propInsType;
    let insuranceType;
    insuranceType = getInsuranaceType === 'both' ? 'structure and content' : getInsuranaceType;
    console.log('Insurance type is', insuranceType);
    return insuranceType;
  }

  getAddonCovers(type, addonCoverageForm?) {
    const coversArray = [];
    addonCoverageForm = addonCoverageForm || this.findFormDetails('addonCoverageForm');
    if (addonCoverageForm.formValues) {
      addonCoverageForm.formValues.forEach(element => {
        if (element.total) {
          if (type === 'quote') {
            coversArray.push({
              CoverName: element.cvrName,
              CoverCode: element.instrument_name.replace(/\D/g, ''),
              SumInsured: element.total,
              CoverRate: 0,
              CoverSI: 0,
              CoverPremium: 0
            });
          } else {
            coversArray.push({
              AddonCoverName: element.cvrName,
              AddonCoverCode: element.instrument_name.replace(/\D/g, ''),
              AddonCoverSI: this.getPlainValue(element.total)
            });
          }
        }
      });
    }
    let policy_type = this.findFormDetails('propInsTypeForm').formValues.propInsType;
    if (!this.utility.isUndefinedOrNull(policy_type)) {
      if (policy_type === 'both') {
        this.getContentCovers(coversArray);
        this.getStructureCovers(coversArray);
      } else {
        policy_type = policy_type.charAt(0).toUpperCase() + policy_type.slice(1);
        const propType = `get${policy_type}Covers`;
        this[propType](coversArray);
      }
    }
    return coversArray;
  }
  getContentCovers(coversArray) {
    const basicCover = this.masterData.CvrDetails.find(c => c.IsVisibleInContent === true);
    const contentData = this.findFormDetails('contentTypeForm'); let new_data = {}
    const tags = [{ name: 'durable', value: 'DurablesSI' }, { name: 'furniture', value: 'FurnitureSI' },
    { name: 'jewellery', value: 'JewellerySI' }, { name: 'miscellaneous', value: 'ClothingSI' }];
    Object.keys(contentData.formValues).forEach(key => {
      tags.forEach(elem => {
        if (elem.name === key) {
          new_data[elem.value] = contentData.formValues[key] ? this.getPlainValue(contentData.formValues[key]) : 0;
          // new_data[elem.value] = contentData.formValues[key] ? parseFloat(contentData.formValues[key].replace(/,/g, '')) : 0;
        }
      });
    });
    //coversArray.push({ CoverCode: basicCover.CvrCode, CoverName: basicCover.CvrName, SumInsured: contentData.total })
    if (this.getPlainValue(contentData.formValues['jewellery']) > 0) {
      if (coversArray.find(x => x.AddonCoverCode == 2489 || x.AddonCoverCode == 1185)) {
        const combinedCover = this.masterData.AddonCvrDetails.find(c => c.CombinedWithAddonCode === '2489' || c.CombinedWithAddonCode === '1185');
        coversArray.push({ CoverCode: combinedCover.CvrCode, CoverName: combinedCover.CvrName, SumInsured: this.getPlainValue(contentData.formValues['jewellery']) })
      }
    }
  }

  getPlainValue(value) {
    return parseFloat(value ? value.toString().includes(',') ? value.replace(/,/g, '') : value : 0);
  }

  getStructureCovers(coversArray) {
    const basicCover = this.masterData.CvrDetails.filter(c => c.IsVisibleInStructure === true);
    basicCover.forEach(element => {
      coversArray.push({
        CoverCode: element.CvrCode, CoverName: element.CvrName,
        SumInsured: this.getPlainValue(this.findFormDetails('propInsTypeForm').formValues.structure_value)
      });
    });
  }

  getCityStateDetails() {
    const propTypeForm = this.findFormDetails('propertyTypeForm');
    return propTypeForm.additionalInfo || '';
  }

  createRequestForQuote(tenure) {

    this.userDetails = JSON.parse(this.utility.getLS('userdetails'))
    return new Promise<any>((resolve, reject) => {

      const propInsTypeForm = this.findFormDetails('propInsTypeForm');
      const contentTypeForm = this.findFormDetails('contentTypeForm');
      const addonCoverageForm = this.findFormDetails('addonCoverageForm');

      let addonCoversArray = this.getAddonCovers('premium', addonCoverageForm);
      this.homeQuoteRequest.PolicyStartDate = this.datePipe.transform(new Date(), "yyyy-MM-dd", 'en-US');
      this.homeQuoteRequest.Tenure = tenure;
      if (this.getPolicyType() == 'structure') {
        this.homeQuoteRequest.PolicyType = 'STRUCTURE';
        this.homeQuoteRequest.StructureSI = this.getPlainValue(propInsTypeForm.formValues.structure_value);
      }
      else if (this.getPolicyType() == 'content') {
        this.homeQuoteRequest.ContentSI = this.getContentValue(propInsTypeForm.formValues.propInsType, contentTypeForm);
        this.homeQuoteRequest.StructureSI = 0;//this.getPlainValue(contentTypeForm.formValues.total);
        this.homeQuoteRequest.PolicyType = 'CONTENT';
        this.homeQuoteRequest.ClothingSI = this.getPlainValue(contentTypeForm.formValues.miscellaneous);
        this.homeQuoteRequest.FurnitureSI = this.getPlainValue(contentTypeForm.formValues.furniture);
        this.homeQuoteRequest.JewellerySI = this.getPlainValue(contentTypeForm.formValues.jewellery);
        this.homeQuoteRequest.DurablesSI = this.getPlainValue(contentTypeForm.formValues.durable);
      } else {
        this.homeQuoteRequest.ContentSI = this.getContentValue(propInsTypeForm.formValues.propInsType, contentTypeForm);
        this.homeQuoteRequest.StructureSI = this.getPlainValue(propInsTypeForm.formValues.structure_value);
        this.homeQuoteRequest.PolicyType = 'STRUCTURE AND CONTENT';

        this.homeQuoteRequest.ClothingSI = this.getPlainValue(contentTypeForm.formValues.miscellaneous);
        this.homeQuoteRequest.FurnitureSI = this.getPlainValue(contentTypeForm.formValues.furniture);
        this.homeQuoteRequest.JewellerySI = this.getPlainValue(contentTypeForm.formValues.jewellery);
        this.homeQuoteRequest.DurablesSI = this.getPlainValue(contentTypeForm.formValues.durable);

      }
      if (this.getPolicyType() !== 'content') {
        this.homeQuoteRequest.ApproxConstructionRateinRsSqft = this.getPlainValue(propInsTypeForm.formValues.cost_of_construction) || 0 || 1000;
        this.homeQuoteRequest.AreaofHouseinSqFt = this.getPlainValue(propInsTypeForm.formValues.carpet_area_in_sq_mtrs) || 0 || 500;
      }
      this.homeQuoteRequest.PartyStateName = this.userDetails.StateTxt,
        this.homeQuoteRequest.PlanCode = this.masterData.PlanCode;
      this.homeQuoteRequest.CoverDetails = this.getAddonCovers('quote');
      this.homeQuoteRequest.DealId = this.masterData.DealId;
      this.homeQuoteRequest.PremiumReceivedFromCustomer = '';
      this.homeQuoteRequest.CorrelationId = uuid.v4();

      console.log("HomeQuoteRequest", this.homeQuoteRequest);

      // // const propInsTypeForm = this.findFormDetails('propInsTypeForm');
      // const requestBody = {
      //   PolicyType: this.getPolicyType(),
      //   PolicyStartDate: new Date() || '2020-07-09T00:00:00',
      //   Tenure: premiumDetails.Tenure,
      //   ApproxConstructionRateinRsSqft: this.getPlainValue(propInsTypeForm.formValues.cost_of_construction) || 0 || 1000,
      //   AreaofHouseinSqFt: this.getPlainValue(propInsTypeForm.formValues.area_in_sq_metrs) || 0 || 500,
      //   PartyStateName: this.getCityStateDetails().state,
      //   PlanCode: this.masterData.PlanCode,
      //   CoverDetails: this.getAddonCovers('quote'),
      //   CorrelationId: uuidv4(),
      //   DealId: this.masterData.DealId
      // };
      // if (this.getPolicyType() !== 'structure') {
      //   const contentForm = this.findFormDetails('contentTypeForm');
      //   Object.assign(requestBody, contentForm.formValues);
      // }
      // console.log('We are about to create a request for quote', premiumDetails, requestBody);
      // return requestBody;
      resolve(this.homeQuoteRequest);

    });
  }

  getSavedAmount(i) {
    return ((this.premiumData[0].premiumDetails.TotalPremium * (i + 1)) - this.premiumData[i].premiumDetails.TotalPremium);
  }

}
