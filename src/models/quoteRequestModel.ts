

export class QuoteRequestModel {
        PolicyType: string;
        PolicyStartDate: string;
        Tenure: string;
        StructureSI: number;
        ContentSI: number;
        PartyStateName;
        PlanCode: string;
        PremiumReceivedFromCustomer: string;
        CoverDetails: covers[]
        CorrelationId: string;
        ApproxConstructionRateinRsSqft: number;
        AreaofHouseinSqFt: number;
        DealId: string;
        ClothingSI: number;
        FurnitureSI: number;
        DurablesSI: number;
        JewellerySI: number;
}

export class covers {
        CoverName: string;
        CoverCode: string;
        SumInsured: string;
}