import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataSharingService } from 'src/services/data-sharing.service';
import { UtilityserviceService } from 'src/services/utilityservice.service';
import { ValidationService } from 'src/services/validation.service';
declare var $: any;
@Component({
  selector: 'app-content-value',
  templateUrl: './content-value.component.html',
  styleUrls: ['./content-value.component.css']
})
export class ContentValueComponent implements OnInit {

  isShow = false; total = 0; isPrevFormValid = false;
  contentTypeForm: any;
  masterData: any;
  prevFormData: any;
  currentFormData: any;
  maxLimitJewelley = 0;
  contents = [
    {
      content_name: 'durable',
      label: 'Electrical/Electronic',
      img: 'durable.png',
      defaultValueApplicable: false,
      tooltip: 'We cover your refrigerator, washine machine and other such durables'
    },
    {
      content_name: 'furniture',
      label: 'Furniture, Fixtures and Fittings',
      img: 'closet.png',
      defaultValueApplicable: false,
      tooltip: 'Chairs, tables and beds and other furniture items'
    },
    {
      content_name: 'miscellaneous',
      label: 'Others',
      img: 'desk.png',
      defaultValueApplicable: false,
      tooltip: 'Any other kitchen appliance, utensils or clothing item'
    },
    {
      content_name: 'jewellery',
      label: 'Valuable Contents (Optional Covers)',
      img: 'jewellery.png',
      defaultValueApplicable: true,
      tooltip: 'Any gold, silver, diamond, precious stones or other ornaments you may possess ( Max coverage up to 25 % of the overall content (Electronic/Electrical+Furniture/Fittings and Fixtures+Others)'
    }
  ];
  maxLim: any;
  minLim: any;
  addons: any;
  addonCoverageForm: FormGroup;
  propInsTypeForm: any;
  propertyTypeForm: any;
  defaultValuesArray = [
    {
      // field: 'field_1290',
      img_name: 'removal_of_debris.png',
      // field: 'field_1934',
      functionName: 'debrisValue',
      type: 'structure'
    },
    {
      // field: 'field_1186',
      img_name: 'mech_electrical_break.png',
      // field: 'field_1353',
      functionName: 'breakdownValue',
      type: 'content'
    }
  ];
  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private dataSharingService: DataSharingService,
    private utility: UtilityserviceService) { }

  ngOnInit() {
    this.getSharedData();
    console.log("contenttypeform");
    $("#CustBoarding").modal('hide');
    $('#aryaModalbody').empty();
    $('.arya-modal').remove();
    $('.arya-il-modal-backdrop').remove();
    $('body').removeClass("arya-il-modal-open");
  }

  getSharedData() {
    this.dataSharingService.sharedFormData$.
      subscribe(data => {
        this.masterData = JSON.parse(this.utility.getLS('master_data'));
        console.log(this.masterData);
        this.currentFormData = data.find(item => item.formName === 'contentTypeForm');
        this.prevFormData = data.find(item => item.formName === 'propInsTypeForm');
        console.log(this.prevFormData, this.currentFormData);
        let defaultFormValuess = this.currentFormData ? this.currentFormData.formValues : [];
        this.contentTypeForm = this.createForm(defaultFormValuess);
        /****Jewellery change *****/
        this.checkContents();
        /****Jewellery change *****/
      });
  }

  getstructureSi(fieldName, imgName) {
    let total = 0;
    if (fieldName === 'field_1184' || fieldName === 'field_1348') {
      total = this.propInsTypeForm ? this.getPlainValue(this.propInsTypeForm.formValues.structure_value) : 0;
    }
    return total;
  }
  getcontentSi(fieldName, imgName) {
    let total = 0;
    if (imgName === 'content_all_risk.png') {
      total = this.contentTypeForm ? this.getPlainValue(this.contentTypeForm.total) : 0;
    }
    return total;
  }
  arrangeInorder(addons) {
    const insForm = this.propInsTypeForm;
    const type = insForm ? insForm.formValues.propInsType === 'both' ? 'bothId' : `${insForm.formValues.propInsType}Id` : '';
    return addons.sort((a, b) => a[type] - b[type]);
  }
  checkTotal(isAdded, insuranceType, fieldName, imgName) {
    let total = 0;
    if (isAdded) {
      if (insuranceType === 'both') {
        total = this.getstructureSi(fieldName, imgName) + this.getcontentSi(fieldName, imgName);
      } else {
        total = this[`get${insuranceType}Si`](fieldName, imgName);
      }
    }
    // if (isAdded && insuranceType === 'structure' && fieldName === 'field_1348') {
    //   total = this.propInsTypeForm ? this.propInsTypeForm.formValues.structure_value : 0;
    // } else if (isAdded && insuranceType === 'content' && fieldName === 'field_2489') {
    //   total = this.contentTypeForm ? this.contentTypeForm.total : 0;
    // } else if (isAdded && insuranceType === 'both' && fieldName === 'field_1348') {
    //   total = this.propInsTypeForm ? this.propInsTypeForm.formValues.structure_value : 0;
    // } else if (isAdded && insuranceType === 'both' && fieldName === 'field_2489') {
    //   total = this.contentTypeForm ? this.contentTypeForm.total : 0;
    // }
    return total;
  }
  checkTenure(data) {
    // console.log("Inside check tenure ", this.propInsTypeForm)
    // console.log("This is something very important.............", this.propInsTypeForm);
    let isTenure = false;
    //  debugger;
    if (this.propInsTypeForm) {
      if (this.propertyTypeForm) {
        if (this.propertyTypeForm.formValues.propType == 'rented' && !this.propInsTypeForm.formValues.hasOwnProperty('tenure')) {
          isTenure = true;
          // isTenure = this.propInsTypeForm.formValues.tenure == 5;
          this.propInsTypeForm.formValues.tenure = "5";
        } else {
          isTenure = this.propInsTypeForm.formValues.tenure == 10 && data['CvrType'] == 'All' || this.propInsTypeForm.formValues.tenure == 5 && data['CvrType'] == 'CHP' || data['CvrType'] == 'All';
        }
      }
    }
    // if(this.propertyTypeForm) {
    //   isTenure = this.propertyTypeForm.formValues.propType == 'rented';
    // }
    return isTenure;
  }
  checkVisibility(data, formType, propType, isExistingData) {
    const coverCode = isExistingData ? data.instrument_name.replace(/\D/g, '') : data.CvrCode;
    const isVisible = this.masterData.AddonCvrDetails.find(d => d.CvrCode == coverCode);
    return (isVisible[formType] && isVisible.IsVisibleOnScreen && isVisible[propType]) && this.checkTenure(data);
  }

  checkIsAdded(currentState, nextState, coverCode) {
    const data = this.masterData.AddonCvrDetails.find(d => d.CvrCode == coverCode);
    return data[nextState] ? data[nextState] : currentState;
  }


  checkDefaultValues(data, type) {
    let instrument_name;
    let image_name;
    if (data.CvrCode) {
      // coverCode = data.CvrCode;
      instrument_name = `field_${data.CvrCode}`;
      image_name = data.CvrImageName
    } else {
      instrument_name = `field_${data.instrument_name.replace(/\D/g, '')}`;
      image_name = data.img
    }
    const obj = this.defaultValuesArray.find(d => d.img_name === image_name);
    // const obj = this.defaultValuesArray.find(d =>  type === 'both' || d.type === type);
    return obj ? image_name === obj.img_name ? this[obj.functionName](data, obj.img_name, image_name) : data.DefaultSi : data.DefaultSi;
  }
  submitContentType() {
    this.total = 0;
    const inputForm = this.contentTypeForm;
    console.log(inputForm.value);
    this.total = this.getTotal();
    const inputFormValues = this.getPlainValuesForContent(inputForm.value);
    const isValid = this.isValidForm(this.validationService.validateForm(inputForm)) ? this.checkValue() : false;
    if (isValid) {
      console.log('Valid form', inputForm.value);
      //this.utility.setLS("addons", "");
      // if(!this.utility.isUndefinedOrNull(this.utility.getLS("addons"))){
      //   this.addons = JSON.parse(this.utility.getLS('addons'))
      //   this.dataSharingService.setSharedFormData(this.addons,'addonCoverageForm', '','')
      // }
      const additionalInfo = { 'total': this.total };
      this.utility.setLS("total",String(this.total));
      this.utility.setLS("showtotal", "true");
      this.dataSharingService.setSharedFormData(inputFormValues, 'contentTypeForm', 'addonCoverageForm', additionalInfo);
      this.isShow = true;
    }
    // this.utility.setLS("Chooseplan", "");

     this.utility.setLS("tenureselect", "");
  }

  getPlainValuesForContent(formValues) {
    const obj = this.contentTypeForm.getRawValue();
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        // sum += Number(obj[key]);
        obj[key] = this.getPlainValue(formValues[key]);
      }
    }
    return obj;
  }
  checkValue() {

    var isValid = this.total > 0 ? true : false;

    // if (this.maxLim < "10000") {
    //   this.utility.showAlertMessage('Alert', 'Content value cannot be zero');
    //   return;
    // }
    // if (this.minLim < "5000000") {
    //   this.utility.showAlertMessage('Alert', 'Content value cannot be zero');
    //   return;
    // }

    if (!isValid) {
      this.utility.showAlertMessage('Alert', 'Content value cannot be zero');
      false;
    }
    else if (Number(this.total) < 10000) {
      isValid = false;
      this.utility.showAlertMessage('Alert', 'Home Content Value cannot be less than Rs.10,000');
      false;
    }
    return isValid;

  }

  isValidForm(validity) {
    const errors = validity[0]; let isValid = validity[1];
    const contentValue = this.getTotal();
    const structureValue = this.getPlainValue(this.prevFormData ? this.prevFormData.formValues.structure_value : 0);
    if (errors.length > 3) {
      this.utility.showAlertMessage('Alert', 'Please enter at least one content value');
      isValid = false;
    } else if (contentValue > 75000000) {
      this.utility.showAlertMessage('Alert', 'Content value should not be more than 7,50,00,000');
      isValid = false;
    } else if (structureValue && this.prevFormData.formValues.propInsType === 'both') {
      if (structureValue) {
        const res = this.checkContentStructure(contentValue, structureValue);
        isValid = res.isValid;
        if (!isValid) {
          this.utility.showAlertMessage('Alert', res.msg);
        }
      }
    } else {
      isValid = true;
    }
    /****Jewellery change ******/
    if (this.getPlainValue(this.contentTypeForm.value.jewellery) > this.maxLimitJewelley) {
      this.utility.showAlertMessage('Alert', `Valuable contents Value cannot be greater than ${this.maxLimitJewelley}`);
      isValid = false;
    }
    /****Jewellery change ******/
    return isValid;
  }

  checkContentStructure(content, structure) {
    const total = content + structure;
    const error = { isValid: true, msg: '' };
    if (total > 75000000) {
      error.isValid = false;
      error.msg = 'Content and structure value should not be greater than 7,50,00,000';
    }
    return error;
  }

  getPlainValue(value) {
    return parseFloat(value ? value.toString().includes(',') ? value.replace(/,/g, '') : value : 0);
  }

  getTotal() {
    let sum = 0;
    const obj = this.contentTypeForm.getRawValue();
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        // sum += Number(obj[key]);
        sum += obj[key] ? this.getPlainValue(obj[key]) : 0;
      }
    }
    return sum;
  }

  get showContent() {
    return this.prevFormData ? this.prevFormData.formValues.propInsType === 'structure' ? false : true : false;
  }

  get contentForm() {
    return this.contentTypeForm.value;
  }
  editContentType() {
    this.isShow = false;
  }

  checkMasterData(content) {
    return this.masterData.contentDetails.find((item: any) => item.Name === content.label);
  }

  checkContents() {
    let total = 0;
    total = this.getTotal();
    console.log(total);
    this.maxLim = total;
    this.minLim = total;
    console.log(this.maxLim);
    const jewelleryValue = this.getPlainValue(this.contentTypeForm.value.jewellery);
    this.maxLimit(total - jewelleryValue);
    if (total) {
      this.contentTypeForm.controls.jewellery.enable();
    } else {
      // this.contentTypeForm.controls.jewellery.enable();
      this.contentTypeForm.patchValue({ jewellery: '' });
      this.contentTypeForm.controls.jewellery.disable();
    }
  }

  maxLimit(total) {
    this.maxLimitJewelley = (total * 25) / 100;
    return this.maxLimitJewelley;
  }
  createForm(values) {
    const fields = {};
    this.contents.forEach(content => {
      // if (this.checkMasterData(content)) {
      const value = values[content.content_name];
      // if (content.content_name === 'jewellery') {
      //   fields[content.content_name] = [{value: value ? value : '', disabled: true}, Validators.required];
      // } else {
      fields[content.content_name] = [value || '', Validators.required];
      // }
      // content.isVisible = true;
      // }
    });
    return this.fb.group(fields);
  }

}
