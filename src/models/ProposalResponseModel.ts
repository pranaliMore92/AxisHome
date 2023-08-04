export class ProposalResponseModel {
    riskDetails: RiskDetails;
    totalOwnDamagePremium: number;
    packagePremium: number;
    roadSideAssistanceService: string;
    deviationMessage: string;
    isQuoteDeviation: boolean;
    breakingFlag: boolean;
    proposalStatus: string;
    isApprovalRequired: boolean;
    correlationId: string;
    generalInformation: GeneralInformation;
    totalLiabilityPremium: number;
    specialDiscount: number;
    totalTax: number;
    finalPremium: number;
    message: null;
    status: string;
}

export class GeneralInformation {
    vehicleModel: string;
    manufacturerName: string;
    manufacturingYear: string;
    vehicleDescription: null;
    rtoLocation: string;
    showRoomPrice: number;
    chassisPrice: null;
    bodyPrice: null;
    seatingCapacity: null;
    carryingCapacity: null;
    policyInceptionDate: string;
    policyEndDate: string;
    transactionType: string;
    cubicCapacity: string;
    proposalDate: string;
    referenceProposalDate: string;
    depriciatedIDV: number;
    tenure: string;
    tpTenure: string;
    registrationDate: string;
    percentageOfDepriciation: string;
    proposalNumber: string;
    referenceProposalNo: string;
    customerId: string;
}

export class RiskDetails {
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
