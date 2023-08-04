import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/services/apiservice.service';
import { DataSharingService } from 'src/services/data-sharing.service';
import { UtilityserviceService } from 'src/services/utilityservice.service';
import { ValidationService } from 'src/services/validation.service';

@Component({
  selector: 'app-insuarance-type',
  templateUrl: './insuarance-type.component.html',
  styleUrls: ['./insuarance-type.component.css']
})
export class InsuaranceTypeComponent implements OnInit {
  isShow = false;
  isPrevFormValid = false;
  sharedData;
  prevFormValues; currentFormData;
  propInsTypeForm: FormGroup;
  contentTypeForm;
  total: any;
  masterData: any;
  constructor(private fb: FormBuilder,
    private validationService: ValidationService,
    private dataSharingService: DataSharingService, public utilityservice: UtilityserviceService, public _serverapiService: ApiserviceService, public _router: Router) { }

  ngOnInit() {
    
    this.getSharedData();
  }

  get showContent() {
  
    return this.prevFormValues ? this.prevFormValues.formValues.propType === 'rented' ? false : true : false;
  }

  getSharedData() {
    this.masterData = JSON.parse(this.utilityservice.getLS('master_data'));
    let defaultValues: any = { propInsType: '', structure_value: '', cost_of_construction: '', carpet_area_in_sq_mtrs: '', tenure: '' };
    this.dataSharingService.sharedFormData$.
      subscribe(data => {
        console.log(data);
        this.sharedData = data;
        this.currentFormData = data.find(item => item.formName === 'propInsTypeForm');
        this.prevFormValues = data.find(item => item.formName === 'propertyTypeForm');
        this.contentTypeForm = data.find(item => item.formName === 'contentTypeForm') || { formValues: '' };
        if (this.prevFormValues) {
          defaultValues.propInsType = this.currentFormData ? this.currentFormData.formValues.propInsType : this.prevFormValues.formValues.propType === 'owned' ? 'structure' : 'content';
          // defaultValues.propInsType = this.prevFormValues.formValues.propType === 'owned' ? 'structure' : 'content';
          defaultValues.structure_value = this.currentFormData ? this.currentFormData.formValues.structure_value : '';
          defaultValues.cost_of_construction = this.currentFormData ? this.currentFormData.formValues.cost_of_construction : '';
          defaultValues.carpet_area_in_sq_mtrs = this.currentFormData ? this.currentFormData.formValues.carpet_area_in_sq_mtrs : '';
          defaultValues.tenure = this.currentFormData ? this.currentFormData.formValues.tenure : '';
        } else {
          defaultValues = this.currentFormData ? this.currentFormData.formValues : {};
        }
        this.propInsTypeForm = this.createForm(defaultValues);
      });
  }
  createForm(values) {
    return this.fb.group({
      propInsType: [values.propInsType || '', [Validators.required]],
      cost_of_construction: [values.cost_of_construction || '', [Validators.required, Validators.pattern('^[0-9,]*$')]],
      carpet_area_in_sq_mtrs: [values.carpet_area_in_sq_mtrs || '', [Validators.required, Validators.pattern('^[0-9,]*$')]],
      structure_value: [values.structure_value || '', [Validators.required, Validators.pattern('^[0-9,]*$')]],
      tenure: [values.tenure || '', [Validators.required]]
    });
  }
  getCost() {
    let value = this.getStructureValue();
    this.propInsTypeForm.patchValue({ 'structure_value': value });
  }
  submitInsuaranceType() {
    const inputForm = this.propInsTypeForm;
    // this.premiumForm.patchValue({ productName: value });
    if (inputForm.value.propInsType === 'content') {
      this.isShow = true;
      this.total = 0;
      this.propInsTypeForm.patchValue({ 'tenure': 5 });
      this.dataSharingService.setSharedFormData(inputForm.value, 'propInsTypeForm', 'contentTypeForm');
    } else {
      if (inputForm.value.propInsType === 'both') {
        this.propInsTypeForm.patchValue({ 'tenure': 5 });
      }
      let isValid = this.isValidForm(this.validationService.validateForm(inputForm));
      if (isValid) {
        console.log('Valid form', inputForm.value);
        // inputForm.value.structure_value = parseFloat(inputForm.value.structure_value.replace(/,/g, ''))
        const nextFormName = (inputForm.value.propInsType === 'content' || inputForm.value.propInsType === 'both') ? 'contentTypeForm' : 'addonCoverageForm';
        this.dataSharingService.setSharedFormData(inputForm.value, 'propInsTypeForm', nextFormName);
        this.isShow = true;
        this.total = this.getPlainValue(inputForm.value.structure_value);
      } else {
        console.log('Invalid form');
      }
    }
    this.utilityservice.setLS("Chooseplan", "");
    this.utilityservice.setLS("tenureselect", "");
  }

  getStructureValue() {
    let total = 0;
    return (this.getPlainValue(this.propInsTypeForm.value.cost_of_construction) * this.getPlainValue(this.propInsTypeForm.value.carpet_area_in_sq_mtrs)) || '';
  }
  getPlainValue(value) {
    return parseFloat(value ? value.toString().includes(',') ? value.replace(/,/g, '') : value : 0);
  }

  // isValidForm(validity) {
    
  //   const errors = validity[0]; let isValid = validity[1];
  //   const insForm = this.propInsTypeForm.value;
  //   const structureValue = this.getPlainValue(insForm.structure_value);
  //  if (insForm.propInsType == 'building') {
  //     const error = !insForm.structure_value ? true : false;
  //     if (error) {
  //       this.utilityservice.showAlertMessage("Alert", 'Structure Value cannot be zero');
  //       isValid = false;
  //       false;
  //     } else if (structureValue < 500000) {
  //       this.utilityservice.showAlertMessage("Alert", 'Structure Value cannot be less than 5,00,000');
  //       isValid = false;
  //     } else if (structureValue > 75000000) {
  //       this.utilityservice.showAlertMessage("Alert", 'Structure Value cannot be more than 7,50,00,000');
  //       isValid = false;
  //     } 
  //     if (this.contentTypeForm.total && insForm.propInsType === 'both') {
  //       const contentValue = this.getPlainValue(this.contentTypeForm.total);
  //       if (contentValue) {
  //         const res = this.checkContentStructure(contentValue, structureValue);
  //         isValid = res.isValid;
  //         if (!isValid) {
  //           this.utilityservice.showAlertMessage("Alert", res.msg);
  //         }
  //       }
  //     }
  //  }
  //   if (errors.length) { this.utilityservice.showAlertMessage("Alert", errors[0]); }
  //   return isValid;
  // }
  isValidForm(validity) {
    debugger
    const errors = validity[0]; let isValid = validity[1];
    const insForm = this.propInsTypeForm.value;
    const structureValue = this.getPlainValue(insForm.structure_value);
    if (insForm.propInsType !== 'content') {
      const error = !insForm.structure_value ? true : false;
      if (error) {
        this.utilityservice.showAlertMessage("Alert", 'Structure Value cannot be zero');
        isValid = false;
        return
      } else if (structureValue < 500000) {
        this.utilityservice.showAlertMessage("Alert", 'Structure Value cannot be less than 5,00,000');
        isValid = false;
        return
      } else if (structureValue > 75000000) {
        this.utilityservice.showAlertMessage("Alert", 'Structure Value cannot be more than 7,50,00,000');
        isValid = false;
      } else if (this.contentTypeForm.total && insForm.propInsType === 'both') {
        const contentValue = this.getPlainValue(this.contentTypeForm.total);
        if (contentValue) {
          const res = this.checkContentStructure(contentValue, structureValue);
          isValid = res.isValid;
          if (!isValid) {
            this.utilityservice.showAlertMessage("Alert", res.msg);
          }
        }
      }
    }
    if (errors.length) { this.utilityservice.showAlertMessage("Alert", errors[0]); }
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

  editInsuaranceType() {
    this.isShow = false;
  }

  get formValues() {
    return this.propInsTypeForm.value;
  }

  getTooltip(type) {
    if (type === 'owned') {
      return 'sdfsdfsd';
    }
  }
  gettooltipTitle(val) {
    let structureTooltip = this.masterData.ToolTipDetails.find(data => data.Name == 'Structure');
    let contentTooltip = this.masterData.ToolTipDetails.find(data => data.Name == 'Content');
    let structureContent = this.masterData.ToolTipDetails.find(data => data.Name == 'StructureContent');
    if (val == 'structure') {
      return structureTooltip.ToolTip || 'Covers the physical structure of your home, like the floor, walls and roof';
    } else if (val == 'content') {
      return contentTooltip.ToolTip || 'Household goods and personal property within the Dwelling';
    } else {
      return structureContent.ToolTip || 'We Cover you for the structure of your property';
    }
  }

  get isStrucutureVisible() {
    let isContent = this.propInsTypeForm.value.propInsType === 'content';
    if (isContent) {
      this.propInsTypeForm.patchValue({ cost_of_construction: '' });
      this.propInsTypeForm.patchValue({ carpet_area_in_sq_mtrs: '' });
      this.propInsTypeForm.patchValue({ structure_value: '' });
    }
    return isContent;
  }

}
