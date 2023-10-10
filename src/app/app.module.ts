import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DatePipe, DecimalPipe } from '@angular/common';

import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PaymentComponent } from './payment/payment.component';
import { RazorPayFallbackComponent } from './razor-pay-fallback/razor-pay-fallback.component';

import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { OnlyNumericDirective } from '../directives/only-numeric.directive';
import { LoginComponent } from './login/login.component';
import { HomeButtonComponent } from './home-button/home-button.component';
import { CustomerSummaryComponent } from './customer-summary/customer-summary.component';
import { CustomerLeadComponent } from './customer-lead/customer-lead.component';
import { HomeComponent } from './home/home.component';
import { PropertyTypeComponent } from './property-type/property-type.component';
import { InsuaranceTypeComponent } from './insuarance-type/insuarance-type.component';
import { ContentValueComponent } from './content-value/content-value.component';
import { BasicCoverageComponent } from './basic-coverage/basic-coverage.component';
import { AdditionalCoverageComponent } from './additional-coverage/additional-coverage.component';
import { ChoosePlanComponent } from './choose-plan/choose-plan.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CurrencyFormatterDirective } from './directive/currency-formatter.directive';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatTooltipModule, MAT_DATE_LOCALE, MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material';
import { InsuredNomineeComponent as ModalComponent } from './modals/insured-nominee/insured-nominee.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HomecustpaymentlinkComponent } from './homecustpaymentlink/homecustpaymentlink.component';

@NgModule({
  declarations: [
    AppComponent,
    PaymentComponent,
    RazorPayFallbackComponent,
    PaymentSuccessComponent,
    OnlyNumericDirective,
    LoginComponent,
    HomeButtonComponent,
    CustomerSummaryComponent,
    CustomerLeadComponent,
    HomeComponent,
    PropertyTypeComponent,
    InsuaranceTypeComponent,
    ContentValueComponent,
    BasicCoverageComponent,
    AdditionalCoverageComponent,
    ChoosePlanComponent,
    CustomerDetailsComponent,
    CurrencyFormatterDirective,
    ModalComponent,
    HomecustpaymentlinkComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatTooltipModule,
    SlickCarouselModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-IN' },
  { provide: LOCALE_ID, useValue: 'en-IN' },
  {
    provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
    useValue: {
      showDelay: 100,
      hideDelay: 0, // default value
      touchendHideDelay: 100, // default value
    }
  }, DecimalPipe, DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]

})
export class AppModule { }
