export class SaveCustomerResponse {
    CustomerID: number;
    PFCustomerID: string;
    AddressID: number;
}
export class CustomerRequestModel {
    CustomerID: number;
    OwnerType: string;
    HasAddressChanged: boolean;
    SetAsDefault: boolean;
    TitleText: string;
    TitleValue: string;
    Name: string;
    DateOfBirth: string;
    MaritalStatusValue: string;
    MaritalStatusText: string;
    OccupationValue: string;
    OccupationText: string;
    AnnualIncomeValue: string;
    AnnualIncomeText: string;
    IdentityProofValue: string;
    IdentityProofText: string;
    IdentityNumber: string;
    PresentAddrLine1: string;
    PresentAddrLine2: string;
    PresentAddrLandmark: string;
    PresentAddrCityValue: string;
    PresentAddrCityText: string;
    PresentAddrStateValue: string;
    PresentAddrStateText: string;
    PresentAddrPincodeValue: string;
    PresentAddrPincodeText: string;
    EmailAddress: string;
    MobileNumber: string;
    LandlineNumber: string;
    EmailAlternate: string;
    MobileAlternate: string;
    PANNumber: string;
    isPermanentAsPresent: string;
    PermanentAddrLine1: string;
    PermanentAddrLine2: string;
    PermanentAddrLandmark: string;
    PermanentAddrCityValue: string;
    PermanentAddrCityText: string;
    PermanentAddrStateValue: string;
    PermanentAddrStateText: string;
    PermanentAddrPincodeValue: string;
    PermanentAddrPincodeText: string;
    isGSTINApplicable: boolean;
    isUINApplicable: boolean;
    GSTDetails: GSTDetailsModel;
}

export class GSTDetailsModel {
    CONSTITUTION_OF_BUSINESS: string;
    CONSTITUTION_OF_BUSINESS_TEXT: string;
    CUSTOMER_TYPE: string;
    CUSTOMER_TYPE_TEXT: string;
    GSTIN_NO: string;
    PAN_NO: string;
    GST_REGISTRATION_STATUS: string;
    GST_REGISTRATION_STATUS_TEXT: string;
}

export class Detail {
    Name: any;
    Value: string;
    ErrorText: string;
    MinimumDaysNumber: number;
    CoverageDaysNumber: number;
    DailyAllowance: number;
}

export class ValidatePincodeResponse {
    StatusCode: number;
    StatusType: string;
    StatusMessage: string;
    ClaimIntimationNo: any;
    Details: Array<Detail>;
    NVOPRMembers: any;
    EMIDetails: any;
    EMIAmount: any;
}