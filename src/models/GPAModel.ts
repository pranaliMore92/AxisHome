import { SPDetailsModel } from "./ProposalRequestModel";

export class GPAQuoteCreate{
    PolicyStartDate:string;
    PolicyEndDate:string;
    policyTenure:number;
    preExistingIllness:boolean=false;
    Loading:number=0.0;
    Discount:number=0.0;
    InwardDate:string;
    InsuredDOB:string;
    SpouseDOB:string;
    Relation:string;
    SumInsured:string;
    StampDutyChargable:boolean=false;
    DealId:string;
    BusinessType:string;
    IsRegisteredCustomer:boolean=false;
    CorrelationId:string;
    ProductDetails:GPAProductDetails;
    TaxDetails:GPATaxDetails;
}

export class GPAProductDetails{
    ProductCode:string;
    PlanDetails:GPAPlanDetails[];
}

export class GPAPlanDetails{
    PlanCode:string;
    RiskSIComponentDetails:GPARiskSIComponentDetails[];
}

export class GPARiskSIComponentDetails{
    RiskSIComponent:string;
    CoverDetails:GPACoverDetails[];
}

export class GPACoverDetails{
    CoverCode:string;
    CoverName:string;
    CoverSI:string;
    Column1:string;
    Column2:string;
    Column3:string;
    Column4:string;
    Column5:string;
}

export class GPATaxDetails{
    GstServiceDetails:GPAGstServiceDetails[];
}

export class GPAGstServiceDetails{
    PartyStateName:string;
    ILGICStateName:string;
}

export class GPAQuoteRespone{
    floater:string;
    insuredDetails:string;
    policyType:string;
    policyStatus:string;
    policyStartDate:string;
    policyEndDate:string;
    basicPremium:number;
    totalTax:number;
    stampDuty:number;
    totalPremium:number;
    netPremium80D:number;
    totalPremium80D:number;
    taxAmount80D:number;
    message:string;
    status:boolean;
    statusMessage:string;
    correlationId:string;
    
}

export class GPAProposalRequest{
    ModeOfOperation:string="NEWPOLICY";
    BusinessType:string="New Business";
    ReferenceNumber:string;
    PolicyTenure:string;
    PolicyStartDate:string;
    PolicyEndDate:string;
    ILProductCode:string;
    SubProductCode:string;
    //ProductCode:string;
    FinancierDetails_PrefixSufix:string;
    FinancierDetails_Remarks:string;
    CoinsuranceType:string;
    SpecialConditionDescription:string;
    DealId:string;
    StampDutyApplicability:string;
    Commission:number=0;
    PolicyNumberChar:string;
    InteractionID:string;
    EffectiveDate:string;
    EffectiveTime:string;
    EndorsementWording:string;
    NILEndorsementTypeCode:number=0;
    NILEndorsementType:string;
    EndorsementTypeCode:number=0;
    TypeofEndorsement:string;
    TypeOfCalculation:string;
    RetainCancellationPremium:string;
    AlternatePolicyNo:string;
    BaseProductProposalNo:string;
    warranty:string;
    exclusionDetails:string;
    conditionDetails:string;
    clauseDetails:string;
    coinsuranceDetails:string;
    financierDetailse:string;
    loadingDiscount:string;
    installmentUserData:string;
    SpDetails:string;
    CorrelationId:string;
    _CorrelationId:string;
    FieldsGrid:FieldsGrid[];
    CustomerDetails:GPAProposalCustomerDetails;
    SPDetails:SPDetailsModel;
    insuredDataDetails:GPAInsuredDataDetails[]=[];
    riskDetails:GPAProposalriskDetails;
}

export class FieldsGrid{
    FieldName:string;
    FieldValue:string
}

export class GPAProposalCustomerDetails{
    CustomerType:string="Individual";
    CustomerName:string;
    DateOfBirth:string;
    PinCode:string;
    PANCardNo:string;
    Email:string;
    MobileNumber:string;
    AddressLine1:string;
    CountryCode:string;
    StateCode:string;
    CityCode:string;
    Gender:string;
    MobileISD:string;
    GSTDetails:string;
    AadharNumber:string;
    IsCollectionofform60:boolean=false;
    AadharEnrollmentNo:string;
    eIA_Number:string;
    CorelationId:string;
    CustomerID:string;
}

export class GPAInsuredDataDetails{
    InsuredName:string="";
    InsuredID:string;
    InsuredDOB:string="";
    InsuredAge:string;
    InsuredGender:string="";
    InsuredRelation:string="";
    PreIllness:string;
    InsuredPAN:string;
    InsuredAadhar:string;
    InsuredOccupation:string;
    InsuredEmailID:string;
    InsuredPassportNo:string;
    InsuredMobileNo:string;
    InsuredHeightInInches:string="";
    InsuredHeightInFeet:string="";
    InsuredWeight:string="";
    InsuredTitle:string="";
    InsuredBmi:string;
    InsuredApplicable:string="True";
}

export class GPAProposalRisksList{
    RiskSIComponent:string;
    BasisOfSumInsured:string;
    coverDetailsList:GPAPropasalCoverDetails[];
}

export class GPAPropasalCoverDetails{
    CoverDescription:string;
    SumInsured:string;
    Column1:string;
    Column2:string;
    Column3:string;
    Column4:string;
    Column5:string;
}

export class GPAProposalriskDetails{
    PlanCode:string;
    InsuredDateOfBirth:string;
    InwardDate:string;
    MasterPolicyNumber:string;
    PreExistingIllness:string;
    NomineeName:string;
    NomineeRelationship:string;
    NomineeDOB:string;
    AppointeeName:string;
    AppointeeRelationship:string;
    AppointeeDOB:string;
    RisksList:GPAProposalRisksList[];
}