import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { UtilityserviceService } from './utilityservice.service';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  sharedFormData: any[] = [];
  private quoteSubject: BehaviorSubject<any[]> = new BehaviorSubject(null);
  constructor(public utilityservice: UtilityserviceService) {
    if (!this.utilityservice.isUndefinedOrNull(this.utilityservice.getLS('sharedFormData'))) {
      this.sharedFormData = JSON.parse(this.utilityservice.getLS('sharedFormData'));

    }

    this.quoteSubject.next(this.sharedFormData);
  }

  get sharedFormData$(): Observable<any[]> {
    return this.quoteSubject.asObservable();
  }

  clearSharedData() {
    this.sharedFormData = [];
    this.quoteSubject.next(this.sharedFormData);
  }
  setSharedFormData(data, formname, nextFormName, additionalInfo?) {
    this.setLocalStorage(data,formname, nextFormName, additionalInfo);
    this.quoteSubject.next(this.sharedFormData);
  }

  setLocalStorage(data, formname, nextFormName, additionalInfo?) {
    let count = 0;
    if (this.sharedFormData.length) {
      this.sharedFormData.forEach((element, i) => {
        if (element.formName === formname) {
          count += 1;
          this.sharedFormData[i] = this.createFinalObject(data, formname, nextFormName, additionalInfo);
        }
      });
      if (!count) {
        this.sharedFormData.push(this.createFinalObject(data, formname, nextFormName, additionalInfo));
      }
    } else {
      this.sharedFormData.push(this.createFinalObject(data, formname, nextFormName, additionalInfo));
    }
    console.log(this.sharedFormData);
    this.utilityservice.setLS('sharedFormData', JSON.stringify(this.sharedFormData));
  }

  createFinalObject(data, formname, nextFormName, additionalInfo?) {
    const finalObj = { isValid: true, formName: formname, nextFormName: nextFormName, formValues: '' };
    finalObj.formValues = data;
    if (additionalInfo) { Object.assign(finalObj, additionalInfo); }
    console.log(finalObj);
    return finalObj;
  }

}
