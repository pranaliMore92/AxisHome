export class InsuredDet
    {
        chkEdit: string;
        chkSetAsDefault: string;
        chckAddress: string;
        ddTitle: string;
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
        PANNO: string;
        PermanentAddress1: string;
        PermanentAddress2: string;
        PermanentAddLandmark: string;
        PermanentAddStateId: string;
        PermanentAddCityId: string;
        PermanentAddPincode: string;
    }

    export class CustomerGSTDetails1
    {
        GSTIN_NO: string;
        CONSTITUTION_OF_BUSINESS: string;
        CONSTITUTION_OF_BUSINESS_TEXT: string;
        CUSTOMER_TYPE: string;
        CUSTOMER_TYPE_TEXT: string;
        PAN_NO: string;
        GST_REGISTRATION_STATUS: string;
        GST_REGISTRATION_STATUS_TEXT: string;
    }

    export class ODNomineeDet
    {
        NomineeName: string;
        Relation: string;
        RelationID: string;
        Age: string;
    }

    export class ODNomineePassDet
    {
        NomineeName: string;
        Relation: string;
        Age: string;
    }

    export class AdditionalCovrEdit
    {
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
        ddlKeyProtectCode: string; // Newly Added
        ddlKeyProtectValue: string; // New
        ddlPersonalBelongingsKey: string; // New
        ddlPersonalBelongingsValue: string; // New
        ConsumablesPP: boolean;
        rdbzeroDepCoverPP: boolean;
        ReturnToInvoicePP: boolean;
        rdbEnginePP: boolean;
    }

    export class AccessoriesEdit
    {
        ValueOfElecticalAccessories: string;
        ValueOfNonElecticalAccessories: string;
        ddlLPG_CNGkit: string;
        ValueOfLPG_CNGkit: string;
        IsElectricalPP: boolean;
        LS_R_value_EA: string;
        IsNonElectricalPP: boolean;
        LS_R_value_NEA: string;
    }

    export class PersonalDetailsEdit
    {
        ddlOccupation: string;
        ddlFamilySize: string;
        ddlDrivingPerson: string;
        ddlMaritalStatus: string;
        ddlEstimatedMonthlyMileageCode: string;
        ddlEstimatedMonthlyMileageValue: string;
        txtLast3yrsClaims: string;
    }

    export class AddDiscountLoadingEdit
    {
        IsARAI_AntiTheft_ddSafetyDevice: string;
        IsDriverMemberAutomobileAssociation: string;
        DriverAAMembershipNo: string;
        VoluntaryDeductible: string;
        DealerDiscount_Loading: string;
        DealerDiscount_Loading_Value: string;
    }

    export class DocumentWaiverValue
    {
        chkRCWaiver: boolean;
        chkDocumentIDWaiver: boolean;
        chkDeclarationWaiver: boolean;
        chkPYPWaiver: boolean;
    }

    export class RenewProposalRequestModel
    {
        PolicyNo: string;
        PolicyType: string;
        UserRole: string;
        IPAddress: string;
        POLICY_FOR: string;
        RegistrationType: string;
        GSTStateCode: string;
        GSTStateName: string;
        RegistrationNo: string;
        VehicleUsage: string;
        VehicleDrivenBy: string;
        AreaOfOperation: string;
        EngineNo: string;
        ChassisNo: string;
        PolicyTenureSeleted: string;
        DealID: string;
        IsBreakinPolicy: boolean;
        IsVehicleLocationSame: boolean;
        IsSelfInspection: boolean;
        InspectionTypeDesc: string;
        IsManualCovernote: boolean;
        ManualCovernoteNo: string;
        PP_Selected: string;
        PPplanCode: string;
        PPplanName: string;
        rdlClaimStatus: string;
        MotorRenewalEdit: string;
        IsInsuredModify: string;
        ShowRoomPrice: string; //Newly added.
        InsuredDet: InsuredDet;
        GSTApplicable: string;
        UINApplicable: string;
        CustomerGSTDetails: CustomerGSTDetails1;
        isGSTRegistered: boolean;
        IsODNominee: string;
        ODNomineeDet: ODNomineeDet;
        IsODNomineePass: string;
        ODNomineePassDet: ODNomineePassDet;
        IsSumInsuredDetailsModify: string;
        AdditionalCovrEdit: AdditionalCovrEdit;
        AccessoriesEdit: AccessoriesEdit;
        PersonalDetailsEdit: PersonalDetailsEdit;
        AddDiscount_LoadingEdit: AddDiscountLoadingEdit;
        rdbDocumentWaiver: boolean;
        DocumentWaiverValue: DocumentWaiverValue;
        rdbBreakinLoadingWaiver: boolean;
        ValidDrivingLicense: boolean;
        PACoverWaiver: boolean;
    }

    