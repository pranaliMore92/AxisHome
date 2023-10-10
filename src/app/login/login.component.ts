import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AesEncryptionService } from 'src/services/aes-encryption.service';
import { ApiserviceService } from 'src/services/apiservice.service';
import { UtilityserviceService } from 'src/services/utilityservice.service';
import { LoginResponseModel } from 'src/models/LoginModel';
import { Constants_SubProductType } from 'src/services/Constants';
import { SaveVendorRequestModel } from 'src/models/VendorModel';
import { SPDetailsModel } from 'src/models/ProposalRequestModel';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  motorVehicletype: string;
  TIMESTAMP: string;
  SPCODE: string;
  token: string;
  ProductCode: string;
  flowtype: string;
  CRMLead: string;
  LoginResponse: LoginResponseModel = new LoginResponseModel();
  SaveVendorRequest: SaveVendorRequestModel = new SaveVendorRequestModel();

  constructor(public activeRoute: ActivatedRoute, public _router: Router, public _serverapiService: ApiserviceService, private _utilityservice: UtilityserviceService, public AES_ED: AesEncryptionService) { }

  async ngOnInit() {

    if (!this._utilityservice.isUndefinedOrNull(this._utilityservice.getLS('AxisLeadDetails'))) {
      let AxisLeadDetails: SPDetailsModel = new SPDetailsModel();
      AxisLeadDetails = JSON.parse(this._utilityservice.getLS("AxisLeadDetails"));
      sessionStorage.clear();
      this._utilityservice.setLS('AxisLeadDetails', JSON.stringify(AxisLeadDetails));
    } else {
      sessionStorage.clear();
    }
    await this._utilityservice.getPolicyPlanDetails();
    this.activeRoute.queryParams.forEach((params) => {
      console.log(params);

      this.SPCODE = params.SPCode;
    });
    // this.activeRoute.queryParams.forEach((params) => {
    //   this.TIMESTAMP = params.TS;
    // });
    this.activeRoute.queryParams.forEach((params) => {
      this.ProductCode = params.ProductCode;
    });
    this.activeRoute.queryParams.forEach((params) => {
      this.flowtype = params.flowtype;
      this.CRMLead = params.CRMLead;
    });

    this.SPCODE = this.AES_ED.decrypt(this._utilityservice.decode64(this.SPCODE));
    this.ProductCode = this.AES_ED.decrypt(this._utilityservice.decode64(this.ProductCode));
    this.SaveVendorRequest.CRMLead = this.AES_ED.decrypt(this._utilityservice.decode64(this.CRMLead));

    this.flowtype = this.AES_ED.decrypt(this._utilityservice.decode64(this.flowtype));
    if (this.ProductCode == '23') {
      this._utilityservice.setLS("ProductType", "GPA");
      this._utilityservice.setLS("ChannelSelected", "BBG");

    }
    this._utilityservice.setLS("SPCODE", this.SPCODE);
    this._utilityservice.setLS("ipaddress", environment.HomeBancaIPaddress);
    this._utilityservice.setLS("SaveVendorRequest", JSON.stringify(this.SaveVendorRequest));
    let GetSPDetails = new Promise((res, rej) => {
      try {
        this._serverapiService.YB_GetSpDetails(this.AES_ED.encrypt(this.SPCODE), this.AES_ED.encrypt('axis')).subscribe(data => {
          this.LoginResponse = data;
          this._utilityservice.setLS('LoginResponse', JSON.stringify(this.LoginResponse));

          res(0);
        }, (error) => {
          this._utilityservice.showAlertMessage("Alert", "Something went wrong.");
          rej();
        });
      }
      catch (e) {
        this._utilityservice.showAlertMessage("Alert", "Something went wrong.");
        rej(e);
      }
    });
    await GetSPDetails;
    if (this.LoginResponse.StatusCode == 1) {

      this.token = this.LoginResponse.Model.RetailHomeDealEncrypted;
      //this.token="/sjTwiwAIUrUSv2gFp80lg==";
      let BasicPromis = new Promise((res, rej) => {
        this._serverapiService.getBasicAuth(this.token).subscribe((data) => {
          //this.vendorresponse = data;
          if (data.StatusCode == 1) {
            this._utilityservice.setLS("basic", data.Basic);
            this._utilityservice.setLS("encryptedDeal", this.token);
          }
          res(0);
        }, (error) => {
          this._utilityservice.showAlertMessage("Alert", "Something went wrong.");
          rej();
          return;
        });
      });
      await BasicPromis;

      let EDPromis = new Promise((res, rej) => {
        this._serverapiService.getDecryptedDeal(this.token).subscribe((data) => {
          if (!this._utilityservice.isUndefinedOrNull(data)) {

            this._utilityservice.setLS("ipaddress", environment.HomeBancaIPaddress);
            this._utilityservice.setLS("dealID", data)

            res(0);
          }
          else {
            this._utilityservice.showAlertMessage("Alert", "Failed to decrypt Deal");
            res(0);
            return;
          }
        }, (error) => {
          this._utilityservice.showAlertMessage("Alert", "Failed to decrypt Deal");
          res(0);
          return;
        });
      });
      await EDPromis;

      this._utilityservice.setLS('EditQuote', "0");
      this._utilityservice.setLS("flowtype", this.flowtype);
      // await this._utilityservice.getPolicyPlanDetails();

      if (this.flowtype == "A") {
        this._router.navigate(["home"]);
      }
      else {
        // this._utilityservice.setLS("SaveVendorRequest", "");
        this._router.navigate(["getcustomerdetails"]);
        // this._router.navigate(["leaddetails"]);
      }

    }
    else {
      this._utilityservice.showAlertMessage("Alert", "Could not find SP details.");
    }
  }

}
