import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DataSharingService } from 'src/services/data-sharing.service';
import { UtilityserviceService } from 'src/services/utilityservice.service';
import { AesEncryptionService } from 'src/services/aes-encryption.service';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
 
  sharedData; data; boracasted = false;
  private previousUrl: string = undefined;
  private currentUrl: string = undefined;
  propertyTypeForm = true; propInsTypeForm = false; contentTypeForm = false; addonCoverageForm = false;
  paymentForm = false;
  planDetails = false; customerDetailsForm = false; viewType: any;
  sub: any;
  flowtype: any;
  IsKYCPopUpOpened: boolean = false;
  masterData: any;
  constructor(public aes: AesEncryptionService, private dataSharingService: DataSharingService,
    private router: Router,
    public utility: UtilityserviceService) {
   
        
        // if(this.flowtype=="A"){
        //   if (this.currentUrl === '/home') {
        //     console.log('Previous URL is', this.previousUrl, 'thats why clearing localstorage now');
        //     sessionStorage.removeItem('sharedFormData');
        //     // sessionStorage.removeItem('customerDetails');
        //     // sessionStorage.removeItem('IsKYCPopUpOpened');
        //     this.IsKYCPopUpOpened = false; 
        //     this.dataSharingService.clearSharedData();
        //   }
        // }
       
          // sessionStorage.removeItem('sharedFormData');
          // sessionStorage.removeItem('customerDetails');
          // this.dataSharingService.clearSharedData();
        
  }

  async ngOnInit() {
    
    await this.utility.getPolicyPlanDetails();  
    this.masterData = JSON.parse(this.utility.getLS('master_data'));
    this.broadcastData();
    this.flowtype = this.utility.getLS("flowtype");
    //this.utility.setLS("addons", "");
    // if (this.flowtype == 'A') {
    //   $("#CustBoarding").modal('hide');
    //   $('#aryaModalbody').empty();
    //   $('.arya-modal').remove();
    //   $('.arya-il-modal-backdrop').remove();
    //   $('body').removeClass("arya-il-modal-open");
    //   }
  }
  broadcastData() {
    this.dataSharingService.sharedFormData$.
      subscribe(data => {
        data.forEach(d => {
          const formName = d.nextFormName;
          if (formName) {
            this[formName] = true;
          }
        });
      });
  }
preback(){
window.history.forward();
 setTimeout("preback()",0);
 window.onunload = function(){null}; 
}
}
