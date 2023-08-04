import { ResponseMessageModel } from './ResponseMessageModel';

export class PolicyRenewRequestModel{
    PolicyNo: string;
    PolicyType: number;
    UserRole: string;
    POLICY_FOR: string;
}

export class ODPolicyDetail{
	TPStartDate: string;
	TPEndDate: string;
	TPPolicyNo: string;
	TPInsurerName: string;
	PolicyTenure: number;
}

export class CustGSTDetails{
    GSTNNumber: string;
    PANNo: string;
    ConstitutionOfBusiness: number;
    CustomerType: number;
    GSTRegistrationStatus: number;
    ConstitutionOfBusinessText: string;
    CustomerTypeText: string;
    GSTRegistrationStatusText: string;
    fromStateCode: string;
    fromState: string;
    toStateCode: string;
    toState: string;
    GSTTaxExempted: string;
    GSTExemptionApplicable: string;
    GSTApplicable: string;
    UINApplicable: string;
}

export class RnCustomer{
    Cust_Salutation: string;
    Cust_Name: string;
    Cust_DOB: string;
    Cust_Ocupation: string;
    Cust_Hobby: string;
    Cust_Email: string;
    Cust_ddMaritalStaus: string;
    Cust_OccupationDtls: string;
    Cust_ddAnnualIncome: string;
    Cust_ddIDProof: string;
    Cust_txtIDProofDtls: string;
    Cust_AltEmail: string;
    Cust_AddressLine1: string;
    Cust_AddressLine2: string;
    Cust_CityName: string;
    Cust_CityID: number;
    Cust_StateName: string;
    Cust_StateID: number;
    Cust_PinCode: string;
    Cust_PinCodeID: number;
    Cust_Landmark: string;
    Cust_MobileNo: string;
    Cust_AltMobileNo: string;
    Cust_txtLandlineNumber: string;
    Cust_PANNO: string;
    chckAddress: boolean;
    Cust_PermanentAddressLine1: string;
    Cust_PermanentAddressLine2: string;
    Cust_PermanentCityName: string;
    Cust_PermanentCityID: number;
    Cust_PermanentStateName: string;
    Cust_PermanentStateID: number;
    Cust_PermanentPinCode: string;
    Cust_PermanentPinCodeID: number;
    Cust_PermanentLandmark: string;
    Cust_GSTDetails: CustGSTDetails;
}

export class RnPPNominee
{
    Nominee_Name: string;
    Nominee_Salutation: string;
}

export class PPPlanDetail
{
    PPplanID: number;
    PPplanName: string;
    PPPremium: number;
}

export class Insured
{
    InsurerName: string;
    Address1: string;
    Address2: string;
    CityName: string;
    CityID: number;
    StateName: string;
    StateID: number;
    PinCode: string;
    PinCodeID: number;
    MobileNo: string;
}

export class NomineePAOwner
{
    ODNomineeName: string;
    ODNomineeAge: number;
    ODNomineeRelation: string;
    ODNomineeRelationID: number;
}

export class NomineePANamedPassngr
{
    ODNomineeNPName: string;
    ODNomineeNPAge: number;
    ODNomineeNPSI: string;
    ODNomineeNPRelation: string;
    ODNomineeNPRelationID: number;
}

export class VehicleDetails
    {
        Vehicle_MakeID: number;
        Vehicle_MakeName: string;
        Vehicle_ModelID: number;
        Vehicle_ModelName: string;
        Vehicle_RTOId: number;
        Vehicle_RTOName: string;
        Vehicle_RegistrationNo: string;
        Vehicle_EngineNumber: string;
        Vehicle_ChassisNo: string;
        Vehicle_YearOfManufac: string;
        Vehicle_NCBloadingPerc: any;
        Vehicle_NCBloadingPercValue: string;
        Vehicle_ClaimStatus: any;
        Vehicle_Usage: string;
        Vehicle_Driven_By: string;
        Area_Of_Operation: string;
        ValidDrivingLicense: boolean;
    }



    export class SIDetails
    {
        SIDetails_IDV: number;
        SIDetails_ElecACCval: number;
        SIDetails_NonElecAccval: number;
        SIDetails_CNGLPGval: number;
    }

    export class RenewPolicyOwnDamage
    {
        OD_BasicPremium: number;
        OD_ElecPremium: number;
        OD_BifuelKitPremium: number;
        OD_TrailerImt30Title: string;
        OD_TrailerImt30: number;
        OD_NonElecPremium: number;
        OD_zDPlan: string;
        OD_ZeroDepCoverVisible: boolean;
        OD_ZDpremium: number;
        OD_RSACoverVisible: boolean;
        OD_RSAPremium: number;
        OD_EngineProtectPlusVisible: boolean;
        OD_EngineProtectPlusPremium: number;
        OD_TyreProtectPremium: number;
        OD_KeyProtectVisible: boolean;
        OD_TyreProtectVisible: boolean;
        OD_KeyProtectPremium: number;
        OD_LssofPrsnlBlngVisible: boolean;
        OD_PersonalBelongingPremium: number;
        OD_ConsumablesCoverVisible: boolean;
        OD_ConsumablesPremium: number;
        OD_OnRoadCharge: string;
        OD_ReturnToInvoiceCoverVisible: boolean;
        OD_RTIPremium: number;
        OD_GCPlan: string;
        OD_GarageCashCoverVisible: boolean;
        OD_GarageCashPremium: number;
        OD_NCBPlan: string;
        OD_NCBVisible: boolean;
        OD_NCBProtectionPremium: number;
        OD_DrivingTuitionPremium: number;
        OD_ForgnAmbsyTitle: string;
        OD_ForgnAmbsyPremium: number;
        OD_GeoExtPremium: number;
        OD_GlassTankPremium: number;
        OD_SubtotalPremium: number;
        OD_FinalPremium: number;
    }


    export class RenewPolicyDiscount
    {
        Disc_AntiTheftPremium: number;
        Disc_VDPlan: string;
        Disc_voluntaryDeductVisible: boolean;
        Disc_voluntaryDeductPremium: number;
        Disc_AutoMembPremium: number;
        Disc_Vintagecarimt19Title: string;
        Disc_Vintagecarimt19Premium: number;
        Disc_3wTitle: string;
        Disc_3wPremium: number;
        Disc_OwnTitle: string;
        Disc_OwnPremium: number;
        Disc_SideCarTitle: any;
        Disc_SideCarPremium: number;
        Disc_LmtOwnTitle: any;
        Disc_LmtOwnPremium: number;
        Disc_HandicapedPremium: number;
        Disc_NcbPerc: number;
        Disc_NCBPremium: number;
        Disc_DiscTotalPremium: number;
    }

    export class RenewPolicyLiability
    {
        Lbtly_TPLBasicLiabiliyPremium: number;
        Lbtly_TrailerImt30TpTitle: any;
        Lbtly_TrailerImt30TpPremium: number;
        Lbtly_BifuelVisible: boolean;
        Lbtly_TPLBiFuelKitPremium: number;
        Lbtly_DrivTutTpTitle: any;
        Lbtly_DrivTutTpPremium: number;
        Lbtly_GeogExtTpPremium: number;
        Lbtly_UnnamedPassPremium: number;
        Lbtly_PANamedPassVisible: boolean;
        Lbtly_NamedPassengerPremium: number;
        Lbtly_PACvrTitle: any;
        Lbtly_PAforPaidDCCLiability: number;
        Lbtly_TPLOwnerDriverLiabilityPremium: number;
        Lbtly_TPLPaidDriverLiabilityPremium: number;
        Lbtly_TPLpaidEmployeeLiabilityPremium: number;
        Lbtly_TPLpaidWorkmenLiabilityPremium: number;
        Lbtly_TPLAddPACoverPremium: number;
        Lbtly_TPLSubTotoalliabPremium: number;
        Lbtly_TppdDiscPremium: number;
        Lbtly_LmtOwnPremTpTitle: any;
        Lbtly_LmtOwnPremTpPremium: number;
        Lbtly_OwnPremTpPremium: number;
        Lbtly_TPLSubtotalPAliabilityPremium: number;
        Lbtly_TPLTotalLiabilityPremium: number;
    }

    export class RenewPolicyInstaDetails
    {
        isInstaAvailable: boolean;
        StatusMessage: any;
        Balance: any;
        TotalCreditLimit: any;
        ConsumedCreditLimit: any;
        AccountLockDays: any;
    }

    export class TenurePremium
    {
        TenurePremiumSelected: boolean;
        TenureYear: number;
        TotalTenurePremium: string;
        PackagePremium: number;
        GSTMsg: string;
        GSTAmt: number;
        SGSTAmt: number;
        CGSTAmt: number;
        IGSTAmt: number;
        BreakinLoading: number;
        OtherLoading: number;
        TotalLoading: number;
        OwnDamage: RenewPolicyOwnDamage;
        Discount: RenewPolicyDiscount;
        Liability: RenewPolicyLiability;
        InstaDetails: RenewPolicyInstaDetails;
    }

    export class RenewPolicySPDetails
    {
        AlternateRMCode: string;
        AlternateRMName: string;
        CustomerReferenceNumber: string;
        ChannelName: string;
        PrimaryRMCode: string;
        SecondaryRMCode: string;
        BancaField01: string;
        BancaField02: string;
        BancaField03: string;
    }

    export class PolicyRenewResponseModel
    {
        OD_PolicyDetails: ODPolicyDetail[];
        StatusCode: number;
        StatusType: string;
        ErrorText: string;
        DealId: string[];
        DocumentWaiver: boolean;
        IsDocumentWaiver: any;
        ddlInteractionType: any;
        Breakinloading_Premium: number;
        OtherLoading_Premium: number;
        TotalLoading_Premium: number;
        isJammuKashmir: boolean;
        TaxType: string;
        ProductName: string;
        OwnerType: string;
        rdlClaimStatus: boolean;
        PP_Selected: boolean;
        PP_Health_Deal: any;
        PP_Premium: string;
        RnCustomer: RnCustomer;
        RnPPNominee: RnPPNominee;
        PPPlanDetails: PPPlanDetail[];
        Insured: Insured;
        IsODNominee: boolean;
        Nominee_PA_Owner: NomineePAOwner;
        IsODNomineePass: boolean;
        Nominee_PA_NamedPassngr: NomineePANamedPassngr;
        VehicleDetails: VehicleDetails;
        SIDetails: SIDetails;
        TenurePremium: TenurePremium[];
        IsRenewal: string;
        PrevPolicy: any;
        PolicyStartDate: string;
        PolicyEndDate: string;
        PurchaseDate: string;
        PACoverWaiver: boolean;
        BreakinLoadingWaiver: boolean;
        IDVDeviation: boolean;
        OtherDiscount: boolean;
        IsOD: boolean;
        SPDetails: SPDetails;
    }

    export class PolicyRenewResponseViewModel
    {
        PolicyResponse: PolicyRenewResponseModel;
        Res: ResponseMessageModel;
    }

    export class SPDetails
    {
        AlternateRMCode: string;
        AlternateRMName: string;
        CustomerReferenceNumber: string;
        ChannelName: string;
        PrimaryRMCode: string;
        SecondaryRMCode: string;
        BancaField01: string;
        BancaField02: string;
        BancaField03: string;
    }

    export class VehicleUsageModel
    {
        SeqNo: number;
        FieldValue: string;
        ProductCode: string;
        StartDate: string;
        EndDate: string;
    }