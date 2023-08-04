export class UpdatePolicyStatusRequestModel {
    PolicyId: string;
    PolicyStatus: string;
    PaymentStatus: string;
}


export class UpdatePolicyStatusResponseModel {
    StatusCode: number;
    StatusMsg: string;
    StatusDesc: string;
}