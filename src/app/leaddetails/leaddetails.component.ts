import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponseModel } from 'src/models/LoginModel';
import { SaveVendorRequestModel } from 'src/models/VendorModel';
import { ApiserviceService } from 'src/services/apiservice.service';
import { UtilityserviceService } from 'src/services/utilityservice.service';

@Component({
  selector: 'app-leaddetails',
  templateUrl: './leaddetails.component.html',
  styleUrls: ['./leaddetails.component.css']
})
export class LeaddetailsComponent implements OnInit {
  RMCode: string = "";
  CRMLead: string = "";
  ChannelSelected: string = "BBG";
  channelType: string = "";
  ChannelSelectedd : string;
  SaveVendorRequest: SaveVendorRequestModel = new SaveVendorRequestModel();
  LoginResponse: LoginResponseModel = new LoginResponseModel();
  constructor(public _router: Router, public utility: UtilityserviceService, public apiService: ApiserviceService, private datePipe: DatePipe) { }

  ngOnInit() {
    if (!this.utility.isUndefinedOrNull(this.utility.getLS("SaveVendorRequest"))) {
      this.SaveVendorRequest = JSON.parse(this.utility.getLS("SaveVendorRequest"));
      this.CRMLead = this.SaveVendorRequest.CRMLead;
    }
    if (!this.utility.isUndefinedOrNull(this.utility.getLS("SPCODE"))) {
      this.RMCode = this.utility.getLS("SPCODE");
    }
    this.utility.setLS('sharedFormData',"");

    if (!this.utility.isUndefinedOrNull(this.utility.getLS("LoginResponse"))) {
      this.LoginResponse = JSON.parse(this.utility.getLS("LoginResponse"));
    }
    this.ChannelSelectedd = this.LoginResponse.Model.RM_CHANNEL_NAME;
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.utility.CheckFieldsContent();
    }, 100);

    this.utility.setLS("RMCode", (this.RMCode).trim());
    this.utility.setLS("CRMLead", (this.CRMLead).trim());
    this.utility.setLS("ChannelSelected", this.ChannelSelected);
    if (this.utility.isUndefinedOrNull(this.RMCode)) {
      this.utility.showAlertMessage("Alert", "Please enter Referral code");
      return;
    } else if (this.utility.isUndefinedOrNull(this.CRMLead)) {
      this.utility.showAlertMessage("Alert", "Please enter CRM lead");
      return;
    } else if (this.utility.isUndefinedOrNull(this.ChannelSelected)) {
      this.utility.showAlertMessage("Alert", "Please select channel");
      return;
    } else {
      this._router.navigate(['getcustomerdetails']);
    }
  }

}
