import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map, retry } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { GetBasicAuthResponseModel } from '../models/getBasicAuthResponseModel';
import { VendorDataModel } from '../models/VendorDataModel';
import { VendorResponseModel } from '../models/VendorDataModel';
import { VehicleRegDetailsModel } from '../models/VehicleRegDetailsModel';
//import { SaveLeadRequestModel, SaveLeadResponseModel } from 'models/saveLeadModel';
import { ShowRoomPriceDetailsModel } from '../models/getShowRoomPriceDetailsModel';
import { KeyValueModel } from '../models/getManufacturerModel';
import { QuoteRequestModel } from 'src/models/quoteRequestModel';
import { QuoteResponseModel } from 'src/models/QuoteResponseModel';
import { UtilityserviceService } from './utilityservice.service';
import { PreviousPolicyProvider } from 'src/models/PreviousPolicyProvider';
import { StatesModel, CityModel, StateCityByPinResponseModel, NomineeRelationList } from 'src/models/StatesModel';
import { ProposalRequestModel } from 'src/models/ProposalRequestModel';
import { ProposalResponseModel } from 'src/models/ProposalResponseModel';
import { AgentMappedDealsModel } from '../models/AgentMappedDealsModel';
import { APIPaymentModel } from '../models/APIPaymentModel';
import { APIPaymentResponseModel, CommonResponseModel } from '../models/APIPaymentResponseModel';
import * as uuid from 'uuid';
import { CommonPaymentRequestModel, CommonPaymentResponseModel } from 'src/models/CommonPaymentModel';
import { EmpRefRequest, EmpRefResponse } from '../models/EmployeeRefModel';
import { BreakinResponseModel, BreakinRequestModel } from 'src/models/BreakinModel';
import { SPConditionStatusCheckResponseModel } from '../models/SPCodeModel';
import { CustomerRequestModel, SaveCustomerResponse, ValidatePincodeResponse } from '../models/CustomerModel'
import { MotorDetailsResponse } from '../models/MotorDetails';
import { PolicyRenewRequestModel, PolicyRenewResponseModel, VehicleUsageModel } from 'src/models/PolicyRenewal';
import { RenewProposalRequestModel } from 'src/models/PolicyRenewalProposal';
import { RenewalProposalResponseModel } from 'src/models/PolicyRenewalProposalResponse';
import { PaymentTaggingModel } from '../models/PaymentTaggingModel';
import { UserDetailsByIdentifier } from 'src/models/UserDetailsByIdentifier';
import { WhatsAppInOutRequest, WhatsappConcentResponseModel } from 'src/models/WhatsAppInOutModel';
import { SavePolicyData } from 'src/models/SavePolicyData';
//import { BiztalkVehicleDetailsRequest, BiztalkVehicleDetailsResponse } from 'src/models/getVehicleDetailsBiztalk';
import { RMDetailsResponse } from 'src/models/RMDetails';
import { OccupationResponse, GPACalPremiumRequest, GPACalPremiumResponse, CreateGPAPraposalRequest, CreateGPAPraposalResponse } from 'src/models/GPACalPremiumRequestModel';
import { AnnualIncomeResponse, MaritalResponse, PPAPPlanMasterResponse, PpapPlanMaster, PPAPNomineeRelation } from 'src/models/PPAPOtherDetailsModel';
import { PPAPSaveEditQuoteResponse, PPAPSaveEditQuote } from 'src/models/PPAPSaveEditQuote';
import { PPAPSaveEditPraposalRequest, PPAPSaveEditPraposalResponse } from 'src/models/PPAPSaveEditPraposalRequest';
import { GetDealDetailsResponse, GetDealDetailsRequest } from 'src/models/GetDealDetailsRequest';
import { GPASaveHelthPolicyRequest, SaveGPAHelthPolicyResponse } from 'src/models/GPASaveHelthPolicyRequest';
import { SingleSPDetailsRequest, SingleChannelDetails, SingleSPDetails } from 'src/models/SPDetails';
import { GPALocationModel, GPALicationList } from 'src/models/GPALocationModel';
import { GPAQuoteCreate } from 'src/models/GPAModel';
import { SendPaymentLinkRequestModel, SendPaymentLinkResponseModel } from 'src/models/SendPaymentLinkRequestModel';
import { LoginResponseModel } from 'src/models/LoginModel';
import { SendOTPResponseModel, VerifyOtpResponseModel } from 'src/models/OTPModel';
import { ACRCheckResponseModel, ACRRequestModel, ACRResponseModel } from 'src/models/ACRModel';
import { ADPSavePolicyDetailsRequestModel, ADPSavePolicyDetailsResponseModel } from 'src/models/ADPSavePolicyDetails';
import { ADPSummaryDetailsResponseModel } from 'src/models/ADPSummaryDetailsMode';
import { Constants_SubProductType } from './Constants';
import { UpdatePolicyStatusRequestModel, UpdatePolicyStatusResponseModel } from 'src/models/UpdatePolicyStatusModel';
import { AesEncryptionService } from './aes-encryption.service';
import { PartnerDetailsRequestModel, PartnerDetailsResponseModel } from 'src/models/SavePartnerModel';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  myAppUrl: string;
  myApiUrl: string;
  mySanityApiUrl: string;
  myBizApiUrl: string;
  myBizTokenURL: string;
  myRazorPayUrl: string;
  myGPAAPIUrl: string;
  showSwapLoader = false;
  basic: string;
  // httpOptions : any=new Headers;
  bearer: string;
  // BizhttpOptions : any=new Headers;
  GPADealId: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'authorization': "",
      'cache-control': 'no-cache'
    })
  }
  BizhttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'authorization': "",
      'cache-control': 'no-cache',
    })
  };
  baseURL: any;

  UpdateHttpRequest() {
    this.basic = this.utilityservice.getLS("basic");
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'authorization': this.basic,
        'cache-control': 'no-cache',
      })
    };

    this.bearer = this.utilityservice.getLS("bearer");
    this.BizhttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'authorization': this.bearer,
        'cache-control': 'no-cache',
      })
    };
  }

  // var bearer=this.utilityservice.getLS("bearer");
  // BizhttpOptions1 = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json; charset=utf-8',
  //     'authorization': bearer,
  //     'cache-control': 'no-cache',
  //   })
  // };

  constructor(private http: HttpClient, public utilityservice: UtilityserviceService, public AES_ED: AesEncryptionService) {
    this.myApiUrl = environment.apiUrl;
    this.myBizApiUrl = environment.BizApiUrl;
    this.myBizTokenURL = environment.BizTokenURL;
    this.myRazorPayUrl = environment.RazorPayUrl;
    this.myGPAAPIUrl = environment.GPAAPIUrl;
    // this.GPADealId=environment.GPAdealId;
  }

  getBasicAuth(dealid: string): Observable<GetBasicAuthResponseModel> {
    //console.log('inside service');
    //var body = JSON.stringify(dealid);
    var url = this.myApiUrl + 'Agent/GetDealAgentMasterData?Deal=' + dealid;
    return this.http.get<GetBasicAuthResponseModel>(url).pipe(
      retry(3),
      //tap(data => console.log(data)),
      catchError(this.errorHandler)
    );
  }

  GetAgentMappedDeals(): Observable<AgentMappedDealsModel> {
    this.UpdateHttpRequest();
    //console.log('inside service');
    //var body = JSON.stringify(dealid);
    //var basic = this.utilityservice.getLS("basic");
    // use original basic.. use live url..remove hardcoded dealID from request page
    // let httpOptions1 = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json; charset=utf-8',
    //     'authorization': 'Basic YW5rdXIuc2F4ZW5hQGljaWNpbG9tYmFyZC5jb206SGVsbG9AMTIz',
    //     'cache-control': 'no-cache',
    //   })
    // };
    var url = this.myApiUrl + '/agent/GetAgentMappedDeals'
    return this.http.post<AgentMappedDealsModel>(url, '', this.httpOptions).pipe(
      retry(3),
      //tap(data => console.log(data)),
      catchError(this.errorHandler)
    );
  }

  //added by mugdha
  submitVendorData(VendorDataModel: VendorDataModel): Observable<VendorResponseModel> {
    this.UpdateHttpRequest();
    //console.log('inside service');
    var body = JSON.stringify(VendorDataModel);
    var url = this.myApiUrl + 'utility/SubmitVedorData';
    return this.http.post<VendorResponseModel>(url, body, this.httpOptions).pipe(
      retry(3),
      //tap(data => console.log(data)),
      catchError(this.errorHandler)
    );
  }

  getVehicleRegDetails(VehicleRegNo: string): Observable<VehicleRegDetailsModel> {
    this.UpdateHttpRequest();
    //console.log('inside service');
    //var body = JSON.stringify(VendorDataModel);
    //var url = this.myApiUrl + 'Motor/GetVehicleRegDetails?VehRegNo=' + VehicleRegNo;
    var url = this.myApiUrl + 'Motor/VehicleDetails';
    var vehiType = this.utilityservice.getLS('motorVehicletype');//CommonClass.getcookie("motorVehicletype");
    var vtype = "";
    if (vehiType == "2") {
      vtype = "twowheeler";
    }
    else {
      vtype = "privatecar";
    }
    var body = "{\"VehRegNo\": \"" + VehicleRegNo + "\",\"Type\": \"" + vtype + "\"}";
    return this.http.post<VehicleRegDetailsModel>(url, body, this.httpOptions).pipe(
      retry(3),
      //tap(data1 => console.log(data1))
    );
  }

  getCubicCapacity(ModelCode: string): Observable<string> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + 'motormaster/GetCubicCapacity?ModelCode=' + ModelCode;
    return this.http.post<string>(url, '', this.httpOptions).pipe(
      retry(3),
      //tap(data => console.log(data)),
      catchError(this.errorHandler)
    );
  }

  getShowRoomPriceDetails(vehicletype: string, rtoId: string, manuf_code: string, model_code: string, reg_date: string, policy_date: string): Observable<ShowRoomPriceDetailsModel> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + `motormaster/ExshowroomPricewithIDV_v2?RTO=${rtoId}&modelId=${model_code}&classCode=${vehicletype}&makeId=${manuf_code}&FirstRegDate=${reg_date}&PolicyStartDate=${policy_date}`;
    return this.http.post<ShowRoomPriceDetailsModel>(url, '', this.httpOptions).pipe(
      retry(3)
    );
  }

  // getShowRoomPriceDetailsBiztalk(req : BiztalkVehicleDetailsRequest, bToken: string) : Observable<BiztalkVehicleDetailsResponse> {
  //   let httpOptionsBizModel = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json; charset=utf-8',
  //       'authorization': bToken,
  //       'cache-control': 'no-cache',
  //     })
  //   };
  //   var url = this.myBizApiUrl + "Generic/GetVehicleDetails";
  //   let reqData = JSON.stringify(req);
  //   return this.http.post<BiztalkVehicleDetailsResponse>(url,reqData,httpOptionsBizModel).pipe(
  //     retry(3)
  //   );
  // }

  getRTO(RTOPartialName: string, VehicleType: string): Observable<KeyValueModel[]> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + `motormaster/RTO?RTOPartialName=${RTOPartialName}&VehicleType=${VehicleType}`;
    //console.log('url' + url);
    //console.log(' window.localStorage.basic' + window.localStorage.basic);
    return this.http.post<KeyValueModel[]>(url, '', this.httpOptions).pipe(
      retry(3),
      //tap(data => console.log(data)),
      catchError(this.errorHandler)
    );
  }

  getManuDetails(RTOID: string, ProductName: string): Observable<KeyValueModel[]> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + `motormaster/Manufacturer?RTOID=${RTOID}&ProductName=${ProductName}`;
    //console.log('url' + url);
    //console.log('window.localStorage.basic ' + window.localStorage.basic);
    return this.http.post<KeyValueModel[]>(url, '', this.httpOptions).pipe(
      retry(3),
      //tap(data => console.log(data)),
      catchError(this.errorHandler)
    );
  }

  getModelDetails(RTOID: string, VehicleType: string, ManufacturerID: string): Observable<KeyValueModel[]> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + `motormaster/Model?RTOID=${RTOID}&VehicleType=${VehicleType}&ManufacturerID=${ManufacturerID}`;
    //console.log('url' + url);
    //console.log(' window.localStorage.basic' + window.localStorage.basic);
    // return this.http.get<VoluntarydecuctibleDataModel[]>(url);  
    return this.http.post<KeyValueModel[]>(url, '', this.httpOptions).pipe(
      retry(3),
      //tap(data => console.log(data)),
      // catchError(this.errorHandler)
    );
  }

  GetAPIToken(): Observable<string> {
    var url = this.myBizTokenURL + `Utility/GetAPIToken?scope=esbhome`;

    return this.http.get<string>(url).pipe(
      retry(3)
      //tap(data => console.log(data)),
      // catchError(this.errorHandler)
    );
  }

  getQuoteRT(): Observable<QuoteResponseModel> {
    //debugger;
    this.UpdateHttpRequest();
    var motorVehicletype = this.utilityservice.getLS("motorVehicletype");
    if (motorVehicletype == "2") {
      var url = this.myBizApiUrl + `proposal/twowheelercalculatepremium`;
    } else {
      var url = this.myBizApiUrl + `proposal/privatecarcalculatepremium`;
    }

    var qrvm = new QuoteRequestModel();
    qrvm = JSON.parse(this.utilityservice.getLS("QuoteRequest"));

    const myId = uuid.v4();
    qrvm.CorrelationId = myId;
    let qrvmData = JSON.stringify(qrvm);

    //console.log(qrvmData);

    // var bearer = this.utilityservice.getLS("bearer");
    // let BizhttpOptions1 = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json; charset=utf-8',
    //     'authorization': bearer,
    //     'cache-control': 'no-cache',
    //   })
    // };
    return this.http.post<QuoteResponseModel>(url, qrvmData, this.BizhttpOptions).pipe(
      retry(3)
      //tap(data => console.log(data)),
      // catchError(this.errorHandler)
    );
  }

  getQuoteWithModel(qrvm: QuoteRequestModel): Observable<QuoteResponseModel> {
    this.UpdateHttpRequest();
    var url = this.myBizApiUrl + `proposal/privatecarcalculatepremium`;
    var motorVehicletype = this.utilityservice.getLS("motorVehicletype");
    if (motorVehicletype == "2") {
      var url = this.myBizApiUrl + `proposal/twowheelercalculatepremium`;
    } else {
      var url = this.myBizApiUrl + `proposal/privatecarcalculatepremium`;
    }

    const myId = uuid.v4();
    qrvm.CorrelationId = myId;
    let qrvmData = JSON.stringify(qrvm);

    return this.http.post<QuoteResponseModel>(url, qrvmData, this.BizhttpOptions).pipe(
      retry(3)

    );
  }

  calculateHomePremium(qrvm: QuoteRequestModel): Observable<any> {
    this.UpdateHttpRequest();
    var url = this.myBizApiUrl + `home/calculatepremium`;

    const myId = uuid.v4();
    qrvm.CorrelationId = myId;
    let qrvmData = JSON.stringify(qrvm);

    return this.http.post<any>(url, qrvmData, this.BizhttpOptions).pipe(
      retry(3)

    );
  }

  getPreviousPolicyProvider(): Observable<Array<PreviousPolicyProvider>> {
    this.UpdateHttpRequest();
    //console.log('inside service');
    //var body = JSON.stringify(VendorDataModel);MotorMaster/GetCompany
    var url = this.myApiUrl + 'MotorMaster/GetCompany';
    return this.http.post<Array<PreviousPolicyProvider>>(url, '', this.httpOptions).pipe(
      retry(3),
      // tap(data =>
      //   data =
      //   ),
      //catchError(this.errorHandler)
    );
  }

  getStates(): Observable<StatesModel[]> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + 'MotorMaster/GetAllStates';
    return this.http.post<StatesModel[]>(url, this.httpOptions).pipe(
      retry(3),
      //tap(data=> console.log(data)),
      //catchError(this.errorHandler)
    );
  }

  getCitiesByStateId(stateid: string): Observable<CityModel> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + 'RTOList/GetCities/';
    var body = "" + stateid;
    return this.http.post<CityModel>(url, body, this.httpOptions).pipe(
      retry(3)
    );
  }

  getStateCityByPincode(pin: string): Observable<StateCityByPinResponseModel> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + 'rtolist/GetStatesCityByPin';
    var body = "" + pin;
    return this.http.post<StateCityByPinResponseModel>(url, body, this.httpOptions).pipe(
      retry(3)
    );
  }

  getNomineeRelationList(): Observable<NomineeRelationList> {
    this.UpdateHttpRequest();
    // let basic: string = this.utilityservice.getLS("basic");
    // alert(basic);
    // let httpOptions1 = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json; charset=utf-8',
    //     'authorization': basic,
    //     'cache-control': 'no-cache',
    //   })
    // };
    var url = this.myApiUrl + 'Travel/GetNomineeRelationList';

    return this.http.post<NomineeRelationList>(url, '', this.httpOptions).pipe(
      retry(3)
    );
  }

  saveProposal(propReq: ProposalRequestModel): Observable<ProposalResponseModel> {
    this.UpdateHttpRequest();
    var bearer = this.utilityservice.getLS("bearer");
    let BizhttpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'authorization': bearer,
        'cache-control': 'no-cache',
      })
    };

    var url = this.myBizApiUrl + 'home/createproposal';

    var body = JSON.stringify(propReq);
    return this.http.post<ProposalResponseModel>(url, body, this.BizhttpOptions).pipe(
      retry(3)
    );
  }
  SavePolicy(ADPSavePolicyDetailsRequest: ADPSavePolicyDetailsRequestModel): Observable<ADPSavePolicyDetailsResponseModel> {
    this.UpdateHttpRequest();
    var body = JSON.stringify(ADPSavePolicyDetailsRequest);
    var url = this.myApiUrl + 'ADP/SavePolicy';
    return this.http.post<ADPSavePolicyDetailsResponseModel>(url, body, this.httpOptions).pipe(
      retry(3)
    );
  }
  //added by mugdha
  savePolicyDetails(apiReq: APIPaymentModel): Observable<APIPaymentResponseModel> {
    this.UpdateHttpRequest();
    //let basic: string = this.utilityservice.getLS("basic");
    // let httpOptions1 = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json; charset=utf-8',
    //     'authorization': 'Basic YW5rdXIuc2F4ZW5hQGljaWNpbG9tYmFyZC5jb206SGVsbG9AMTIz',
    //     'cache-control': 'no-cache',
    //   })
    // };
    var url = this.myApiUrl + '/Health/SaveHealthPolicyDetails';
    var body = JSON.stringify(apiReq);
    return this.http.post<APIPaymentResponseModel>(url, body, this.httpOptions).pipe(
      retry(3)
    );
  }

  savePolicyData(data: SavePolicyData): Observable<CommonResponseModel> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + '/MOTOR/SaveMotorPolicyDetails';
    var body = JSON.stringify(data);
    return this.http.post<CommonResponseModel>(url, body, this.httpOptions).pipe(
      retry(3)
    );
  }

  SaveEmployeeRef(CPReq: EmpRefRequest): Observable<EmpRefResponse> {
    this.UpdateHttpRequest();
    // let httpOptions1 = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json; charset=utf-8',
    //     'authorization': 'Basic YW5rdXIuc2F4ZW5hQGljaWNpbG9tYmFyZC5jb206SGVsbG9AMTIz',
    //     'cache-control': 'no-cache',
    //   })
    // };
    var url = this.myApiUrl + '/Common/Save_Partners_Details';
    var body = JSON.stringify(CPReq);
    return this.http.post<EmpRefResponse>(url, body, this.httpOptions).pipe(
      retry(3)
    );
  }

  CommonPayment(CPReq: CommonPaymentRequestModel): Observable<CommonPaymentResponseModel> {
    this.UpdateHttpRequest();
    // let httpOptions1 = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json; charset=utf-8',
    //     'authorization': 'Basic YW5rdXIuc2F4ZW5hQGljaWNpbG9tYmFyZC5jb206SGVsbG9AMTIz',
    //     'cache-control': 'no-cache',
    //   })
    // };
    var url = this.myApiUrl + 'Payment/CommonPayment';
    var body = JSON.stringify(CPReq);
    return this.http.post<CommonPaymentResponseModel>(url, body, this.httpOptions).pipe(
      retry(3)
    );
  }

  CommonPaymentConfirmationByPID(EPaymentID: string) {
    this.UpdateHttpRequest();

    var url = this.myApiUrl + 'Payment/CommonPaymentConfirmationByPID?EPaymentID=' + EPaymentID;
    // return this.http.post<any>(url, '', this.httpOptions).pipe(
    //   retry(3)
    // );
    return this.http.post(url, {}, this.httpOptions).toPromise();
  }

  CreateBreakinID(BreakinData: BreakinRequestModel): Observable<BreakinResponseModel> {
    this.UpdateHttpRequest();
    var url = this.myBizApiUrl + 'breakin/createbreakinid';
    // var qrvm = new QuoteRequestModel();
    // qrvm = JSON.parse(this.utilityservice.getLS("QuoteRequest"));
    let BreakinBody = JSON.stringify(BreakinData);
    //console.log(BreakinBody);
    // var bearer = this.utilityservice.getLS("bearer");
    // let BizhttpOptions1 = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json; charset=utf-8',
    //     'authorization': bearer,
    //     'cache-control': 'no-cache',
    //   })
    // };
    return this.http.post<BreakinResponseModel>(url, BreakinBody, this.BizhttpOptions).pipe(
      retry(2)
      //tap(data => console.log(data)),
      // catchError(this.errorHandler)
    );
  }

  SPConditionStatusCheck(): Observable<SPConditionStatusCheckResponseModel> {
    this.UpdateHttpRequest();
    // let httpOptions1 = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json; charset=utf-8',
    //     'authorization': 'Basic YW5rdXIuc2F4ZW5hQGljaWNpbG9tYmFyZC5jb206SGVsbG9AMTIz',
    //     'cache-control': 'no-cache',
    //   })
    // };
    var url = this.myApiUrl + '/motor/SPConditionStatusCheck';
    // var body = JSON.stringify(CPReq);
    return this.http.post<SPConditionStatusCheckResponseModel>(url, '', this.httpOptions).pipe(
      retry(3)
    );
  }

  SaveCustomer(CustomerSaveRequest: CustomerRequestModel): Observable<SaveCustomerResponse> {
    this.UpdateHttpRequest();
    // let httpOptions1 = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json; charset=utf-8',
    //     'authorization': 'Basic YW5rdXIuc2F4ZW5hQGljaWNpbG9tYmFyZC5jb206SGVsbG9AMTIz',
    //     'cache-control': 'no-cache',
    //   })
    // };
    var url = this.myApiUrl + '/customer/saveeditcustomer';
    var body = JSON.stringify(CustomerSaveRequest);
    return this.http.post<SaveCustomerResponse>(url, body, this.httpOptions).pipe(
      retry(3)
    );
  }

  SetWhatsappConcent(refid: string, customerid: string): Observable<WhatsappConcentResponseModel> {
    //here refid is policyid
    var url = this.myApiUrl + 'motor/SetWhatsAppConsent?refID=' + refid + '&userID=' + customerid;
    return this.http.get<WhatsappConcentResponseModel>(url).pipe(
      retry(3)
    );
  }
  GetPincodeID(pincode: string, cityid: string): Observable<ValidatePincodeResponse> {

    this.UpdateHttpRequest();
    var url = this.myApiUrl + 'RTOList/GetPincodeID';
    // var body = "{ \r\n\t\"Pincode\": \"" + pincode + "\", \r\n\t\"CityID\": " + cityid + " \r\n}";
    //  var body = "{ \r\n\t\"Pincode\": + pincode + , \r\n\t\"CityID\": " + cityid + " \r\n}";

    var body = {
      "Pincode": pincode,
      "CityID": cityid
    };
    return this.http.post<ValidatePincodeResponse>(url, body, this.httpOptions).pipe(
      retry(3)
    );
  }
  // GetPincodeID(pincode: any,CityID:any): Observable<ValidatePincodeResponse> {
  //   this.UpdateHttpRequest();
  //   debugger;
  //   // let httpOptions1 = {
  //   //   headers: new HttpHeaders({
  //   //     'Content-Type': 'application/json; charset=utf-8',
  //   //     'authorization': 'Basic YW5rdXIuc2F4ZW5hQGljaWNpbG9tYmFyZC5jb206SGVsbG9AMTIz',
  //   //     'cache-control': 'no-cache',
  //   //   })
  //   // };
  //   // console.log("check body",body)
  //   // console.log("check body",pincode)


  //   var url = this.myApiUrl + '/RTOList/GetPincodeID';

  //   // var body = "{ \r\n\t\"Pincode\": \"" + pincode + "\", \r\n\t\"CityID\": " + CityID + " \r\n}";
  //   let body={
  //     Guid: uuid.v4(),
  //     Pincode:pincode,
  //     CityID:CityID

  //   };
  //   return this.http.post<ValidatePincodeResponse>(url, body, this.httpOptions).pipe(
  //     retry(3)
  //   );
  // }

  // FetchMotorDetails(ID: string): Observable<MotorDetailsResponse> {
  //   this.UpdateHttpRequest();
  //   let httpOptions1 = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json; charset=utf-8',
  //       'authorization': 'Basic YW5rdXIuc2F4ZW5hQGljaWNpbG9tYmFyZC5jb206SGVsbG9AMTIz',
  //       'cache-control': 'no-cache',
  //     })
  //   };

  //   var url = this.mySanityApiUrl + '/Motor/GetSingleVehicleDetails?refID='+ID;
  //   return this.http.post<MotorDetailsResponse>(url, '', httpOptions1).pipe(
  //     retry(3),
  //     tap(data => console.log(data)),
  //     catchError(this.errorHandler)
  //   );
  // }

  // FetchMotorDetails(ID: string): Observable<MotorDetailsResponse> {
  //   this.UpdateHttpRequest();
  //   //var url = this.myApiUrl + '/Motor/GetMotorDetail?refID=' + ID;
  //   var url = this.myApiUrl + '/Motor/GetSingleVehicleDetails?refID=' + ID;
  //   return this.http.get<string>(url).pipe(
  //     retry(3),
  //     tap(data => console.log(data)),
  //     catchError(this.errorHandler)
  //   );
  //   // return this.http.post<MotorDetailsResponse>(url, '', this.httpOptions).pipe(
  //   //   retry(3),
  //   //   tap(data => console.log(data)),
  //   //   catchError(this.errorHandler)
  //   // );
  // }

  FetchMotorDetails(ID: string): Observable<MotorDetailsResponse> {
    var url = this.myApiUrl + '/Motor/GetSingleVehicleDetails?refID=' + ID;
    return this.http.get<MotorDetailsResponse>(url).pipe(
      retry(3),
      //tap(data => console.log(data)),
      catchError(this.errorHandler)
    );
  }

  PaymentTagging(PeymentDetails: PaymentTaggingModel): Observable<any> {
    this.UpdateHttpRequest();
    // var url = this.myRazorPayUrl + 'PaymentGateway/RazorPayPaymentProcess';
    var url = this.myRazorPayUrl + 'PaymentGateway/RazorPayPaymentProcess';
    var body = JSON.stringify(PeymentDetails);
    this.utilityservice.setLS("PayProcessRequest", body);
    // const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    // return this.http.post(url, body, { headers, responseType: 'text'}).pipe(
    //   retry(3)
    // );
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'authorization': "",
      'cache-control': 'no-cache'
    });
    // let httpOptions1 = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json; charset=utf-8',
    //     'authorization': "",
    //     'cache-control': 'no-cache'
    //   }),
    //   responseType: 'text' as json
    // }
    return this.http.post(url, body, { headers, responseType: 'text' }).pipe(
      retry(3)
    );
  }

  errorHandler(error) {
    let errorMessage = '';
    // if(error.status == 401 && error.url.includes('PrivateCarCalculatePremium'))
    // {
    //   this.GetAPIToken().subscribe(data => {
    //     debugger;
    //     let res= data;
    //     this.utilityservice.setLS("bearer",res);
    //   });
    //   this.getQuoteRT();
    // }
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //console.log(errorMessage);
    return throwError(errorMessage);
  }

  //*******************************For Renew Flow*************************************************
  getDataByPolicyId(cm: PolicyRenewRequestModel): Observable<PolicyRenewResponseModel> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + '/Renewal/GetRNData';
    var body = JSON.stringify(cm);
    return this.http.post<PolicyRenewResponseModel>(url, body, this.httpOptions).pipe(
      retry(3)
    );
  }

  saveRenewProposalDetails(cm: RenewProposalRequestModel): Observable<RenewalProposalResponseModel> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + '/Renewal/RnSaveProposal';
    var body = JSON.stringify(cm);
    return this.http.post<RenewalProposalResponseModel>(url, body, this.httpOptions).pipe(
      retry(3)
    );
  }

  recalculateRN(cm: RenewProposalRequestModel): Observable<RenewalProposalResponseModel> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + '/Renewal/RN_ReCalculate';
    var body = JSON.stringify(cm);
    return this.http.post<RenewalProposalResponseModel>(url, body, this.httpOptions).pipe(
      retry(3)
    );
  }

  getDecryptedDeal(deal: string): Observable<string> {
    var url = this.myApiUrl + 'utility/DecryptValue?value=' + deal;
    return this.http.get<string>(url).pipe(
      retry(3),
      //tap(data => console.log(data)),
      catchError(this.errorHandler)
    );
  }

  // 1. MOTOR_VEHICLE_USAGE_MASTER 2. MOTOR_AREA_OPERATION_MASTER 3. MOTOR_VEHICLE_DRIVEN_MASTER
  getRenewVehicleDropdowns(str: string, veh: string): Observable<VehicleUsageModel[]> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + '/Motor/GetVehileMasterDetails';
    var body = "{\r\n    \"Type\": \"" + str + "\",\r\n    \"Vehicle\": \"" + veh + "\"\r\n}";
    return this.http.post<VehicleUsageModel[]>(url, body, this.httpOptions).pipe(
      retry(3)
    );
  }

  GetUserDetailsByIdentifier(identifier: string): Observable<UserDetailsByIdentifier> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + '/Policy/GetIBankUserDetails';
    var body = "{\n    \"identifier\": \"" + identifier + "\",\n    \"UserType\": \"IBANK\n}\n";
    return this.http.post<UserDetailsByIdentifier>(url, body, this.httpOptions).pipe(
      retry(3)
    );
  }

  Whatsapp_INOUT(WhatsAppInOutRequest: WhatsAppInOutRequest): Observable<UserDetailsByIdentifier> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + '/Whatsapp/Whatsapp_OPTINOUT';
    var body = JSON.stringify(WhatsAppInOutRequest);
    return this.http.post<UserDetailsByIdentifier>(url, body, this.httpOptions).pipe(
      retry(3)
    );
  }

  // Added by SagarM on 06/07/2020 to get IBank user details using UserId
  GetRMDetails(userid: string): Observable<RMDetailsResponse> {
    var url = this.myApiUrl + 'iBankOneview/GetRMdetails?RMempID=' + userid;
    // var url = 'http://cldiliptrapp03.cloudapp.net:9006/MobileAPI/api/iBankOneview/GetRMdetails?RMempID=' + userid;
    return this.http.get<RMDetailsResponse>(url).pipe(retry(3));
  }

  GetOccupationList(): Observable<OccupationResponse> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + 'healthmaster/GetOccupation';
    console.log(this.httpOptions);
    return this.http.get<OccupationResponse>(url, this.httpOptions).pipe(
      retry(3)
    );
    // return this.http.post<OccupationResponse>(url, '', this.httpOptions).pipe(
    //   retry(3)
    // );
  }

  GetAnnualIncomeList(): Observable<AnnualIncomeResponse> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + 'agent/GetAnnualIncome';
    return this.http.post<AnnualIncomeResponse>(url, this.httpOptions).pipe(
      retry(3)
    );
  }

  GetMaritalStatus(): Observable<MaritalResponse> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + 'healthmaster/getMaritalStatus';
    return this.http.get<MaritalResponse>(url, this.httpOptions).pipe(
      retry(3)
    );
  }

  GetPPAPPlanMaster(PpapPlanMasterObj: PpapPlanMaster): Observable<PPAPPlanMasterResponse> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + 'ppap/PpapPlanMaster';
    var body = JSON.stringify(PpapPlanMasterObj);
    return this.http.post<PPAPPlanMasterResponse>(url, body, this.httpOptions).pipe(
      retry(3)
    );
  }

  PPAPSaveEditQuote(PPAPSaveEditQuoteObj: PPAPSaveEditQuote): Observable<PPAPSaveEditQuoteResponse> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + 'PPAP/SaveEditQuoteV1';
    var body = JSON.stringify(PPAPSaveEditQuoteObj);
    return this.http.post<PPAPSaveEditQuoteResponse>(url, body, this.httpOptions).pipe(
      retry(3)
    );
  }

  PPAPCreateProposal(PPAPPraposalRequest: PPAPSaveEditPraposalRequest): Observable<PPAPSaveEditPraposalResponse> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + 'PPAP/SaveEditProposalV1';
    var body = JSON.stringify(PPAPPraposalRequest);
    return this.http.post<PPAPSaveEditPraposalResponse>(url, body, this.httpOptions).pipe(
      retry(3)
    );
  }

  GetPPAPRelationsData(): Observable<PPAPNomineeRelation> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + 'healthmaster/GetRelations';
    //return this.http.get(url, this.httpOptions).pipe(map((response: any) => response.json()));
    return this.http.get<PPAPNomineeRelation>(url, this.httpOptions).pipe(
      retry(3)

    );

  }

  getWithParams() {
    var url = this.myApiUrl + 'healthmaster/GetRelations';
    this.UpdateHttpRequest();
    return this.http.get(url, this.httpOptions).toPromise();
  }

  GetDealDetails(GetDealRequest: GetDealDetailsRequest): Observable<GetDealDetailsResponse> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + 'RelianceRetail/getDealDetails';
    var body = JSON.stringify(GetDealRequest);
    return this.http.post<GetDealDetailsResponse>(url, body, this.httpOptions).pipe(
      retry(3)
    );
  }

  GetGPABearerToken(): Observable<string> {
    //var tokenurl = this.myBizTokenURL + 'Utility/GetAPITokenForGPA?scope=esbgpa';
    this.UpdateHttpRequest();
    // var tokenurl='https://ipartner.icicilombard.com/mobileagentapi/api/Utility/GetAPITokenForGPA?scope=esbgpa';
    var tokenurl = this.myApiUrl + 'utility/getapitoken?scope=esbzerotat';
    return this.http.get<string>(tokenurl).pipe(retry(3));
  }
  

  GPACalCulatePremium(GPAPremiumRequest: GPAQuoteCreate): Observable<any> {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'authorization': this.utilityservice.getLS("GPABearerToken"),
        'cache-control': 'no-cache',
      })
    };
    // var url = 'https://app9.icicilombard.com/ILservices/Misc/v1/GPA/CalculatePremium';
    var url = this.myGPAAPIUrl + 'zerotat/quote/create';
    var body = JSON.stringify(GPAPremiumRequest);
    return this.http.post<any>(url, body, httpOptions1).pipe(
      retry(3)
    );
  }

  GPACreateProposal(CreateGPAPraposalReq: CreateGPAPraposalRequest): Observable<CreateGPAPraposalResponse> {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'authorization': this.utilityservice.getLS("GPABearerToken"),
        'cache-control': 'no-cache',
      })
    };
    // var url = 'https://app9.icicilombard.com/ilservices/misc/v1/GPA/CreateProposal';
    var url = this.myGPAAPIUrl + 'zerotat/proposal/create';
    var body = JSON.stringify(CreateGPAPraposalReq);
    return this.http.post<CreateGPAPraposalResponse>(url, body, httpOptions1).pipe(
      retry(3)
    );
  }

  GPASaveHealthPolicyDetails(GPASaveHelthPolicyReq: GPASaveHelthPolicyRequest): Observable<SaveGPAHelthPolicyResponse> {
    this.basic = this.utilityservice.getLS("basic");
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'authorization': this.basic,
        'cache-control': 'no-cache',
      })
    };
    // var url = 'https://ipartner.icicilombard.com/mobileagentapi/api/Health/SaveHealthPolicyDetails';
    var url = this.myApiUrl + 'Health/SaveHealthPolicyDetails';
    var body = JSON.stringify(GPASaveHelthPolicyReq);
    return this.http.post<SaveGPAHelthPolicyResponse>(url, body, httpOptions1).pipe(
      retry(3)
    );
  }

  pdfDownload(type: any, policID: any) {
    return (
      this.myApiUrl + "file/DownloadPDF?type=" + type + "&value=" + policID
    );
  }
  GPASaveEnrollmentDetails(GPASaveHelthPolicyReq: GPASaveHelthPolicyRequest): Observable<SaveGPAHelthPolicyResponse> {
    this.basic = this.utilityservice.getLS("basic"); //for prod
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'authorization': this.basic,
        'cache-control': 'no-cache',
      })
    };
    //  var url = 'https://cldilbancaapp01.insurancearticlez.com/bancakrgapi/api/BAGIMS_Enrollment/SaveEnrollmentDetails'; // for sanity
    var url = this.myApiUrl + 'BAGIMS_Enrollment/SaveEnrollmentDetails'; // for prod
    var body = JSON.stringify(GPASaveHelthPolicyReq);
    return this.http.post<SaveGPAHelthPolicyResponse>(url, body, httpOptions1).pipe(
      retry(3)
    );
  }
  savePartnerDetails(Save_Partners_Details: PartnerDetailsRequestModel): Observable<PartnerDetailsResponseModel> {
    this.basic = this.utilityservice.getLS("basic"); //for prod
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'authorization': this.basic,
        'cache-control': 'no-cache',
      })
    };
    var url = this.myApiUrl + 'Common/Save_Partners_Details'; // for prod
    var body = JSON.stringify(Save_Partners_Details);
    return this.http.post<PartnerDetailsResponseModel>(url, body, httpOptions1).pipe(
      retry(3)
    );
  }
  save(file: string, fileName: string) {

    // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    //   window.navigator.msSaveBlob(file, fileName);
    //   return;
    // } else {
    const downloadLink = document.createElement("a");
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.setAttribute("href", file);
    downloadLink.setAttribute("download", fileName);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    //}
  }

  GetChannelList(req: SingleSPDetailsRequest): Observable<SingleChannelDetails[]> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + '/motor/GetChannelDetails';
    var body = JSON.stringify(req);
    return this.http.post<SingleChannelDetails[]>(url, body, this.httpOptions).pipe(
      retry(3)
    );
  }
  GetSPlist(req: SingleSPDetailsRequest): Observable<SingleSPDetails[]> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + 'motor/GetSPDetails';
    var body = JSON.stringify(req);
    return this.http.post<SingleSPDetails[]>(url, body, this.httpOptions).pipe(
      retry(3)
    );
  }
  YB_GetSpDetails(EMPCODE, source): Observable<LoginResponseModel> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + 'ADP/GetSpDetailsByEmpCode';
    var body = "{ \r\n\t\"EMPCODE\": \"" + EMPCODE + "\", \r\n\t\"source\": \"" + source + "\", \r\n}";
    return this.http.post<LoginResponseModel>(url, body, this.httpOptions).pipe(
      retry(3)
    );
  }
  GetPolicyDetails(PolicyID: string, YBID: string): Observable<ADPSummaryDetailsResponseModel> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + 'adp/GetPolicyDetails';
    if (PolicyID != "") {
      var body = "{ \r\n\t\"PolicyId\": \"" + PolicyID + "\" \r\n}";
    }
    if (YBID != "") {
      var body = "{ \r\n\t\"ID\": \"" + YBID + "\" \r\n}";
    }

    return this.http.post<ADPSummaryDetailsResponseModel>(url, body, this.httpOptions).pipe(
      retry(3)
    );
  }
  SendPaymentlinkMail(SendPaymentLinkRequest: SendPaymentLinkRequestModel, SubProductType): Observable<SendPaymentLinkResponseModel> {
    this.UpdateHttpRequest();

    var body = JSON.stringify(SendPaymentLinkRequest);
    if (Constants_SubProductType.Home == SubProductType) {
      var url = this.myApiUrl + 'ADP/SendAxisRetailPaymentLink_Email';
    } else {
      var url = this.myApiUrl + 'payment/SendCustomerPaymentLink';
    }
    return this.http.post<SendPaymentLinkResponseModel>(url, body, this.httpOptions).pipe(
      retry(3)
    );
  }
  SendPaymentlinkSMS(SendPaymentLinkRequest: SendPaymentLinkRequestModel, SubProductType): Observable<SendPaymentLinkResponseModel> {
    this.UpdateHttpRequest();
    var body = JSON.stringify(SendPaymentLinkRequest);
    if (Constants_SubProductType.Home == SubProductType) {
      var url = this.myApiUrl + 'ADP/SendAxisRetailPaymentLink_SMS';
    } else {
      var url = this.myApiUrl + 'payment/SendCustomerPaymentLinkSMS';
    }
    return this.http.post<SendPaymentLinkResponseModel>(url, body, this.httpOptions).pipe(
      retry(3)
    );
  }
  CaptureLeadEventDetails(req: any): Observable<any> {
    this.UpdateHttpRequest();
    var body = JSON.stringify(req);
    var url = this.myApiUrl + 'utility/CaptureLeadEventDetails';
    return this.http.post<any>(url, body, this.httpOptions).pipe(
      retry(3)
    );
  }

  GetGPALocationList(): Observable<GPALicationList> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + 'RelianceRetail/getAllDeal';
    return this.http.post<GPALicationList>(url, this.httpOptions).pipe(
      retry(3)
    );
  }
  GetAllStates(): Observable<StatesModel[]> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + 'MotorMaster/GetAllStates';
    return this.http.post<StatesModel[]>(url, this.httpOptions).pipe(
      retry(3)
    );
  }
  EncryptDealID(DealID: string): Observable<string> {
    var url = this.myApiUrl + 'utility/EncryptValue?value=' + DealID;
    // var url = 'http://cldiliptrapp03.cloudapp.net:9006/MobileAPI/api/iBankOneview/GetRMdetails?RMempID=' + userid;
    return this.http.get<string>(url).pipe(retry(3));
  }

  GetGPAPDFBearerToken(): Observable<string> {
    this.UpdateHttpRequest();
    var tokenurl = this.myApiUrl + 'Utility/GetAPIToken?scope=esbgeneric';
    return this.http.get<string>(tokenurl).pipe(retry(3));
  }

  PolicyPDFToken(): Observable<string> {
    this.UpdateHttpRequest();
    var tokenurl = this.myApiUrl + 'Utility/GetAPIToken?scope=esbpolicypdf';
    return this.http.get<string>(tokenurl).pipe(retry(3));
  }
  generatePDF(policno, token) {
    let headers = new HttpHeaders({
      'Authorization': token
    });

    let promise = new Promise((resolve, reject) => {

      this.http.get(this.myGPAAPIUrl + 'generic/policycertificate?policyno=' + policno.trim(), { headers: headers, responseType: 'blob' as 'json' })
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          },
          msg => { // Error
            reject(msg);
          }
        );
    });
    return promise;
    // await promise;
  }

  SendEmailSMSGPA(PaymentID: string) {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + 'RelianceRetail/sendmailandsms?paymentid=' + PaymentID;
    return this.http.get<string>(url, this.httpOptions).pipe(retry(3));
  }

  HFgeneratePDF(policyno: any) {
    var url = this.myApiUrl + 'BAGIMS_Enrollment/BAGIMSEnrollMentForm?PolicyID=' + policyno; //for prod
    //var url = "https://cldilbancaapp01.insurancearticlez.com/bancakrgapi/api/BAGIMS_Enrollment/BAGIMSEnrollMentForm?PolicyID=" + policyno; //for sanity
    return this.http.get<any>(url, { responseType: 'blob' as 'json' }).pipe(
      retry(3)
    );

  }
  SaveACR(ACRRequest: ACRRequestModel): Observable<ACRResponseModel> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + 'policy/AgentConfidentialityReportOther';
    var body = JSON.stringify(ACRRequest);
    return this.http.post<ACRResponseModel>(url, body, this.httpOptions).pipe(
      retry(3)
    );
  }

  ACRConditionCheck(IMID: string): Observable<ACRCheckResponseModel> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + 'common/ACRConditionCheckOthers';
    var body = "{ \r\n\t\"LoginId\": \"" + IMID + "\"\r\n}";
    return this.http.post<ACRCheckResponseModel>(url, body, this.httpOptions).pipe(
      retry(3)
    );
  }

  GenerateCustConsentOTP(MobileNo: string, ProductType: string): Observable<SendOTPResponseModel> {
    this.UpdateHttpRequest();
    var body = "{ \r\n\t\"MobileNo\": \"" + MobileNo + "\", \r\n\t\"ProductType\": \"" + ProductType + "\", \r\n}";
    // var url = this.myApiUrl + 'iBankOneView/GenerateOTP';
    // var url = this.myApiUrl + 'utility/GenerateOTP';
    var url = this.myApiUrl + 'ADP/GenerateCustConsentOTP';
    return this.http.post<SendOTPResponseModel>(url, body, this.httpOptions).pipe(
      retry(3)
    );
  }

  ValidateOTP(MobileNo: string, AuthCode: string, OTP: string): Observable<VerifyOtpResponseModel> {
    this.UpdateHttpRequest();
    var body = "{ \r\n\t\"MobileNo\": \"" + MobileNo + "\", \r\n\t\"AuthCode\": \"" + AuthCode + "\", \r\n\t\"OTP\": \"" + OTP + "\", \r\n}";
    var url = this.myApiUrl + 'HospitalDailyCash/ValidateOTP';
    // var url = this.myApiUrl + 'utility/CommonValidateOTP';
    return this.http.post<VerifyOtpResponseModel>(url, body, this.httpOptions).pipe(
      retry(3)
    );
  }
  GetSummaryDetails(PolicyID: string): Observable<ADPSummaryDetailsResponseModel> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + 'adp/getsummarydetails';
    var body = "{ \r\n\t\"PolicyId\": \"" + PolicyID + "\", \r\n}";
    return this.http.post<ADPSummaryDetailsResponseModel>(url, body, this.httpOptions).pipe(
      retry(3)
    );
  }
  GetDealAgentMasterData(dealid: string): Observable<GetBasicAuthResponseModel> {
    //console.log('inside service');
    //var body = JSON.stringify(dealid);
    var url = this.myApiUrl + 'Agent/GetDealAgentMasterData?Deal=' + dealid;
    return this.http.get<GetBasicAuthResponseModel>(url).pipe(
      retry(3)
    );
  }

  EncryptValue(Deal: string): Observable<string> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + 'utility/EncryptValue?value=' + Deal
    return this.http.get<string>(url).pipe(
      retry(3)
    );
  }

  DecryptValue(EncryptedDeal: string): Observable<string> {
    this.UpdateHttpRequest();
    var url = this.myApiUrl + 'utility/DecryptValue?value=' + EncryptedDeal
    return this.http.get<string>(url).pipe(
      retry(3)
    );
  }
  UpdatePolicyStatus(UpdatePolicyStatusRequest: UpdatePolicyStatusRequestModel): Observable<UpdatePolicyStatusResponseModel> {
    this.UpdateHttpRequest();
    UpdatePolicyStatusRequest.PolicyId = this.AES_ED.encrypt(UpdatePolicyStatusRequest.PolicyId);
    // UpdatePolicyStatusRequest.PolicyId = this.utilityservice.getLS("EncryptedPolID");
    var body = JSON.stringify(UpdatePolicyStatusRequest);
    var url = this.myApiUrl + 'Adp/UpdatePolicyStatus';
    return this.http.post<UpdatePolicyStatusResponseModel>(url, body, this.httpOptions).pipe(
      retry(3)
    );
  }
  GetAPITokenKYC(): Observable<string> {
    var tokenurl = this.myApiUrl + 'Utility/GetAPIToken?scope=esb-kyc';
    return this.http.get<string>(tokenurl).pipe(retry(3));
  }
  pdfdownloadnew(requestbody: any, token: string): Observable<any> {

    let headers = new HttpHeaders({

      'Content-Type': 'application/json; charset=utf-8',

      'authorization': token,

      'cache-control': 'no-cache',

    })

    var url = environment.APBpdf + "generic/policycertificate";

    let reqData = (requestbody);

    return this.http.post<any>(url, reqData, { headers: headers, 'responseType': 'blob' as 'json', }).pipe(

      retry(3)

    );




  }


}
