// Login Request--------------------------------

export class LoginRequestModel {
    SPCode: string;
    Password: string;
}

//Login Response --------------------------------

export class Model {
    EmpNo: string;
    SPCode: string;
    Email: string;
    EmpName: string;
    Password: string;
    PvtCarDeal: string;
    PvtCarIMID: string;
    TwoWDeal: string;
    TwoWIMID: string;
    GcvDeal: string;
    GcvIMID: string;
    PcvDeal: string;
    PcvIMID: string;
    MiscDeal: string;
    MiscIMID: string;
    ChiDeal: string;
    ChiIMID: string;
    FireAndBurglaryDeal: string;
    FireAndBurglaryIMID: string;
    LicenseType: string;
    SPLocation: string;
    SPZone: string;
    MOID: string;
    MOName: string;
    MOLocation: string;
    PFID: string;
    IMLocation: string;
    PvtCarDealEncrypted: string;
    TwoWDealEncrypted: string;
    GcvDealEncrypted: string;
    PcvDealEncrypted: string;
    MiscDealEncrypted: string;
    ChiDealEncrypted: string;
    YB_FeedfileDirectDebit: string;
    YB_RealTimeDirectDebit: string;
    GPA_DEAL: string;
    GPADealEncrypted: string;
    RM_CHANNEL_NAME: string;
    RetailHomeDealEncrypted : string;
}

export class LoginResponseModel {
    Model: Model;
    StatusCode: number;
    StatusMsg: string;
    StatusDesc: string;
    ErrorText?: any;
}

// Activate user request------------------------------

export class ActivateUserRequestModel {
    SPCode: string;
    Email: string;
    Password: string;
}

export class ActivateUserResponseModel {
    StatusCode: number;
    StatusMsg: string;
    StatusDesc: string;
}

//reset password-----------------------------------------

export class ResetPasswordRequestModel {
    SPCode: string;
    Password: string;
    OldPassword: string;
}

export class ResetPasswordResponseModel {
    StatusCode: number;
    StatusMsg: string;
    StatusDesc: string;
}