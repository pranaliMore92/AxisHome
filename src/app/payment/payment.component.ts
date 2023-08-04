import { Component, OnInit, NgZone } from '@angular/core';
import { UtilityserviceService } from 'src/services/utilityservice.service';
import { CommonPaymentResponseModel, CommonPaymentRequestModel } from 'src/models/CommonPaymentModel';
import { usermodel } from 'src/models/usermodel';
import { ActivatedRoute, Router } from '@angular/router';
import { RenewalProposalResponseModel } from 'src/models/PolicyRenewalProposalResponse';
import { ProposalResponseModel } from 'src/models/ProposalResponseModel';
import { PaymentTaggingModel } from 'src/models/PaymentTaggingModel';
import { ApiserviceService } from 'src/services/apiservice.service';
import { APIPaymentResponseModel } from 'src/models/APIPaymentResponseModel';
import { PPAPSaveEditPraposalResponse } from 'src/models/PPAPSaveEditPraposalRequest';
import { SaveGPAHelthPolicyResponse } from 'src/models/GPASaveHelthPolicyRequest';
import { CreateGPAPraposalResponse, GPACalPremiumResponse } from 'src/models/GPACalPremiumRequestModel';
import { environment } from 'src/environments/environment';
import { SendPaymentLinkRequestModel, SendPaymentLinkResponseModel } from 'src/models/SendPaymentLinkRequestModel';
import { Constants_PaymentStatus, Constants_PolicyStatus, Constants_SubProductType } from 'src/services/Constants';
import { ADPSavePolicyDetailsRequestModel } from 'src/models/ADPSavePolicyDetails';
import { AesEncryptionService } from 'src/services/aes-encryption.service';
import { UpdatePolicyStatusRequestModel } from 'src/models/UpdatePolicyStatusModel';
import { ADPSummaryDetailsResponseModel } from 'src/models/ADPSummaryDetailsMode';
declare var Razorpay: any;
declare var $: any;
declare var RazorpayCheckout: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  premiumAmount: string;
  CommonPayResData: CommonPaymentResponseModel;
  UserData: usermodel;
  BreakingFlag: string;
  PaymentTagData: PaymentTaggingModel;
  premiumAmountNumber: number;
  ADPSavePolicyDetailsRequest: ADPSavePolicyDetailsRequestModel = new ADPSavePolicyDetailsRequestModel();
  CPresponse: CommonPaymentResponseModel = new CommonPaymentResponseModel;
  CPrequest: CommonPaymentRequestModel = new CommonPaymentRequestModel;
  apiPaymentResponse: APIPaymentResponseModel;
  IsGPA: string;
  IsPPAP: string;
  PPAPData: PPAPSaveEditPraposalResponse = new PPAPSaveEditPraposalResponse;
  GPAData: SaveGPAHelthPolicyResponse = new SaveGPAHelthPolicyResponse;
  flowType: string = "na";
  sendVia: string = "E";
  customerLink: string;
  GPAUPPProposalRequest: any;
  error: any;
  linkSMSattempt: any;
  linkEmailattempt: number;
  SendPaymentLinkRequest: SendPaymentLinkRequestModel = new SendPaymentLinkRequestModel();
  SendPaymentLinkResponse: SendPaymentLinkResponseModel = new SendPaymentLinkResponseModel();
  GPASaveQuoteResp: GPACalPremiumResponse = new GPACalPremiumResponse();
  UpdatePolicyStatusRequest: UpdatePolicyStatusRequestModel = new UpdatePolicyStatusRequestModel();
  ADPSummaryDetailsResponse: ADPSummaryDetailsResponseModel = new ADPSummaryDetailsResponseModel();
  PolicyId: string;
  // proposalRequest:

  constructor(private utility: UtilityserviceService, private _router: Router, private _NgZone: NgZone, private service: ApiserviceService, public aes: AesEncryptionService) { }

  ngOnInit() {
    // setTimeout(function () {
    this.flowType = this.utility.getLS("flowtype");
    this.BreakingFlag = this.utility.getLS("BreakingFlag");
    this.customerLink = this.utility.getLS("CustomerLink");
    if (this.utility.getLS("userdetails") != "") {
      this.UserData = JSON.parse(this.utility.getLS("userdetails"));
    }

    if (this.customerLink == '1') {
      this.ADPSummaryDetailsResponse = JSON.parse(this.utility.getLS("ADPSummaryDetailsResponse"));
      console.log(this.ADPSummaryDetailsResponse.Applicantemail);

      this.GPASaveQuoteResp.basicPremium = this.ADPSummaryDetailsResponse.BasicPremium;
      this.GPASaveQuoteResp.totalPremium = this.ADPSummaryDetailsResponse.TotalPremium;
      this.GPASaveQuoteResp.totalTax = this.ADPSummaryDetailsResponse.GST;
      // this.UserData.Email = this.ADPSummaryDetailsResponse.Applicantemail;
      // this.UserData.CustName = this.ADPSummaryDetailsResponse.Applicantname;
      // this.UserData.MobileNo = this.ADPSummaryDetailsResponse.Applicantmobile;

    } 
    else if(this.utility.getLS("ADPSavePolicyDetailsRequest") != ""){
      this.ADPSavePolicyDetailsRequest = JSON.parse(this.utility.getLS("ADPSavePolicyDetailsRequest"));
      this.GPASaveQuoteResp.basicPremium = this.ADPSavePolicyDetailsRequest.BasicPremium;
      this.GPASaveQuoteResp.totalPremium = this.ADPSavePolicyDetailsRequest.TotalPremium;
      this.GPASaveQuoteResp.totalTax = this.ADPSavePolicyDetailsRequest.GST;
      this.GPAUPPProposalRequest = JSON.parse(this.utility.getLS("proposalRequest"));
    }
    else {
      this.GPAUPPProposalRequest = JSON.parse(this.utility.getLS("proposalRequest"));
      if (this.utility.getLS("ADPSavePolicyDetailsRequest") != "") {
        
      }
      var proRes = this.utility.getLS("proposalResponse");
      if (proRes != '') {
        //this.proposalRequest = this.utility.getLS("proposalRequest")
        var proposalResponse: CreateGPAPraposalResponse = JSON.parse(proRes);
        //this.premiumAmount = this.utility.ConvertToIndCurrency(String(proposalResponse.Premium.FinalPremium));
        this.premiumAmount = this.GPAUPPProposalRequest.PaymentAmount;//this.utility.getLS("FinalAmtToPay");
        //  this.premiumAmountNumber = Number(proposalResponse.gctotalpremium);
      }
      this.GPASaveQuoteResp = JSON.parse(this.utility.getLS("proposalRequest"));
      document.addEventListener('resume', this.onResume, false);
      setTimeout(() => {

        this.IsGPA = this.utility.getLS("IsGPA");
        if (this.IsGPA == "true") {
          var gpaproresp: SaveGPAHelthPolicyResponse = new SaveGPAHelthPolicyResponse;
          gpaproresp = JSON.parse(this.utility.getLS("GPASaveHealthPolicyResp"));
          if (gpaproresp != null) {
            this.utility.showAlertMessage("Proposal Details", "Proposal No Is : " + gpaproresp.PfProposalNo);
          }
        }
        else {
          var twproresp: APIPaymentResponseModel = new APIPaymentResponseModel;
          twproresp = JSON.parse(this.utility.getLS("APIBeforePaymentResponse"));
          if (twproresp != null) {
            this.utility.showAlertMessage("Proposal Details", "Your Two Wheeler Proposal No Is: " + twproresp.PfProposalNo);
          }
        }
      }, 3000);
    }

  }
  ShowSendLinkPopup() {
    $('#linkModal').modal("show");
    // $('#linkModal').css({ "display": "block", "background": "rgba(0, 0, 0, 0.6)" });
  }
  CloseSendLinkPopup() {
    $('#linkModal').modal("hide");
    // $('#linkModal').css({ "display": "none" });
  }
  sendViaClicked(selection) {
    if (selection == "email") {
      this.sendVia = "E";
    } else {
      this.sendVia = "M";
    }

    setTimeout(() => {
      this.utility.CheckFieldsContent();
    }, 100);
  }

  async sendPaymentLink() {
    if(this.customerLink == "1"){
      this.ADPSummaryDetailsResponse = JSON.parse(this.utility.getLS("ADPSummaryDetailsResponse"));
      var policyid = "";
      policyid = this.ADPSummaryDetailsResponse.PolicyID + "";   
    }
    else{
    this.GPAData = JSON.parse(this.utility.getLS("GPASaveHealthPolicyResp"));
    var policyid = "";
    policyid = this.GPAData.PolicyId + "";
    }
    await this.OtherPaymentOption(7, 'link');//.then(async () => {
    var mobileno = this.GPAUPPProposalRequest.CustomerDetails.MobileNumber;
    var emailid = this.GPAUPPProposalRequest.CustomerDetails.Email;

    if (this.linkSMSattempt >= environment.LinkSendingMaxLimit && this.sendVia == "M") {
      this.utility.showAlertMessage("Alert", "You have exceeded maximum limit for sending payment link on SMS. Please try after some time.");

      var self = this;
      setTimeout(function () {
        self.linkSMSattempt = 0;
      }, environment.LinkWaitTime);
      return;
    }

    if (this.linkEmailattempt >= environment.LinkSendingMaxLimit && this.sendVia == "E") {
      this.utility.showAlertMessage("Alert", "You have exceeded maximum limit for sending payment link on email. Please try after some time.");

      var self = this;
      setTimeout(function () {
        self.linkEmailattempt = 0;
      }, environment.LinkWaitTime);
      return;
    }

    if (this.sendVia == "M") {
      if (!this.utility.isFilled(mobileno) || mobileno.length != 10) {
        this.utility.showAlertMessage("Alert", "Enter valid mobile number.");
        return;
      }
      else if (mobileno.indexOf("0") == 0) {
        this.utility.showAlertMessage("Alert", "Enter valid mobile number. Mobile number can not start with 0.");
        return;
      }
    }
    else if (this.sendVia == "E") {

      if (!this.utility.isFilled(emailid)) {
        this.utility.showAlertMessage("Alert", "Enter email address.");
        return;
      }
      else if (!this.utility.isEmailValid(emailid)) {
        this.utility.showAlertMessage("Alert", "Please Enter valid email address.");
        return;
      }
      else if ((emailid.lastIndexOf(".") - emailid.lastIndexOf("@")) < 3) {
        this.utility.showAlertMessage("Alert", "Please Enter valid email address.");
        return;
      }

    }

    if (this.utility.isUndefinedOrNull(policyid)) {
      this.utility.showAlertMessage("Alert", "Policy ID is required.");
      return;
    }

    $(".spinner").delay(100).fadeIn(100);
    $(".backdrop").delay(100).fadeIn(100);

    this.SendPaymentLinkRequest.EmailID = emailid;
    this.SendPaymentLinkRequest.IsRazorPay = "true"
    this.SendPaymentLinkRequest.MobileNo = mobileno;
    this.SendPaymentLinkRequest.PolicyID = policyid;
    this.SendPaymentLinkRequest.RequestType = "";

    if (this.sendVia == "E") {

      let LinkPromis = new Promise((res, rej) => {
        this.service.SendPaymentlinkMail(this.SendPaymentLinkRequest, this.ADPSavePolicyDetailsRequest.Subproducttype).subscribe(async data => {
          try {
            this.SendPaymentLinkResponse = data;

            // this.utility.eventCapture('', '', 'Payment Link Sent.', 40);

            res(0);
          }
          catch (ex) {
            $(".spinner").delay(100).fadeOut(100);
            $(".backdrop").delay(100).fadeOut(100);
            this.utility.showAlertMessage("Alert", "Something went wrong.");
            rej();
          }
        }, (error) => {
          $(".spinner").delay(100).fadeOut(100);
          $(".backdrop").delay(100).fadeOut(100);
          this.utility.showAlertMessage("Alert", "Something went wrong.");
        });
      });
      await LinkPromis;
    } else {

      let LinkPromis = new Promise((res, rej) => {
        this.service.SendPaymentlinkSMS(this.SendPaymentLinkRequest, this.ADPSavePolicyDetailsRequest.Subproducttype).subscribe(async data => {
          try {
            this.SendPaymentLinkResponse = data;

            //this.utility.eventCapture('', '', 'Payment Link Sent.', 40);

            res(0);
          }
          catch (ex) {
            this.utility.showAlertMessage("Alert", "Something went wrong While sending SMS.");
            rej();
          }
        }, (error) => {
          this.utility.showAlertMessage("Alert", "Something went wrong While sending SMS.");
          $(".spinner").delay(100).fadeOut(100);
          $(".backdrop").delay(100).fadeOut(100);
        });
      });
      await LinkPromis;
    }

    if (this.SendPaymentLinkResponse != null && !this.utility.isUndefinedOrNull(this.SendPaymentLinkResponse.CustomerLinkURL)) {
      $('#linkModal').modal("hide");
      this.utility.showAlertMessage("Alert", "Payment link sent successfully.");

      if (this.sendVia == "E") {
        this.linkEmailattempt = this.linkEmailattempt + 1;
      } else if (this.sendVia == "M") {
        this.linkSMSattempt = this.linkSMSattempt + 1;
      }

      this.UpdatePolicyStatusRequest.PolicyId = String(policyid);
      this.UpdatePolicyStatusRequest.PaymentStatus = Constants_PaymentStatus.PendingForCustomerVerificationAndPayment;
      this.UpdatePolicyStatusRequest.PolicyStatus = Constants_PolicyStatus.WaitingForPayment;
      await this.SaveStageDetails(this.UpdatePolicyStatusRequest);

      this.utility.setLS('linkSMSattempt', String(this.linkSMSattempt));
      this.utility.setLS('linkEmailattempt', String(this.linkEmailattempt));
    }
    else {
      $('#linkModal').modal("hide");
      this.utility.showAlertMessage("Alert", "Something went wrong while sending link.");
    }

    $(".spinner").delay(100).fadeOut(100);
    $(".backdrop").delay(100).fadeOut(100);
    // })
  }
  NavigateBack() {
    // if (this.customerLink == '1') {
    //   this._router.navigate(["home"]);
    // } else {
    //   this._router.navigate(["home"]);
    // }
    window.location.href = environment.Homelink;
  }

  async SaveStageDetails(UpdatePolicyStatusRequest: UpdatePolicyStatusRequestModel) {

    let Proposalpromise = new Promise((res, rej) => {
      this.service.UpdatePolicyStatus(UpdatePolicyStatusRequest).subscribe(data => {
        // this.StageDetailsResponse = data;
        res(0);
      }, (error) => {
        // this.utility.showAlertMessage("Alert", "Something went wrong.");
        res(0);
      });
    });
    await Proposalpromise;
  }

  goToRazorPaymentPortal = function (orderId, publicKey, type, produtType) {
    var selfRef = this;
    var desc = "ICICI Lombard - " + produtType + " Insurance";
    var options = {
      description: desc,
      image: 'https://www.icicilombard.com/mobile/mclaim/images/favicon.ico',
      currency: 'INR',
      key: publicKey,
      order_id: orderId,
      method: {
        netbanking: {
          //order: ["SCBL"]
          order: ["ICIC", "HDFC", "SBIN", "UTIB", "IDFB", "IBKL"]
        }
      },
      handler:
        (response) => {
          this.successCallback(response);
        },
      //            name: 'All Risk',
      prefill: {
        email: this.UserData.Email,
        contact: this.UserData.MobileNo,
        name: this.UserData.CustName,
        method: type
      },
      theme: {
        color: '#E04844',
        hide_topbar: false
      }
    };

    var rzp1 = new Razorpay(options);
    rzp1.open();

  }

  async successCallback(success) {
    //console.log(success);
    this.utility.setLS('razorPayData', JSON.stringify(success));
    this._NgZone.run(() => this._router.navigate(["razorpayfallback"]));
  }

  cancelCallback(error) {
    alert('Payment cancelled. Please try again.');
  }
  onResume(event) {
    //console.log(event);
    RazorpayCheckout.on('payment.success', this.successCallback(event))
    RazorpayCheckout.on('payment.cancel', this.cancelCallback(event))
    RazorpayCheckout.onResume(event);
  }

  async OtherPaymentOption(index, type) {

    if(this.customerLink == "1"){
      this.ADPSummaryDetailsResponse = JSON.parse(this.utility.getLS("ADPSummaryDetailsResponse"));
      var policyid = "";
      policyid = this.ADPSummaryDetailsResponse.PolicyID + "";   
    }
    else{
    this.GPAData = JSON.parse(this.utility.getLS("GPASaveHealthPolicyResp"));
    var policyid = "";
    policyid = this.GPAData.PolicyId + "";
    }
    this.PolicyId = policyid;
    this.IsGPA = this.utility.getLS("IsGPA");
    this.IsPPAP = this.utility.getLS("IsPPAP");
    $(".spinner").delay(100).fadeIn(100);
    $(".backdrop").delay(100).fadeIn(100);

    this.CPrequest.GatewayReturnURL = "";
    this.CPrequest.IPAddress = this.utility.getLS("ipaddress"); //"IPARTNER-MSITE-SCB";
    this.CPrequest.ModeID = 0;
    this.CPrequest.PayerType = "Customer";
    this.CPrequest.PaymentMode = index == 7 ? "CUSTOMERPAYMENTLINK" : "RAZORPAY";

    if (this.customerLink == '1') {
      this.CPrequest.PolicyIDs = this.PolicyId;//String(this.ADPSummaryDetailsResponse.PolicyID);
    } else {

      if (this.IsGPA == "true") {
        this.GPAData = JSON.parse(this.utility.getLS("GPASaveHealthPolicyResp"));
        this.CPrequest.PolicyIDs = this.PolicyId;//String(this.GPAData.PolicyId);
      }
      else {
        this.CPrequest.PolicyIDs = this.PolicyId; //String(this.apiPaymentResponse.PolicyId);
      }
    }

    this.CPrequest.TransType = "POLICY_PAYMENT";
    this.CPrequest.UserRole = "AGENT";

    let CPPromise = new Promise((res, rej) => {
      try {
        this.service.CommonPayment(this.CPrequest).subscribe((data) => {
          this.CPresponse = data;
          res(data);
          //console.log("Common payment successful");
        });
      } catch (e) {
        rej(e);
        this.utility.showAlertMessage("Alert", "Something went wrong.");
        $(".spinner").delay(100).fadeOut(100);
        $(".backdrop").delay(100).fadeOut(100);
        return;
      }
    });
    await CPPromise;
    if (this.CPresponse != null && !this.utility.isUndefinedOrNull(this.CPresponse.PaymentID) && this.CPresponse.PaymentID != "0") {
      this.utility.setLS("CommonPaymentRequest", JSON.stringify(this.CPrequest));
      this.utility.setLS("CommonPaymentResponse", JSON.stringify(this.CPresponse));

      $(".spinner").delay(100).fadeOut(100);
      $(".backdrop").delay(100).fadeOut(100);
      if (index != 7) {
        let orderId = this.CPresponse.RazorOrderID;
        let publicKey = this.CPresponse.PublicKey;
        let productType = 'Home';
        // this._router.navigate(['payment']);
        this.goToRazorPaymentPortal(orderId, publicKey, type, productType)
      }
    }
    else {
      this.utility.showAlertMessage("Alert", "Failed to create common payment");
      $(".spinner").delay(100).fadeOut(100);
      $(".backdrop").delay(100).fadeOut(100);
      return;
    }
  }

}
