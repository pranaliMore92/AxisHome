export class SendPaymentLinkRequestModel {
    EmailID: string;
    PolicyID: string;
    IsRazorPay: string;
    MobileNo: string;
    RequestType: string;
}


export class SendPaymentLinkResponseModel {
    CustomerLinkURL: string;
}