
    export class VehicleDetailsSPD {
        vehicleClass: string;
        vehicleClassCode: string;
        vehicleModelCode: number;
        manufacturerCode: number;
        subTypeCode: number;
        showroomPrice: number;
        seatingCapacity: number;
        registrationNumber: string;
        chassisNumber: string;
        engineNumber: string;
        vehicleType: number;
        yearofManufacture: string;
        grossTotalWeight: string;
        purchaseDate: string;
        rtoLocationCode: number;
        valElecAccessories: number;
        valNonElecAccesoies: number;
        valPrevPolicyElecAccessories: number;
        valPrevPolicyNonElecAccesoies: number;
        geoExtCode: number;
        noOfDriver: number;
        noOfEmployee: number;
        noOfWorkmen: number;
        isConfinedToSiteDiscount: number;
        isLimitedToOwnPremises: number;
        hasHandicappedDisc: number;
        fibreGlassSI: number;
        hasFibreGlass: number;
        hasDrivingTution: number;
        hasForegeinEmbassy: number;
        isVintage: number;
        isThreeWheeler: number;
        hasAntiTheft: number;
        isAutoAssnMember: number;
        memberhipNumber: string;
        hasBiFuelKit: number;
        biFuelKitPrice: number;
        annualMileage: string;
        monthlyMileage: string;
        noOfFamilyMembers: number;
        fuelType: string;
        cubicCapacity: string;
        carryingCapacity: string;
        noOfWheels: number;
        chassisPrice: number;
        bodyPrice: number;
        hubCode: string;
        modelCluster: string;
        registrationZone: string;
        maxCarryingCapacity: string;
        minCarryingCapacity: string;
        bodyType: string;
        modelBuilt: string;
        modelStatus: string;
        idv: number;
        idV_2: number;
        idV_3: number;
        idV_2_Tenure: string;
        idV_3_Tenure: string;
        gasKitType: number;
        paCoverUnnamedPassenger: number;
        paCoverNamedPassenger: number;
        carCategory: string;
        imT_discountOrLoadingValue: number;
        vehicleTypeName: string;
        dealerDiscount: number;
        dealerLoading: number;
        voluntaryDiscount: number;
        isShortTermPolicy: number;
        tppdSumInsured: number;
        bodyIDV: number;
        chasisIDV: number;
        consumableCover: number;
        returnToInvoiceCover: number;
        onRoadCharge: number;
        garageCashCover: number;
        garageCashCoverPlan: string;
        ncbProtectionCover: number;
        ncbProtectionCoverPlan: string;
        minimumDaysNumber: number;
        coverageDaysNumber: number;
        dailyAllowance: number;
        voluntaryDiscountPlan: string;
        rtisi: number;
        namedofPassenger: string;
        sI_NamedPassPAcover: number;
        policyClass: string;
        vehicleSubclass: string;
        isMoreThanOneVehicle: boolean;
        isQuoteReCalculated: boolean;
        registrationNumberSection1: string;
        registrationNumberSection2: string;
        registrationNumberSection3: string;
        registrationNumberSection4: string;
        maritalStatus: string;
        occupation: string;
        maritalStatusId: string;
        occupationId: string;
        familySize: number;
        monthlyMileageId: string;
        engineProtectPlus: number;
        tyreProtect: number;
        keyProtectPlan_Code: string;
        keyProtectPlan_Name: string;
        keyProtectSI: number;
        lssofPrsnlBlngPlan_Code: string;
        lssofPrsnlBlngPlan_Name: string;
        lssofPrsnlBlngSI: number;
        prevChassisNumber: string;
        prevEngineNumber: string;
        is0to60category: boolean;
        validDrivingLicense: boolean;
        vehicleMakeCode: number;
    }

    export class GstDetailsSPD {
        gstiN_NO: string;
        constitutioN_OF_BUSINESS: string;
        constitutioN_OF_BUSINESS_TEXT: string;
        customeR_TYPE: string;
        customeR_TYPE_TEXT: string;
        paN_NO: string;
        gsT_REGISTRATION_STATUS: string;
        gsT_REGISTRATION_STATUS_TEXT: string;
    }

    export class OwnerDetailsSPD {
        title: number;
        insTitleName: string;
        personTitle: string;
        name: string;
        firstName: string;
        middleName: string;
        lastName: string;
        dateOfBirth: string;
        relationShip: string;
        omRelationShip: string;
        gender: string;
        age: number;
        relationShipNameWithApplicant: string;
        insuredtitle: string;
        sponserTitle: string;
        nomineeTitle: string;
        fullName: string;
        titleName: string;
        relationshipName: string;
        gstApplicable: boolean;
        gstDetails: GstDetailsSPD;
        isCorpCustomer: boolean;
        contactPersonName: string;
        uinApplicable: boolean = false;
        panNumber: string = "";
        relationshipID: string;
    }

    export class InspectionDetailsSPD {
        inspectionType: number;
        appointmentTime: string;
        inspectionDate: string;
        inspectionStatus: string;
        serviceResponseMessage: string;
        inspectionID: string;
        inspectionTypeDesc: string;
    }

    export class NomineeDetailsSPD {
        odRelationshipId: number;
        isODNominee: boolean;
        odNomineeName: string;
        odNomineeAge: number;
        odNomineeRelation: string;
        isNamedPassNominee: boolean = false;
        namedPassNomineeName: string;
        namedPassNomineeAge: number;
        namedPassNomineeRelation: string;
        namedPassNomineeDOB: string;
        odNomineeDOB: string;
    }

    export class PreviousMotorPolicySPD {
        prevPollicyTypePkgTp: string;
        prevPolicyEndDate: string;
        prevVehicleSellingDate: string;
        wasCBOClaimed: string;
        prevPolicyInsurer: string;
        prevPolicyNumber: string;
        ncbClaimed: string;
        prevPolicyDetailsNA: number;
        isNCBChecked: boolean;
        prevInsurerAddress: string;
        prevPolicyAddress: string;
        prevPolicyStartDate: string;
        noOfClaims_Last3Yrs: number;
        prevPolicyTenure: number;
        totalNoOfClaims: string;
        zdPreviousyear: string;
        rtiPreviousyear: string;
        consumablePreviousyear: string;
        engineProtectPreviousyear: string;
        electricalAccessoryPreviousyear: string;
        nonElectricalAccessoryPreviousyear: string;
        val_EleaccessoryPrevYear: string;
        val_NONEleaccessoryPreVYear: string;
    }

    export class SavePolicyData {
        policyId: number;
        vehicleDetails: VehicleDetailsSPD;
        policyTypePkgTP: number;
        ownerType: string;
        voluntaryDeductible: number;
        designedForHandicapped: number;
        hasPaidDriverLiability: number;
        vehicleUnder: number;
        financierName: string;
        financierBranch: string;
        isInspectionRequired: number;
        inspectionStatus: number;
        inspectionRemarks: string;
        ownerDetails: OwnerDetailsSPD;
        customerId: number;
        onePagePolicy: number;
        isQCcheckRequired: number;
        zeroDepreciationCover: number;
        zeroDepreciationCoverPlan: string;
        renewalPreviousPolicy: string;
        isIcnPolicy: number;
        vehicleDesc: string;
        vehicleBodyType: string;
        inspectionDetails: InspectionDetailsSPD;
        inspectionMilage: string;
        surveyorName: string;
        surveyorLocation: string;
        inspectionDate: string;
        nomineeDetails: NomineeDetailsSPD;
        rsA_Plan_Name: string;
        rsA_Plan_Code: string;
        vdApplicableFlag: boolean;
        isZDBreakIn: number;
        additionalDeductibleCover: number;
        selfInspectionStatus: boolean;
        vehicleUsage: string;
        areaOfOperation: string;
        vehicleDrivenBy: string;
        isEngineProtectBreakIn: number;
        isRTIBreakIn: number;
        isConsumableBreakIn: number;
        isElectricalAccessoryBreakIn: number = 0;
        isNonElectricalAccessoryBreakIn: number = 0;
        isPRORATA: boolean = false;
        isSHORTPERIOD: boolean;
        paCoverWaiver: boolean;
        tpStartDate: string;
        tpEndDate: string;
        tpPolicyNo: string;
        tpInsurerName: string;
        previousMotorPolicy: PreviousMotorPolicySPD;
        zdPreviousyear: string;
        engineProtectPreviousyear: string;
        rtiPreviousyear: string;
        consumablePreviousyear: string;
        electricalAccessoryPreviousyear: string;
        nonElectricalAccessoryPreviousyear: string;
      SP_Details: SP_Details;
    }

    export class SP_Details {

        AlternateRMCode: string;
    
        AlternateRMName: string;
    
        CustomerReferenceNumber: string;
    
        ChannelName: string;
    
        PrimaryRMCode: string;
    
        SecondaryRMCode: string;
    
        BancaField01: string;
    
        BancaField02: string;
    
        BancaField03: string;
    
    }