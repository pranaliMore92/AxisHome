
export class InsuredDetRC {
    chkEdit: string;
    chkSetAsDefault: string;
    chckAddress: string;
    CustomerName: string;
    DOB: string;
    ddMaritalStaus: string;
    LandlineNumber: string;
    ddHobby: string;
    ddOccupation: string;
    OccupationDtls: string;
    ddAnnualIncome: string;
    ddIDProof: string;
    IDProofDtls: string;
    Address1: string;
    Address2: string;
    Landmark: string;
    StateId: string;
    CityID: string;
    Pincode: string;
    EmailID: string;
    MobileNo: string;
    AltEmailID: string;
    AltMobileNo: string;
    PermanentAddress1: string;
    PermanentAddress2: string;
    PermanentAddLandmark: string;
    PermanentAddStateId: string;
    PermanentAddCityId: string;
    PermanentAddPincode: string;
}

export class CustomerGSTDetailsRC {
    GSTIN_NO: string;
    CONSTITUTION_OF_BUSINESS: string;
    CONSTITUTION_OF_BUSINESS_TEXT: string;
    CUSTOMER_TYPE: string;
    CUSTOMER_TYPE_TEXT: string;
    PAN_NO: string;
    GST_REGISTRATION_STATUS: string;
    GST_REGISTRATION_STATUS_TEXT: string;
}

export class ODNomineeDetRC {
    NomineeName: string;
    Relation: string;
    RelationID: string;
    Age: string;
}

export class ODNomineePassDetRC {
    NomineeName: string;
    Relation: string;
    Age: string;
}

export class AdditionalCovrEditRC {
    ddlGeoExtension: string;
    IsLiabilityToPaidDiver: string;
    NoOfPaidDiver: string;
    IsLeagelliabilityToEmployee: string;
    NoOfEmployee: string;
    ddlPAForUnNamedPassenger: string;
    ddlPAForNamedPassenger: string;
    txtPANamedPass: string;
    rdbzeroDepCover: string;
    ddZeroDepValue: string;
    rdbAdditionalDeductible: string;
    ddlNCBProtectionCoverPlan: string;
    ddlRSACode: string;
    ddlRSAValue: string;
    ddlGCCPlan: string;
    lblDaillyAllowance1: string;
    lblMinVehicleRepairDays1: string;
    lblNoofdaysCoverage1: string;
    ReturnToInvoice: string;
    Consumables: string;
    rdbEngine: string;
    rdbTyreProtect: string;
    ddlKeyProtectCode: string;
    ddlKeyProtectValue: string;
    ddlPersonalBelongingsKey: string;
    ddlPersonalBelongingsValue: string;
    ConsumablesPP: boolean;
    rdbzeroDepCoverPP: boolean;
    ReturnToInvoicePP: boolean;
    rdbEnginePP: boolean;
}

export class AccessoriesEditRC {
    ValueOfElecticalAccessories: string;
    ValueOfNonElecticalAccessories: string;
    ddlLPG_CNGkit: string;
    ValueOfLPG_CNGkit: string;
    IsElectricalPP: boolean;
    IsNonElectricalPP: boolean;
}

export class PersonalDetailsEditRC {
    ddlOccupation: string;
    ddlFamilySize: string;
    ddlDrivingPerson: string;
    ddlMaritalStatus: string;
    ddlEstimatedMonthlyMileageCode: string;
    ddlEstimatedMonthlyMileageValue: string;
    txtLast3yrsClaims: string;
}

export class AddDiscountLoadingEditRC {
    IsARAI_AntiTheft_ddSafetyDevice: string;
    IsDriverMemberAutomobileAssociation: string;
    DriverAAMembershipNo: string;
    VoluntaryDeductible: string;
    DealerDiscount_Loading: string;
    DealerDiscount_Loading_Value: string;
}

export class DocumentWaiverValueRC {
}

export class RnRecalculateRequest {
    PolicyNo: string;
    PolicyType: string;
    UserRole: string = "AGENT";
    IPAddress: string;
    POLICY_FOR: string = "";
    RegistrationType: string;
    GSTStateCode: string;
    GSTStateName: string;
    RegistrationNo: string;
    EngineNo: string;
    ChassisNo: string;
    PolicyTenureSeleted: string;
    DealID: string;
    IsBreakinPolicy: boolean;
    IsVehicleLocationSame: boolean;
    PP_Selected: string;
    PPplanCode: string;
    PPplanName: string;
    rdlClaimStatus: string;
    MotorRenewalEdit: string;
    IsInsuredModify: string;
    ShowRoomPrice: string;
    InsuredDet: InsuredDetRC;
    GSTApplicable: string;
    UINApplicable: string;
    CustomerGSTDetails: CustomerGSTDetailsRC;
    isGSTRegistered: boolean;
    IsODNominee: boolean;
    ODNomineeDet: ODNomineeDetRC;
    IsODNomineePass: string;
    ODNomineePassDet: ODNomineePassDetRC;
    IsSumInsuredDetailsModify: string;
    AdditionalCovrEdit: AdditionalCovrEditRC;
    AccessoriesEdit: AccessoriesEditRC;
    PersonalDetailsEdit: PersonalDetailsEditRC;
    AddDiscount_LoadingEdit: AddDiscountLoadingEditRC;
    rdbDocumentWaiver: boolean;
    DocumentWaiverValue: DocumentWaiverValueRC;
    rdbBreakinLoadingWaiver: boolean;
    ValidDrivingLicense: boolean;
    PACoverWaiver: boolean;
}
