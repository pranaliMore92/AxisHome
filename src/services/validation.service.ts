import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { exit } from 'process';
import { UtilityserviceService } from './utilityservice.service';
@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  errorMessages = [
    {
      validator: 'required',
      msg: '{} is required'
    },
    {
      validator: 'whitespace',
      msg: '{} is required'
    },
    {
      validator: 'pattern',
      msg: '{} is invalid'
    },
    {
      validator: 'minlength',
      msg: 'please check the minimum length for {}'
    },
    {
      validator: 'maxlength',
      msg: 'please check the maximum length for {}'
    },
    {
      validator: 'nonZero',
      msg: '{} should not be zero'
    },
    {
      validator: 'matDatepickerMin',
      msg: '{} is invalid'
    },
    {
      validator: 'matDatepickerMax',
      msg: '{} is invalid'
    }
  ];
  formErrors = [];
  constructor(private utility: UtilityserviceService) { }
  isUndefinedORNull(data: any) {
    if (data === undefined || data == null || data.length <= 0) {
      return true;
    } else {
      return false;
    }
  }

  validateEmailAddress(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateMobile(mobile) {
    var mob = /^[6-9]\d{9}$/;
    return mob.test(mobile);
  }

  validatepanCard(val) {
    if (val != '' && val != undefined && val != null) {
      if (new RegExp('[A-Z]{5}[0-9]{4}[A-Z]{1}').test(val)) {
        return true;
      }
      return false;
    }
    else { return true; }
  }
  aadhaarValidationfunction(val) {
    if (val != '' && val != undefined && val != null) {
      if (new RegExp('[0-9]{12}').test(val.toString()) && val.toString().length == 12) {
        return true;
      }
      return false;
    }
    else {
      return true;
    }

  }
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  alphaOnly(event: any): boolean {
    const key = event.keyCode;
    return ((key >= 65 && key <= 90) || key == 8 || key == 9 || key == 32);
  }

  isLeadFormValid(form) {
    if (this.isUndefinedORNull(form.value.name)) {
      this.utility.showAlertMessage("Alert", 'Please enter full name'); return false;
    }
    else if (this.isUndefinedORNull(form.value.mobile_no)) {
      this.utility.showAlertMessage("Alert", 'Please enter a valid mobile number'); return false;
    }
    else if (form.value.mobile_no.toString().length != 10) {
      this.utility.showAlertMessage("Alert", 'Please enter a valid mobile number'); return false;
    }
    else if (!this.validateMobile(form.value.mobile_no.toString())) {
      this.utility.showAlertMessage("Alert", 'Please enter a valid mobile number'); return false;
    }
    else if (this.isUndefinedORNull(form.value.email_address)) {
      this.utility.showAlertMessage("Alert", 'Please enter a valid email address'); return false;
    }
    else if (!this.validateEmailAddress(form.value.email_address)) {
      this.utility.showAlertMessage("Alert", 'Please enter a valid email address'); return false;
    }
    else {
      return true;
    }

  }
  isQuoteFormValid(form) {
    if (this.isUndefinedORNull(form.value.dob)) {
      this.utility.showAlertMessage("Alert", 'Please Select Insured DOB'); return false;
    }
    else if (this.checkforValidDate(form.value.dob)) {
      this.utility.showAlertMessage("Alert", 'Please Select Valid Insured DOB'); return false;
    }
    else if (this.isUndefinedORNull(form.value.state)) {
      this.utility.showAlertMessage("Alert", 'Please Select State'); return false;
    }
    else if (this.isUndefinedORNull(form.value.si)) {
      this.utility.showAlertMessage("Alert", 'Please Select SI'); return false;
    }
    else {
      let all_dates = this.getDatesforQuoteCalculation(form.value.max_Days);
      return true;
    }
  }
  isLoginFormValid(form) {
    if (this.isUndefinedORNull(form.value.userName)) {
      this.utility.showAlertMessage("Alert", 'Please provide IM ID'); return false
    }
    else if (this.isUndefinedORNull(form.value.passWord)) {
      this.utility.showAlertMessage("Alert", 'Please provide password'); return false
    }
    else {
      return true;
    }
  }
  isInsurerValid(form) {
    for (let i = 0; i < form.length; i++) {
      if (this.isUndefinedORNull(form[i].memeberRelation)) {
        this.utility.showAlertMessage("Alert", 'Please Enter Relationship of Insurer'); return false;
      }
      else if (this.isUndefinedORNull(form[i].memberTitle)) {
        this.utility.showAlertMessage("Alert", 'Please Enter Title of Insurer'); return false;
      }
      else if (this.isUndefinedORNull(form[i].memberName)) {
        this.utility.showAlertMessage("Alert", 'Please Enter Name of Insurer'); return false;
      }
      else if (this.isUndefinedORNull(form[i].memberDOB)) {
        this.utility.showAlertMessage("Alert", 'Please Enter Date of Birth of Insurer'); return false;
      }
    }
    return true;
  }
  isApplicantValid(form) {

    if (!this.validatepanCard(form.panNumber)) {
      this.utility.showAlertMessage("Alert", 'Please enter valid applicant pan number'); return false;
    }
    else if (!this.aadhaarValidationfunction(form.aadhaarNo)) {
      this.utility.showAlertMessage("Alert", 'Please enter valid aadhar number'); return false;
    }
    else if (this.isUndefinedORNull(form.applTitle)) {
      this.utility.showAlertMessage("Alert", 'Please enter applicant title'); return false;
    }
    else if (this.isUndefinedORNull(form.applName)) {
      this.utility.showAlertMessage("Alert", 'Please enter applicant name'); return false;
    }
    else if (this.isUndefinedORNull(form.applDOB)) {
      this.utility.showAlertMessage("Alert", 'Please enter applicant date of birth'); return false;
    }
    else if (this.isUndefinedORNull(form.applMobNo)) {
      this.utility.showAlertMessage("Alert", 'Please enter applicant mobile number'); return false;
    }
    else if (form.applMobNo.length < 10) {
      this.utility.showAlertMessage("Alert", 'Please enter valid applicant mobile number'); return false;
    }
    else if (this.isUndefinedORNull(form.applAdd1)) {
      this.utility.showAlertMessage("Alert", 'Please enter address 1'); return false;
    }
    else if (this.isUndefinedORNull(form.applPinCode)) {
      this.utility.showAlertMessage("Alert", 'Please enter applicant pincode'); return false;
    }
    else if (form.applPinCode.length < 6) {
      this.utility.showAlertMessage("Alert", 'Please enter valid applicant pincode'); return false;
    }
    else if (this.isUndefinedORNull(form.applState)) {
      this.utility.showAlertMessage("Alert", 'Please enter state'); return false;
    }
    else if (this.isUndefinedORNull(form.applCity)) {
      this.utility.showAlertMessage("Alert", 'Please enter city'); return false;
    }
    else if (this.isUndefinedORNull(form.applEmail)) {
      this.utility.showAlertMessage("Alert", 'Please enter applicant email address.');
      return false;
    }
    else if (!this.validateEmailAddress(form.applEmail)) {
      this.utility.showAlertMessage("Alert", 'Please enter valid applicant email address.');
      return false;
    }
    else if (this.isUndefinedORNull(form.nomTitle)) {
      this.utility.showAlertMessage("Alert", 'Please enter nominee title'); return false;
    }
    else if (this.isUndefinedORNull(form.nomName)) {
      this.utility.showAlertMessage("Alert", 'Please enter nominee name'); return false;
    }
    else if (this.isUndefinedORNull(form.nomRelation)) {
      this.utility.showAlertMessage("Alert", 'Please enter nominee relationship'); return false;
    }
    else if (this.isUndefinedORNull(form.applPinCode)) {
      this.utility.showAlertMessage("Alert", 'Please enter nominee dob'); return false;
    }
    else {
      return true;
    }

  }
  isAllentryParams(params) {
    if (!this.isUndefinedORNull(params.viewType) && (params.viewType.toUpperCase() == 'MVIEW' || params.viewType.toUpperCase() == 'PORTAL')) {
      if (this.isUndefinedORNull(params.deal)) {
        this.utility.showAlertMessage("Alert", 'Sorry deal not present'); return false;
      }
      else {
        this.utility.setLS('viewType', params.viewType.toUpperCase());
        let deal = encodeURIComponent(params.deal);
        let decoded_deal = params.deal;
        this.utility.setLS('flowType', 'A'); this.utility.setLS('decodeddeal', (decoded_deal)); this.utility.setLS('deal', deal);
        return true;
      }
    } else {
      if (this.isUndefinedORNull(params.deal)) {
        this.utility.showAlertMessage("Alert", 'Sorry deal not present'); return false;
      }
      else if (this.isUndefinedORNull(params.productType)) {
        this.utility.showAlertMessage("Alert", 'Sorry product type not present'); return false;
      }
      else if (this.isUndefinedORNull(params.type)) {
        this.utility.showAlertMessage("Alert", 'Sorry flow type not present'); return false;
      }
      else {
        let deal = encodeURIComponent(params.deal);
        let decoded_deal = params.deal;
        let plan = (params.productType).toUpperCase();
        let flowType = (params.type).toUpperCase();
        if (flowType == 'A') { this.utility.setLS('flowType', 'A'); }
        else if (flowType == 'NA') { this.utility.setLS('flowType', 'NA'); }
        else { this.utility.setLS('flowType', 'A'); }
        this.utility.setLS('planFormURL', JSON.stringify(plan)); this.utility.setLS('custplan', (plan));
        this.utility.setLS('decodeddeal', (decoded_deal)); this.utility.setLS('deal', deal);
        return true;
      }
    }
  }

  get_sequenced_formFields(formValues) {
    const fieldNames = [];
    for (let key in formValues) {
      if (formValues.hasOwnProperty(key)) {
        fieldNames.push(key);
      }
    }
    return fieldNames;
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  nonZeroValue(control: FormControl) {
    const nonZero = control.value === 0;
    const isValid = !nonZero;
    return isValid ? null : { 'nonZero': true };
  }

  validateForm(inputForm) {
    let validStatus: boolean;
    this.formErrors = [];
    Object.keys(inputForm.controls).forEach(key => {
      const errors = inputForm.get(key).errors;
      if (errors != null) {
        console.log(errors, key, Object.keys(errors)[0]);
        this.errorType(key, Object.keys(errors)[0]);
        validStatus = false;
      } else {
        validStatus = true;
      }
    });
    return [this.formErrors, this.formErrors.length ? false : true];
  }

  errorType(fieldName: string, validatorName: {}) {
    let errorObject: any;
    errorObject = this.errorMessages.filter(msg => msg.validator === validatorName)[0];
    if (fieldName) {
      fieldName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
      errorObject = (errorObject.msg).replace('{}', fieldName);
    }
    this.formErrors.push(errorObject.replace(/[^a-zA-Z ]/g, ' '));
    // this.utility.showAlertMessage(this.formErrors[0]);
  }

  checkforValidDate(date) {
    let dateerror = false;
    let temp = moment(date, 'DD-MM-YYYY').format('DD-MMMM-YYYY');
    let tempDate = moment().diff(temp, 'years');
    let tempDateMonths = moment().diff(temp, 'months');
    if (tempDate < 18) {
      sessionStorage.setItem('isAdultorKid', 'Child');
      if (tempDate < 1) {
        sessionStorage.setItem('ageofInsured', tempDateMonths.toString() + ' months');
      }
      else { sessionStorage.setItem('ageofInsured', tempDate.toString()); }
    }
    else if (tempDate >= 18 && tempDate < 100) {
      sessionStorage.setItem('isAdultorKid', 'Adult');
      sessionStorage.setItem('ageofInsured', tempDate.toString());
    }
    else {
      dateerror = true;
    }
    return dateerror
  }
  getDatesforQuoteCalculation(max_days_options) {
    let dates = {
      date1: moment().add(105, 'd').format('YYYY-MM-DD'),
      date2: moment().add(195, 'd').format('YYYY-MM-DD'),
      date3: moment().add(285, 'd').format('YYYY-MM-DD'),
      selected_date: ''
    }
    if (max_days_options == 1) { dates.selected_date = moment().add(105, 'd').format('YYYY-MM-DD') }
    if (max_days_options == 2) { dates.selected_date = moment().add(195, 'd').format('YYYY-MM-DD') }
    if (max_days_options == 3) { dates.selected_date = moment().add(285, 'd').format('YYYY-MM-DD') }
    return dates
  }

}
