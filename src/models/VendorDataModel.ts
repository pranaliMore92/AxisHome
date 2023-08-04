export class VendorDataModel {
    CustName: string;
    MobileNo: string;
    Email: string;
    Product: string; //static
    SubProduct: string;
    Module: string; //ipaddress or sorce from web config
    Deal: string; // deal for KRG,KRGE,KRGS
}

export class VendorResponseModel{
    StatusCode: string;
    StatusMsg: string;
    StatusDesc: string;
}