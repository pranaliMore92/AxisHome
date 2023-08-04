
export class ProposalRequestModel {
    BusinessType: string;
    CustomerType: string;
    DealId: string;
    PolicyStartDate: string;
    PolicyEndDate: string;
    VehicleMakeCode: number;
    VehicleModelCode: number;
    RTOLocationCode: number;
    EngineNumber: string;
    ChassisNumber: string;
    RegistrationNumber: string;
    ManufacturingYear: number;
    DeliveryOrRegistrationDate: string;
    FirstRegistrationDate: string;
    ExShowRoomPrice: number;
    IsValidDrivingLicense: boolean;
    IsMoreThanOneVehicle: boolean;
    IsNoPrevInsurance: boolean;
    IsTransferOfNCB: boolean;
    TransferOfNCBPercent: number;
    IsLegalLiabilityToPaidDriver: boolean;
    IsPACoverOwnerDriver: boolean;
    IsPACoverWaiver: boolean;
    IsVehicleHaveLPG: boolean;
    IsVehicleHaveCNG: boolean;
    SIVehicleHaveLPG_CNG: number;
    SIHaveElectricalAccessories: number;
    SIHaveNonElectricalAccessories: number;
    IsPACoverUnnamedPassenger: boolean;
    SIPACoverUnnamedPassenger: number;
    IsFiberGlassFuelTank: boolean;
    IsVoluntaryDeductible: boolean;
    VoluntaryDeductiblePlanName: number;
    IsAutomobileAssocnFlag: boolean;
    IsAntiTheftDisc: boolean;
    IsHandicapDisc: boolean;
    IsExtensionCountry: boolean;
    ExtensionCountryName: string;
    IsGarageCash: boolean;
    GarageCashPlanName: number;
    ZeroDepPlanName: string;
    RSAPlanName: string;
    LossOfPersonalBelongingPlanName: string;
    IsRTIApplicableflag: boolean;
    IsTyreProtect: boolean;
    OtherLoading: number;
    OtherDiscount: number;
    GSTToState: string;
    CorrelationId: string;
    CustomerDetails: CustomerDetails;
    NomineeDetails: NomineeDetails;
    FinancierDetails: FinancierDetails;
    AutomobileAssociationNumber: string;
    Tenure: string;
    TPTenure: string;
    PACoverTenure: string;
    IsEngineProtectPlus: boolean;
    IsConsumables: boolean;
    KeyProtectPlan: string;
    TPStartDate: string;
    TPEndDate: string;
    TPPolicyNo: number;
    TPInsurerName: string;
    SPDetails: SPDetailsModel;
    ChannelSource: string;
    AlternatePolicyNo: string;
    CKYCID: string;
    EKYCid: string;
    pepFlag: boolean;
    ilkycReferenceNumber: string;
    correspondingAddress: correspondingAddress;
    SkipDedupeLogic: boolean;
    isGSTINApplicable : boolean=false;
    ConstitutionOfBusinessValue: string = "";
    GSTCustomerType: string = "";
    GSTRegiStatusValue: string = "";
    GSTInNumber: string = "";
    GSTPANNumber: string = "";

}
export class GSTINDetailsModel{
    isGSTINApplicable:boolean = false;
    ConstitutionOfBusinessValue:string ="";
    GSTPANNumber:string="";
    GSTCustomerType:string="";
    GSTRegiStatusValue:string="";
    GSTInNumber:string="";
  }


  export class correspondingAddress {
    AddressLine1: string;
    AddressLine2: string;
    CountryCode: number;
    Statecode: number;
    CityCode: number;
    Pincode: number;
}
export class NomineeDetails {
    NameOfNominee: string;
    NomineeDOB: string;
    Age: number;
    Relationship: string;
}

export class FinancierDetails {
    FinancierName: string;
    BranchName: string;
    AgreementType: string;
}

export class CustomerDetails {
    CustomerTitle: string;
    CustomerType: string;
    CustomerName: string;
    DateOfBirth: string;
    PinCode: string;
    PANCardNo: string;
    Email: string;
    MobileNumber: string;
    AddressLine1: string;
    CountryCode: number;
    StateCode: number = 0;
    StateTxt: string;
    CityCode: number = 0;
    CityTxt: string;
    AadharNumber: string;
    OccupationTxt: string;
    correspondingAddress :correspondingAddress;
}

export class SPDetailsModel {
    alternateRMCode: string;
    alternateRMName: string;
    customerReferenceNumber: string;
    channelName: string;
    primaryRMCode: string;
    secondaryRMCode: string;
    bancaField01: string;
    bancaField02: string;
    bancaField03: string
}
