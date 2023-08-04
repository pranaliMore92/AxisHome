import { Component, OnInit } from '@angular/core';
import { UtilityserviceService } from 'src/services/utilityservice.service';
import { ProposalResponseModel } from 'src/models/ProposalResponseModel';
import { APIPaymentResponseModel } from 'src/models/APIPaymentResponseModel';
import { BreakinResponseModel } from 'src/models/BreakinModel';
import { RenewalProposalResponseModel } from 'src/models/PolicyRenewalProposalResponse';
import { ApiserviceService } from 'src/services/apiservice.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';
import { HttpHeaders } from '@angular/common/http';
import { CommonPaymentResponseModel } from 'src/models/CommonPaymentModel';
import { Constants_PaymentStatus, Constants_PolicyStatus } from 'src/services/Constants';
import { UpdatePolicyStatusRequestModel } from 'src/models/UpdatePolicyStatusModel';
import { environment } from 'src/environments/environment';
import { retry } from 'rxjs/operators';
import * as  uuid from 'uuid';
declare var $: any;
@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  proposalResponse: ProposalResponseModel = new ProposalResponseModel();
  SaveProposalResponse: APIPaymentResponseModel = new APIPaymentResponseModel();
  RenewalSaveProposalResponse: RenewalProposalResponseModel = new RenewalProposalResponseModel();
  BreakinResponse: BreakinResponseModel = new BreakinResponseModel();
  Breakinmessage: string;
  brkId: string;
  policyEndDate: string;
  policyInceptionDate: string;
  PolicyId: string;
  PfProposalNo: string;
  finalPremium: string;
  CommonPaymentResponse: string;
  showConfirmationDetails: boolean = true;
  paymentConfRes: any; payment_confirmation: any; burglaryConfRes: any;
  IsGPA: string = "false";
  IsPPAP: string;
  FinalAmt: string;
  gpaPolicyNum: any;
  ppapPolicyNum: any;
  paymentRes: CommonPaymentResponseModel = new CommonPaymentResponseModel;
  ChannelSelected: any;
  masterdata: any;
  UpdatePolicyStatusRequest: UpdatePolicyStatusRequestModel = new UpdatePolicyStatusRequestModel();

  constructor(private utility: UtilityserviceService, private serverapi: ApiserviceService, private _router: Router) { }

  async ngOnInit() {
    
    this.CommonPaymentResponse = JSON.parse(this.utility.getLS("CommonPaymentResponse"));
    await this.callPaymentConfirmation(this.CommonPaymentResponse);
    this.paymentRes = JSON.parse(this.utility.getLS("CommonPaymentResponse"));
    this.masterdata = JSON.parse(this.utility.getLS("master_data"));
    this.IsGPA = this.utility.getLS("IsGPA");
    this.IsPPAP = this.utility.getLS("IsPPAP");

    this.FinalAmt = this.utility.getLS("FinalAmtToPay");

    this.Breakinmessage = this.utility.getLS("Breakinmessage");

    if (!this.utility.isUndefinedOrNull(this.utility.getLS("channelType"))) {
      this.ChannelSelected = this.utility.getLS("channelType");
    }

  }

  goToHome() {
    debugger
    //this._router.navigate(["getcustomerdetails"]);
    // let url = "requestpolicy?token=Ivd0fe7XFoWAyG5+jczmuS8u34Kx4p+e&productType=GPA&flowtype=na"; for sanity

    window.location.href = environment.Homelink;


    // if(this.ChannelSelected == 'SME'){
    //   url = "requestpolicy?token=Ivd0fe7XFoWAyG5+jczmuS8u34Kx4p+e&productType=GPA&flowtype=na&channeltype=SME"
    // }
    // else{
    //   url = "requestpolicy?token=Ivd0fe7XFoWAyG5+jczmuS8u34Kx4p+e&productType=GPA&flowtype=na&channeltype=BBG"
    // }

    //this._router.navigateByUrl(url);
  }
  async callPaymentConfirmation(data) {

    this.serverapi.CommonPaymentConfirmationByPID(data.EPaymentID).then(async (res: any) => {
      var datalen = res.ConfirmPolicy.length;

      var policytype = res.ConfirmPolicy[0].PolicyType;
      var subPolicyType = res.ConfirmPolicy[0].PolicySubType;
      if (policytype == "1" && subPolicyType == "1") {
        this.paymentConfRes = res.ConfirmPolicy[0];
        if (datalen > 1) {
          this.IsGPA = "true";
          this.gpaPolicyNum = res.ConfirmPolicy[1];
          if (this.utility.isUndefinedOrNull(this.gpaPolicyNum.PFPolicyNumber)) {
            this.gpaPolicyNum.PFPolicyNumber = "-";

            this.UpdatePolicyStatusRequest.PolicyId = String(this.gpaPolicyNum.PolicyID) || '0';
            this.UpdatePolicyStatusRequest.PaymentStatus = Constants_PaymentStatus.Paid;
            this.UpdatePolicyStatusRequest.PolicyStatus = Constants_PolicyStatus.PolicyIssued;
            await this.SaveStageDetails(this.UpdatePolicyStatusRequest);
          }
        }

      }
      else {

        this.IsGPA = "true";
        this.gpaPolicyNum = res.ConfirmPolicy[0];
        if (this.utility.isUndefinedOrNull(this.gpaPolicyNum.PFPolicyNumber)) {
          this.gpaPolicyNum.PFPolicyNumber = "-";
        }
        if (datalen > 1) {
          this.paymentConfRes = res.ConfirmPolicy[1];
        }
      }

      //email and sms function
      this.serverapi.SendEmailSMSGPA(this.paymentRes.PaymentID).subscribe((data) => {

      });

    });

  }

  // async callPaymentConfirmation(data) {

  //   let CPpromise = new Promise((resp, rej) => {

  //     this.serverapi.CommonPaymentConfirmationByPID(data.EPaymentID).then(async (res: any) => {

  //       var datalen = res.ConfirmPolicy.length;

  //       this.paymentConfRes = res.ConfirmPolicy[0];
  //       console.log(this.paymentConfRes);
  //       //resp(data);

  //     });

  //  });

  //   await CPpromise;

  // }
  async SaveStageDetails(UpdatePolicyStatusRequest: UpdatePolicyStatusRequestModel) {

    let Proposalpromise = new Promise((res, rej) => {
      this.serverapi.UpdatePolicyStatus(UpdatePolicyStatusRequest).subscribe(data => {
        // this.StageDetailsResponse = data;
        res(data);
      }, (error) => {
        // this.utility.showAlertMessage("Alert", "Something went wrong.");
        rej(error);
      });
    });
    await Proposalpromise;
  }
  //   downloadPdf(type: string) {
  //     let downloadURL;
  // // debugger;
  //     if (type == "GPA") {
  //       downloadURL = this.serverapi.pdfDownload('POLICY', this.gpaPolicyNum.EPolicyID);
  //       // console.log(downloadURL);
  //       this.serverapi.save(downloadURL, this.gpaPolicyNum.ProposalNumber + ".pdf");
  //     }

  //   }


  async downloadPdf() {

    let downloadURL;

    let promise = new Promise((res, rej) => {

      $(".spinner").delay(100).fadeIn(100);

      $(".backdrop").delay(100).fadeIn(100);
debugger;
      let requestbody = {

        "CorrelationId": uuid.v4(),

        "policyNo": this.gpaPolicyNum.PFPolicyNo,

        "dealId": this.masterdata.DealId,



      }

      this.serverapi.PolicyPDFToken().subscribe((tokendata) => {

        if (!this.utility.isUndefinedOrNull(tokendata)) {

          this.serverapi.pdfdownloadnew(requestbody, tokendata).subscribe((data: any) => {

            var FieldName = this.gpaPolicyNum.PFPolicyNo + '.pdf';

            this.saveBlob(data, FieldName);

            $(".spinner").delay(100).fadeOut(100);

            $(".backdrop").delay(100).fadeOut(100);

            res(tokendata);

          },

            (error) => {

              $(".spinner").delay(100).fadeOut(100);

              $(".backdrop").delay(100).fadeOut(100);

              this.utility.showAlertMessage("Alert", "Something went wrong while downloading policy document. Please try again.");

              return;

            })

        }

        else {

          $(".spinner").delay(100).fadeOut(100);

          $(".backdrop").delay(100).fadeOut(100);

          this.utility.showAlertMessage("Alert", "Something went wrong while downloading policy document.");

          rej();

        }

      })

    });

    await promise;

    $(".spinner").delay(100).fadeOut(100);

    $(".backdrop").delay(100).fadeOut(100);

    // window.open(downloadURL, "_blank");

    this.utility.showAlertMessage("Success", "Your pdf will be downloaded");

    // this.presentToast('Your pdf will be downloaded');

  }




  saveBlob(file: Blob, filename: string) {

    if (window.navigator.msSaveOrOpenBlob) {

      navigator.msSaveBlob(file, filename);

    } else {

      let filedata = window.URL.createObjectURL(file);

      var a = document.createElement("a");

      a.href = filedata;

      a.download = filename;

      a.target = '_blank';

      document.body.appendChild(a);

      a.click();

    }

  }


}
