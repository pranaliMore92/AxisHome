export class EmpRefRequest {
    POLICY_ID: string;
    EMPLOYEE_REFERENCE_NO: string;
    SP_CODE: string;
    SP_NAME: string;
    LG_CODE: string;
    BRANCH_CODE: string;
    CUST_IDENTIFICATION_NO: string;
    ICICI_ACC_NO: string;
}

export class EmpRefResponse {
    StatusCode: number;
    StatusMsg: string;
    StatusDesc: string;
}