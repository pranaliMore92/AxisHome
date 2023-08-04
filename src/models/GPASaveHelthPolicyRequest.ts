export class GPASaveHelthPolicyRequest {
   PolicyID: number;
   gender: string;
   correlation: string;
   pfProposalNo: string;
   userType: string;
   sumInsured: Number;
   tenure: string;
   dealID: string;
   policyType: string;
   subPolicyType: string;
   policyStartDate: string;
   policyEndDate: string;
   totalPremium: string;
   coverPremium: string;
   members: members[];
   subLimitApplicable: string;
   customerEkycDetails: string;
   isJammuKashmir: string;
   apointeeTitleID: Number;
   apointeeName: string;
   apointeeDob: string;
   apointeeRelationShip: string;
   apointeeRelationShipText: string;
   nomineeTitleID: Number;
   nomineeName: string;
   nomineeDob: string;
   nomineeRelationShip: string;
   nomineeRelationShipText: string;
   ipaddress: string;
   setAsDefault: string;
   addressChange: Boolean;
   titleId: string;
   customerID: string;
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
   cityID: string;
   stateID: string;
   countryId: Number;
   ageOfEldest: string;
   permanentAddress: string;
   permanentAddrLine1: string;
   permanentAddrLine2: string;
   permanentAddrLandmark: string;
   permanentAddrPincodeID: string;
   permanentAddrStateID: string;
   permanentAddrCityID: string;
   idProofValue: string;
   idProofID: Number;
   aadharEKYCYesNo: string;
   isIbankRelationship: Boolean;
   apsId: string;
   customerRefNo: string;
   sourcingCode: string;
   subProduct: string;
   pfCustomerId: string;
   subLimit: string;
   isGSTRegistered: Boolean;
   gstStateName: string;
   gstStateCode: string;
   gstApplicable: Boolean;
   uinApplicable: Boolean;
   customerGSTDetails: customerGSTDetails;
   addonDetails: addonDetails;
   AddtionalPolDetails: AddtionalPolDetails;
   IsWhatsappConsent: Boolean;
   prospectAnnualIncome: string;
}

export class members {
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
   isOtherPolicy: Boolean;
   insuranceCompany: string;
   otherPolicyNo: string;
   policyValidFrom: string;
   policyValidTill: string;
   claimsMade: Boolean;
   existingHealthPolicy: existingHealthPolicy;
   ailments: ailments;
   dateOfBirth: string;
   planID: string;
   relation: string;
   ageGroup: string;
   sumInsuredText: string;
   sumInsuredValue: Number;
   insuredName: string;
   insuredDOB: string;
   relationshipwithApplicant: string;
   ageValue: string;
   sumInsured: Number;
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
   portabilitySI: string
}

export class ailments {
   radioButtonChecked: string;
   checkButtonChecked: Boolean;
   memberAilmentID: Number;
   healthMemberID: Number;
   ailmentStartDate: string;
   ailmentID: Number;
   otherAilment: string;
   mappedAilmentId: string;
   ageOfInsured: Number;
   pedCode: string;
   ailmentName: string;
   month: string;
   year: string
}
export class existingHealthPolicy {
   isExisting: string;
   member: string;
   typeOfPolicy: string;
   policyDuration: Number;
   insuranceCompany: string;
   sumInsured: Number
};

export class addonDetails {
   addOnCovers1Flag: Boolean;
   addOnCovers1Text: Boolean;
   addOnCovers1Type: string;
   addOnCovers2And4Flag: string;
   addOnCovers2And4Text: string;
   addOnCovers2And4Type: string;
   addOnCovers3Flag: Boolean;
   addOnCovers3Text: Boolean;
   addOnCovers3Type: string;
   addOnCovers5Flag: Boolean;
   addOnCovers5Text: Boolean;
   addOnCovers5Type: string;
   addOnCovers6Flag: Boolean;
   addOnCovers6Text: Boolean;
   addOnCovers6Type: string
}
export class AddtionalPolDetails {
   Module: string;
   Ped: string;
   PedInfo: string;
   IsExistingPolicy: string;
   ExistingPolicyStartDate: string;
   ExistingPolicyNO: string;
   ExistingPolicyEndDate: string;
   ExistingPolicyInsurer: string;
   EmpRefCode: string;
   AltMobNo: string;
   LanNo: string;
   OustStandingLoanTenure: string;
   Info2: string;
   Info3: Number;
   Info4: string;
   Info5: string;
   Info6: string;
   Info7: string
}

export class customerGSTDetails {
   gstiN_NO: string;
   constitutioN_OF_BUSINESS: string;
   constitutioN_OF_BUSINESS_TEXT: string;
   customeR_TYPE: string;
   customeR_TYPE_TEXT: string;
   paN_NO: string;
   gsT_REGISTRATION_STATUS: string;
   gsT_REGISTRATION_STATUS_TEXT: string;
   gsT_STATE_NAME: string;
   addressRegisteredunderGST: string
}

export class SaveGPAHelthPolicyResponse {
   PolicyId: string;
   CustomerId: string;
   PfCustomerId: string;
   PfProposalNo: string;
   StatusCode: string;
   StatusMsg: string;
   StatusDesc: string;
}