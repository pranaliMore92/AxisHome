import { Component, NgZone, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UtilityserviceService } from '../services/utilityservice.service';
import { themes } from './theme.const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AxisHome';
  themeType: any;

  constructor(private router: Router, public utilityservice: UtilityserviceService, public _elementRef: ElementRef) { }

  ngOnInit() {
     this.utilityservice.getPolicyPlanDetails();
    this._elementRef.nativeElement.removeAttribute("ng-version");
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    var self = this;
    setTimeout(function () {
      self.utilityservice.initializeFormGroup();
    }, 1000);
    this.getTheme();
  }
  getTheme() {
    const viewType = sessionStorage.getItem('viewType');
    if (viewType != 'MVIEW' && viewType != 'PORTAL') {
      this.themeType = 'customerTheme';
    } else {
      this.themeType = 'nonCustomerTheme';
    }
    // const element = this.elementRef.nativeElement;
    const them = themes[this.themeType];
    for (const key in them) {
      document.documentElement.style.setProperty(key, them[key]);
    }
  }
}
