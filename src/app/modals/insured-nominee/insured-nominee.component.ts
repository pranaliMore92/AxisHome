import { Component, OnInit, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
declare var $: any
import * as moment from 'moment';
import { ApiserviceService } from 'src/services/apiservice.service';
import { ValidationService } from 'src/services/validation.service';
import { UtilityserviceService } from 'src/services/utilityservice.service';
import { LstNomineeRelationshipResponse } from 'src/models/StatesModel';
import { usermodel } from 'src/models/usermodel';
@Component({
  selector: 'app-insured-nominee',
  templateUrl: './insured-nominee.component.html',
  styleUrls: ['./insured-nominee.component.css']
})
export class InsuredNomineeComponent implements OnInit {
  onAdd = new EventEmitter();
  selectedAddon: any;
  defaultData = {};
  insuredNomineeForm: FormGroup;
  insured: FormArray;
  customerTitles = [{ id: '0', val: 'Mrs.', gender: 'Female' },
  { id: '1', val: 'Mr.', gender: 'Male' },
  { id: '2', val: 'Ms.', gender: 'Female' }];
  insuredDetails: any;
  nomineePPAP: any[];
  personla_accident_si: any;
  insuredRelations: any;
  nomineeRelations: any;
  maxDate: Date;
  minDate: Date;
  NomineeRelationShipList: Array<LstNomineeRelationshipResponse>;
  userDetails: usermodel = new usermodel();
  isAdded: any;
  isDisabled: any;
  isVisible: any;

  constructor(
    private dialogRef: MatDialogRef<InsuredNomineeComponent>,
    private fb: FormBuilder, public api: ApiserviceService,
    private validationService: ValidationService,
    private utility: UtilityserviceService) { }

  ngOnInit() {
    this.getRelations();
    this.getNomineeRelation();
    if (!this.utility.isUndefinedOrNull(this.utility.getLS('userdetails'))) {
      this.userDetails = JSON.parse(this.utility.getLS('userdetails'))
    }
    this.personla_accident_si = this.dialogRef._containerInstance._config.data;
    console.log(this.personla_accident_si);
    this.insuredNomineeForm = this.fb.group({
      // nominee_name: [],
      // nominee_title: [],
      // insured: this.fb.array([this.createMembers({})])
      // sum_insured: ['', Validators.required],
      insured_title: ['', Validators.required],
      insured_relationship: ['', Validators.required],
      insured_name: ['', Validators.required],
      insured_dob: ['', Validators.required],
      nominee_name: ['', Validators.required],
      nominee_relationship: ['', Validators.required]
    });
    this.maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18));
    this.minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 100));
    // this.getRelations();
    this.onloadscroll();
  }
  get Insured(): FormArray {
    return this.insuredNomineeForm.get('insured') as FormArray;
  }
  removeInsured(index) {
    this.Insured.value.forEach((element, i) => {
      if (i === index) {
        this.Insured.removeAt(index);
      }
    });
  }

  // addInsured() {
  //   (this.insuredNomineeForm.controls.insured as FormArray).push(this.createMembers({}));
  // }

  // createMembers(data) {
  //   return this.fb.group({
  //     insured_title: ['', Validators.required],
  //     insured_relationship: ['', Validators.required],
  //     insured_name: ['', Validators.required],
  //     insured_dob: ['', Validators.required],
  //     nominee_name: ['', Validators.required],
  //     nominee_relationship: ['', Validators.required]
  //   });
  // }
  closeModal() {
    this.dialogRef.close();
    this.onAdd.emit('closed');
    if(this.utility.isUndefinedOrNull(this.insuredDetails)){
      this.utility.setLS("customer", "1");
    }
    this.isAdded = false;
    this.isDisabled = false;
    this.isVisible =  true;
  }

  InsuredRelationChanged() {
    if (this.insuredNomineeForm.value.insured_relationship == "SELF") {
      this.insuredNomineeForm.patchValue({ 'insured_name': this.userDetails.CustName });
    } else {
      this.insuredNomineeForm.patchValue({ 'insured_name': '' });

    }
  }
  submit() {
    const inputForm = this.insuredNomineeForm;
    const isValid = this.isValidForm(this.validationService.validateForm(inputForm)) || false;
    if (isValid) {
      const finalData = inputForm.value;
      finalData.insured_dob = moment(finalData.insured_dob).format('YYYY/MM/DD');
      const genderDetails = this.customerTitles.find(title => title.val === finalData.insured_title);
      Object.assign(finalData, { insured_gender: genderDetails.gender });
      this.insuredDetails = {
        InsuredName: finalData.insured_name,
        DateOfBirth: finalData.insured_dob,
        RelationshipWithApplicant: finalData.insured_relationship,
        Gender: finalData.insured_gender,
        OtherSumInsured: 0.0,
        NomineeName: finalData.nominee_name,
        RelationshipWithInsured: finalData.nominee_relationship
      }
      this.utility.setLS('insured_details', JSON.stringify(this.insuredDetails));
      this.dialogRef.close();
      this.onAdd.emit('success');
      console.log('Valid form');
    }
  }

  isValidForm(validity) {
    const errors = validity[0]; let isValid = validity[1];
    if (errors.length) {
      this.utility.showAlertMessage('Alert', errors[0]);
    }
    return isValid;
  }
  getNomineeRelation() {
    this.api.getNomineeRelationList().subscribe((data) => {
      this.NomineeRelationShipList = data.lstNomineeRelationshipResponse;
    });
  }
  getRelations() {
    this.nomineePPAP = [];
    this.api.getWithParams().then((res: any) => {
      if (res) {
        if (this.personla_accident_si === '500000') {
          this.insuredRelations = res.filter(relation => relation.Name === 'SELF');
        } else {
          this.insuredRelations = res.filter(relation => relation.Name === 'SPOUSE');
        }
        // for (let i = 0; i < this.nomineePPAP.length; i++) {
        //   if (this.nomineePPAP[i].Name == 'EMPLOYEE' || this.nomineePPAP[i].Name == "EMPLOYER" || this.nomineePPAP[i].Name == "INSTITUTION") {
        //     let tempdata = i;
        //     this.nomineePPAP.splice(tempdata, 1);
        //   }
        // }
        // this.nomineePPAP.filter(relation => relation.Name === 'SPOUSE');
        console.log(this.insuredRelations)
        this.insuredRelations.sort(function (a, b) {
          if (a.Name < b.Name) return -1;
          if (a.Name > b.Name) return 1;
          return 0;
        });
        this.utility.setLS('insuredRelations', JSON.stringify(this.insuredRelations));
      }
    }).catch((err: any) => {
      // console.log(err);
    });
  }
  // createForm() {
  //   return this.fb.group({
  //     insured_title: ['', [Validators.required]],
  //     insured_name: ['', [Validators.required]]
  //   });
  // }

  // getRelations() {
  //   this.api.getWithParams('/api/healthmaster/GetRelations').then((res: any) => {
  //     this.ppapRealtions = res;
  //   }).catch((err: any) => {
  //     console.log(err);
  //   });
  // }
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    //console.log(charCode);
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  alphaOnly(event: any): boolean {
    const key = event.keyCode;
    return ((key >= 65 && key <= 90) || key == 8 || key == 32);
  }
  onloadscroll() {
    $("body").css("overflow", "auto");
  }
}
