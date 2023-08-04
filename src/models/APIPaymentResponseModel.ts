export class APIPaymentResponseModel {
    PolicyId: number;
    CustomerId: number;
    PfCustomerId: string;
    PfProposalNo: string;
    StatusCode: number;
    StatusMsg: string;
    StatusDesc: string;
}

export class CommonResponseModel{
    StatusCode: number;
    StatusMsg: string;
    StatusDesc: string;
}