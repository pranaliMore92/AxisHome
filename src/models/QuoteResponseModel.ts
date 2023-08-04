export class QuoteResponseModel{

        riskDetails: riskDetailsModel;
        totalOwnDamagePremium: number;
        packagePremium: number;
        roadSideAssistanceService: String;
        deviationMessage:String;
        isQuoteDeviation: boolean;
        breakingFlag: boolean;
        proposalStatus: null;
        isApprovalRequired: boolean;
        correlationId: string;
        generalInformation: generalInformationModel;
        totalLiabilityPremium: number;
        specialDiscount: number;
        totalTax: number;
        finalPremium: number;
        message: string;
        status: string
}

export class generalInformationModel
{
    vehicleModel: String;
    manufacturerName: String;
    manufacturingYear: String;
    vehicleDescription: String;
    rtoLocation: String;
    showRoomPrice: number;
    chassisPrice: String;
    bodyPrice: String;
    seatingCapacity: String;
    carryingCapacity: String;
    policyInceptionDate: String;
    policyEndDate: String;
    transactionType: String;
    cubicCapacity: String;
    proposalDate: String;
    referenceProposalDate: String;
    depriciatedIDV: number;
    tenure: String;
    tpTenure: String;
    registrationDate: String;
    percentageOfDepriciation: String;
    proposalNumber: String;
    referenceProposalNo: String;
    customerId: String
}

export class riskDetailsModel{
    breakinLoadingAmount: number;
    garageCash: number;
    biFuelKitOD: number;
    biFuelKitTP: number;
    tyreProtect: number;
    fibreGlassFuelTank: number;
    basicOD: number;
    geographicalExtensionOD: number;
    electricalAccessories: number;
    nonElectricalAccessories: number;
    consumables: number;
    zeroDepreciation: number;
    returnToInvoice: number;
    roadSideAssistance: number;
    engineProtect: number;
    keyProtect: number;
    lossOfPersonalBelongings: number;
    voluntaryDiscount: number;
    antiTheftDiscount: number;
    automobileAssociationDiscount: number;
    handicappedDiscount: number;
    basicTP: number;
    paidDriver: number;
    employeesOfInsured: number;
    geographicalExtensionTP: number;
    paCoverForUnNamedPassenger: number;
    paCoverForOwnerDriver: number;
    tppD_Discount: number;
    bonusDiscount: number;
    paCoverWaiver: boolean;
}




// export class QuoteResponseModel {
//     Message: string;
//     ExceptionType: string;
//     StackTrace: string;
//     StatusCode: number;
//     StatusType: string;
//     ErrorText: any;
//     PolicyID: number;
//     EPolicyID: any;
//     PaymentID: number;
//     QuoteID: string;
//     PFQuoteID: string;
//     PFProposalNo: any;
//     PFCustomerID: any;
//     CustomerID: any;
//     VehicleName: string;
//     VehicleModel: string;
//     ShowRoomPrice: number;
//     IDV: string;
//     TotalPremium: number;
//     TotalPremiumStr: String;
//     PolicyStartDate: string;
//     PolicyEndDate: string;
//     Premium: Premium;
//     OwnDamage: OwnDamage;
//     Liability: Liability;
//     InstaDetails: any;
//     BreakInID: any;
//     InspectionStatus: boolean;
//     IDVDeviation: boolean;
//     OtherDiscount: boolean;
//     VehicleDesc: string;
//     VehicleUsage: string;
//     VehicleDrivenBy: string;
//     AreaOfOperation: string;
//     IsBreakinPolicy: boolean;
//     SeatingCapacity: string;
//     FuelType: string;
//     VehicleSubClass: any;
//     BodyType: string;
//     Vehicle_RegistrationNo: any;
//     Cust_Name: any;
//     PACoverWaiver: boolean;
//     ValidDrivingLicense: boolean;
// }

// export class Premium {
//     PackagePremium: number;
//     SpecialDiscount: number;
//     TaxType: string;
//     TaxPremium: number;
//     TotalPremPayable: number;
//     FinalPremium: number;
// }

// export class OwnDamage {
//     BasicPremium: number;
//     RoadSideAssistance: number;
//     EngineProtectPlus: number;
//     TyreProtect: number;
//     KeyProtectSI: number;
//     KeyProtectPremium: number;
//     LOPBSI: number;
//     LOPBPremium: number;
//     ElectricalAccessories: number;
//     NonElectricalAccessories: number;
//     ZeroDepreciationPlan: any;
//     ZeroDepreciationPremium: number;
//     Consumbles: number;
//     OnRoadCharge: string;
//     ReturnToInvoice: number;
//     GarageCashPlan: any;
//     GarageCashPremium: number;
//     NCBPlan: any;
//     NCBPremium: number;
//     BiFuelKitPremium: number;
//     GeographicPremium: number;
//     FiberGlassPremium: number;
//     ODSubTotal: number;
//     AntiTheftDiscount: number;
//     VDPlan: string;
//     VDDiscount: number;
//     AutoMobileMembershipDiscount: number;
//     HandicappedDiscount: number;
//     NCBPercentage: number;
//     NCBDiscount: number;
//     TotalDiscount: number;
//     ODFinalPremium: number;
//     BreakInLoading: number;
//     OtherLoading: number;
//     TotalLoading: number;
// }

// export class Liability {
//     BasicLiabilityPremium: number;
//     BiFuelKitPremium: number;
//     GeoExtensionPremium: number;
//     SubTotalPremium: number;
//     PAForUnnamedLiability: number;
//     PACoverForOwnerDriver: number;
//     PaidDriverLiability: number;
//     PaidEmployeeLiability: number;
//     PATotalPremium: number;
//     TotalLiabilityPremium: number;
//     BundledPPPremium: number;
// }