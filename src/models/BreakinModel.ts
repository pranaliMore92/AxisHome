export class BreakinRequestModel{
	CorrelationId : string;
	BreakInType : string;
	BreakInDays : number;
	CustomerName : string;
	CustomerAddress : string;
	State : string;
	City : string;
	MobileNumber : number;
	TypeVehicle : string;
	VehicleMake : string;
	VehicleModel  : string;
	ManufactureYear : string;
	RegistrationNo : string;	
	EngineNo : string;
	ChassisNo : string;
	SubLocation : string;
	DistributorInterID : string;
	DistributorName : string;
	InspectionType : string;
	DealId : string;
	SalesRemarks: string;
	PreviousInsurer: string;
    PrevYearsPolicyNo: string;
    PrevYearsClaimStatus: string;
    PrevPolicyNCB: string;
    AppointmentDateTime:string;
	DistributorContact: string;
	BasicODPremium:string;
}

export class BreakinResponseModel{
    message: string;
    status: string;
    brkId: number;
    correlationID: string;
}