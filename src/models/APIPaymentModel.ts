export class APIPaymentModel {
    correlation: string;
    pfProposalNo: string;
    userType: string;
    noOfAdults: number;
    noOfKids: number;
    sumInsured: number;
    tenure: number;
    dealID: string;
    policyType: string;
    subPolicyType: string;
    policyStartDate: string;//yyyy-dd-mm
    policyEndDate: string;
    basicPremium: number;
    totalTax: number;
    totalPremium: number;
    coverPremium: number;
    subLimitApplicable: string;
    customerEkycDetails: string;
    isJammuKashmir: string;
    apointeeTitleID: number;
    apointeeName: string;
    apointeeDob: string;
    apointeeRelationShip: string;
    apointeeRelationShipText: string;
    nomineeTitleID: number;
    nomineeName: string;
    nomineeDob: string;
    nomineeRelationShip: number;
    nomineeRelationShipText: string;
    ipaddress: string;
    setAsDefault: string;
    addressChange: boolean;
    titleId: string;
    customerID: number;
    customerName: string;
    customerDOB: string;
    maritalStatus: string;
    annualIncome: string;
    hobbyID: string;
    customerType: string;
    occupationID: string;
    occupationDesc: string;
    landLineNo: string;
    emailID: string;
    mobileNo: string;
    std: string;
    aadhaarNumber: string;
    panCardNo: string;
    address: string;
    addressLine1: string;
    addressLine2: string;
    landmark: string;
    pincodeID: string;
    cityID: number;
    stateID: number;
    countryId: number;
    ageOfEldest: string;
    permanentAddress: string;
    permanentAddrLine1: string;
    permanentAddrLine2: string;
    permanentAddrLandmark: string;
    permanentAddrPincodeID: string;
    permanentAddrStateID: number;
    permanentAddrCityID: number;
    idProofValue: string;
    idProofID: number;
    aadharEKYCYesNo: string;
    isIbankRelationship: boolean;
    apsId: string;
    customerRefNo: string;
    sourcingCode: string;
    subProduct: string;
    pfCustomerId: string;
    subLimit: string;
    isGSTRegistered: boolean;
    gstStateName: string;
    gstStateCode: string;
    gstApplicable: boolean;
    uinApplicable: boolean;
    members: Member[];
    bankRelationship: BankRelationship;
    customerGSTDetails: CustomerGSTDetails;
    SPDetails: SPDetailsModel;
    TransFor: string;
}

export class SPDetailsModel {
    alternateRMCode: string;
    alternateRMName: string;
    customerReferenceNumber: string;
    channelName: string;
    primaryRMCode: string;
    secondaryRMCode: string;
    bancaField01: string;
    bancaField02: string;
    bancaField03: string
}

export class Member {
    memberType: string;
    titleID: string;
    name: string;
    relationshipID: string;
    relationshipName: string;
    dob: string;
    height: string;
    weight: string;
    isExisting: string;
    adultType: string;
    otherDisease: string;
    addOnAgeGroup: string;
    addOnName: string;
    gender: string;
    panNumber: string;
    isOtherPolicy: boolean;
    insuranceCompany: string;
    otherPolicyNo: string;
    policyValidFrom: string;
    policyValidTill: string;
    claimsMade: boolean;
    existingHealthPolicy: ExistingHealthPolicy;
    ailments: Ailment[];
    dateOfBirth: string;
    planID: string;
    relation: string;
    ageGroup: string;
    sumInsuredText: string;
    sumInsuredValue: string;
    insuredName: string;
    insuredDOB: string;
    relationshipwithApplicant: string;
    ageValue: string;
    sumInsured: string;
    ageGroupValue: string;
    passportNumber: string;
    motherMaidenName: string;
    nomineeName: string;
    ailmentName: string;
    treatmentDetails: string;
    doctorAndHospitalDetails: string;
    addOnName6: string;
    portabilityWaiver: string;
    portabilityDOJ: string;
    portabilitySI: string;
}

export class Ailment {
    radioButtonChecked: string;
    checkButtonChecked: boolean;
    memberAilmentID: number;
    healthMemberID: number;
    ailmentStartDate: string;
    ailmentID: number;
    otherAilment: string;
    mappedAilmentId: string;
    ageOfInsured: number;
    pedCode: string;
    ailmentName: string;
    month: string;
    year: string;
}

export class ExistingHealthPolicy {
    isExisting: string;
    member: string;
    typeOfPolicy: string;
    policyDuration: number;
    insuranceCompany: string;
    sumInsured: number;
}
export class BankRelationship {
    isIbankRelationship: boolean;
    apsId: string;
    customerRefNo: string;
}

export class CustomerGSTDetails {
    gstiN_NO: string;
    constitutioN_OF_BUSINESS: string;
    constitutioN_OF_BUSINESS_TEXT: string;
    customeR_TYPE: string;
    customeR_TYPE_TEXT: string;
    paN_NO: string;
    gsT_REGISTRATION_STATUS: string;
    gsT_REGISTRATION_STATUS_TEXT: string;
    gsT_STATE_NAME: string;
    addressRegisteredunderGST: string;
}
