export class ProductPolicyDetails{
    ProductType:string;
    ProductCode:string;
    ProductName:string;
    ILProductCode:string;
    subPolicyType:string;
    PlanDetails:ProductPlanDetails[];
}
export class ProductPlanDetails{
    PlanCode:string;
    PlanName:string;
    DisplayPlanName:string;
    PolicyType:string;
    PolicyTenures:any[];
    RiskCoverDetails:ProductRiskCoverDetails[];
}
export class ProductRiskCoverDetails{
    Year:number;
    RiskSIComponent:string;
    CoverDatails:ProductCoverDatails[];
}

export class ProductCoverDatails{
    CoverName:string;
    CoverType:string;
    AgeFrom:number;
    AgeTo:number;
    SIFrom:number;
    SITo:number;
    Rate:number;
    EightyDApplicable:string;
    EnteredSI:number;
    coverChecked:boolean=false;
}