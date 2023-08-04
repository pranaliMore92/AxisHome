import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { ADPSummaryDetailsResponseModel } from 'src/models/ADPSummaryDetailsMode';
import { AesEncryptionService } from 'src/services/aes-encryption.service';
import { ApiserviceService } from 'src/services/apiservice.service';
import { Constants_PaymentStatus, Constants_PolicyStatus } from 'src/services/Constants';
import { UtilityserviceService } from 'src/services/utilityservice.service';

@Component({
  selector: 'app-homecustpaymentlink',
  templateUrl: './homecustpaymentlink.component.html',
  styleUrls: ['./homecustpaymentlink.component.css']
})
export class HomecustpaymentlinkComponent implements OnInit {
  policyID: string;
  BasicResponse: any;
  token: string;
  ADPSummaryDetailsResponse: ADPSummaryDetailsResponseModel = new ADPSummaryDetailsResponseModel();
  constructor(public activeRoute: ActivatedRoute, private fb: FormBuilder, public _router: Router, public utility: UtilityserviceService, public apiService: ApiserviceService, public datePipe: DatePipe, public AES_ED: AesEncryptionService) { }

  async ngOnInit() {

    this.activeRoute.queryParams.forEach((params) => {
      this.policyID = params.PolicyId;
    });

    var decryptedValue = this.utility.decode64(this.policyID);
    var queryvalues = decryptedValue.split('#');

     this.token = environment.EncryptedDeal;
    //this.token="/sjTwiwAIUrUSv2gFp80lg==";
    //this.token = environment.EncryptedDeal;
    let BasicPromis = new Promise((res, rej) => {
      this.apiService.GetDealAgentMasterData(this.token).subscribe((data) => {
        //this.vendorresponse = data;
        this.BasicResponse = data;
        res(data);
      }, (error) => {
        this.utility.showAlertMessage("Alert", "Something went wrong.");
        rej();
      });
    });
    await BasicPromis

    if (this.BasicResponse.StatusCode == 1) {
      this.utility.setLS("basic", this.BasicResponse.Basic);
      this.utility.setLS("encryptedDeal", this.token);
      this.utility.setLS("ipaddress", environment.HomeBancaIPaddress);

      let PolicyPromis = new Promise((res, rej) => {
        this.apiService.GetSummaryDetails(queryvalues[0]).subscribe((data) => {
          this.ADPSummaryDetailsResponse = data;
          this.utility.setLS("EncryptedPolID", queryvalues[0]);
          res(data);
        }, (error) => {
          this.utility.showAlertMessage("Alert", "Something went wrong.");
          rej();
        });
      });
      await PolicyPromis;

      if (this.ADPSummaryDetailsResponse && this.ADPSummaryDetailsResponse.StatusCode == 1) {

        if (this.ADPSummaryDetailsResponse.PaymentStatus == Constants_PaymentStatus.Paid || this.ADPSummaryDetailsResponse.PolicyStatus == Constants_PolicyStatus.PolicyIssued) {
          this.utility.showAlertMessage("Alert", "Link has been expired");
          return;
        }

        this.utility.setLS("CustomerLink", "1");

        this.utility.setLS("ADPSummaryDetailsResponse", JSON.stringify(this.ADPSummaryDetailsResponse));
        this._router.navigate(["customersummary"]);

      }
      else {
        if (this.ADPSummaryDetailsResponse.StatusMsg != "" && this.ADPSummaryDetailsResponse.StatusDesc != "") {
          this.utility.showAlertMessage("Alert", this.ADPSummaryDetailsResponse.StatusDesc);
          return;
        }
        else {
          this.utility.showAlertMessage("Alert", "No insured details found");
          return;
        }
      }
    }

  }
}
