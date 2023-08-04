export class StatesModel {
    StateId: number;
    StateName: string;
    GSTStateCode: string;
}

export class CityModel {
    StatusCode: number;
    StatusType: string;
    StatusMessage: null;
    CityList: CityList[];
}

export class CityList {
    CityID: string;
    CityName: string;
}

export class NomineeRelationList {
    ErrorMessage: string;
    StatuMessage: string;
    StatusCode: number;
    lstNomineeRelationshipResponse: LstNomineeRelationshipResponse[];
}

export class LstNomineeRelationshipResponse {
    NomineeID: number;
    NomineeName: string;
  memberRel: string;
}

export class StateCityByPinResponseModel {
    StatusCode: number;
    StatusType: string;
    StatusMessage: null;
    Pincode: string;
    StateId: string;
    StateName: string;
    CityList: CityList[];
}
