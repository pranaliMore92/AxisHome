import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityserviceService } from '../../services/utilityservice.service';
import { razorpayResponseModel } from 'src/models/razorpayModel';
import { environment } from '../../environments/environment'
import { CommonPaymentResponseModel } from '../../models/CommonPaymentModel'
import { PaymentTaggingModel } from 'src/models/PaymentTaggingModel';
import { ApiserviceService } from 'src/services/apiservice.service';

declare var $: any
@Component({
  selector: 'app-razor-pay-fallback',
  templateUrl: './razor-pay-fallback.component.html',
  styleUrls: ['./razor-pay-fallback.component.css']
})
export class RazorPayFallbackComponent implements OnInit {
  razorPayData: razorpayResponseModel;
  CPresponse: CommonPaymentResponseModel;
  data: any
  BreakingFlag:string;
  PaymentTagData: PaymentTaggingModel=new PaymentTaggingModel();
  constructor(private utilityService: UtilityserviceService,private _router: Router,private service: ApiserviceService) { }

  async ngOnInit() {
    $(".spinner").delay(100).fadeIn(100);
    $(".backdrop").delay(100).fadeIn(100);

    this.BreakingFlag = this.utilityService.getLS("BreakingFlag");
    this.CPresponse = JSON.parse(this.utilityService.getLS("CommonPaymentResponse"));

    this.razorPayData = JSON.parse(this.utilityService.getLS('razorPayData'));
    this.data = {
      "iPaymentID": this.CPresponse.PaymentID,
      "PaymentID": this.razorPayData.razorpay_payment_id,
      "OrderID": this.razorPayData.razorpay_order_id,
      "Signature": this.razorPayData.razorpay_signature
    }
    //console.log("RazorPayData = ", this.data);


    // if (this.BreakingFlag == "1") {
      this.PaymentTagData.iPaymentID = this.CPresponse.PaymentID;
      this.PaymentTagData.PaymentID = this.razorPayData.razorpay_payment_id;
      this.PaymentTagData.OrderID = this.razorPayData.razorpay_order_id;
      this.PaymentTagData.Signature = this.razorPayData.razorpay_signature;

      let resp: string;
      let promise = new Promise((res, rej) => {
        try {
          this.service.PaymentTagging(this.PaymentTagData).subscribe((data) => {
            //console.log('data :' + data);
            resp = data;
            //console.log('response:' + resp)
            this.utilityService.setLS("PayProcessResponse",JSON.stringify(resp));
            res(resp);
          }, (error) => {
            this.utilityService.showAlertMessage("Alert", "Something went wrong.");
            //res();
          });
        }
        catch (e) {
          this.utilityService.showAlertMessage("Alert", "Something went wrong.");
          rej(e);
        }
      });
      await promise;
      $(".spinner").delay(100).fadeOut(100);
      $(".backdrop").delay(100).fadeOut(100);
      this._router.navigate(["paymentsuccess"]);


    // } else {
    //   var selfcontext = this;
    //   setTimeout(function () {
    //     selfcontext.postRequest();
    //   }, 3000);

    // }

  }
  postRequest() {
    $(".spinner").delay(100).fadeIn(100);
    $(".backdrop").delay(100).fadeIn(100);
    var paymentURL = environment.RazorPayUrl;
    this.post(paymentURL + 'PaymentGateway/MotorRazorPayPaymentProcess', this.data, "post");
  }

  post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.
    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);

        form.appendChild(hiddenField);
      }
    }
    document.body.appendChild(form);
    form.submit();
  }
}
