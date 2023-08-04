import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { usermodel } from 'src/models/usermodel';
import { VendorResponseModel } from 'src/models/VendorDataModel';
import { WhatsAppInOutRequest, WhatsAppInOutResponse } from 'src/models/WhatsAppInOutModel';
import { ApiserviceService } from 'src/services/apiservice.service';
import { UtilityserviceService } from 'src/services/utilityservice.service';
declare var $: any;

@Component({
  selector: 'app-customer-lead',
  templateUrl: './customer-lead.component.html',
  styleUrls: ['./customer-lead.component.css']
})
export class CustomerLeadComponent implements OnInit {

  userModel: usermodel = new usermodel();
  WhatsappConcent: boolean;
  WhatsAppRequest: WhatsAppInOutRequest = new WhatsAppInOutRequest;
  WhatsAppResponse: WhatsAppInOutResponse = new WhatsAppInOutResponse;
  error: any;
  constructor(public utilityservice: UtilityserviceService, public _serverapiService: ApiserviceService, public _router: Router) { }

  ngOnInit() {
      // this.utilityservice.setLS('IsKYCPopUpOpened',"false")
    // localStorage.removeItem('KYC_customerDetails');
    //  this.utilityservice.setLS('KYC_customerDetails',"");
    
    this.utilityservice.setLS('sharedFormData',"");
   
    if (!this.utilityservice.isUndefinedOrNull(this.utilityservice.getLS('userdetails'))) {
      this.userModel = JSON.parse(this.utilityservice.getLS('userdetails'))
    }
    this.error = new FormGroup({
      Nameerr: new FormControl(),
      Emailerr: new FormControl(),
      MobileNoerr: new FormControl(),
    });
    $("#CustBoarding").modal('hide');
    $('#aryaModalbody').empty();
    $('.arya-modal').remove();
    $('.arya-il-modal-backdrop').remove();
    $('body').removeClass("arya-il-modal-open");
   
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.utilityservice.CheckFieldsContent();
    }, 100);
  }
  toggleWhatsappinout() {
    if (this.WhatsappConcent == true) {
      this.WhatsappConcent = false;
    } else {
      this.WhatsappConcent = true;
    }
  }
  saveUserDetails(): void {

    try {
      // debugger;
      var CustName = this.userModel.CustName;
      var mobno = this.userModel.MobileNo;
      var emailid = this.userModel.Email;

      this.userModel.Deal = this.utilityservice.getLS("dealID");

      this.error.Nameerr = "";
      this.error.Emailerr = "";
      this.error.MobileNoerr = "";

      if (this.utilityservice.isUndefinedOrNull(CustName)) {
        this.error.Nameerr = "Please enter full name";
        return;
      }
      else if (!this.utilityservice.isAlpha(CustName)) {
        this.error.Nameerr = "Please enter valid name."
        return;
      }
      else if (this.utilityservice.isUndefinedOrNull(mobno)) {
        this.error.MobileNoerr = "Please enter mobile no.";
        return;
      }
      else if (!this.utilityservice.isPhone(mobno)) {
        this.error.MobileNoerr = "Please enter vaild mobile no.";
        return;
      }
      else if (mobno.indexOf("0") == 0) {
        this.error.MobileNoerr = "Mobile number can not start with 0.";
        return;
      }
      else if (this.utilityservice.isUndefinedOrNull(emailid)) {
        this.error.Emailerr = "Please enter email id.";
        return;
      }
      else if (!this.utilityservice.isEmailValid(emailid)) {
        this.error.Emailerr = "Please enter vaild email id.";
        return;
      }
      else if ((emailid.lastIndexOf(".") - emailid.lastIndexOf("@")) < 3) {
        this.utilityservice.showAlertMessage("Alert", "Please enter vaild email id.");
        return;
      }

      else {

        var token = this.utilityservice.getLS("encryptedDeal");
        if (!this.utilityservice.isUndefinedOrNull(token)) {
          this._serverapiService.getBasicAuth(token).subscribe((data) => {
            // debugger;
            this.utilityservice.setLS("basic", data.Basic);
            // if (this.GpaLocationList.DealList.find(x => x.STORE_NAME.toUpperCase() == this.LocationName.toUpperCase())) {
            $(".spinner").delay(100).fadeIn(100);
            $(".backdrop").delay(100).fadeIn(100);
            //this.utilityservice.setLS("StoreName", this.LocationName);
            //Save Whatsapp concent
            if (this.WhatsappConcent == true) {
              this.WhatsAppRequest.Mode = "in"
            }
            else {
              this.WhatsAppRequest.Mode = "out"
            }
            this.WhatsAppRequest.MobileNo = mobno;

            this.utilityservice.setLS("WhatsappInOut", this.WhatsAppRequest.Mode);
            this._serverapiService.Whatsapp_INOUT(this.WhatsAppRequest).subscribe((data) => {
              if (data.StatusCode == "1") {
                this.utilityservice.setLS("WhatsAppInOutRequest", JSON.stringify(this.WhatsAppRequest));
              }
            },
              (error) => {
                this.utilityservice.showAlertMessage("Alert", "Something went wrong while saving whatsapp concent. Please try again.");
                return;
              });

            this._serverapiService.GetAgentMappedDeals().subscribe((data1) => {
              if (data1 != null && data1.Motor != null && data1.Motor.FourWheelerDealId != "") {

                this.utilityservice.setLS("ipaddress", environment.HomeBancaIPaddress);

                let venres = new VendorResponseModel();
                //Submit user details
                if (environment.apiUrl.indexOf("bancakrgapiUAT") >= 0) {
                  this.utilityservice.setLS("userdetails", JSON.stringify(this.userModel));
                  $(".spinner").delay(100).fadeOut(100);
                  $(".backdrop").delay(100).fadeOut(100);
                  this._router.navigate(["home"]);
                }
                else {
                  this._serverapiService.submitVendorData(this.userModel).subscribe((data) => {
                    venres = data;
                    if (data.StatusCode == "1") {

                      this.utilityservice.setLS("userdetails", JSON.stringify(this.userModel));

                      $(".spinner").delay(100).fadeOut(100);
                      $(".backdrop").delay(100).fadeOut(100);

                      this._router.navigate(["home"]);
                    }
                  },
                    (error) => {
                      $(".spinner").delay(100).fadeOut(100);
                      $(".backdrop").delay(100).fadeOut(100);
                      this.utilityservice.showAlertMessage("Alert", "Something went wrong. Please try again.");
                      return;
                    });
                }
              }
              else {
                $(".spinner").delay(100).fadeOut(100);
                $(".backdrop").delay(100).fadeOut(100);
                //console.log("faild in agent mapped deal");
              }
            },
              (error) => {
                $(".spinner").delay(100).fadeOut(100);
                $(".backdrop").delay(100).fadeOut(100);

              });

          });
        }

      }
    }
    catch (e) {
      $(".spinner").delay(100).fadeOut(100);
      $(".backdrop").delay(100).fadeOut(100);
      this.utilityservice.showAlertMessage("Alert", "Something went wrong.");
    }
  }
}
