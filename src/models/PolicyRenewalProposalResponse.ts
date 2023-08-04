export class PremiumPR
    {
        PackagePremium: number;
        SpecialDiscount: number;
        TaxType: string;
        TaxPremium: number;
        TotalPremPayable: number;
        FinalPremium: number;
    }

    export class OwnDamagePR
    {
        BasicPremium: number;
        RoadSideAssistance: number;
        EngineProtectPlus: number;
        TyreProtect: number;
        KeyProtectSI: number;
        KeyProtectPremium: number;
        LOPBSI: number;
        LOPBPremium: number;
        ElectricalAccessories: number;
        NonElectricalAccessories: number;
        ZeroDepreciationPlan: string;
        ZeroDepreciationPremium: number;
        Consumbles: number;
        onRoadCharge: string;
        ReturnToInvoice: number;
        GarageCashPlan?: any;
        GarageCashPremium: number;
        NCBPlan?: any;
        NCBPremium: number;
        BiFuelKitPremium: number;
        GeographicPremium: number;
        FiberGlassPremium: number;
        ODSubTotal: number;
        AntiTheftDiscount: number;
        VDPlan: string;
        VDDiscount: number;
        AutoMobileMembershipDiscount: number;
        HandicappedDiscount: number;
        NCBPercentage: number;
        NCBDiscount: number;
        TotalDiscount: number;
        ODFinalPremium: number;
        BreakInLoading: number;
        OtherLoading: number;
        TotalLoading: number;
    }

    export class LiabilityPR
    {
        BasicLiabilityPremium: number;
        BiFuelKitPremium: number;
        GeoExtensionPremium: number;
        SubTotalPremium: number;
        PAForUnnamedLiability: number;
        PACoverForOwnerDriver: number;
        PaidDriverLiability: number;
        PaidEmployeeLiability: number;
        PATotalPremium: number;
        TotalLiabilityPremium: number;
        BundledPPPremium: number;
    }

    export class InstaDetails
    {
        isInstaAvailable: boolean;
        StatusMessage: any;
        Balance: any;
        TotalCreditLimit: any;
        ConsumedCreditLimit: any;
        AccountLockDays: any;
    }

    export class RenewalProposalResponseModel
    {
        StatusCode: number;
        StatusType: string;
        ErrorText?: any;
        PolicyID: number;
        EPolicyID: string;
        PaymentID: number;
        QuoteID: string;
        PFQuoteID?: string;
        PFProposalNo: string;
        PFCustomerID: string;
        CustomerID: string;
        VehicleName: string;
        VehicleModel: string;
        ShowRoomPrice: number;
        IDV: string;
        TotalPremium: number;
        TotalPremiumStr: string;
        PolicyStartDate: string;
        PolicyEndDate: string;
        Premium: PremiumPR;
        OwnDamage: OwnDamagePR;
        Liability: LiabilityPR;
        InstaDetails?: InstaDetails;
        BreakInID?: string;
        InspectionStatus: boolean;
        IDVDeviation: boolean;
        OtherDiscount: boolean;
        VehicleDesc: string;
        VehicleUsage: string;
        VehicleDrivenBy: string;
        AreaOfOperation: string;
        IsBreakinPolicy: boolean;
        SeatingCapacity: string;
        FuelType: string;
        VehicleSubClass?: any;
        BodyType: string;
        Vehicle_RegistrationNo: string;
        Cust_Name: string;
        PACoverWaiver: boolean;
        ValidDrivingLicense: boolean;
    }