export class AgentMappedDealsModel {
    Motor : MotorModel;
}

export class MotorModel{
    isFourWheelerMapped: boolean;
    FourWheelerDealId: string;
    isTwoWheelerMapped: boolean;
    TwoWheelerDealId: string;
}