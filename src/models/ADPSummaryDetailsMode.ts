
export class MobInsured {
    MobPolicyId: number;
    MemberType: string;
    InsuredTitle: string;
    InsuredName: string;
    InsuredDOB?: string;
    InsuredGender: string;
    InsuredRelation: string;
    ISPED: string;
    InnsuredPED: string;
    InsuredHeightInFeet: string;
    InsuredHeightInInches: string;
    InsuredWeight: string;
    IsAddonSix: string;
    InsuredAge: number;

    WasPreviouslyInsured: string;
    prevSumInsured: string;
    InsuredSince: string;
    PolicyWaiverPeriod: string;

    insuredAge: string; //for internal purpose
}

export class MobHospifundInsured {
    MobPolicyId: number;
    CoverName: string;
    SumInsured: number;
    NoOfDays: number;
}

export class ADPSummaryDetailsResponseModel {
    Id: number;
    Applicantname: string;
    Applicantemail: string;
    Applicantmobile: string;
    Applicantdob: string;
    PropertyType: string;
    ropertyPinCode: any;
    PropertyValue: string;
    CostOfConstruction: any;
    PropertyPinCode: string;
    CarpetArea: any;
    StructureValue: any;
    HomeContentElectrical: string;
    HomeContentFurniture: string;
    HomeContentOthers: string;
    HomeContentValuables: string;
    CoverDetails: string;
    ContentData: string;
    FinancierName: string;
    AnnualIncome: string;
    Producttype: string;
    Subproducttype: string;
    Policytype: string;
    PolicyStatus: string;
    ClientType: string;
    IpAddress: string;
    PaymentStatus: string;
    ApplicantTitle: string;
    ApplicantGender: string;
    ApplicantAddress1: string;
    ApplicantAddress2: string;
    ApplicantCity: string;
    ApplicantState: string;
    ApplicantPincode: string;
    BasicPremium: Number;
    GST: Number;
    TotalPremium: Number;
    PolicyStartDate?: string;
    PolicyEndDate?: string;
    PolicyTenure: string;
    PolicyID: string;
    PF_PROPOSALNO: string;
    PF_POLICYID: string;
    CreatedOn: string;
    ModifiedOn: string;
    PaymentReceivedOn?: string;
    PaymentLinkSentOn?: string;
    NomineeTitle: string;
    NomineeName: string;
    NomineeRelation: string;
    NomineeDOB: string;
    NomineeRelationID: string;
    Occupation: string;
    IsFeedfile: string;
    RegistrationNo: string;
    EngineNo: string;
    ChassisNo: string;
    RTO: string;
    Manufacturer: string;
    VehicleModel: string;
    CC: string;
    VehicleRegistrationDate?: string;
    YearOfManufacture: string;
    AdditionalCovers: string;
    IDV: string;
    ProductName: string;
    PlanName: string;
    ProductCode: string;
    PlanCode: string;
    SubLimit: string;
    SumInsured: string;
    GSTINNo: string;
    SpCode: string;
    SpName?: string;
    ChannelName?: string;
    CustomerReferenceNumber?: string;
    PrimaryRMCode?: string;
    SecondaryRMCode?: string;
    BancaField01?: string;
    BancaField02?: string;
    BancaField03?: string;
    ISBreakin?: string;
    IsAddonOne?: string;
    DealId: string;
    BreakinId: string;
    AgentId: string;
    MobInsureds: MobInsured[];
    StatusCode: number;
    StatusMsg: string;
    StatusDesc: string;
    ErrorText?: string;
    IsAffluent: string;
    IsUnderwriterCase: string;
    RefMessage: string;
    RiskStartDate: string;
    RiskEndDate: string;
    OccupancyType: string;
    OccupancyDesc: string;
    HazardCode: string;
    RiskCode: string;
    EqZone: string;
    IsPropertyRented: string;
    
    FinancierBranch: string;
    IsHypothetication: string;
    SIBuildings: string;
    SIContents: string;
    SIStock: string;
    ServiceTax: string;
    StampDuty: string;
    RsmdRate: string;
    StfiRate: string;
    EQRate: string;
    FlexaRate: string;
    BasicRate: string;
    TotalRate: string;
    TerriorismRate: string;
    CustaddressLine1: string;
    CustaddressLine2: string;
    CustomerCity: string;
    CustomerState: string;
    CustomerPincode: string;
    Descrption: string;
    RiskDuration: string;
    ContactPersonName: string;
    IsLongTermDwelling: string;
    ISTerrorism: string;
    ILLocationCode: string;
    BuildingRiskDescription: string;
    ContentStockDescrption: string;
    CorrelationId: string;
    BreakInDays: string;
    BasicODPremium: string;
    BusinessType: string;
    
    PreviousInsurer: string;
    PrevYearsPolicyNo: string;
    PrevYearsClaimStatus: string;
    PrevPolicyNCB: string;
    MobHospifundInsureds: ADPCoverDetailsModel[];
    CustAccNo: string;
    PAN: string;
    StateCode: string;
    QCAssignedTo: string;

    //added for hportability
    PedInPreviousPolicy: string;
    TypeOfPolicy: string;
    PrevPolicyStartDate: string;
    PrevPolicyEndDate: string;
    PrevPolicyPremium: string;
    PrevPolicySumInsured: string;
    HT_Remark: string;

    //added for direct debit
    EncryptedpolicyId: string;
    BreakinStatus: number;
    DirectDebitRefId?: any;
    IsCustomerPID?: any;
    UserType?: any;
    IPGPayment?: any;
    QuotePolicyID?: any;
    IsRelationship?: any;
    AddOn1?: any;
    AddOn1Varient?: any;
    AddOn2?: any;
    AddOn2Varient?: any;
    AddOn3?: any;
    AddOn3Varient?: any;
    VolDedutible?: any;
    SoftLessCopy?: any;
    RazorPayHotPayID?: any;
    IsSentInFeedFile?: any;

}

export class ADPCoverDetailsModel {
    MobPolicyId: string;
    CoverName: string;
    SumInsured: string;
    NoOfDays: string;
}

export class FS_ADPSummaryDetailsResponseModel {
    Polices: ADPSummaryDetailsResponseModel[];
    StatusCode: number;
    StatusMsg: string;
    StatusDesc: string;
    ErrorText?: any;
}