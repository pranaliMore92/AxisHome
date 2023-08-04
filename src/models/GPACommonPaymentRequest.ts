export class GPACommonPaymentRequest{
    TransType:String;
   GatewayReturnURL:String;
   PolicyIDs:String;
   PayerType:String;
   ModeID:Number;
   UserRole:String;
   IPAddress:String;
   PaymentMode:String;
   PaymentAmount:Number;
}

export class GPACommonPaymentResponse{
    PaymentID:String;
   EPaymentID:String;
   PFPaymentID:String;
   EPFPaymentID:String;
   TransactionID:String;
   GatewayURL:String;
   RazorOrderID:String;
   PublicKey:String;
   StatusCode:String;
   StatusType:String;
   ErrorText:String;
   RazorPayWalletPaymentId:String
}

export class RazorPayPaymentProcess{
    
}