export class KYCResponseModel {
    api_response : api_response;
    user_data : user_data;
  }
  
  export class api_response{
    kyc_details: KycDetails;
    message: string;
    status: boolean;
    statusMessage: string;
    correlationId: string;
  }
  
  export class KycDetails {
    il_kyc_ref_no: string;
    certificate_type: string;
    certificate_number: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    full_name: string;
    gender: string;
    dob: string;
    mobile_number: string;
    email: string;
    ckyc_number: string;
    permanent_address: PermanentAddress;
    alternate_address: AlternateAddress;
  }
  
  export class PermanentAddress {
    address_line_1: string;
    address_line_2: string;
    address_line_3: string;
    pin_code: string;
    city: string;
    district: string;
    state: string;
  }
  
  export class AlternateAddress {
    address_line_1: string;
    address_line_2: string;
    address_line_3: string;
    pin_code: string;
    city: string;
    district: string;
    state: string;
  }
  export class user_data{
    ckyc_no: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    full_name: string;
    gender: string;
    dob: string;
    id_num: string;
    id_type:string;
    mobile_number: string;
    email: string;
    pep_desc: string;
    pep_flag: string;
  }