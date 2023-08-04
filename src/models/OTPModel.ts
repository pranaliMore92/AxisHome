export class SendOTPResponseModel {
    AuthCode: string="";
    StatusCode: number=0;
    StatusMessage: string="";
    StatusDesc: string="";
}

export class VerifyOtpResponseModel {
    StatusCode: number=0;
    StatusMsg: string="";
    StatusDesc: string="";
}