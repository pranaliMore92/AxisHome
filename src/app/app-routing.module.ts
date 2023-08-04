import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  AuthGuardService as AuthGuard
} from 'src/services/auth-guard.service';
import { PaymentComponent } from './payment/payment.component';
import { RazorPayFallbackComponent } from './razor-pay-fallback/razor-pay-fallback.component';
import { LeaddetailsComponent } from './leaddetails/leaddetails.component';
import { LoginComponent } from './login/login.component';
import { CustomerSummaryComponent } from './customer-summary/customer-summary.component';
import { CustomerLeadComponent } from './customer-lead/customer-lead.component';
import { HomeComponent } from './home/home.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { HomecustpaymentlinkComponent } from './homecustpaymentlink/homecustpaymentlink.component';

const routes: Routes = [
  { path: 'leaddetails', component: LeaddetailsComponent },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'razorpayfallback', component: RazorPayFallbackComponent, canActivate: [AuthGuard] },
  { path: 'getcustomerdetails', component: CustomerLeadComponent, canActivate: [AuthGuard] },
  { path: 'customersummary', component: CustomerSummaryComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'paymentsuccess', component: PaymentSuccessComponent },
  { path: 'homecustpaymentlink', component: HomecustpaymentlinkComponent },
  // { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
