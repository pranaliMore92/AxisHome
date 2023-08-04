export class WhatsAppInOutRequest
{
    MobileNo :string;
    Mode :string;
}

export class WhatsAppInOutResponse
{
    StatusCode :string;
    StatusType :string;
    ErrorText :string;
    CorelationID :string;
}

export class WhatsappConcentResponseModel{
    StatusCode: number;
    StatusMsg: string;
    StatusDesc: string;
}