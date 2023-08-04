import { DatePipe, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ADPSummaryDetailsResponseModel } from 'src/models/ADPSummaryDetailsMode';
import { SendOTPResponseModel, VerifyOtpResponseModel } from 'src/models/OTPModel';
import { usermodel } from 'src/models/usermodel';
import { AesEncryptionService } from 'src/services/aes-encryption.service';
import { ApiserviceService } from 'src/services/apiservice.service';
import { Constants_SubProductType } from 'src/services/Constants';
import { UtilityserviceService } from 'src/services/utilityservice.service';
declare var $: any;

@Component({
  selector: 'app-customer-summary',
  templateUrl: './customer-summary.component.html',
  styleUrls: ['./customer-summary.component.css']
})
export class CustomerSummaryComponent implements OnInit {
  CustomerLink: string;
  ADPSummaryDetailsResponse: ADPSummaryDetailsResponseModel = new ADPSummaryDetailsResponseModel();
  IsGPA: string = 'false';
  isOtpSent: boolean = false;
  termsCondition: boolean = true;
  isOtpVerified: boolean = false;
  SendOTPResponse: SendOTPResponseModel = new SendOTPResponseModel();
  VerifyOtpResponse: VerifyOtpResponseModel = new VerifyOtpResponseModel();
  OTPtxt: string = "";
  flowtype: string;
  isDownloaded: boolean = false;
  UserData: usermodel = new usermodel();
  CoverDetails: any;

  constructor(public activeRoute: ActivatedRoute, private fb: FormBuilder, public _router: Router, public utility: UtilityserviceService, public apiService: ApiserviceService, public datePipe: DatePipe, public AES_ED: AesEncryptionService) { }

  ngOnInit() {
    setTimeout(() => {
      $(".spinner").delay(100).fadeIn(100);
      $(".backdrop").delay(100).fadeIn(100);
    }, 100);

    // this.utility.eventCapture("", "", 'Customer link clicked', 60);

    this.CustomerLink = this.utility.getLS('CustomerLink');
    if (this.CustomerLink == '1') {
      this.flowtype = 'NA_CUST';
      this.utility.setLS("flowtype", this.flowtype);
    }
    this.ADPSummaryDetailsResponse = JSON.parse(this.utility.getLS("ADPSummaryDetailsResponse"));
    this.UserData.Email = this.ADPSummaryDetailsResponse.Applicantemail;
    this.UserData.CustName = this.ADPSummaryDetailsResponse.Applicantname;
  
    this.UserData.MobileNo = this.ADPSummaryDetailsResponse.Applicantmobile;
    this.utility.setLS("userdetails", JSON.stringify(this.UserData));
     this.ADPSummaryDetailsResponse=JSON.parse(this.utility.getLS("ADPSummaryDetailsResponse"));
     //console.log(this.ADPSummaryDetailsResponse.CoverDetails.split(','));
     
    if (this.ADPSummaryDetailsResponse.Subproducttype == Constants_SubProductType.Home) {
      this.IsGPA = 'true';
      this.utility.setLS("IsGPA", this.IsGPA);
    }
    setTimeout(() => {
      $(".spinner").delay(100).fadeOut(100);
      $(".backdrop").delay(100).fadeOut(100);
    }, 100);
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
  ngAfterViewInit() {
    setTimeout(() => {
      this.utility.CheckFieldsContent();
    }, 100);
  }
  async HFdownloadPdfBiztalk(PolicyNo: any, ProposalNo: any) {
    let encryptedPolicyno = "";
    $(".spinner").delay(100).fadeIn(100);

    $(".backdrop").delay(100).fadeIn(100);

    let policypromise = new Promise((res, rej) => {
      this.apiService.EncryptDealID(PolicyNo).subscribe(data => {
        encryptedPolicyno = data;
        res(0);
      }), (error) => {
        rej(0);
      };

    });
    await policypromise;

    // await this.generateGenericPDFToken("esbpolicypdf");

    let Tokenpromise = new Promise((res, rej) => {
      this.apiService.HFgeneratePDF(encryptedPolicyno).subscribe(data => {
        //  console.log(data);
        try {
          var fileName = ProposalNo + '.pdf';
          this.utility.saveBlob(data, fileName);
          this.isDownloaded = true;
          res(0);
        }
        catch (ex) {
          this.isDownloaded = false;
          res(0);
        }

      }), (error) => {
        this.isDownloaded = false;
        res(0);
      };

    });
    await Tokenpromise;
    if (this.isDownloaded) {
      this.SendOTP();
    }
    $(".spinner").delay(100).fadeOut(100);
    $(".backdrop").delay(100).fadeOut(100);

  }
  async ProceedToPayment() {
    this.SendOTP();
    // this.HFdownloadPdfBiztalk(this.ADPSummaryDetailsResponse.PolicyID, this.ADPSummaryDetailsResponse.PF_PROPOSALNO);

  }
  async SendOTP() {
    //$("#otp-screen").modal("show");
    $(".spinner").delay(100).fadeIn(100);
    $(".backdrop").delay(100).fadeIn(100);

    let otppromiss = new Promise((res, rej) => {
      this.apiService.GenerateCustConsentOTP(this.ADPSummaryDetailsResponse.Applicantmobile, "1" + "").subscribe((data: any) => {
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
      this.isDownloaded = true;
      this.utility.showAlertMessage("Alert", "OTP sent to entered mobile number");
    } else {
      this.isOtpSent = false;
      this.isDownloaded = false;
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
    if (this.utility.isUndefinedOrNull(this.OTPtxt)) {
      this.utility.showAlertMessage("Alert", "Please enter OTP");
      return;
    }

    $(".spinner").delay(100).fadeIn(100);
    $(".backdrop").delay(100).fadeIn(100);

    let otppromiss = new Promise((res, rej) => {
      this.apiService.ValidateOTP(this.ADPSummaryDetailsResponse.Applicantmobile, this.SendOTPResponse.AuthCode, this.OTPtxt).subscribe((data) => {
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
      this._router.navigate(['payment']);
    }
    else {
      this.isOtpVerified = false;
      this.utility.showAlertMessage("Alert", "Invalid OTP.");
    }

    $(".spinner").delay(100).fadeOut(100);
    $(".backdrop").delay(100).fadeOut(100);

  }

}
