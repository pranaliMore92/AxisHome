import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { stringify } from 'querystring';
import { environment } from 'src/environments/environment';
import { ProductPolicyDetails } from 'src/models/PolicyDetails';
declare var bootbox: any;
declare var $: any;
declare let ga: Function;
@Injectable({
  providedIn: 'root'
})
export class UtilityserviceService {
  returnVal: string;
  Policy_PlanDetails: ProductPolicyDetails = new ProductPolicyDetails();
  um: any;
  flowtype: string;
  masterData: any;
  constructor() { }

  CheckFieldsContent() {
    var inputs;
    inputs = document.getElementsByTagName('input');
    for (var index = 0; index < inputs.length; ++index) {
      var curr = inputs[index];
      if ($(curr).val() != '') {
        $(curr).addClass('filled');
        $(curr).parents('.input-field').addClass('focused');
      }
    }

    var selectbox = document.getElementsByTagName('select');
    for (index = 0; index < selectbox.length; ++index) {
      var curr1 = selectbox[index];
      if ($(curr1).val() != '') {
        $(curr1).addClass('filled');
        $(curr1).parents('.input-field').addClass('focused');
      }
    }

    $(document).ready(function () {
      $('.input-field input, select').focus(function () {
        $(this).parents('.input-field').addClass('focused');
      });

      $('.input-field input, select').blur(function () {
        var inputValue = $(this).val();
        if (inputValue == "") {
          $(this).removeClass('filled');
          $(this).parents('.input-field').removeClass('focused');
        } else {
          $(this).addClass('filled');
        }
      });
    });
  }
  eventCapture(eventCategory: string, mobileNo: string, eventOccured: string, eventValue: number) {

    if (eventCategory == '') {

      eventCategory = this.getLS("GPADealID");

    }

    if (mobileNo == '') {

      mobileNo = this.getUserMobileNo();

    }
    console.log(eventOccured, eventValue);

    ga('send', 'event', {

      'eventCategory': '' + eventCategory + '',

      'eventAction': '' + mobileNo + '',

      'eventLabel': eventOccured == null || eventOccured == '' ? null : '' + eventOccured + '',

      'eventValue': eventValue == null ? 0 : '' + eventValue + ''

    });

  }

  validateUIN(gst: string) {

    var re = /^[0-9]{4}[A-Z]{3}[0-9]{5}[A-Z]{3}$/;
    // var re = /^[0-9]{2}[0-9]{2}[A-Z]{3}[0-9]{5}[A-Z]{3}$/;
    // var re = /^[0-9]{4}[A-Z]{3}[0-9]{5}[UO]{1}[N][A-Z0-9]{1}$/;

    let gstvalid = re.test(gst.toUpperCase());

    if (gstvalid) {
      let gstcodeObtained = gst.substring(0, 2);
      let stateData = JSON.parse(this.getLS('selectedStateData'));
      let gstcode = stateData.GSTStateCode;
      if (parseInt(gstcodeObtained) == parseInt(gstcode)) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return gstvalid;
    }
  }
  getUserMobileNo() {

    this.um = JSON.parse(this.getLS("userdetails"));

    if (this.um != undefined) {

      return this.um.MobileNo;

    }

    else {

      return "";

    }

  }
  isFilled(str: string): boolean {
    if (str == undefined || str == '' || str == null) {
      return false;
    }
    else {
      return true;
    }
  }

  setLS(key: string, value: string): boolean {
    // window.localStorage.setItem(key, value);
    window.sessionStorage.setItem(key, value);
    return true;
  }

  getLS(key: string): string {
    // this.returnVal = window.localStorage.getItem(key);
    this.returnVal = window.sessionStorage.getItem(key);
    if (this.isFilled(this.returnVal)) {
      return this.returnVal;
    }
    else {
      return '';
    }
  }
  getDirectDateConversion(date, format) {
    return moment(date).format(format)
  }
  showAlertMessage(title: string, msg: string) {
    // $('#ModalAlert').css({ "display": "block", "background": "rgba(0, 0, 0, 0.6)" });
    // $('#AlertMessage').html(msg);

    // $('.modal').modal('hide');

    // $('.modal-backdrop').hide();
    bootbox.hideAll();
    bootbox.alert({
      title: title,
      message: msg,
      backdrop: false,
    });
    // alert(msg);
  }

  getFullMonth() {
    var month = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
    return month;
  }

  getFormattedDate(date, type = "") {
    date = new Date(date);
    var month = this.getFullMonth();
    var dd = date.getDate();
    var mmm = date.getMonth();
    var yyyy = Math.abs(date.getFullYear());
    if (type == "")
      return dd + '-' + month[mmm] + '-' + yyyy;
    else if (type == "dd/MM/yyyy")
      return dd + '-' + mmm + 1 + '-' + yyyy;

  }

  getPolicyDate(date) {
    return this.getFormattedDate(date, "dd/MM/yyyy")
  }
  displayIndianCurrency(price) {
    price = new Number(price);
    price.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
    });
    return price
  }

  getCurrentDateInShowingFormat(isPrev: boolean): string {
    //var month = this.getFullMonth(); 
    let d = new Date();
    if (isPrev) {
      d.setFullYear(Math.abs(d.getFullYear()) - 1);
    }
    var result = this.getFormattedDate(d, "");

    return result;
  }
  
  public async getPolicyPlanDetails() {
    this.flowtype = this.getLS("flowtype");
   
    // localStorage.removeItem("Policy_PlanDetails");
    if (environment.apiUrl.indexOf("bancakrgapiUAT") >= 0) {
      fetch("assets/jsondata/DataUat.json", { method: "GET" })
        .then(data => data.json())
        .then(res => {
          this.Policy_PlanDetails = res.filter(a => a.ProductType.toLowerCase() == this.getLS("ProductType").toLowerCase())[0];
          this.setLS("Policy_PlanDetails", JSON.stringify(this.Policy_PlanDetails));
          // if(this.isUndefinedOrNull(this.getLS("Policy_PlanDetails"))){
          //   this.showAlertMessage("Alter","Invalid link");
          //   window.location.href="/#/";
          // }
        });
    }
    
    else if (environment.apiUrl.indexOf("cldilbancaapp01") >= 0 ) {
      fetch("assets/jsondata/DataAxisLive.json", { method: "GET" })
        .then(data => data.json())
        .then(res => {
          this.setLS("master_data", JSON.stringify(res));
          
          // this.Policy_PlanDetails = res.filter(a => a.ProductType.toLowerCase() == this.getLS("ProductType").toLowerCase())[0];
          this.setLS("Policy_PlanDetails", JSON.stringify(this.Policy_PlanDetails));
          
          // if(this.isUndefinedOrNull(this.getLS("Policy_PlanDetails"))){
          //   this.showAlertMessage("Alter","Invalid link");
          //   window.location.href="/#/";
          // }
        });
        // debugger;
    } else {
      // if (environment.bankName == "HDFC") {
      //   fetch("assets/jsondata/DataLive.json", { method: "GET" })
      //     .then(data => data.json())
      //     .then(res => {
      //       debugger;
      //       this.Policy_PlanDetails = res.filter(a => a.ProductType.toLowerCase() == this.getLS("ProductType").toLowerCase())[0];
      //       this.setLS("Policy_PlanDetails", JSON.stringify(this.Policy_PlanDetails));
      //       //  if(this.isUndefinedOrNull(this.getLS("Policy_PlanDetails"))){
      //       //   this.showAlertMessage("Alter","Invalid link");
      //       //   window.location.href="/#/";
      //       // }
      //     });
      // }
      // debugger;
        fetch("assets/jsondata/DataAxisSanity.json", { method: "GET" })
          .then(data => data.json())
          .then(res => {

            this.setLS("master_data", JSON.stringify(res));

            //  if(this.isUndefinedOrNull(this.getLS("Policy_PlanDetails"))){
            //   this.showAlertMessage("Alter","Invalid link");
            //   window.location.href="/#/";
            // }
          });
      

    }
  }
 
  orderBy(value: any[], propertyName: string): any[] {
    if (propertyName && value.length > 0) {
      value.sort((a: any, b: any) => a[propertyName].localeCompare(b[propertyName]));

      return value;
    }
    else
      return value;
  }

  addToDate(date: Date, val: number, type: string): Date {

    var year = Math.abs(date.getFullYear());
    var month = date.getMonth();
    var day = date.getDate();
    //To go 18 years back
    if (type == "Y")
      date = new Date(year + val, month, day);
    else if (type == "M")
      date = new Date(year, month + val, day);
    else if (type == "D")
      date = new Date(year, month, day + val);

    return date;
  }

  //added by mugdha
  //common functions
  isUndefinedOrNull(val: string) {
    return val === null || val == "" || val == "undefined" || val == "null" || val == undefined;
  }
  isUndefined(val: string) {
    return val == "";
  }
  alpha: RegExp = /^[a-zA-Z\s]+$/;
  email: RegExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  phone: RegExp = /^[0-9]{10}$/;
  name: RegExp = /^[-'a-zA-Z\s]+$/; //[-'a-zA-Z]  // /^[a-zA-Z]+(?:(?:\. |[' ])[a-zA-Z]+)*/;

  isAlpha(val: string) {
    if (!this.alpha.test(val)) {
      return false;
    }
    else {
      return true;
    }
  }

  isValidName(val: string) {
    if (!this.name.test(val)) {
      return false;
    }
    else {
      return true;
    }
  }

  isPhone(val: string) {
    if (!this.phone.test(val)) {
      return false;
    }
    else {
      return true;
    }
  }

  isEmailValid(val: string) {
    if (!this.email.test(val)) {
      return false;
    }
    else {
      return true;
    }
  }
  convertStringtoCurrency(input) {
    if (!this.isUndefinedOrNull(input)) {
      
      var currencySymbol = '₹';
      //var output = Number(input).toLocaleString('en-IN');   <-- This method is not working fine in all browsers!           
      var result = input.toString().split('.');
      var lastThree = result[0].substring(result[0].length - 3);
      var otherNumbers = result[0].substring(0, result[0].length - 3);
      if (otherNumbers != '')
        lastThree = ',' + lastThree;
      var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
      if (result.length > 1) {
        // output += "." + result[1];
      }
      return output;
    }
  }
  ConvertToIndCurrency(val: string) {
    val = String(val);
    if (val.includes('.')) {
      return Number(val).toLocaleString('en-IN') + '';
    }
    else {
      return Number(val).toLocaleString('en-IN') + '.00';
    }

  }

  calcDayDiff(date1, date2): number {
    var Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates 
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    //To display the final no. of days (result) 
    //console.log("Total number of days between dates  <br>"
    // + date1 + "<br> and <br>"
    // + date2 + " is: <br> "
    // + Difference_In_Days);
    return Difference_In_Days;
  }

  ValidatePAN(PANNo): boolean {
    if (PANNo != "") {
      var ObjVal = PANNo;
      var panPattern = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
      var matchArray = ObjVal.match(panPattern);

      if (matchArray == null) {
        return false;
      }

      return true;
    }
  }
  camelCase(str) {
    return str
      .replace(/\s(.)/g, function (a) {
        return a.toUpperCase();
      })
      .replace(/\s/g, '')
      .replace(/^(.)/, function (b) {
        return b.toLowerCase();
      });
  }

  getAge(DOB) {
    var today = new Date();
    var birthDate = new Date(DOB);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age = age - 1;
    }
    return age;
  }

  ConvertStringToDate(ddmmyy) {
    if (ddmmyy.indexOf('-') > -1)
      var parts = ddmmyy.split('-');
    else if (ddmmyy.indexOf('/') > -1)
      var parts = ddmmyy.split('/');
    else if (ddmmyy.indexOf(' ') > -1)
      var parts = ddmmyy.split(' ');
    // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
    // January - 0, February - 1, etc.
    var month = parts[1];
    if (isNaN(month)) {
      var montharr = this.getFullMonth();
      //console.log(montharr + "" + month);
      month = month.toLowerCase();
      month = month[0].toUpperCase() + month.slice(1);
      month = montharr.indexOf(month);
    } else {
      month = month - 1;
    }

    var mydate = new Date(parts[2], month, parts[0]);
    //console.log(ddmmyy + "---to---" + mydate);
    return mydate;

  }

  calcYearDiff(dt2, dt1) {

    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60 * 24);
    var yeardiff = Math.abs(Math.floor(diff / 365.25));
    return yeardiff;

  }

  initializeFormGroup() {
    $('input').attr('autocomplete', 'off');

    $('input, select, option').focus(function () {
      $(this).parents('.form-group').addClass('focused');
    });

    $('input, select, option').blur(function () {
      var inputValue = $(this).val();
      if (inputValue && $(this).hasClass('hasDatepicker')) {
        if ($(this).hasClass('alwaysOpen') == true) {
          if (inputValue == "") {
            $(this).removeClass('filled');
          } else {
            $(this).addClass('filled');
          }
        }
        else {
          if (inputValue == "") {
            $(this).removeClass('filled');
            $(this).parents('.form-group').removeClass('focused');
          } else {
            $(this).addClass('filled');
            $(this).parents('.form-group').addClass('focused');
          }
        }

        // this.checkIfControlFilled();
      } else {
        if ($(this).hasClass('alwaysOpen') == true) {
          if (inputValue == "") {
            $(this).removeClass('filled');
          } else {
            $(this).addClass('filled');
          }
        }
        else {
          if (inputValue == "") {
            $(this).removeClass('filled');
            $(this).parents('.form-group').removeClass('focused');
          } else {
            $(this).addClass('filled');
            $(this).parents('.form-group').addClass('focused');
          }
        }
        // this.checkIfControlFilled();
      }
    })

    var inputs;
    inputs = document.getElementsByTagName('input');
    for (var index = 0; index < inputs.length; ++index) {
      var curr = inputs[index];
      if ($(curr).val() != '') {
        $(curr).addClass('filled');
        $(curr).parents('.form-group').addClass('focused');
      }
    }

    var selectbox = document.getElementsByTagName('select');
    for (index = 0; index < selectbox.length; ++index) {
      var curr1 = selectbox[index];
      if ($(curr1).val() != '') {
        $(curr1).addClass('filled');
        $(curr1).parents('.form-group').addClass('focused');
      }
    }

  }

  keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv" + "wxyz0123456789+/" + "=";
  encode64(input) {
    input = escape(input);
    var output = "";
    var chr1, chr2, chr3 = 0;
    var enc1, enc2, enc3, enc4 = 0;
    var i = 0;
    do {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output + this.keyStr.charAt(enc1) + this.keyStr.charAt(enc2) + this.keyStr.charAt(enc3) + this.keyStr.charAt(enc4);
      chr1 = chr2 = chr3 = 0;
      enc1 = enc2 = enc3 = enc4 = 0;
    } while (i < input.length);

    return encodeURIComponent(output);
  }

  decode64(input) {
    var output = "";
    var chr1, chr2, chr3 = 0;
    var enc1, enc2, enc3, enc4 = 0;
    var i = 0;
    /* remove all characters that are not A-Z, a-z, 0-9, +, /, or = */
    var base64test = /[^A-Za-z0-9\+\/\=]/g;
    if (base64test.exec(input)) {
      // alert("There were invalid base64 characters in the input text.\n" + "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" + "Expect errors in decoding.");
    }
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    do {
      enc1 = this.keyStr.indexOf(input.charAt(i++));
      enc2 = this.keyStr.indexOf(input.charAt(i++));
      enc3 = this.keyStr.indexOf(input.charAt(i++));
      enc4 = this.keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
      chr1 = chr2 = chr3 = 0;
      enc1 = enc2 = enc3 = enc4 = 0;
    } while (i < input.length);
    return unescape(output);
  }

  GenerateRandomString() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let rnd = Math.random().toString(36).substring(2, 15);
    var altpolicyno = 'I';
    for (var i = 28; i > 0; i--) {
      altpolicyno +=
        chars[Math.floor(Math.random() * chars.length)];
    }
    return altpolicyno;
  }

  saveBlob(file: Blob, fileName: string) {
    // // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    // //   window.navigator.msSaveBlob(file, fileName);
    // //   return;
    // // }
    let fileData = window.URL.createObjectURL(file);
    var a = document.createElement("a");
    a.href = fileData;
    a.download = fileName;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
  }
  validateGST(gst: string, flag: any) {
    if (flag == 'gst') {
      var re = /^[0-9]{2}[A-Z]{3}[PCHABGJLEFT][A-Z][0-9]{4}[A-Z]{1}[0-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
      // var re = /^[0-9]{2}[A-Z]{3}[PCHABGJLEFT][A-Z][0-9]{4}[A-Z]{1}[0-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
    }
    else if (flag == 'uin') {
      var re = /^[0-9]{4}[A-Z]{3}[0-9]{5}[A-Z]{3}$/;
      // var re = /^[0-9]{2}[0-9]{2}[A-Z]{3}[0-9]{5}[A-Z]{3}$/;
      // var re = /^[0-9]{4}[A-Z]{3}[0-9]{5}[UO]{1}[N][A-Z0-9]{1}$/;
    }
    else {
      // var re = /^[0-9]{2}[0-9]{2}[A-Z]{3}[0-9]{5}[A-Z]{3}$/;
      var re = /^[0-9]{4}[A-Z]{3}[0-9]{5}[UO]{1}[N][A-Z0-9]{1}$/;
    }


    let gstvalid = re.test(gst.toUpperCase());
    return gstvalid;
  }
}
