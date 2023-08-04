export class GetDealDetailsRequest{
    TW_Deal:string;
}

export class GetDealDetailsResponse{
    LOCATION_NAME: string;
    IMID: string;
    STORE_CODE: string;
    STORE_NAME: string;
    TW_Deal: string;
    GPA_DEAL: string;
    PPAP_DEAL: string;
    StatusCode: Number;
    StatusMsg: string;
    StatusDesc: string;
}