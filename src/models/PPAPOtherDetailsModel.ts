export class AnnualIncomeResponse{
    StatusCode: Number;
    StatusType: string;
    StatusMessage: string;
    Values:Values[];
    
}

export class Values
    {
        Value: number;
        Name: string;
    }

export class MaritalResponse{
    StatusCode: Number;
    StatusType: string;
    StatusMessage: string;
    MaritalStatusList:MaritalStatusList[];

}
export class MaritalStatusList{
    MaritalStatusCode:number;
    MaritalStatusDesc:string;
}

export class PpapPlanMaster{
    SubProduct:string;
    OccupationType:string;
}

export class PPAPPlanMasterResponse{
    StatusCode: string;
    StatusType: string;
    StatusMessage: string;
    ErrorText: string;
    PolicyTenures: any;
    Incomes: any;
}

export class PPAPNomineeRelation{
    Name:any;
    Value:string;
}