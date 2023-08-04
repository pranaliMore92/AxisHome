export class CommonPaymentRequestModel{
     TransType :string;
     ModeID :number;
     UserRole:string;
     IPAddress :string;
     GatewayReturnURL :string;
     PolicyIDs :string;
     PayerType :string;
     PaymentMode :string;
}

export class CommonPaymentResponseModel{
    PaymentID :string;
    EPaymentID :string;
    PFPaymentID :string;
    EPFPaymentID :string;
    TransactionID :string;
    GatewayURL :string;
    RazorOrderID :string;
    PublicKey :string;
    StatusCode :number;
    StatusType :string;
    ErrorText :string;
}