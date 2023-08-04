export class PPAPSaveEditQuote
{
    UserType:string;
   ProductType:string;
   IpAddress:string;
   SubProduct:string;
   SubProductType:string;
   DOB:string;
   Tenure:string;
   IsJammuKashmir:Boolean;
   Occupation:string;
   PlanCode:string;
   GSTStateCode:string;
   GSTStateName:string;
   isGSTRegistered:Boolean;
   SaveQuote:Boolean;
}

export class PPAPSaveEditQuoteResponse{
    
     HealthDetails:HealthDetails;
     StatusCode:string;
     StatusMsg:string;
     StatusDesc:string;
     ErrorText:string
}

export class HealthDetails{
    ProductType:string;
    SubProductType:string;
    SumInsured:string;
    QuoteId:string;
    Tenure:string;
    BasicPremium:string;
    TotalTax:string;
    TotalPremium:string;
    PFQuoteID:string;
    GSTStateCode:string;
    GSTStateName:string;
    TaxType:string
 };