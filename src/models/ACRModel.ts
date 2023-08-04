
export class OccupationList {
    OCCUPATIONID: string;
    OCCUPATION: string;
}

export class OccupationModel {
    StatusCode: number;
    StatusType: string;
    StatusMessage?: any;
    OccupationLists: OccupationList[];
}

export class ACRRequestModel {
    policyNumber: string;
    policyName: string;
    proposalNumber: string;
    agentFullName: string;
    proposalAdditionalDetails: string;
    prospectName: string;
    prospectOccupation: string = "";
    prospectAnnualIncome: string = "";
    posName: string;
    posCertificateNumber: string;
    corporateAgentName: string;
    corporateAgentRegistrationCode: string;
    pdfStatus: string;
    date: string;
    LoginId: string;
}

export class ACRResponseModel {
    status: boolean;
    message: string;
}

export class ACRCheckResponseModel {
    IsACR_Mandatory: boolean;
    Parent_IM_ID: string;
    Agent_Full_Name: string;
    Corporate_Agent_Name: string;
    IM_Name?: any;
    Pri_Ver_Code?: any;
    StatusCode: number;
    StatusMsg: string;
    StatusDesc: string;
    ErrorText?: any;
}