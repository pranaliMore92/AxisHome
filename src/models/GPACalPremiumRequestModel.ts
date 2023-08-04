import { SpDetails } from "./PPAPSaveEditPraposalRequest";

export class GPACalPremiumRequest {
    DealId: string;
    DateOfBirth: string;
    SpouseDateOfBirth: string;
    Tenure: string;
    PlanCode: string;
    SumInsured: string;
    Occupation: string;
    PartyStateName: string;
    CorrelationId: string;
}

export class OccupationResponse {
    StatusCode: Number;
    StatusType: string;
    StatusMessage: string;
    OccupationLists: OccupationListsDetails[];
}

export class OccupationListsDetails {
    OCCUPATIONID: Number;
    OCCUPATION: string;
}

export class GPACalPremiumResponse {
    policyStatus: string;
    policyStartDate: string;
    policyEndDate: string;
    transactionType: string;
    planCode: string;
    basicPremium: Number;
    totalTax: any;
    totalPremium: Number;
    message: string;
    status: string;
    statusMessage: string;
    correlationId: string;
    productDetails: GPAProductDetails;
}
export class GPAProductDetails {
    ProductCode: string;
    productName: string;
    planDetails: GPAPlanDetails[];
}

export class GPAPlanDetails {
    PlanCode: string;
    planName: string;
    RiskSIComponentDetails: GPARiskSIComponentDetails[];
}

export class GPARiskSIComponentDetails {
    RiskSIComponent: string;
    CoverDetails: GPACoverDetails[];
}

export class GPATaxDetails {
    GstServiceDetails: GPAGstServiceDetails[];
}

export class GPAGstServiceDetails {
    PartyStateName: string;
    ILGICStateName: string;
}

export class CreateGPAPraposalRequest {
    CorrelationId: string;
    AlternatePolicyNo: string;
    PlanName: string;
    DealId: string;
    PolicyTenure: string;
    StartDate: string;
    EndDate: string;
    PaymentMode: string;
    CDBGAccountNo: string;
    InwardDate: string;
    Gender: string;
    DateOfBirth: string;
    Age: string;
    Name: string;
    NomineeRequired: string;
    Nominee: string;
    NomineeDateOfBirth: string;
    NomineeRelation: string;
    Relation: string;
    Occupation: string;
    CustomerDetails: GPACustomerDetails;
    CoverDetails: GPACoverDetails[];
    SpDetails: SpDetails;
}

export class GPACustomerDetails {
    CustomerType: string;
    CustomerName: string;
    DateOfBirth: string;
    PinCode: string;
    PANCardNo: string;
    Email: string;
    MobileNumber: string;
    AddressLine1: string;
    CountryCode: string;
    StateCode: string;
    CityCode: string;
}

export class GPACoverDetails {
    CoverDescription: string;
    CoverGroups: string;
    SumInsured: string;
    Rate: string;
    SectionExtention: string;
}

export class CreateGPAPraposalResponse {
    proposalNumber: string;
    customerId: string;
    message: string;
    status: string;
    statusMessage: string;
    correlationId: string;
    gcreferenceno: string;
    gcnetpremium: string;
    gcservicetax: string;
    gctotalpremium: string;
    gstserviceresponse: any;
    quoteproposalno: string;

}

export class GPAOtherCustomerRequest {
    TitleText: string;
    TitleValue: number;
    Name: string;
    DateOfBirth: string;
    OccupationValue: string;
    OccupationText: string;
}