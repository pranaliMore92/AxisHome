export class Rmdetails {
    RM_EMP_ID: string;
    SOL_ID: string;
    RM_CHANNEL_NAME: string;
    SPCODE: string;
    SPNAME: string;
    USM_EMP_ID: string;
    USM_NAME: string;
    USM_LOCATION: string;
    VERT_GEO: string;
    USM_VERTICAL: string;
    USM_SUB_VERTICAL: string;
    Pvt_Car_Deal: string;
    Pvt_Car_Deal_enc: string;
    Pvt_Car_IM_ID: string;
    TW_Deal: string;
    TW_Deal_enc: string;
    TW_IM_ID: string;
    GCHI_Deal_HealthyU: string;
    GCHI_Deal_HealthyU_enc: string;
    GCHI_IM_ID_HealthyU: string;
    GCHI_Deal_SC: string;
    GCHI_Deal_SC_enc: string;
    GCHI_IM_ID_SC: string;
}

export class RMDetailsResponse {
    rmdetails: Rmdetails;
    StatusCode: number;
    StatusMsg: string;
    StatusDesc: string;
    ErrorText?: string;
}