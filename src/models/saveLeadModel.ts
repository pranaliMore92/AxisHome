export class SaveLeadRequestModel {
    CustName: string;
    MobileNo: string;
    Email: string;
    Product: string; //static
    SubProduct: string;
    Module: string; //ipaddress or sorce from web config
    Deal: string;
}

export class SaveLeadResponseModel {
    StatusCode: string;
    StatusMsg: string;
    StatusDesc: string;
}