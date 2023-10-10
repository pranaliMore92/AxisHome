import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { env } from 'process';
import { environment } from 'src/environments/environment';

import { ADPSavePolicyDetailsRequestModel, ADPSavePolicyDetailsResponseModel } from 'src/models/ADPSavePolicyDetails';
import { ADPSummaryDetailsResponseModel } from 'src/models/ADPSummaryDetailsMode';
import { APIPaymentResponseModel } from 'src/models/APIPaymentResponseModel';
import { GPAProposalRequest, GPAQuoteCreate } from 'src/models/GPAModel';
import { KYCResponseModel } from 'src/models/KYCResponseModel';
import { LoginRequestModel, LoginResponseModel } from 'src/models/LoginModel';
import { SendOTPResponseModel, VerifyOtpResponseModel } from 'src/models/OTPModel';
import { GSTDetails } from 'src/models/PPAPSaveEditCustomerRequest';
import { AxisLeadDetailsModel, correspondingAddress, CustomerDetails, GSTINDetailsModel, ProposalRequestModel, SPDetailsModel } from 'src/models/ProposalRequestModel';
import { SavePolicyData } from 'src/models/SavePolicyData';
import { CityList, LstNomineeRelationshipResponse, StatesModel } from 'src/models/StatesModel';
import { usermodel } from 'src/models/usermodel';
import { SaveVendorRequestModel } from 'src/models/VendorModel';
import { ApiserviceService } from 'src/services/apiservice.service';
import { Constants_SubProductType } from 'src/services/Constants';
import { DataSharingService } from 'src/services/data-sharing.service';
import { UtilityserviceService } from 'src/services/utilityservice.service';
import { ValidationService } from 'src/services/validation.service';
declare var $: any;
declare var AJL: any;
declare var bootbox: any;
import * as  uuid from 'uuid';
import { APIPaymentModel } from '../../models/APIPaymentModel';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  ADPSummaryDetailsResponse: ADPSummaryDetailsResponseModel = new ADPSummaryDetailsResponseModel();
  IsHome: string = 'false';
  customerDetailsForm: FormGroup;
  stateList: Array<StatesModel>;
  cityList: Array<CityList>;
  lead_data: any;
  form_data: any;
  maxDate: Date;
  policy_min_date: any;
  minDate: Date;
  cityData: any;
  proTypeForm: any;
  policyData: SavePolicyData;
  currentFormData: any;
  GPAQuoteRequest: GPAQuoteCreate = new GPAQuoteCreate();
  propInsTypeForm: any;
  contentData: any;
  formValues: any;
  planDetails: any;
  proposalData: any;
  addonCoverageForm: any;
  sharedData: any;
  customerTitles = [{ "id": "0", "val": "Mrs." }, { "id": "1", "val": "Mr." }, { "id": "2", "val": "Ms." }];
  masterData: any; isCorraddSame: boolean = true;
  appCityListPer: any;
  pinDataPer: any;
  policy_max_date: any;
  NomineeRelationShipList: Array<LstNomineeRelationshipResponse>;
  ADPSavePolicyDetailsResponse: ADPSavePolicyDetailsResponseModel = new ADPSavePolicyDetailsResponseModel();
  ADPSavePolicyDetailsRequest: ADPSavePolicyDetailsRequestModel = new ADPSavePolicyDetailsRequestModel();

  isUserAgree: boolean = false;
  SaveHealthPolicyReq: APIPaymentModel = new APIPaymentModel();
  GPAUPPProposalRequest: GPAProposalRequest = new GPAProposalRequest();
  userDetails: usermodel = new usermodel();
  GSTINDetails: GSTINDetailsModel = new GSTINDetailsModel();
  isOtpSent: boolean = false;
  termsCondition: boolean = true;
  isOtpVerified: boolean = false;
  SendOTPResponse: SendOTPResponseModel = new SendOTPResponseModel();
  VerifyOtpResponse: VerifyOtpResponseModel = new VerifyOtpResponseModel();
  OTPtxt: string = "";
  insuredDetails: any;
  KYCResponseModel: KYCResponseModel = new KYCResponseModel();
  proposalRequest: ProposalRequestModel = new ProposalRequestModel;
  userModel: usermodel = new usermodel;
  isWhatsappConsent: boolean = false; disabled: boolean = false; viewType: any;
  flowtype: any;  //to get flow information (Assisted/Non-Assisted)
  IsKYCPopUpOpened: boolean = false;   //flag to set if user opend/filled KYC popup
  HomePlanCode: any;
  PolicyId: string;
  PolicyStartDate: string;
  PolicyEndDate: string;
  StateName: string;
  CityName: string;
  covername: any;
  LoginResponse: LoginResponseModel = new LoginResponseModel();
  SaveVendorRequest: SaveVendorRequestModel = new SaveVendorRequestModel();
  CRMLead: string;
  Address: any;
  Chooseplan: any;
  gst: any;
  ChannelSelected: string = "";
  RMCode: string = "";
  spDetails : SPDetailsModel = new SPDetailsModel()
  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private dataSharingService: DataSharingService,
    private api: ApiserviceService,
    private utility: UtilityserviceService, public router: Router,
    private datePipe: DatePipe) { }

  // async ngOnInit() {

  //   this.proposalRequest.CustomerDetails = new CustomerDetails();
  //  this.utility.setLS("GPASaveHealthPolicyResp", "");

  //   if (!this.utility.isUndefinedOrNull(this.utility.getLS('userdetails'))) {
  //     this.userDetails = JSON.parse(this.utility.getLS('userdetails'));
  //   }

  //   this.masterData = JSON.parse(this.utility.getLS('master_data'));

  // if (!this.utility.isUndefinedOrNull(this.utility.getLS('insured_details'))) {
  //   this.insuredDetails = JSON.parse(this.utility.getLS('insured_details'))
  // }
  //   this.viewType = this.utility.getLS('viewType');
  //   //important code to show KYC popup
  //   this.flowtype = this.utility.getLS("flowtype");

  //   if (this.flowtype == 'NA_CUSTLINK' || this.flowtype == 'NA_CUST' && this.IsKYCPopUpOpened == false) {

  //     if (this.utility.getLS("KYC_customerDetails") == "") {
  //       await this.getAJL();
  //     } else
  //       if (this.utility.getLS("KYC_customerDetails") != "") {
  //         this.KYCCustomerDetail();
  //         this.getSharedData();

  //       }

  //   }

  //   // if (this.flowtype != 'A') {
  //   //   this.KYCCustomerDetail();
  //   //   this.getSharedData();
  //   // }
  //   // else {
  //   this.KYCCustomerDetail();
  //   this.getSharedData();

  //   this.disabled = this.viewType == 'MVIEW' || this.viewType == 'PORTAL' ? false : true;
  //   this.corrFunction(true);
  //   this.callAPITokenService();
  //   //}, 2000);
  // }

  async ngOnInit() {
    debugger;
    this.proposalRequest.CustomerDetails = new CustomerDetails();
    if (!this.utility.isUndefinedOrNull(this.utility.getLS('AxisLeadDetails'))) {
      let AxisLeadDetails: AxisLeadDetailsModel = new AxisLeadDetailsModel();
      AxisLeadDetails = JSON.parse(this.utility.getLS("AxisLeadDetails"));
      this.spDetails.primaryRMCode = AxisLeadDetails.RMCode
      this.spDetails.channelName = AxisLeadDetails.ChannelName
      this.spDetails.secondaryRMCode = AxisLeadDetails.RMCode
      this.spDetails.customerReferenceNumber = AxisLeadDetails.CRMLead
    }
  
    // if (!this.utility.isUndefinedOrNull(this.utility.getLS('RMCode'))) {
    //   this.spDetails.alternateRMCode = (this.utility.getLS('RMCode'))
    // }
    // if (!this.utility.isUndefinedOrNull(this.utility.getLS('CRMLead'))) {
    //   this.spDetails.customerReferenceNumber = (this.utility.getLS('CRMLead'))
    // }
    // if (!this.utility.isUndefinedOrNull(this.utility.getLS('ChannelName'))) {
    //   this.spDetails.channelName = (this.utility.getLS('ChannelName'))
    // }
   
    // 
    if (!this.utility.isUndefinedOrNull(this.utility.getLS('userdetails'))) {
      this.userDetails = JSON.parse(this.utility.getLS('userdetails'))
      if (!this.utility.isUndefinedOrNull(this.utility.getLS('insured_details'))) {
        this.insuredDetails = JSON.parse(this.utility.getLS('insured_details'))
      }
    }
    if (!this.utility.isUndefinedOrNull(this.utility.getLS("IsKYCPopUpOpened"))) {
      this.IsKYCPopUpOpened = this.utility.getLS("IsKYCPopUpOpened") == "true" ? true : false;
    }
    this.masterData = JSON.parse(this.utility.getLS('master_data'));

    this.flowtype = this.utility.getLS("flowtype");
    this.LoginResponse = JSON.parse(this.utility.getLS("LoginResponse"));

    if (this.flowtype == 'NA_CUSTLINK' || this.flowtype == 'NA_CUST' && this.IsKYCPopUpOpened == false) {

      if (this.utility.getLS("KYC_customerDetails") == "") {
        await this.getAJL();
      }
    }
    this.KYCCustomerDetail();
    this.getSharedData();

    if (!this.utility.isUndefinedOrNull(this.utility.getLS("SaveVendorRequest"))) {
      this.SaveVendorRequest = JSON.parse(this.utility.getLS("SaveVendorRequest"));
      this.CRMLead = this.SaveVendorRequest.CRMLead;
    }
    this.viewType = this.utility.getLS('viewType');
    this.disabled = this.viewType == 'MVIEW' || this.viewType == 'PORTAL' ? false : true;
    if (!this.utility.isUndefinedOrNull(this.utility.getLS("gstnumber"))) {
      this.gst = this.utility.getLS("gstnumber");
    }

    this.corrFunction(true);

    this.callAPITokenService();

  }

  async getAJL() {

    let Tokenpromise = new Promise((res, rej) => {

      this.api.GetAPITokenKYC().subscribe(async data => {

        try {

          let res1 = data;

          await AJL.aryafns.initMod(data.replace("Bearer ", ""), this.getKycDetails.bind(this), environment.KYCEnv);

          // this.IsKYCPopUpOpened=true;

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
  // getKycDetails(customerDetails, statusMessage) {

  //   if (statusMessage == "Success" && customerDetails.api_response.status == true) {
  //     var CustomerDetails = JSON.stringify(customerDetails);
  //     this.IsKYCPopUpOpened = true;
  //     this.utility.setLS("IsKYCPopUpOpened", this.IsKYCPopUpOpened.toString());
  //     sessionStorage.setItem("KYC_customerDetails", CustomerDetails);

  //     this.KYCCustomerDetail();
  //     this.getSharedData();

  //   }
  //   else {
  //     this.IsKYCPopUpOpened = false;
  //     if (statusMessage == "Closed") {
  //       this.getAJL();
  //     }
  //     else if (statusMessage.includes("Error-400")) {
  //       this.getAJL();
  //     }
  //     else if (!this.utility.isUndefinedOrNull(customerDetails.api_response.message)) {
  //       this.showalertwithfunction("Alert", customerDetails.api_response.message, true);
  //     }
  //     $(".spinner").delay(100).fadeOut(100);
  //     $(".backdrop").delay(100).fadeOut(100);
  //     return;
  //   }

  //   // else{
  //   // //if user clicked on close then again show popup to get details
  //   //   this._serverapiService.GetAPITokenKYC().subscribe(data => {
  //   //     try {
  //   //       let res1 = data;
  //   //       AJL.aryafns.initMod(data.replace("Bearer ",""), this.getKycDetails.bind(this),"uat");
  //   //     }
  //   //     catch (ex) {
  //   //     }
  //   //   }), (error) => {
  //   //   };
  //   // }
  // }

  getKycDetails(customerDetails, statusMessage) {

    if (statusMessage == "Success" && customerDetails.api_response.status == true && customerDetails.api_response.kyc_details.customer_type == "I") {

      var CustomerDetails = JSON.stringify(customerDetails);

      this.IsKYCPopUpOpened = true;

      this.utility.setLS("IsKYCPopUpOpened", this.IsKYCPopUpOpened.toString());

      sessionStorage.setItem("KYC_customerDetails", CustomerDetails);

    }

    else {

      this.IsKYCPopUpOpened = false;

      if (statusMessage == "Closed") {

        this.getAJL();

      }

      else if (statusMessage.includes("Error-400")) {

        this.getAJL();

      }

      else if (customerDetails.api_response.kyc_details.customer_type == "C") {

        this.showalertwithfunction("Alert", "This Policy Issuance is not allowed for mentioned Customer type", true);

      }

      else if (!this.utility.isUndefinedOrNull(customerDetails.api_response.message)) {

        this.showalertwithfunction("Alert", customerDetails.api_response.message, true);

      }

      $(".spinner").delay(100).fadeOut(100);

      $(".backdrop").delay(100).fadeOut(100);

      return;

    }

  }


  KYCCustomerDetail() {

    if (this.utility.getLS("KYC_customerDetails") != "") {
      // debugger;
      this.KYCResponseModel = JSON.parse(this.utility.getLS("KYC_customerDetails"));
      // this.proposalRequest.CustomerDetails = new CustomerDetails();
      //Customer Title
      if (!this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.full_name)) {
        var title = this.KYCResponseModel.api_response.kyc_details.full_name.split(" ")[0];
        //   if (title.toUpperCase() == "MR") {
        //     this.proposalRequest.CustomerDetails.CustomerTitle = "Mr.";
        //     // this.customerDetailsForm.controls.title.setValue("Mr");
        //     // this.proposalRequest.CustomerDetails.CustomerTitle = "Mr";

        //     // this.PersonalDetailForm.value.TitleValue = 'Mr.';
        //     // this.PersonalDetailForm.controls.TitleValue.setValue("Mr");
        //   } else if (title.toUpperCase() == "MRS") {
        //     this.proposalRequest.CustomerDetails.CustomerTitle = "Mrs.";
        //     // this.customerDetailsForm.controls.title.setValue("Mrs.");
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

        // } if (!this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.full_name)) {

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
        else {
          this.proposalRequest.CustomerDetails.CustomerTitle = "0";
          $('#ddCustTitle').removeProp('disabled');
        }

      }
      else {
        this.proposalRequest.CustomerDetails.CustomerTitle = "0";
        $('#ddCustTitle').removeProp('disabled');
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

      else {
        this.proposalRequest.CustomerDetails.CustomerName = this.userModel.CustName;

      }







      //Custome DOB
      if (!this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.dob)) {
        this.proposalRequest.CustomerDetails.DateOfBirth = this.datePipe.transform(this.utility.ConvertStringToDate(this.KYCResponseModel.api_response.kyc_details.dob), 'yyyy-MM-dd');
        $("#customer_dob").prop("disabled", true);
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
        this.proposalRequest.CustomerDetails.MobileNumber = this.userDetails.MobileNo;
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
        if (!this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.alternate_address.address_line_1) && !this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.alternate_address.address_line_2) && !this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.alternate_address.address_line_3)) {
          this.proposalRequest.CustomerDetails.AddressLine1 = this.KYCResponseModel.api_response.kyc_details.alternate_address.address_line_1 + " " + this.KYCResponseModel.api_response.kyc_details.alternate_address.address_line_2 + " " + this.KYCResponseModel.api_response.kyc_details.alternate_address.address_line_3;
        }
        else if (!this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.alternate_address.address_line_1) && !this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.alternate_address.address_line_2)) {
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

        this.proposalRequest.CustomerDetails.AddressLine1 = "";
        this.proposalRequest.CustomerDetails.PinCode = this.userDetails.riskPincode;
        if (this.proposalRequest.CustomerDetails.PinCode != "") {
          this.api.getStates().subscribe((data) => {
            this.stateList = data;
            this.getStateCityByPin();
          });
        }
      }
      //Email
      if (!this.utility.isUndefinedOrNull(this.KYCResponseModel.api_response.kyc_details.email)) {
        this.proposalRequest.CustomerDetails.Email = this.KYCResponseModel.api_response.kyc_details.email;
        // this.PersonalDetailForm.controls.Email.setValue(this.Chiproposal.CustomerDetails.Email);
      }
      else {
        this.proposalRequest.CustomerDetails.Email = this.userDetails.Email;
      }

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

  ngAfterViewInit() {
    setTimeout(() => {
      this.utility.CheckFieldsContent();
    }, 100);
  }

  getStateCityByPin(): void {
    //alert('Hi');

    var pin = this.proposalRequest.CustomerDetails.PinCode;
    //if (!this.utility.isUndefinedOrNull(pin)) {
    if (pin.length == 6) {
      this.api.getStateCityByPincode(pin).subscribe((data) => {
        console.log('getStateCityByPin' + data);
        this.proposalRequest.CustomerDetails.StateCode = parseInt(data.StateId);
        //alert(data.CityList[0].CityID);
        this.api.getCitiesByStateId(data.StateId).subscribe((data1) => {
          this.cityList = data1.CityList;
          this.proposalRequest.CustomerDetails.CityCode = parseInt(data.CityList[0].CityID);
          this.StateName = data.StateName;
          this.CityName = data.CityList[0].CityName;
        });
      });
    }

  }
  toggleCover() {
    if ($(".personal_accident_check").hasClass('fa-check')) {
      $("#MAKE_NETBANKING_PAYMENT").prop('disabled', true);
    }
    else {
      $("#MAKE_NETBANKING_PAYMENT").prop('disabled', false);
    }
    $(".personal_accident_check").toggleClass("fa-check fa-minus1");
    // $(".personal-cover").toggleClass("personal-cover-enabled personal-cover-disabled");
  }
  getSharedData() {

    let defaultValues = {
      title: '', name: '', date_of_birth: '', address: '', pincode: '', state: '', city: [], mobile_number: '', email: '',
      communication_address: '', communication_pincode: '', communication_state: '', communication_city: '', gst: '',
    };
    this.dataSharingService.sharedFormData$.
      subscribe(data => {
        console.log(data);
        this.sharedData = data;

        if (this.utility.isUndefinedOrNull(this.utility.getLS('lead_data'))) {
          this.lead_data = {};
        } else {
          this.lead_data = JSON.parse(this.utility.getLS('lead_data')) || {};
        }
        if (this.ADPSummaryDetailsResponse.Subproducttype == Constants_SubProductType.Home) {
          this.IsHome = 'true';
          this.utility.setLS("IsHome", this.IsHome);
        }
        // this.currentFormData = data.find(item => item.formName === 'customerDetailsForm');
        if (!this.utility.isUndefinedOrNull(this.utility.getLS('customerDetails'))) {
          this.currentFormData = JSON.parse(this.utility.getLS('customerDetails'))
        }
        // this.currentFormData = JSON.parse(this.utility.getLS('customerDetails'));

        this.proTypeForm = data.find(item => item.formName === 'propertyTypeForm');
        this.propInsTypeForm = data.find(item => item.formName === 'propInsTypeForm');
        this.addonCoverageForm = data.find(item => item.formName === 'addonCoverageForm');
        this.planDetails = data.find(item => item.formName === 'planDetails');

        if (this.planDetails) {

          this.propInsTypeForm.formValues.tenure = this.utility.getLS('selectedTenure');
          console.log("userDetails", this.userDetails)
          console.log("tenure", this.propInsTypeForm.formValues.tenure);
          defaultValues.title = this.proposalRequest.CustomerDetails.CustomerTitle;
          defaultValues.name = this.proposalRequest.CustomerDetails.CustomerName;
          defaultValues.email = this.proposalRequest.CustomerDetails.Email;

          defaultValues.mobile_number = this.proposalRequest.CustomerDetails.MobileNumber//this.KYCResponseModel ? api_response?.kyc_details?.mobile_number;// this.userDetails.MobileNo;
          defaultValues.city = this.proTypeForm.additionalInfo ? this.proTypeForm.additionalInfo.city : [];
          // this.cityData = this.proposalRequest.CustomerDetails.CityCode;
          defaultValues.state = this.proTypeForm.additionalInfo ? this.proTypeForm.additionalInfo.stateDetails.state : '';
          defaultValues.pincode = this.proposalRequest.CustomerDetails.PinCode;
          defaultValues.address = this.proposalRequest.CustomerDetails.AddressLine1//this.currentFormData ? this.currentFormData.address : '';
          defaultValues.date_of_birth = this.proposalRequest.CustomerDetails.DateOfBirth//this.currentFormData ? this.currentFormData.date_of_birth : '';
          defaultValues.communication_address = this.proposalRequest.CustomerDetails.AddressLine1 //this.currentFormData ? this.currentFormData.communication_address ?
          // this.currentFormData.communication_address : '' : '';
          defaultValues.communication_pincode = this.proposalRequest.CustomerDetails.PinCode//this.currentFormData ? this.currentFormData.communication_pincode ?  this.currentFormData.communication_pincode : '' : '';
          defaultValues.communication_state = this.proposalRequest.CustomerDetails.StateCode.toString()//this.currentFormData ? this.currentFormData.communication_state ?  this.currentFormData.communication_state : '' : '';
          defaultValues.communication_city = this.proposalRequest.CustomerDetails.CityCode.toString()//this.currentFormData ? this.currentFormData.communication_city ? this.currentFormData.communication_city : '' : '';
          defaultValues.gst = this.currentFormData ? this.currentFormData.gst : '';

        }
        else {
          defaultValues = this.currentFormData ? this.currentFormData : defaultValues;
        }
        this.maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18));
        this.policy_min_date = moment().format('YYYY-MM-DD');
        this.minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 151));
        this.policy_max_date = moment().add(15, 'days').format('YYYY-MM-DD');
        console.log("defaultValues", defaultValues);

        this.customerDetailsForm = this.createForm(defaultValues);
        if (defaultValues.pincode) {
          this.getPincodeDetails(defaultValues.pincode)
        }
        if (defaultValues.city.length) {
          this.customerDetailsForm.patchValue({ city: defaultValues.city[0].CityName });
          this.customerDetailsForm.patchValue({ communication_city: defaultValues.city[0].CityName });
          this.customerDetailsForm.patchValue({ communication_state: this.proTypeForm ? this.proTypeForm.additionalInfo.stateDetails.state : '' });
        }

        // if(this.utility.getLS("KYC_customerDetails")!=""){
        //   this.customerDetailsForm.controls.TitleValue.setValue("Mr.");
        //   this.customerDetailsForm.controls.CustomerName.setValue(this.KYCResponseModel.api_response.kyc_details.first_name + " " + this.KYCResponseModel.api_response.kyc_details.middle_name + " " + this.KYCResponseModel.api_response.kyc_details.last_name);
        // }
      });
  }

  checknum(value) {
    return !/\D/.test(value);
  }
  createForm(values) {
    return this.fb.group({
      title: [this.currentFormData ? this.currentFormData.title : '', [Validators.required]],
      name: [values.name, [Validators.required, this.validationService.noWhitespaceValidator]],
      date_of_birth: [values.date_of_birth || '', [Validators.required]],
      address: [values.address || '', [Validators.required, this.validationService.noWhitespaceValidator]],
      gst: [''],
      pincode: [values.pincode || '', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      state: [values.state || '', [Validators.required]],
      city: [values.city.length ? values.city.length[0] : '', [Validators.required]],
      mobile_number: [values.mobile_number, [Validators.required, Validators.pattern('^[6-9]\\d{9}$')]],
      email: [values.email, [Validators.required, Validators.pattern('\\S+@\\S+\\.\\S+')]],
      communication_address: [values.communication_address || '', [this.validationService.noWhitespaceValidator]],
      communication_pincode: [values.communication_pincode || '', [Validators.pattern('^[0-9]{6}$')]],
      communication_state: [values.communication_state || '', []],
      communication_city: [values.communication_city || '', []],
      policy_start_date: [this.currentFormData ? this.currentFormData.policy_start_date : new Date(), [Validators.required]],
      financier_name: [this.currentFormData ? this.currentFormData.financier_name : '', Validators.pattern('^[a-zA-Z \-\']+')],
      whatsAppConsent: [this.currentFormData ? this.currentFormData.whatsAppConsent : false],
      agree: [this.currentFormData ? this.currentFormData.agree : false],
      OTPtxt: [''],
    });
  }

  getPincodeDetails(val: any) {
   
    if (val.length === 6) {
      const body = val;
      this.api.getStateCityByPincode(body).subscribe((res: any) => {
  
        if (res.StatusCode === 1) {
          this.cityData = res.CityList;
          this.customerDetailsForm.patchValue({ city: res.CityList[0].CityName });
          if (res.CityList[0].StateName === undefined) {
            this.customerDetailsForm.patchValue({ state: res.StateName });
          } else {
            this.customerDetailsForm.patchValue({ state: res.StateName });
          }
          $(".spinner").delay(100).fadeOut(100);
          $(".backdrop").delay(100).fadeOut(100);
        } else {
          $(".spinner").delay(100).fadeOut(100);
          $(".backdrop").delay(100).fadeOut(100);
          this.utility.showAlertMessage("Alert", res.StatusMessage);
        }
      });
    }
  }
  getPincodeDetailsPer(val: any) {
    if (val.length == 6) {
      let body = val;
      this.api.getStateCityByPincode(body).subscribe((res: any) => {
        if (res.StatusCode == 1) {
          this.pinDataPer = res;
          sessionStorage.setItem('perPincData', JSON.stringify(this.pinDataPer));
          this.appCityListPer = res.CityList;
          this.customerDetailsForm.patchValue({ communication_city: res.CityList[0].CityCode });
          if (res.CityList[0].StateName === undefined) {
            this.customerDetailsForm.patchValue({ communication_state: res.StateName });
          } else {
            this.customerDetailsForm.patchValue({ communication_state: res.CityList[0].StateCode });
          }
        }
        else {
          this.customerDetailsForm.patchValue({ 'communication_city': null });
          this.customerDetailsForm.patchValue({ 'communication_state': null });
          this.utility.showAlertMessage("Alert", res.StatusMessage);
        }
      });
    }
  }
  getCityList(ev) {
    this.customerDetailsForm.patchValue({ 'city': ev.target.value });
    // this.customerDetailsForm.patchValue({ 'communication_city': ev.target.value });
  }
  getPerCityList(ev) {
    this.customerDetailsForm.patchValue({ 'communication_city': ev.target.value });
  }
  setAddress(val) {
    if (this.isCorraddSame)
      this.customerDetailsForm.patchValue({ 'communication_address': val });
    this.utility.setLS("Caddress", val);

  }
  corrFunction(val) {
    this.isCorraddSame = val;
    if (val == false) {
      this.customerDetailsForm.patchValue({ 'communication_address': '' });
      this.customerDetailsForm.get('communication_address').clearValidators();
      this.customerDetailsForm.patchValue({ 'communication_pincode': '' });
      this.customerDetailsForm.get('communication_pincode').clearValidators();
      this.customerDetailsForm.patchValue({ 'communication_city': '' });
      this.customerDetailsForm.get('communication_city').clearValidators();
      this.customerDetailsForm.patchValue({ 'communication_state': '' });
      this.customerDetailsForm.get('communication_state').clearValidators();
    }
    else {
      this.customerDetailsForm.patchValue({ communication_address: this.customerDetailsForm.value.address });
      this.customerDetailsForm.get('communication_address').setValidators([Validators.required]);
      this.customerDetailsForm.patchValue({ communication_pincode: this.customerDetailsForm.value.pincode });
      this.customerDetailsForm.get('communication_pincode').setValidators([Validators.required]);
      this.customerDetailsForm.patchValue({ communication_city: this.proposalRequest.CustomerDetails.CityCode });//this.proTypeForm.additionalInfo.city[0].CityName });
      this.customerDetailsForm.get('communication_city').setValidators([Validators.required]);
      this.customerDetailsForm.patchValue({ communication_state: this.proposalRequest.CustomerDetails.StateCode });//this.proTypeForm.additionalInfo.stateDetails.state });
      this.customerDetailsForm.get('communication_state').setValidators([Validators.required]);
    }
    this.customerDetailsForm.updateValueAndValidity();
  }

  callAPITokenService() {
    if (!sessionStorage.getItem('HospifundToken')) {
      $(".spinner").delay(100).fadeIn(100);
      $(".backdrop").delay(100).fadeIn(100);
      this.api.GetAPIToken().subscribe((res: any) => {
        this.utility.setLS("bearer", res);
        $(".spinner").delay(100).fadeOut(100);
        $(".backdrop").delay(100).fadeOut(100);
      }, err => {
        $(".spinner").delay(100).fadeOut(100);
        $(".backdrop").delay(100).fadeOut(100);
        this.utility.showAlertMessage("Alert", 'Sorry Something went wrong');
      });
    }
  }

  callAPIHospifund(requestBody, endPoint) {

    $(".spinner").delay(100).fadeIn(100);
    $(".backdrop").delay(100).fadeIn(100);
    this.utility.setLS('proposalRequest', JSON.stringify(requestBody));
    let ProposalPromis = new Promise((res, rej) => {
      //this.CHICustomerRequest.CustomerID = Number(this.CHICustomerResponse.PFCustomerID);
      this.api.saveProposal(requestBody).subscribe(data => {
        this.proposalData = data;
        sessionStorage.setItem('proposalResponse', (JSON.stringify(this.proposalData)));
        this.callCSCService(requestBody);

        let cityDetails = this.cityData.filter(element => element.CityName === this.currentFormData.city)[0];

        let CityId = cityDetails.CityID;

        let body = {
          "pincode": this.currentFormData.pincode,
          "cityid": cityDetails.CityID
        };
        res(0);
      }, (error) => {
        setTimeout(() => {
          $(".spinner").delay(100).fadeOut(100);
          $(".backdrop").delay(100).fadeOut(100);
        }, 100);
        this.utility.showAlertMessage("Alert", this.proposalData.message);
        rej();
      });
    });



    // this.api.saveProposal(requestBody).subscribe((res: any) => {
    //   // this.api.showLoader = false;
    //   if (res.status) {
    //     console.log(res);
    //     this.proposalData = res;
    //     sessionStorage.setItem('proposalResponse', (JSON.stringify(this.proposalData)));
    //     // let cityDetails = this.getCityCode(this.currentFormData.city);
    //     this.callCSCService(requestBody);

    //     let cityDetails = this.cityData.filter(element => element.CityName === this.currentFormData.city)[0];

    //     let CityId = cityDetails.CityID;

    //     let body = {
    //       "pincode": this.currentFormData.pincode,
    //       "cityid": cityDetails.CityID
    //     };

    //     //   this.callGetPinService(body,cityDetails).then((res1: any) => {
    //     //     debugger;
    //     //     if (!this.isCorraddSame) {
    //     //       debugger;
    //     //       // cityDetails = this.getCityCode(this.currentFormData.communication_city)
    //     //       let cityDetails = this.checkSameAddress();
    //     //       body = {
    //     //        "pincode": this.currentFormData.pincode,
    //     //        "cityid": cityDetails.CityID
    //     //       };
    //     //       this.callGetPinService(body,cityDetails).then((res2: any) => {
    //     //         this.callCSCService(res1.Details[0].Value, res2.Details[0].Value, requestBody);
    //     //       });
    //     //     } else {
    //     //       this.callCSCService(res1.Details[0].Value, res1.Details[0].Value, requestBody);
    //     //     }
    //     //   });
    //     //   $(".spinner").delay(100).fadeOut(100);
    //     //   $(".backdrop").delay(100).fadeOut(100);
    //     // } else {
    //     //   let msg = res.message || res.StatusDesc || res.ErrorText || res.StatusMsg;
    //     //   $(".spinner").delay(100).fadeOut(100);
    //     //   $(".backdrop").delay(100).fadeOut(100);
    //     //   if (!msg) {
    //     //     // msg = 'Not able to get response from server, please try again later';
    //     //     msg = 'Service timeout, please try again later';
    //     //   }
    //     //   this.utility.showAlertMessage("Alert", msg);
    //   }

    // });
    // $(".spinner").delay(100).fadeOut(100);
    // $(".backdrop").delay(100).fadeOut(100);
    // this.utility.showAlertMessage("Alert","Something went wrong");

  }

  submitCustomerDetailsForm() {
    
    if (this.utility.isUndefinedOrNull(this.utility.getLS("KYC_customerDetails"))) {
      this.getAJL();
    }

    else {
      this.Chooseplan = (this.utility.getLS("Chooseplan"));
      if (this.utility.isUndefinedOrNull(this.Chooseplan)) {
        this.utility.showAlertMessage("Alert", "Please Select Plan to proceed further.");
        return false;
      }
      if (!this.utility.isUndefinedOrNull(this.gst)) {
        if (!this.utility.validateGST(this.gst.toUpperCase(), 'gst')) {
          this.utility.showAlertMessage("Alert", "Please enter valid GSTIN number.");
          return false;
        }
      }
      console.log(this.customerDetailsForm);

      const inputForm = this.customerDetailsForm;
      const isValid = this.isValidForm(this.validationService.validateForm(inputForm));
      if (isValid) {
        console.log('Valid form', inputForm.value);
        $(".spinner").delay(100).fadeIn(100);
        $(".backdrop").delay(100).fadeIn(100);
        // this.dataSharingService.setSharedFormData(inputForm.value, 'customerDetailsForm', '');
        this.utility.setLS('customerDetails', JSON.stringify(inputForm.value));
        const requestBody = this.createRequestBody();
        console.log("Proposal request body is as follows ", requestBody);
        this.callAPIHospifund(requestBody, 'CreateProposal');
        sessionStorage.setItem('isWhatsAppConsent', JSON.stringify(this.customerDetailsForm.value.whatsAppConsent));
        if (this.customerDetailsForm.value.whatsAppConsent) {
          this.callWhatsappService(this.customerDetailsForm.value.mobile_number);
        }
      } else {
        console.log('Invalid form');
      }
    }
    this.utility.setLS("gstnumber", this.gst);
  }

  callWhatsappService(mobile_no) {
    const requestBody = {
      MobileNo: mobile_no,
      Mode: 'in'
    };
    this.api.Whatsapp_INOUT(requestBody).subscribe((res: any) => {
    });
  }

  findFormDetails(searchFormName) {
    return this.sharedData.find(item => item.formName === searchFormName) || { formValues: '' };
  }

  isValidForm(validity) {
    const errors = validity[0]; let isValid = validity[1];
    if (errors.length) {
      this.utility.showAlertMessage("Alert", errors[0]);
    }
    return isValid ? this.checkAgree() : false;
  }
  checkAgree() {
    let isValid = true;
    if (this.flowtype != "A") {
      if (!this.customerDetailsForm.value.agree) {
        isValid = false;
        this.utility.showAlertMessage("Alert", 'Please accept terms and conditions');
      }
    }
    return isValid;
  }
  getContentCovers(coversArray) {
    const basicCover = this.masterData.CvrDetails.filter(c => c.IsVisibleInContent === true);
    const contentData = this.findFormDetails('contentTypeForm'); let new_data = {}
    const tags = [{ name: 'durable', value: 'DurablesSI' }, { name: 'furniture', value: 'FurnitureSI' },
    { name: 'jewellery', value: 'JewellerySI' }, { name: 'miscellaneous', value: 'ClothingSI' }];
    Object.keys(contentData.formValues).forEach(key => {
      tags.forEach(elem => {
        if (elem.name === key) {
          // new_data[elem.value] = contentData.formValues[key] ? parseFloat(contentData.formValues[key].replace(/,/g, '')) : 0;
          new_data[elem.value] = contentData.formValues[key] ? this.getPlainValue(contentData.formValues[key]) : 0;
        }
      });
    });
    // console.log(coversArray)
    basicCover.forEach(element => {
      coversArray.push({ CoverCode: element.CvrCode, CoverName: element.CvrName, SumInsured: contentData.total })
    });
    if (this.getPlainValue(contentData.formValues['jewellery']) > 0) {
      if (coversArray.find(x => x.CoverCode == 2489 || x.CoverCode == 1185)) {
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
        SumInsured: this.getPlainValue(this.propInsTypeForm.formValues.structure_value)
      });
    });
  }

  getAddonCovers(addonCoverageForm, policyType) {

    let coversArray: any = [];
    let data;
    if (addonCoverageForm.formValues) {
      addonCoverageForm.formValues.forEach(element => {
        if (element.total) {
          data = {
            CoverCode: element.instrument_name.replace(/\D/g, ''), CoverName: element.cvrName, SumInsured: element.total
          };
          if (element.img === "personal_accident.png") {
            if (this.utility.getLS("insured_details") != "") {
              var insuredDetails = JSON.parse(this.utility.getLS('insured_details'));
            }

            Object.assign(data, insuredDetails);
          }
          coversArray.push(data);
        }
        console.log(data);

      });
    }
    if (policyType === 'both') {
      this.getContentCovers(coversArray);
      this.getStructureCovers(coversArray);
      const propInsTypeForm = this.findFormDetails('propInsTypeForm');
      const contentTypeForm = this.findFormDetails('contentTypeForm');
      const structure = this.getPlainValue(propInsTypeForm.formValues.structure_value);
      const content = this.getContentValue(propInsTypeForm.formValues.propInsType, contentTypeForm);
      coversArray = this.unique(coversArray, 'CoverCode')
      coversArray.find(data => data.CoverName === 'Terrorism')['SumInsured'] = (structure + content);
      console.log(coversArray);
    } else {
      policyType = policyType.charAt(0).toUpperCase() + policyType.slice(1);
      const propType = `get${policyType}Covers`;
      this[propType](coversArray);
    }
    // const checkPA = this.addonCoverageForm ? this.addonCoverageForm.formValues.find(field => field.instrument_name === 'field_1288') : undefined;
    // if (checkPA) {
    //   const insuredDetails = JSON.parse(localStorage.getItem('insured_details'));
    //   if (checkPA['total'] && checkPA['isAdded']) {
    //     Object.assign(requestBody, insuredDetails);
    //   }
    // }
    return coversArray;
    this.covername = coversArray[0];
    console.log(this.covername);

  }

  getContentValue(propInsType, contentTypeForm) {
    let contentValue;
    if (propInsType === 'content' || propInsType === 'both') {
      contentValue = contentTypeForm.total ? contentTypeForm.total : '0';
      // contentValue = parseFloat(contentValue.replace(/,/g, ''));
    }
    return parseFloat(contentValue || 0);
  }

  getCityCode(cityName) {
    let cityDetails;
    cityDetails = this.proTypeForm.additionalInfo.city.filter(element => element.CityName === cityName)[0];
    return cityDetails;
  }
  getPolicyType() {
    const getInsuranaceType = this.findFormDetails('propInsTypeForm').formValues.propInsType;
    let insuranceType;
    insuranceType = getInsuranaceType === 'both' ? 'structure and content' : getInsuranaceType;
    console.log('Insurance type is', insuranceType);
    return insuranceType;
  }
  calculateAreaOfHouse(sumInsured) {
    let pricingLogic = parseFloat(this.masterData.PricingLogic);
    return sumInsured / pricingLogic;
  }
  getStructureDetails(data) {
    const structural_sum_insured = this.getPlainValue(this.propInsTypeForm.formValues.structure_value);
    const structure_data = {
      StructureSumInsured: structural_sum_insured,
      LocationOfProperty: this.currentFormData.city,
      // AreaofHouseinSqFt: this.calculateAreaOfHouse(structural_sum_insured) || 0,
      // ApproxConstructionRateinRsSqft: parseInt(this.masterData.PricingLogic) || 1000,
      AreaofHouseinSqFt: this.getPlainValue(this.propInsTypeForm.formValues.carpet_area_in_sq_mtrs) || 0,
      ApproxConstructionRateinRsSqft: this.getPlainValue(this.propInsTypeForm.formValues.cost_of_construction) || 0,
      NameofMortgagerFinancerStructure: this.customerDetailsForm.value.financier_name || ''
    };
    return Object.assign(data, structure_data);
  }
  getContentDetails(data) {
    const content_data = this.findFormDetails('contentTypeForm');
    let new_data = {}
    let tags = [
      {
        name: 'durable',
        value: 'DurablesSI'
      },
      {
        name: 'furniture',
        value: 'FurnitureSI'
      },
      {
        name: 'jewellery',
        value: 'JewellerySI'
      },
      {
        name: 'miscellaneous',
        value: 'ClothingSI'
      },
    ];
    Object.keys(content_data.formValues).forEach(function (key) {
      tags.forEach(elem => {
        if (elem.name === key) {
          new_data[elem.value] = content_data.formValues[key] ? content_data.formValues[key] : 0;
        }
      })
    });
    new_data = Object.assign(new_data, {
      ContentSumInsured: content_data.total,
      NameofMortgagerFinancerContent: this.customerDetailsForm.value.financier_name || ''
    });
    return Object.assign(data, new_data);
  }

  createRequestBody() {
    let planType;
    this.currentFormData = this.currentFormData || JSON.parse(this.utility.getLS('customerDetails'));
    const cityDetails = this.getCityCode(this.currentFormData.city);
    const policyType = this.getPolicyType().toUpperCase();
    const policyTypeObj = { PolicyType: policyType };
    let policy_type = this.findFormDetails('propInsTypeForm').formValues.propInsType;
    const policyStartDate = this.customerDetailsForm.value.policy_start_date;
    let customerAddressDetails = this.checkSameAddress();
    planType = this.propInsTypeForm ? this.propInsTypeForm.formValues.tenure <= 5 ? 'CHP' : this.propInsTypeForm.formValues.tenure <= 10 ? 'BGR' : '' : '';
    if (this.proTypeForm) {
      planType = this.proTypeForm.formValues.propType == 'rented' ? 'CHP' : planType;
    }
    // this.proposalRequest.CustomerDetails.correspondingAddress = new correspondingAddress();
    // this.proposalRequest.CustomerDetails.correspondingAddress.AddressLine1 = customerAddressDetails.address;
    // this.proposalRequest.CustomerDetails.correspondingAddress.CityCode = customerAddressDetails.cityCode;
    // this.proposalRequest.CustomerDetails.correspondingAddress.Statecode = customerAddressDetails.stateCode;
    // this.proposalRequest.CustomerDetails.correspondingAddress.Pincode = customerAddressDetails.pinCode;
    const requestBody = {
      CorrelationId: uuid.v4(),
      // PolicyType: this.propInsTypeForm.formValues.propInsType,
      DealId: this.masterData.DealId,
      // DealId: 'DL-4118/1365716',
      //DealId: 'DEAL-4118-6929528',
      PolicyStartDate: moment(policyStartDate).format('YYYY-MM-DD') || '2020-08-28',
      ApplicantStatus: 'Individual',
      CompPaymentMode: 'Cash',
      HSPNONHSP: 'NONHSP',
      InwardDate: moment(policyStartDate).format('YYYY-MM-DD') || '2020-08-27',
      TypeofDwelling: 'Others',
      PaymentAmount: this.planDetails.formValues.totalPremium,
      // PaymentAmount: 50000,
      //PremiumReceivedFromCustomer: 50000,
      FinancierName: this.customerDetailsForm.value.financier_name || '',
      PaymentBankName: 'ICICI',
      ProposalType: 'Non Loan',
      PremiumReceivedFromCustomer: this.planDetails.formValues.TotalPremium,
      InsuredAddressLine: this.currentFormData.address,
      InsuredCountryCode: 100,
      InsuredStateCode: this.proTypeForm.additionalInfo.stateDetails.stateId,
      InsuredCityCode: this.proposalRequest.CustomerDetails.CityCode,
      InsuredPinCode: this.currentFormData.pincode,
      PolicyTenureforCHI: this.propInsTypeForm.formValues.tenure,//this.planDetails.formValues.tenure,
      CoverDetails: this.getAddonCovers(this.addonCoverageForm, policy_type),

      CustomerDetails: {

        CustomerType: 'Individual',
        CustomerName: this.currentFormData.name,
        DateOfBirth: moment(this.currentFormData.date_of_birth).format('YYYY/MM/DD') || '',
        PinCode: customerAddressDetails.pinCode,
        Email: this.customerDetailsForm.value.email,
        MobileNumber: this.customerDetailsForm.value.mobile_number,
        AddressLine1: customerAddressDetails.address,
        CountryCode: 100,
        StateCode: customerAddressDetails.stateCode,
        CityCode: customerAddressDetails.cityCode,
        // this.proposalRequest.CustomerDetails.CustomerType = this.quoteRequest.CustomerType;
        CKYCID: this.KYCResponseModel.api_response.kyc_details.ckyc_number != "" ? this.KYCResponseModel.api_response.kyc_details.ckyc_number : "",
        EKYCid: "",
        pepFlag: this.KYCResponseModel.user_data.pep_flag == "No" ? false : true,
        ilkycReferenceNumber: this.KYCResponseModel.api_response.kyc_details.il_kyc_ref_no != "" ? this.KYCResponseModel.api_response.kyc_details.il_kyc_ref_no : "",
        SkipDedupeLogic: false,

      },
      SPDetails : {
      alternateRMCode : "",
      customerReferenceNumber : this.spDetails.customerReferenceNumber,
      channelName : this.spDetails.channelName,
      primaryRMCode : this.spDetails.primaryRMCode,
      secondaryRMCode : this.spDetails.secondaryRMCode,
      bancaField01 : "",
      bancaField02 : "",
      bancaField03 : "",
      },

      GSTNO: this.customerDetailsForm.value.gst,
      //  NewProductCode: this.planDetails.formValues.Tenure > 1 ? '1015/L': '1015/A', // old code
      NewProductCode: planType ? planType == 'BGR' ? '1015/L' : planType == 'CHP' ? '4119' : '' : '',
      //  HomePlanCode: this.planDetails.formValues.Tenure > 1 ? 20353 : 23587, //Prod
      //  HomePlanName: this.planDetails.formValues.Tenure > 1 ? '1015L Generic XST' : '1015A Generic XST', //Prod
      //  HomePlanCode: this.masterData.PlanCode.toString(), //UAT
      //HomePlanName: this.masterData.PlanName, //UAT

      HomePlanName: planType ? planType == 'BGR' ? this.masterData.BGRPlanName : planType == 'CHP' ? this.masterData.CHPPlanName : '' : '',

      HomePlanCode: planType ? planType == 'BGR' ? this.masterData.BGRPlanCode.toString() : planType == 'CHP' ? this.masterData.PlanCode.toString() : '' : '',
      NewProductCodeName: planType ? planType == 'BGR' ? "ICICI Bharat Griha Raksha Policy" : planType == 'CHP' ? "Home Insurance" : '' : '',
      ProductNode: '4202',
      PaymentDate: moment(new Date()).format('YYYY/MM/DD'),
      ProductCode: '4202',
      TypeOfPolicy: 'Retail', //UAT
      LocationOfProperty: policy_type != 'content' ? this.customerDetailsForm.value.city : '',
    };

    if (policy_type === 'both') {
      this.getContentDetails(requestBody);
      this.getStructureDetails(requestBody);

    } else {
      policy_type = policy_type.charAt(0).toUpperCase() + policy_type.slice(1);
      let propType = `get${policy_type}Details`;
      this[propType](requestBody);
    }
    return Object.assign(requestBody, policyTypeObj);
  }

  checkSameAddress() {

    let details: any = {};
    if (this.isCorraddSame) {
      details.pinCode = this.customerDetailsForm.value.pincode; //this.currentFormData.pincode || '';
      details.address = this.customerDetailsForm.value.address;//this.currentFormData.address || '';
      details.cityCode = this.proposalRequest.CustomerDetails.CityCode;//this.getCityCode(this.currentFormData.city).cityID|| '';
      details.stateCode = this.proposalRequest.CustomerDetails.StateCode;//this.proTypeForm.additionalInfo.stateDetails.stateId || '';
    } else {
      details.pinCode = this.customerDetailsForm.value.communication_pincode || '';
      details.address = this.customerDetailsForm.value.address || '';
      details.cityCode = this.getCityId(this.customerDetailsForm.value.communication_city).CityID || '';
      details.stateCode = JSON.parse(this.utility.getLS('perPincData')).StateId || '';
    }
    return details;

  }

  unique(array, propertyName) {
    return array.filter((e, i) => array.findIndex(a => a[propertyName] === e[propertyName]) === i);
  }

  getCityId(city) {
    let pinDetails = JSON.parse(this.utility.getLS('perPincData'));
    return pinDetails.CityList.find(data => data.CityName === city) || { CityID: '' };
  }

  callGetPinService(body, cityid) {

    return new Promise((resolve, reject) => {
      this.api.GetPincodeID(body, cityid).subscribe((res: any) => {
        // console.log(body,"Ajay PIncode");
        // console.log(CityID,"Ajay PIncode");

        if (res.StatusCode == 1) {
          resolve(res);
        }
        else {
          $(".spinner").delay(100).fadeOut(100);
          $(".backdrop").delay(100).fadeOut(100);
          this.utility.showAlertMessage("Alert", res.StatusMessage);

        }
      }, err => {
        $(".spinner").delay(100).fadeOut(100);
        $(".backdrop").delay(100).fadeOut(100);
        this.utility.showAlertMessage("Alert", 'Sorry Something went wrong');
      });
    });

  }
  getMonth(date) {
    var month = date.getMonth() + 1;
    return month < 10 ? '0' + month : '' + month; // ('' + month) for string result
  }
  getMyDate(day) {
    return day < 10 ? '0' + day : '' + day;
  }
  getCSCSI(request) {
    if (request.PolicyType == 'CONTENT') { return request.ContentSumInsured }
    else if (request.PolicyType == 'STRUCTURE') { return request.StructureSumInsured }
    else { return (request.ContentSumInsured + request.StructureSumInsured) }
  }
  getPermanentAddressData() {
    if (this.isCorraddSame) {
      let permanent_data = { city_id: this.proTypeForm.additionalInfo.city[0].CityID, state_id: this.proTypeForm.additionalInfo.stateDetails.stateId }
      return permanent_data
    }
    else {
      let city_id = this.pinDataPer.CityList.find((x: any) => x.CityName == this.customerDetailsForm.value.communication_city).CityID;
      let state_id = this.pinDataPer.StateId;
      let permanent_data = { city_id: city_id, state_id: this.pinDataPer.StateId }
      return permanent_data
    }
  }
  getNomineeRelation() {
    this.api.getNomineeRelationList().subscribe((data) => {
      this.NomineeRelationShipList = data.lstNomineeRelationshipResponse;
    });
  }

  callCSCService(proposal_request) {

    // const cityDetails = this.getCityCode(this.currentFormData.city);
    // this.PolicyStartDate = this.datePipe.transform(new Date(), "yyyy-MM-dd"); 
    // var enddate = this.utility.addToDate(new Date(), this.planDetails.formValues.Tenure, "Y"); 
    // var enddate = this.utility.addToDate(enddate, -1, "D"); 
    // this.PolicyEndDate = this.datePipe.transform(enddate, "yyyy-MM-dd");

    var end_date = new Date(this.customerDetailsForm.value.policy_start_date);
    end_date.setFullYear(end_date.getFullYear() + parseInt(this.propInsTypeForm.formValues.tenure));
    var final_end_date = end_date.setDate(end_date.getDate() - 1);
    let policyStartDate = new Date(this.customerDetailsForm.value.policy_start_date).getFullYear() + "-" + (this.getMonth(new Date(this.customerDetailsForm.value.policy_start_date))) + "-" + this.getMyDate(new Date(this.customerDetailsForm.value.policy_start_date).getDate());
    let policyEndDate = new Date(final_end_date).getFullYear() + "-" + (this.getMonth(new Date(final_end_date))) + "-" + this.getMyDate(new Date(final_end_date).getDate());
    // var enddate = this.utility.addToDate(new Date(), this.propInsTypeForm.formValues.tenure, "Y"); 
    // var enddate = this.utility.addToDate(enddate, -1, "D");
    //  this.PolicyEndDate = this.datePipe.transform(enddate, "yyyy-MM-dd");
    let proposalRequest = JSON.parse((this.utility.getLS('proposalRequest')));
    let planType = this.propInsTypeForm ? this.propInsTypeForm.formValues.tenure <= 5 ? 'CHP' : this.propInsTypeForm.formValues.tenure >= 10 ? 'BGR' : '' : '';

    this.SaveHealthPolicyReq.correlation = proposalRequest.CorrelationId || uuid.v4();
    this.SaveHealthPolicyReq.pfProposalNo = this.proposalData.proposalNumber;
    this.SaveHealthPolicyReq.userType = "INDIVIDUAL";
    // this.SaveHealthPolicyReq.noOfAdults = 1;
    // this.SaveHealthPolicyReq.noOfKids = 0
    this.SaveHealthPolicyReq.sumInsured = this.getCSCSI(proposal_request);
    this.SaveHealthPolicyReq.tenure = this.propInsTypeForm.formValues.tenure,
    this.SaveHealthPolicyReq.dealID = this.masterData.DealId;
    this.SaveHealthPolicyReq.policyType = "4"
    this.SaveHealthPolicyReq.subPolicyType = "5";
    this.SaveHealthPolicyReq.policyStartDate = policyStartDate;
    this.SaveHealthPolicyReq.policyEndDate = policyEndDate
    this.SaveHealthPolicyReq.basicPremium = this.planDetails.formValues.basicPremium,
      this.SaveHealthPolicyReq.totalTax = this.planDetails.formValues.totalTax,
      this.SaveHealthPolicyReq.totalPremium = this.planDetails.formValues.totalPremium,
      this.SaveHealthPolicyReq.coverPremium = 0;
    // this.SaveHealthPolicyReq.members[0].memberType = 'Adult',
    //   this.SaveHealthPolicyReq.members[0].titleID = this.customerTitles.find(x => x.val == this.currentFormData.title).id,
    //   this.SaveHealthPolicyReq.members[0].name = this.userDetails.CustName;
    // this.SaveHealthPolicyReq.members[0].relationshipName = "Self"
    // this.SaveHealthPolicyReq.members[0].dob = moment(this.currentFormData.date_of_birth).format('YYYY/MM/DD') || '',
    //   this.SaveHealthPolicyReq.members[0].policyValidFrom = policyStartDate;
    // this.SaveHealthPolicyReq.members[0].policyValidTill = policyEndDate
    // this.SaveHealthPolicyReq.members[0].existingHealthPolicy.insuranceCompany = '';
    // this.SaveHealthPolicyReq.members[0].existingHealthPolicy.isExisting = '';
    // this.SaveHealthPolicyReq.members[0].existingHealthPolicy.member = '';
    // this.SaveHealthPolicyReq.members[0].existingHealthPolicy.typeOfPolicy = '';
    // this.SaveHealthPolicyReq.members[0].existingHealthPolicy.policyDuration = 0;
    // this.SaveHealthPolicyReq.members[0].planID = planType ? planType == 'BGR' ? this.masterData.BGRPlanCode.toString() : planType == 'CHP' ? this.masterData.CHPPlanCode.toString() : '' : '',
    //   this.SaveHealthPolicyReq.members[0].ailments = [];
    // this.SaveHealthPolicyReq.members[0].sumInsuredValue = this.getCSCSI(proposal_request);
    // this.SaveHealthPolicyReq.members[0].sumInsured = this.getCSCSI(proposal_request);

    // this.SaveHealthPolicyReq.ipaddress = environment.HomeBancaIPaddress;
    //  this.SaveHealthPolicyReq.nomineeName = finalData.nominee_name;
    //  this.SaveHealthPolicyReq.nomineeDob = moment(this.insuredDetails.DateOfBirth).format('YYYY/MM/DD') || '',
    //  this.SaveHealthPolicyReq.nomineeRelationShip = this.insuredDetails.RelationshipWithInsured;
    this.SaveHealthPolicyReq.titleId = this.customerTitles.find(x => x.val == this.currentFormData.title).id;
    this.SaveHealthPolicyReq.customerName = this.currentFormData.name;
    this.SaveHealthPolicyReq.customerDOB = this.utility.getDirectDateConversion(this.currentFormData.date_of_birth, 'YYYY-DD-MM'),
      this.SaveHealthPolicyReq.customerType = "INDIVIDUAL";
    this.SaveHealthPolicyReq.emailID = this.customerDetailsForm.value.email;
    this.SaveHealthPolicyReq.mobileNo = this.customerDetailsForm.value.mobile_number;
    this.SaveHealthPolicyReq.address = this.currentFormData.address;
    this.SaveHealthPolicyReq.pincodeID = this.proposalRequest.CustomerDetails.PinCode;
    this.SaveHealthPolicyReq.cityID = this.proposalRequest.CustomerDetails.CityCode;
    this.SaveHealthPolicyReq.stateID = this.proposalRequest.CustomerDetails.StateCode;
    this.SaveHealthPolicyReq.countryId = 100;
    this.SaveHealthPolicyReq.permanentAddress = this.customerDetailsForm.value.communication_address || '';
    this.SaveHealthPolicyReq.permanentAddrPincodeID = this.customerDetailsForm.value.communication_pincode || '';
    this.SaveHealthPolicyReq.permanentAddrStateID = this.getPermanentAddressData().state_id;
    this.SaveHealthPolicyReq.permanentAddrCityID = this.getPermanentAddressData().city_id,
      this.SaveHealthPolicyReq.pfCustomerId = this.proposalData.customerId;
    this.utility.setLS('customerRequest', JSON.stringify(this.SaveHealthPolicyReq));
    if (this.proposalData.status == false) {
      this.utility.showAlertMessage("Alert", this.proposalData.message);
      setTimeout(() => {
        $(".spinner").delay(100).fadeOut(100);
        $(".backdrop").delay(100).fadeOut(100);
      }, 100);
    } else {
      this.api.savePolicyDetails(this.SaveHealthPolicyReq).subscribe((res: any) => {
        if (res.StatusCode == 1) {
          this.utility.setLS("GPASaveHealthPolicyResp", JSON.stringify(res));
          this.utility.setLS('PolicyId', res.PolicyId);
          this.SaveQuoteData();

          // this.utility.showAlertMesaage(res.StatusDesc + '. Your policy no is: ' + res.PolicyId);
          //this.dataSharingService.setSharedFormData(true, 'paymentDetails', 'paymentForm', '');
          // this.router.navigateByUrl('payment');
        }
        else {
          this.utility.showAlertMessage("Alert", res.StatusDesc);
        }
        $(".spinner").delay(100).fadeOut(100);
        $(".backdrop").delay(100).fadeOut(100);
      }, err => {
        this.utility.showAlertMessage("Alert", 'Sorry Something went wrong');
        $(".spinner").delay(100).fadeOut(100);
        $(".backdrop").delay(100).fadeOut(100);
      });
    }

    // if (this.utility.getLS("GSTINDetails") != "") {
    //   this.GSTINDetails = JSON.parse(this.utility.getLS('GSTINDetails')) || [];
    // }
    // if (this.GSTINDetails.isGSTINApplicable) {
    //   if (!this.utility.isFilled(this.GSTINDetails.ConstitutionOfBusinessValue)) {
    //     this.utility.showAlertMessage("Alert", "Please select constitution of business.");
    //     return false;
    //   } else if (!this.utility.isFilled(this.GSTINDetails.GSTCustomerType)) {
    //     this.utility.showAlertMessage("Alert", "Please select customer type.");
    //     return false;
    //   } else if (!this.utility.isFilled(this.GSTINDetails.GSTPANNumber)) {
    //     this.utility.showAlertMessage("Alert", "Please provide PAN Number.");
    //     return false;
    //   } else if (!this.utility.ValidatePAN(this.GSTINDetails.GSTPANNumber.toUpperCase())) {
    //     this.utility.showAlertMessage("Alert", "Please enter valid PAN card no.");
    //     return false;
    //   }
    //   else if (this.GSTINDetails.GSTPANNumber.toUpperCase() == "AAACI7904G") {
    //     this.utility.showAlertMessage("Alert", "You Have Entered ICICI Lombard PAN No. Please Enter Correct PAN card No.");
    //     return false;
    //   }
    //   else if (!this.utility.isFilled(this.GSTINDetails.GSTRegiStatusValue)) {
    //     this.utility.showAlertMessage("Alert", "Please select GST registration status.");
    //     return false;
    //   } else if (!this.utility.isFilled(this.GSTINDetails.GSTInNumber)) {
    //     this.utility.showAlertMessage("Alert", "Please provide GSTIn Number.");
    //     return false;
    //   } else if (!this.utility.validateGST(this.GSTINDetails.GSTInNumber.toUpperCase(), 'gst')) {
    //     this.utility.showAlertMessage("Alert", "Please enter valid GSTIN number in GST section.");
    //     return false;
    //   }
    //   this.proposalRequest.isGSTINApplicable = this.GSTINDetails.isGSTINApplicable;
    //   this.proposalRequest.ConstitutionOfBusinessValue = this.GSTINDetails.ConstitutionOfBusinessValue;
    //   this.proposalRequest.GSTCustomerType = this.GSTINDetails.GSTCustomerType;
    //   this.proposalRequest.GSTRegiStatusValue = this.GSTINDetails.GSTRegiStatusValue;
    //   this.proposalRequest.GSTInNumber = this.GSTINDetails.GSTInNumber.toUpperCase();
    //   this.proposalRequest.GSTPANNumber = this.GSTINDetails.GSTPANNumber.toUpperCase();
    //   this.utility.setLS("GSTINDetails", JSON.stringify(this.GSTINDetails));
    // } else {
    //   this.proposalRequest.isGSTINApplicable = false;
    //   this.GSTINDetails.ConstitutionOfBusinessValue = '';
    //   this.GSTINDetails.GSTCustomerType = '';
    //   this.GSTINDetails.GSTInNumber = '';
    //   this.GSTINDetails.GSTPANNumber = '';
    //   this.GSTINDetails.GSTRegiStatusValue = '';
    //   this.utility.setLS("GSTINDetails", JSON.stringify(this.GSTINDetails));
    // }
  }

  async SaveQuoteData() {


    const policyType = this.getPolicyType().toUpperCase();
    const policyTypeObj = { PolicyType: policyType };
    let policy_type = this.findFormDetails('propInsTypeForm').formValues.propInsType;
    this.PolicyId = this.utility.getLS('PolicyId');
    //let AddonDetails = this.getAddonCovers(this.addonCoverageForm[0], policy_type);
    const cityDetails = this.getCityCode(this.currentFormData.city);
    var end_date = new Date(this.customerDetailsForm.value.policy_start_date);
    end_date.setFullYear(end_date.getFullYear() + parseInt(this.propInsTypeForm.formValues.tenure));
    var final_end_date = end_date.setDate(end_date.getDate() - 1);
    let policyStartDate = new Date(this.customerDetailsForm.value.policy_start_date).getFullYear() + "-" + (this.getMonth(new Date(this.customerDetailsForm.value.policy_start_date))) + "-" + this.getMyDate(new Date(this.customerDetailsForm.value.policy_start_date).getDate());
    let policyEndDate = new Date(final_end_date).getFullYear() + "-" + (this.getMonth(new Date(final_end_date))) + "-" + this.getMyDate(new Date(final_end_date).getDate());
    let proposalRequest = JSON.parse((this.utility.getLS('proposalRequest')));
    let planType = this.propInsTypeForm ? this.propInsTypeForm.formValues.tenure == 5 ? 'CHP' : this.propInsTypeForm.formValues.tenure == 10 ? 'BGR' : '' : '';

    $('#UnderwriterpopupDiv').css({ "display": "none" });
    // this.ADPSavePolicyDetailsRequest.AgentID = this.LoginResponse.Model.EmpNo;
    this.ADPSavePolicyDetailsRequest.Producttype = '4';
    this.ADPSavePolicyDetailsRequest.Policytype = "4";
    this.ADPSavePolicyDetailsRequest.Subproducttype = Constants_SubProductType.Home;
    this.ADPSavePolicyDetailsRequest.ClientType = "11";
    this.ADPSavePolicyDetailsRequest.IpAddress = this.utility.getLS('ipaddress');
    this.ADPSavePolicyDetailsRequest.BasicPremium = this.planDetails.formValues.basicPremium;
    this.ADPSavePolicyDetailsRequest.GST = String(this.planDetails.formValues.totalTax.toFixed(0));
    this.ADPSavePolicyDetailsRequest.TotalPremium = this.planDetails.formValues.totalPremium;

    // this.ADPSavePolicyDetailsRequest.BasicPremium = 25000;
    // this.ADPSavePolicyDetailsRequest.GST = 500;
    // this.ADPSavePolicyDetailsRequest.TotalPremium = 50000;
    this.ADPSavePolicyDetailsRequest.PolicyStartDate = policyStartDate;
    this.ADPSavePolicyDetailsRequest.PolicyEndDate = policyEndDate;
    this.ADPSavePolicyDetailsRequest.PolicyTenure = String(this.propInsTypeForm.formValues.tenure);
    this.ADPSavePolicyDetailsRequest.IsFeedfile = "N";
    this.ADPSavePolicyDetailsRequest.Applicantname = this.proposalRequest.CustomerDetails.CustomerName;
    this.ADPSavePolicyDetailsRequest.Applicantemail = this.customerDetailsForm.value.email
    //this.proposalRequest.CustomerDetails.Email || 
    this.ADPSavePolicyDetailsRequest.Applicantmobile = this.customerDetailsForm.value.mobile_number;
    //this.proposalRequest.CustomerDetails.MobileNumber;
    this.ADPSavePolicyDetailsRequest.Applicantdob = this.proposalRequest.CustomerDetails.DateOfBirth;
    this.ADPSavePolicyDetailsRequest.ApplicantTitle = this.proposalRequest.CustomerDetails.CustomerTitle;
    this.ADPSavePolicyDetailsRequest.ApplicantAddress1 = this.proposalRequest.CustomerDetails.AddressLine1;
    this.ADPSavePolicyDetailsRequest.ApplicantAddress2 = "";
    this.ADPSavePolicyDetailsRequest.ApplicantCity = this.CityName;//this.proposalRequest.CustomerDetails.CityCode;
    this.ADPSavePolicyDetailsRequest.ApplicantState = this.StateName;
    this.ADPSavePolicyDetailsRequest.ApplicantPincode = this.proposalRequest.CustomerDetails.PinCode;
    this.ADPSavePolicyDetailsRequest.NomineeTitle = "";
    this.ADPSavePolicyDetailsRequest.PropertyType = this.proTypeForm.formValues.propType;
    this.ADPSavePolicyDetailsRequest.PropertyPinCode = this.proTypeForm.formValues.house_pincode;
    this.ADPSavePolicyDetailsRequest.PropertyValue = policyType;
    this.ADPSavePolicyDetailsRequest.CostOfConstruction = this.getPlainValue(this.propInsTypeForm.formValues.cost_of_construction) || 0;
    this.ADPSavePolicyDetailsRequest.CarpetArea = this.getPlainValue(this.propInsTypeForm.formValues.carpet_area_in_sq_mtrs) || 0;
    this.ADPSavePolicyDetailsRequest.StructureValue = this.getPlainValue(this.propInsTypeForm.formValues.structure_value);
    // this.ADPSavePolicyDetailsRequest.CoverDetails = AddonDetails;
    this.ADPSavePolicyDetailsRequest.HomeContentElectrical = this.ADPSavePolicyDetailsRequest.HomeContentElectrical ? this.contentData.formValues.durable : "";
    this.ADPSavePolicyDetailsRequest.HomeContentFurniture = this.ADPSavePolicyDetailsRequest.HomeContentFurniture ? this.contentData.formValues.furniture : "";
    this.ADPSavePolicyDetailsRequest.HomeContentOthers = this.ADPSavePolicyDetailsRequest.HomeContentOthers ? this.contentData.formValues.miscellaneous : "";
    this.ADPSavePolicyDetailsRequest.HomeContentValuables = this.ADPSavePolicyDetailsRequest.HomeContentValuables ? this.contentData.formValues.jewellery : "";

    // this.ADPSavePolicyDetailsRequest.ContentData=
    this.ADPSavePolicyDetailsRequest.FinancierName = this.customerDetailsForm.value.financier_name || "";

    // this.ADPSavePolicyDetailsRequest.NomineeName = this.proposalRequest.NomineeDetails.NameOfNominee;
    // this.ADPSavePolicyDetailsRequest.NomineeRelation = this.proposalRequest.NomineeDetails.Relationship;
    // this.ADPSavePolicyDetailsRequest.NomineeDOB = this.proposalRequest.NomineeDetails.NomineeDOB;
    // this.ADPSavePolicyDetailsRequest.NomineeRelationID = ''
    this.ADPSavePolicyDetailsRequest.PolicyID = this.PolicyId;//!this.utility.isUndefinedOrNull(String(this.GPASaveHelthPolicyResponse.PolicyId)) ? String(this.GPASaveHelthPolicyResponse.PolicyId) : "0";
    this.ADPSavePolicyDetailsRequest.PF_PROPOSALNO = this.proposalData.proposalNumber;//!this.utility.isUndefinedOrNull(String(this.GPASaveHelthPolicyResponse.PfProposalNo)) ? String(this.GPASaveHelthPolicyResponse.PfProposalNo) : "0";
    // this.ADPSavePolicyDetailsRequest.RegistrationNo = ""
    // this.ADPSavePolicyDetailsRequest.EngineNo = "";
    // this.ADPSavePolicyDetailsRequest.ChassisNo = "";
    // this.ADPSavePolicyDetailsRequest.RTO = "";
    // this.ADPSavePolicyDetailsRequest.Manufacturer = "";
    // this.ADPSavePolicyDetailsRequest.VehicleModel = "";
    // this.ADPSavePolicyDetailsRequest.CC = "";
    // this.ADPSavePolicyDetailsRequest.VehicleRegistrationDate = null;
    // this.ADPSavePolicyDetailsRequest.YearOfManufacture = null;
    // this.ADPSavePolicyDetailsRequest.AdditionalCovers = "";
    // this.ADPSavePolicyDetailsRequest.IDV = 0;
    this.ADPSavePolicyDetailsRequest.PlanName = this.masterData.PlanName//planType ? planType == 'BGR' ? this.masterData.BGRPlanName : planType == 'CHP' ? this.masterData.CHPPlanName : '' : '',
    this.ADPSavePolicyDetailsRequest.PlanCode = this.masterData.PlanCode//planType ? planType == 'BGR' ? this.masterData.BGRPlanCode.toString() : planType == 'CHP' ? this.masterData.PlanCode.toString() : '' : '',
    this.ADPSavePolicyDetailsRequest.ProductName = this.masterData.productName//planType ? planType == 'BGR' ? "ICICI Bharat Griha Raksha Policy" : planType == 'CHP' ? "Home Insurance" : '' : '',
    // this.ADPSavePolicyDetailsRequest.ProductName = this.GPASaveQuoteResp.productDetails.productName;
    // this.ADPSavePolicyDetailsRequest.PlanName = this.GPASaveQuoteResp.productDetails.planDetails[0].planName;
    this.ADPSavePolicyDetailsRequest.ProductCode = '4202';//this.GPASaveQuoteResp.productDetails.ProductCode;
    // this.ADPSavePolicyDetailsRequest.PlanCode = this.GPASaveQuoteResp.productDetails.planDetails[0].PlanCode;
    this.ADPSavePolicyDetailsRequest.SubLimit = "";
    this.ADPSavePolicyDetailsRequest.SumInsured = this.GPAQuoteRequest.SumInsured == "50L" ? '5000000' : this.GPAQuoteRequest.SumInsured == "75L" ? '7500000' : '10000000';
    this.ADPSavePolicyDetailsRequest.GSTINNo = ''
    // this.ADPSavePolicyDetailsRequest.MobInsureds = Array<MobInsured>();
    this.ADPSavePolicyDetailsRequest.DealID = this.masterData.DealId;//this.utility.getLS("GPADealID");
    // this.ADPSavePolicyDetailsRequest.ISBreakin = "Y";
    // this.ADPSavePolicyDetailsRequest.BreakinID =
    this.ADPSavePolicyDetailsRequest.SPCODE = this.LoginResponse.Model.EmpNo;
    this.ADPSavePolicyDetailsRequest.SPNAME = this.LoginResponse.Model.EmpName;
    this.ADPSavePolicyDetailsRequest.CHANNELNAME = this.LoginResponse.Model.RM_CHANNEL_NAME;
    this.ADPSavePolicyDetailsRequest.CUSTOMERREFERENCENUMBER = this.SaveVendorRequest.CRMLead;
    this.ADPSavePolicyDetailsRequest.PRIMARYRMCODE = this.LoginResponse.Model.EmpNo;
    this.ADPSavePolicyDetailsRequest.SECONDARYRMCODE = this.LoginResponse.Model.MOID;
    this.ADPSavePolicyDetailsRequest.BANCAFIELD01 = "";
    this.ADPSavePolicyDetailsRequest.BANCAFIELD02 = "";
    this.ADPSavePolicyDetailsRequest.BANCAFIELD03 = "";
    // this.ADPSavePolicyDetailsRequest.NoofAdults = '';
    // this.ADPSavePolicyDetailsRequest.NoofChild = '';

    // this.ADPSavePolicyDetailsRequest.IsAddonOne = "N";
    // this.ADPSavePolicyDetailsRequest.IsAffluent = "N";
    // this.ADPSavePolicyDetailsRequest.LEADID = '';

    // for (var i = 0; i < this.MembersArray.length; i++) {
    //   var insureddetail = new MobInsured();
    //   // insureddetail.MobPolicyId= "";
    //   insureddetail.MemberType = "adult";
    //   insureddetail.InsuredTitle = this.MembersArray[i].InsuredTitle;
    //   insureddetail.InsuredName = this.MembersArray[i].InsuredName;
    //   insureddetail.InsuredDOB = this.MembersArray[i].InsuredDOB;
    //   insureddetail.InsuredGender = this.MembersArray[i].InsuredGender;
    //   insureddetail.InsuredRelation = this.MembersArray[i].InsuredRelation;
    //   insureddetail.ISPED = "N";
    //   insureddetail.InnsuredPED = '';
    //   insureddetail.InsuredHeightInFeet = "0";
    //   insureddetail.InsuredHeightInInches = "0";
    //   insureddetail.InsuredWeight = "0";
    //   insureddetail.IsAddonSix = "N";  //(this.Addon6 && insureddetail.MemberType=="Adult") ? "Y" : "N";
    //   this.ADPSavePolicyDetailsRequest.MobInsureds.push(insureddetail);
    // }

    // this.ADPSavePolicyDetailsRequest.Occupation = this.GPAProposalRequest.Occupation;
    // this.ADPSavePolicyDetailsRequest.AnnualIncome = this.ACRRequest.prospectAnnualIncome;
    // this.ADPSavePolicyDetailsRequest.AdditionalInformation = this.ACRRequest.proposalAdditionalDetails;
    this.ADPSavePolicyDetailsRequest.CorrelationId = this.GPAUPPProposalRequest.CorrelationId;
    this.ADPSavePolicyDetailsRequest.CustAccNo = "";
    this.ADPSavePolicyDetailsRequest.PrevYearsPolicyNo = this.utility.getLS("SelfPolicyNumber");
    this.ADPSavePolicyDetailsRequest.Eldest_Member_Age = '';
    this.ADPSavePolicyDetailsRequest.ilkycReferenceNumber = this.KYCResponseModel.api_response.kyc_details.il_kyc_ref_no != "" ? this.KYCResponseModel.api_response.kyc_details.il_kyc_ref_no : "",
      this.ADPSavePolicyDetailsRequest.SkipDedupeLogic = this.KYCResponseModel.user_data.pep_flag == "No" ? false : true,
      this.ADPSavePolicyDetailsRequest.CKYCID = this.KYCResponseModel.api_response.kyc_details.ckyc_number != "" ? this.KYCResponseModel.api_response.kyc_details.ckyc_number : "",
      this.ADPSavePolicyDetailsRequest.pepFlag = this.KYCResponseModel.user_data.pep_flag == "No" ? false : true,
      this.ADPSavePolicyDetailsRequest.EKYCid = "";
    if (!this.utility.isUndefinedOrNull(this.proposalRequest.CustomerDetails.PANCardNo)) {
      this.ADPSavePolicyDetailsRequest.PAN = this.proposalRequest.CustomerDetails.PANCardNo;
    }
    this.ADPSavePolicyDetailsRequest.Master_Policy_Number = '';
    this.utility.setLS("ADPSavePolicyDetailsRequest", JSON.stringify(this.ADPSavePolicyDetailsRequest));

    let SavePromis = new Promise((res, rej) => {
      this.api.SavePolicy(this.ADPSavePolicyDetailsRequest).subscribe(data => {
        try {
          this.ADPSavePolicyDetailsResponse = data;
          if (this.flowtype != "A") {
            this.SendOTP();
          }

          res(0);
        }
        catch (ex) {
          $(".spinner").delay(100).fadeOut(100);
          $(".backdrop").delay(100).fadeOut(100);
          rej();
        }
      }), (error) => {
        // this.utility.showAlertMessage("Alert", "Something went wrong.");
        $(".spinner").delay(100).fadeOut(100);
        $(".backdrop").delay(100).fadeOut(100);
        rej();
      };
    });
    await SavePromis;
    if (this.flowtype == "A") {
      this.router.navigate(['payment']);
    }
    if (this.ADPSavePolicyDetailsResponse && this.ADPSavePolicyDetailsResponse.StatusCode && this.ADPSavePolicyDetailsResponse.StatusCode == 1) {


      this.utility.setLS("ADPSavePolicyDetailsResponse", JSON.stringify(this.ADPSavePolicyDetailsResponse));
      $(".spinner").delay(100).fadeOut(100);
      $(".backdrop").delay(100).fadeOut(100);

    }
    else {
      // this.utility.showAlertMessage("Alert", "Failed to save Quote Data. " + this.SaveQuoteProposalResponse.StatusMsg);
      $(".spinner").delay(100).fadeOut(100);
      $(".backdrop").delay(100).fadeOut(100);
      return;
    }

  }
  showTerms() {
    document.getElementById('termsAndConditions').style.height = '100%';
    //this.onloadscroll();
  }

  closeTerms() {
    document.getElementById('termsAndConditions').style.height = '0%';
  }

  getDeclarationApproval(event: any) {
    this.isUserAgree = !this.isUserAgree;
    console.log(this.isUserAgree);
  }

  getWhatsappConsent(event: any) {
    this.isWhatsappConsent = !this.isWhatsappConsent;
  }

  async SendOTP() {
    //$("#otp-screen").modal("show");
    $(".spinner").delay(100).fadeIn(100);
    $(".backdrop").delay(100).fadeIn(100);

    let otppromiss = new Promise((res, rej) => {
      this.api.GenerateCustConsentOTP(this.ADPSavePolicyDetailsRequest.Applicantmobile, "1" + "").subscribe((data: any) => {
        this.SendOTPResponse = data;
        res(0);

      }, (error: any) => {
        this.utility.showAlertMessage("Alert", "Something went wrong.");
        $(".spinner").delay(100).fadeOut(100);
        $(".backdrop").delay(100).fadeOut(100);
        rej();
      });
    });
    await otppromiss;
    if (this.SendOTPResponse.StatusCode == 1) {
      this.isOtpSent = true;

      this.utility.showAlertMessage("Alert", "OTP sent to entered mobile number");
    } else {
      this.isOtpSent = false;
      if (!this.utility.isUndefinedOrNull(this.SendOTPResponse.StatusMessage)) {
        this.utility.showAlertMessage("Alert", this.SendOTPResponse.StatusMessage);
      }
      else {
        this.utility.showAlertMessage("Alert", "Failed to send OTP");
      }
    }

    $(".spinner").delay(100).fadeOut(100);
    $(".backdrop").delay(100).fadeOut(100);

  }

  async VerifyOtp() {

    // this.OTPtxt=this.currentFormData.OTPtxt;
    if (!this.customerDetailsForm.value.OTPtxt) {
      this.utility.showAlertMessage("Alert", "Please enter OTP");
      return;
    }

    $(".spinner").delay(100).fadeIn(100);
    $(".backdrop").delay(100).fadeIn(100);

    let otppromiss = new Promise((res, rej) => {
      this.api.ValidateOTP(this.ADPSavePolicyDetailsRequest.Applicantmobile, this.SendOTPResponse.AuthCode, this.customerDetailsForm.value.OTPtxt).subscribe((data) => {
        this.VerifyOtpResponse = data;
        res(0);
      }, (error: any) => {
        this.utility.showAlertMessage("Alert", "Something went wrong.");
        $(".spinner").delay(100).fadeOut(100);
        $(".backdrop").delay(100).fadeOut(100);
        rej();
      });
    });

    await otppromiss;
    if (this.VerifyOtpResponse.StatusCode == 1) {
      this.isOtpVerified = true;
      this.router.navigate(['payment']);
    }
    else {
      this.isOtpVerified = false;
      this.utility.showAlertMessage("Alert", "Invalid OTP.");
    }

    $(".spinner").delay(100).fadeOut(100);
    $(".backdrop").delay(100).fadeOut(100);

  }
  GetQuote() {
    var el = document.getElementById('propertyinurance');
    document.querySelector("#propertyinurance").scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'center'
    })

  }
  onloadscroll() {
    $("body").css("overflow", "auto");
  }

}
