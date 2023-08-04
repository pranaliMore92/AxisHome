//var dateP = new Date();
//var yearP = dateP.getFullYear();
//var monthP = dateP.getMonth();
//var dayP = dateP.getDate();

//var $input = $('#nominee_dob').pickadate({
//    max: new Date(yearP - 18, monthP, dayP)
//});

//var $input1 = $('#customer_dob_manual').pickadate({
//    max: new Date(yearP - 18, monthP, dayP)
//});


var dateP = new Date();
var yearP = dateP.getFullYear();
var monthP = dateP.getMonth();
var dayP = dateP.getDate();

$(function () {
    $("#customer_dob_manual,#nominee_dob").datepicker({
        changeMonth: true,
        dateFormat: 'dd-M-yy',
        changeYear: true,
        maxDate: new Date(yearP - 18, monthP, dayP),
        yearRange: "-100:+0"
    });
});
//var ServerURL ='@Config.ServerURL';
function cancel() {
    $('#myModal').css('display', 'none');
}
function Calc() {
    $('#myModal').css('display', 'none');
}
function isUndefinedOrNull(val) {
    return val === null || val == "" || val == "undefined" || val == "null"
}

function RedirectPage() {
    try {
        var custTitle = $("#title").val();
        var custName = $("#customer_name_manual").val();
        var custDob = $("#customer_dob_manual").val();
        var custMobile = $("#mobile_number_manual").val();
        var custEmail = $("#cust_email_manual").val();
        var custAddress = $("#cust_address_manual").val();
        var custPincode = $("#cust_pincode_manual").val();
        var custState = $("#cust_state").val();
        var custCity = $("#cust_city").val();
        var custAltMobNo = ""; //$("#alternate_mobile_number").val();
        //var custGstApplicable = $("#chkRWGST").is(":checked"); //$("#InvoicebPACoverYesBike").is(":checked");
        var regno = $("#registration_number").val();
        var engineno = $('#engine_number').val();
        var chassisno = $('#chassis_number').val();
        var pp_previouspolicyprovider = $("#prevpolicyprovider").val();
        var pp_previouspolicynumber = $("#ro_prevpolicynumber").val();
        var pp_previouspolicyaddress = "India"; //$("#ro_prevpolicyaddress").val();

        var nominee_name = $("#nominee_name").val();
        var nominee_dob = $("#nominee_dob").val();
        var nominee_relationship = $("#nominee_relationship").val();
        
        //var pp_previouspolicyaddress = $("ro_prevpolicyaddress").val();
        //var nominee_age =

        var engineNoIndex = engineno.toUpperCase().indexOf('XXX');
        var chassisnoIndex = chassisno.toUpperCase().indexOf('XXX');

        if (isUndefinedOrNull(regno)) {
            bootbox.alert({ title: "Alert", message: "Please enter vehicle registration number." });
            //alert("Please enter vehicle registration number");
            return;
        }
        else if (isUndefinedOrNull(engineno)) {
            bootbox.alert({ title: "Alert", message: "Please provide engine number." });
            //alert("Please provide engine number");
            return;
        }
        else if (engineNoIndex >= 0) {
            bootbox.alert({ title: "Alert", message: "Please provide valid engine number." });
            //alert("Please provide engine number");
            return;
        }
        else if (engineno.trim().indexOf('0') == 0) {
            bootbox.alert({ title: "Alert", message: "Please provide valid engine number. Engine number can not start with 0" });
            //alert("Please provide engine number");
            return;
        }
        else if (isUndefinedOrNull(chassisno)) {
            bootbox.alert({ title: "Alert", message: "Please provide chassis number." });
            //alert("Please provide chassis number");
            return;
        }
        else if (chassisnoIndex >= 0) {
            bootbox.alert({ title: "Alert", message: "Please provide valid chassis number." });
            //alert("Please provide engine number");
            return;
        }
        else if (chassisno.trim().indexOf('0') == 0) {
            bootbox.alert({ title: "Alert", message: "Please provide valid chassis number. Chassis number can not start with 0" });
            //alert("Please provide engine number");
            return;
        }
        if (isUndefinedOrNull(custTitle) || custTitle == "-1") {
            bootbox.alert({ title: "Alert", message: "Select customer title." });
            //alert("Select customer title.");
            return;
        }
        else if (isUndefinedOrNull(custName)) {
            bootbox.alert({ title: "Alert", message: "Enter valid customer name." });
            //alert("Enter valid customer name.");
            //$scope.ShowAlertWithMessage("Enter valid customer name");
            return;
        }
        else if (isUndefinedOrNull(custDob)) {
            bootbox.alert({ title: "Alert", message: "Enter date of birth." });
            //alert("Enter date of birth.");
            return;
        }
        else if (isUndefinedOrNull(custMobile) || custMobile.length != 10) {
            bootbox.alert({ title: "Alert", message: "Enter valid mobile number." });
            //alert("Enter valid mobile number.");
            return;
        }
        else if (isUndefinedOrNull(custAddress)) {
            bootbox.alert({ title: "Alert", message: "Enter valid address." });
            //alert("Enter valid address.");
            return;
        }
        else if (isUndefinedOrNull(custPincode) || custPincode.length != 6) {
            bootbox.alert({ title: "Alert", message: "Enter Valid Pincode." });
            //alert("Enter Valid Pincode");
            return;
        }
        else if (custState == "0") {
            bootbox.alert({ title: "Alert", message: "Select State." });
            //alert("Select State");
            return;
        }
        else if (custCity == "0") {
            bootbox.alert({ title: "Alert", message: "Select City." });
            //alert("Select City");
            return;
        }
        else if (isUndefinedOrNull(custEmail)) {
            bootbox.alert({ title: "Alert", message: "Enter valid email address." });
            //alert("Enter valid email address.");
            return;
        }
            //var age= calculateAge(custDob);
            //if(age<18 || age>80 || age==0){
            //    $scope.ShowAlertWithMessage("Policy is available for entry age between 18 to 80 years.");
            //    return;
            //}
        else if (isUndefinedOrNull(custMobile) || custMobile.length != 10) {
            bootbox.alert({ title: "Alert", message: "Enter valid mobile number." });
            //alert("Enter valid mobile number.");
            return;
        }
        //else if(!isUndefinedOrNull(custAltMobNo) && custAltMobNo.length!=10){
        //    alert("Enter valid 10 digit alternate mobile number.");
        //    return;
        //}
        var vtype = getCookie("LS_ProductType");
        var isNew = getCookie("isNew");
        if (isNew != "Y") { //.//vtype == "4Wheeler" && 
            if (isUndefinedOrNull(pp_previouspolicyprovider) || pp_previouspolicyprovider == "0") {
                bootbox.alert({ title: "Alert", message: "Please select previous policy provider." });
                //alert("Please select previous policy provider");
                return;
            }
            else if (isUndefinedOrNull(pp_previouspolicynumber)) {
                bootbox.alert({ title: "Alert", message: "Please provide previous policy number." });
                //alert("Please provide previous policy number");
                return;
            }
            else if (isUndefinedOrNull(pp_previouspolicyaddress)) {
                bootbox.alert({ title: "Alert", message: "Please provide previous insurer address." });
                //alert("Please provide previous insurer address");
                return;
            }
        }
        if (isUndefinedOrNull(nominee_name)) {
            bootbox.alert({ title: "Alert", message: "Please provide nominee name" });
            return;
        }
        else if (isUndefinedOrNull(nominee_dob)) {
            bootbox.alert({ title: "Alert", message: "Please provide nominee birth date." });
            //alert("Please provide nominee birth date");
            return;
        }
        else if (isUndefinedOrNull(nominee_relationship) || nominee_relationship == "0") {
            bootbox.alert({ title: "Alert", message: "Please select nominee relationship." });
            //alert("Please select nominee relationship");
            return;
        }

        var pan = "";
        if ($('#customer_pan:visible').length != 0) {
            pan = $('#customer_pan').val();
            if (isUndefinedOrNull(pan)) {
                bootbox.alert({ title: 'Alert', message: "Please provide valid pan no." });
                return;
            }
            var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
            if (regpan.test(pan) == false){
                bootbox.alert({ title: 'Alert', message: "Please provide valid pan no." });
                return;
            }
        }

        var CustDOB = custDob;

        var formdata = new FormData();
        formdata.append("pincode", custPincode);
        formdata.append("cityid", custCity);
        $.ajax({
            type: "POST",
            url: '' + ServerURL + 'Proposal/GetPincodeID',
            data: formdata,
            processData: false,
            contentType: false,
            beforeSend: function () {
                $(".backdrop").removeClass('hidden');

                //    $(element).attr('disabled', true);
                //    var loader = "Please wait..";
                //    $(element).html(loader);
            },
            success: function (return_Data) {
                //alert(return_Data.StateCityResponse.StatusCode);
                if (return_Data.StatusCode == 1) {
                    var pinid = return_Data.Details[0].Value;

                    var formdataCust = new FormData();
                    formdataCust.append("customerid", 0);
                    formdataCust.append("ownertype", "individual");
                    formdataCust.append("hasaddresschanged", true);
                    formdataCust.append("setasdefault", true);
                    formdataCust.append("titletext", $("#title option:selected").text());
                    formdataCust.append("titlevalue", custTitle);
                    formdataCust.append("name", custName);
                    formdataCust.append("dateofbirth", custDob);
                    formdataCust.append("maritalstatusvalue", "-1");
                    formdataCust.append("maritalstatustext", "");
                    formdataCust.append("occupationvalue", "-1");
                    formdataCust.append("occupationtext", "");
                    formdataCust.append("annualincomevalue", "-1");
                    formdataCust.append("annualincometext", "");
                    formdataCust.append("identityproofvalue", "-1");
                    formdataCust.append("identityprooftext", "");
                    formdataCust.append("identitynumber", "");
                    formdataCust.append("presentaddrline1", custAddress);
                    formdataCust.append("presentaddrline2", "");
                    formdataCust.append("presentaddrlandmark", "");
                    formdataCust.append("presentaddrcityvalue", custCity);
                    formdataCust.append("presentaddrcitytext", $("#cust_city option:selected").text());
                    formdataCust.append("presentaddrstatevalue", custState);
                    formdataCust.append("presentaddrstatetext", $("#cust_state option:selected").text());
                    formdataCust.append("presentaddrpincodevalue", pinid);
                    formdataCust.append("presentaddrpincodetext", custPincode);
                    formdataCust.append("emailaddress", custEmail);
                    formdataCust.append("MobileNumber", custMobile);
                    formdataCust.append("LandlineNumber", "");
                    formdataCust.append("EmailAlternate", "");
                    formdataCust.append("MobileAlternate", custAltMobNo);
                    formdataCust.append("PANNumber", pan);
                    formdataCust.append("isPermanentAsPresent", true);
                    formdataCust.append("PermanentAddrLine1", custAddress);
                    formdataCust.append("PermanentAddrLine2", "");
                    formdataCust.append("PermanentAddrLandmark", "");
                    formdataCust.append("PermanentAddrCityValue", custCity);
                    formdataCust.append("PermanentAddrCityText", $("#cust_city option:selected").text());
                    formdataCust.append("PermanentAddrStateValue", custState);
                    formdataCust.append("PermanentAddrStateText", $("#cust_state option:selected").text());
                    formdataCust.append("PermanentAddrPincodeValue", pinid);
                    formdataCust.append("PermanentAddrPincodeText", custPincode);
                    formdataCust.append("isGSTINApplicable", false);
                    formdataCust.append("isUINApplicable", false);


                    $.ajax({
                        type: "POST",
                        url: "" + ServerURL + "Proposal/SaveCustomer",
                        data: formdataCust,
                        processData: false,
                        contentType: false,
                        beforeSend: function () {
                            $(".backdrop").removeClass('hidden');
                        },
                        success: function (return_Data) {
                            var rFrom = getCookie("IMobileRequestFrom");
                            //if (rFrom == "Customer") {
                            //    var accno = $('#customer_accno').val();
                            //    setCookie("ICICI_ACC_NO",accno);
                            //}
                            if (return_Data.CustomerID != 0) {
                                var CustomerID = return_Data.CustomerID;
                                var PFCustomerID = return_Data.PFCustomerID;
                                var AddressID = return_Data.AddressID;
                                var customer_ref_no = $('#customer_ref_no').val();
                                var ipaddr = getCookie("Source");

                                var formdataProposal = new FormData();
                                //formdataProposal.append("UserRole", "CUSTOMER");
                                formdataProposal.append("UserRole", "AGENT");
                                var vtype = getCookie("motorVehicletype");
                                if (vtype == '4') {
                                    formdataProposal.append("Vehicle", "PrivateCar");
                                }
                                else {
                                    formdataProposal.append("Vehicle", "TwoWheeler");
                                }
                                formdataProposal.append("VehicleType", "Existing");
                                formdataProposal.append("IPAddress", ipaddr);
                                formdataProposal.append("QuoteID", "");
                                formdataProposal.append("PFQuoteID", "");
                                formdataProposal.append("isOpenCoverNote", false);
                                formdataProposal.append("IsBreakinPolicy", false);
                                formdataProposal.append("IsVehicleLocationSame", false);
                                formdataProposal.append("IsSelfInspection", false);
                                formdataProposal.append("VehicleRegNumber", regno);
                                formdataProposal.append("EngineNumber", engineno);
                                formdataProposal.append("ChassisNumber", chassisno);
                                formdataProposal.append("VehicleUnder", "NONE");
                                formdataProposal.append("FinancierName", "");
                                formdataProposal.append("FinancierBranch", "");
                                formdataProposal.append("SourcingCode", "");
                                formdataProposal.append("TarrifType", "NORMAL");
                                formdataProposal.append("PolicyEndDate", "01-Jan-0001");
                                formdataProposal.append("InspectionTypeDesc", "");
                                formdataProposal.append("HasIbankRelationship", false);
                                formdataProposal.append("IsNomineeRequired", true);
                                formdataProposal.append("Status", "Save");

                                formdataProposal.append("PP_InsuranceProvider", pp_previouspolicyprovider);
                                formdataProposal.append("PP_PolicyNo", pp_previouspolicynumber);
                                formdataProposal.append("PP_InsurerAddress", pp_previouspolicyaddress);
                                formdataProposal.append("N_NomineeName", nominee_name);
                                formdataProposal.append("N_NomineeRelationId", nominee_relationship);
                                formdataProposal.append("N_NomineeRelationName", $("#nominee_relationship option:selected").text());
                                formdataProposal.append("N_NomineeAge", 0);
                                formdataProposal.append("N_NomineeDOB", nominee_dob);
                                formdataProposal.append("emp_ref_no", customer_ref_no);
                                $.ajax({
                                    type: "POST",
                                    url: "" + ServerURL + "Proposal/SaveEditProposal",
                                    data: formdataProposal,
                                    processData: false,
                                    contentType: false,
                                    beforeSend: function () {
                                        $(".backdrop").removeClass('hidden');
                                    },
                                    success: function (return_Data) {
                                        if (return_Data.StatusType == "SUCCESS") {
                                            if (return_Data.IsBreakinPolicy == true) {
                                                var msg = getCookie("BreakInMessage");
                                                var breakinid = return_Data.BreakInID;
                                                if (isUndefinedOrNull(breakinid)) {
                                                    msg = msg + ' The case has been moved to break-in. Kindly Contact nearest Sales Representative for further assistance.';
                                                }
                                                else {
                                                    msg = msg + ' The case has been moved to break-in. Break-in Id is: ' + return_Data.BreakInID + '. Kindly Contact nearest Sales Representative for further assistance.';
                                                }
                                                $(".backdrop").addClass('hidden');
                                                bootbox.alert({
                                                    title: "Alert",
                                                    message: msg,
                                                    callback: function () {
                                                        //console.log('This was logged in the callback!');
                                                        $(".backdrop").removeClass('hidden');
                                                        var identifier = getCookie("Identifier");
                                                        var requestFrom = getCookie("IMobileRequestFrom");
                                                        var vehType = getCookie("motorVehicletype");
                                                        if (requestFrom == "Identifier") {
                                                            window.location.href = '' + ServerURL + 'RequestforIMobile/requestPageSessionExpired?Identifier=' + identifier + '&vehicleType=' + vehType;
                                                        }
                                                        else {
                                                            window.location.href = '' + ServerURL + 'MotorInsurance/Index';
                                                        }
                                                    }
                                                });
                                            }
                                            else {
                                                $(".backdrop").removeClass('hidden');
                                                //console.log("save proposal success");
                                                window.location.href = ServerURL + "Summary/index";
                                            }
                                        }
                                        else {
                                            $(".backdrop").addClass('hidden');
                                            bootbox.alert({ title: "Alert", message: "Failed to save proposal." });
                                            //alert('Saving proposal failed');
                                        }
                                    },
                                    complete: function () {
                                    }
                                });
                            }
                            else {
                                $(".backdrop").addClass('hidden');
                                bootbox.alert({ title: "Alert", message: "Failed to save customer details." });
                                //alert('Customer details not captured.');
                            }
                        },
                        complete: function () {

                        }
                    });

                } else {
                    $(".backdrop").addClass('hidden');
                    alert(return_Data.StatusMessage);

                }
            },
            complete: function () {

                //    $(element).attr('disabled', false);
                //    $(element).html('Get Quote');
            }
        });

    }
    catch (error) {
        alert(error);
    }
}

// Get the modal
////var modal = document.getElementById("myModal");

// Get the button that opens the modal

////var btn = document.getElementById("chkRWGST");

//// Get the <span> element that closes the modal
////var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal

////btn.onclick = function () {
////    modal.style.display = "block";
////}

// When the user clicks on <span> (x), close the modal
////span.onclick = function () {
////    $('.checkbox4 input[type=checkbox]').prop('checked', false);
////    modal.style.display = "none";
////}
////span.onclick = function () {
////    $('.checkbox4 input[type=checkbox]').prop('checked', false);
////    modal.style.display = "none";
////}

////// When the user clicks anywhere outside of the modal, close it
////window.onclick = function (event) {
////    if (event.target == modal) {
////        $('.checkbox4 input[type=checkbox]').prop('checked', false);
////        modal.style.display = "none";
////    }
////}

function calculateAge(bday) {
    var today = new Date();
    var birthDate = new Date(bday);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();

    if (today.getMonth() < birthDate.getMonth() || (today.getMonth() == birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

//function nomineeDOBChange(nomineeDOB) {
//    var date = new Date(nomineeDOB);

//    var today = new Date();
//    var birthDate = new Date(nomineeDOB);
//    var age = today.getFullYear() - birthDate.getFullYear();
//    var m = today.getMonth() - birthDate.getMonth();

//    if (today.getMonth() < birthDate.getMonth() || (today.getMonth() == birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
//        age--;
//    }
//    console.log(age);
//    if (age < 18) {
//        $("#appointeerow").show();
//    } else {
//        $("#appointeerow").hide();
//    }
//}

//function resetVariables() {
//    $("#customer_name").val("");
//    $("#cust_address").val("");
//    $("#state_4_manual").val("");
//    $("#cust_pincode").val("");
//    $("#pincodeimg").hide();
//    $("#cust_dob").val("");
//    $("#cust_email").val("");
//    $("#mobile_number").val("");
//    $("#cust_wa_manual").val("");
//}

function ToggleTabs(num) {
    if (num == '2') {

        var engineno = $('#engine_number').val();
        var chassisno = $('#chassis_number').val();
        var engineNoIndex = engineno.toUpperCase().indexOf('XXX');
        var chassisnoIndex = chassisno.toUpperCase().indexOf('XXX');
        if (isUndefinedOrNull(engineno)) {
            bootbox.alert({ title: "Alert", message: "Please provide engine number." });
            //alert("Please provide engine number");
            return;
        }
        else if (engineNoIndex >= 0) {
            bootbox.alert({ title: "Alert", message: "Please provide valid engine number." });
            //alert("Please provide engine number");
            return;
        }
        else if (engineno.trim().indexOf('0') == 0) {
            bootbox.alert({ title: "Alert", message: "Please provide valid engine number. Engine number can not start with 0" });
            //alert("Please provide engine number");
            return;
        }
        else if (isUndefinedOrNull(chassisno)) {
            bootbox.alert({ title: "Alert", message: "Please provide chassis number." });
            //alert("Please provide chassis number");
            return;
        }
        else if (chassisnoIndex >= 0) {
            bootbox.alert({ title: "Alert", message: "Please provide valid chassis number." });
            //alert("Please provide engine number");
            return;
        }
        else if (chassisno.trim().indexOf('0') == 0) {
            bootbox.alert({ title: "Alert", message: "Please provide valid chassis number. Chassis number can not start with 0" });
            //alert("Please provide engine number");
            return;
        }
        var vtype = getCookie("LS_ProductType");
        ////if (vtype == "4Wheeler") {
            var pp_previouspolicyprovider = $("#prevpolicyprovider").val();
            var pp_previouspolicynumber = $("#ro_prevpolicynumber").val();
            var pp_previouspolicyaddress = "India";//$("#ro_prevpolicyaddress").val();

            if (isUndefinedOrNull(pp_previouspolicyprovider) || pp_previouspolicyprovider == "0") {
                bootbox.alert({ title: "Alert", message: "Please select previous policy provider." });
                //alert("Please select previous policy provider");
                return false;
            }
            else if (isUndefinedOrNull(pp_previouspolicynumber)) {
                bootbox.alert({ title: "Alert", message: "Please provide previous policy number." });
                //alert("Please provide previous policy number");
                return false;
            }
            else if (isUndefinedOrNull(pp_previouspolicyaddress)) {
                bootbox.alert({ title: "Alert", message: "Please provide previous insurer address." });
                //alert("Please provide previous insurer address");
                return false;
            }
            else {
                $("#togCust").trigger('click');
            }
        ////}
        ////else if (vtype == "2Wheeler") {
        ////    $("#togCust").trigger('click');
        ////}

        //$('#togCust').addClass('toggle-1-active');
        //$('#togVeh').removeClass('toggle-1-active');
        //$('#togBasic').removeClass('toggle-1-active');

        //$('#togCCust').attr('style', 'overflow: hidden; display: block;');
        //$('#togCVeh').attr('style', '');
        //$('#togCBasic').attr('style', '');
        $('#togCust').focus();
    }
    else if (num == '1') {
        //$('#togVeh').addClass('toggle-1-active');
        //$('#togCust').removeClass('toggle-1-active');
        //$('#togBasic').removeClass('toggle-1-active');

        //$('#togCVeh').attr('style', 'overflow: hidden; display: block;');
        //$('#togCCust').attr('style', '');
        //$('#togCBasic').attr('style', '');
    }
}


$("#cust_pincode_manual").bind('input', function (e) {
    if (($("#cust_pincode_manual").val()).length == 6) {
        updatePin();
    }
    else {
        $('#cust_state').val(0);
        $('#cust_city').val(0);
    }
});

function updatePin() {
    var pin = $("#cust_pincode_manual").val();
    //alert(a);
    if (isUndefinedOrNull(pin) || pin.length != 6) {
        bootbox.alert({ title: 'Alert', message: 'Please provide valid pincode.' });
        return;
    }
    var formdata = new FormData();
    formdata.append("pinCode", pin)
    $.ajax({
        type: "POST",
        url: '' + ServerURL + 'Proposal/GetStateCityByPinCode',
        data: formdata,
        processData: false,
        contentType: false,
        beforeSend: function () {
            $(".backdrop").removeClass('hidden');
            //$("#preloader").show();
        },
        success: function (return_Data) {
            //alert(return_Data.StateCityResponse.StatusCode);
            if (return_Data.StatusCode == '1') {
                $('#cust_state').val(return_Data.StateId);
                fillCities($('#cust_state'), return_Data.CityList[0].CityID);
                //setTimeout(function () {
                //    $('#cust_city').val(return_Data.CityList[0].CityID);
                //}, 1500);
                //window.location.href = "/premium/Index";
            } else {
                $('#cust_state').val(0);
                $('#cust_city').val(0);
                //bootbox.alert({title: 'Alert', message: 'Please provide valid pincode.'});
            }
        },
        complete: function () {
            $(".backdrop").addClass('hidden');
            //$("#preloader").hide();
        }
    });
}

function fillCities(obj, CityID) {
    var stateid = $(obj).val();
    if (stateid == 0) {
        //bootbox.alert('Please select State');
        bootbox.alert({ title: "Alert", message: "Please select State" });
        return;
    }
    var formdata = new FormData();
    formdata.append("StateId", stateid)
    $.ajax({
        type: "POST",
        url: '' + ServerURL + 'Proposal/GetCityListByStateId',
        data: formdata,
        processData: false,
        contentType: false,
        beforeSend: function () {
            $(".backdrop").removeClass('hidden');
        },
        success: function (return_Data) {
            //alert(return_Data.CityResponse.StatusCode);

            if (return_Data.StatusCode == 1) {
                var str = "";
                str = "<option value='0' data-placeholder='true'>Select City</option>";
                $.each(return_Data.CityList, function (i, obj) {
                    str += "<option value='" + obj.CityID + "'> " + obj.CityName + "</option>";
                });
                $('#cust_city').html(str);

                $('#cust_city').val(CityID);
                //alert(str);
                //$('#cust_state').val(return_Data.StateCityResponse.StateId);
                //$('#cust_city').val(return_Data.StateCityResponse.CityList.CityOutputResponse.CityName);
                //window.location.href = "/premium/Index";
            } else {
                bootbox.alert({ title: 'Alert', message: 'Failed to load cities, please try again!' });
            }
        },
        complete: function () {
            $(".backdrop").addClass('hidden');
        }
    });
}

////function SaveGST() {
////    var constofbusi = $('#gst_const_of_business').val();
////    var pan_details_gst = $('#pan_details_gst').val().toUpperCase();
////    var gst_cust_type = $('#gst_cust_type').val();
////    var gst_reg_status = $('#gst_reg_status').val();
////    var gstin_uin_no = $('#gstin_uin_no').val().toUpperCase();

////    if (constofbusi == '' || constofbusi == "0") {
////        //bootbox.alert({ title: 'Alert', message: 'Select Constitution of Business' });
////        alert("Select Constitution of Business");
////        return;
////    }
////    else if (pan_details_gst == "" || pan_details_gst.length > 10) {
////        //bootbox.alert({ title: 'Alert', message: 'Enter valid PAN Number.' });
////        alert("Enter valid PAN Number.");
////        return;
////    }
////    else if (!validatePan(pan_details_gst.toUpperCase())) {
////        //bootbox.alert({title: "Alert", message: "Enter valid PAN Number."});
////        alert("Enter valid PAN Number.");
////        return false;
////    }
////    else if (gst_cust_type == "" || gst_cust_type == "0") {
////        //bootbox.alert({title: "Alert", message: "Select Customer Type."});
////        alert("Select Customer Type.");
////        return false;
////    }
////    else if (gst_reg_status == "" || gst_reg_status == "0") {
////        //bootbox.alert({title: "Alert", message: "Select GST Registration status."});
////        alert("Select GST Registration status.");
////        return false;
////    }
////    else if (gstin_uin_no == "") {
////        //bootbox.alert({title: "Alert", message: "Enter GSTIN/UIN Number"});
////        alert("Enter GSTIN/UIN Number");
////        return false;
////    }
////    else if ((!gstinnoValidation(gstin_uin_no) && $('#lbl_gstinuin').text() == "GSTIN No") || (!UINNoValidation(gstin_uin_no) && $('#lbl_gstinuin').text() == "UIN No")) {
////        //bootbox.alert({title: "Alert", message: "Enter valid GSTIN/UIN No"});
////        alert("Enter valid GSTIN/UIN No");
////        return false;
////    }
////    else if (!validateStateCode(gstin_uin_no.substr(0, 2), $('#cust_state').val())) {
////        //bootbox.alert({title: "Alert", message: "Invalid GSTIN/UIN No. Please enter valid GSTIN/UIN No."});
////        alert("Invalid GSTIN/UIN No. Please enter valid GSTIN/UIN No.");
////        return false;
////    }
////    //return true;

////    setCookie("GST_Constitution_of_business_key", constofbusi);
////    setCookie("GST_Constitution_of_business_value", $("#gst_const_of_business option:selected").text());
////    setCookie("GST_Pan_Details", pan_details_gst.toUpperCase());
////    setCookie("GST_Cust_Type_key", gst_cust_type);
////    setCookie("GST_Cust_Type_value", $("#gst_cust_type option:selected").text());
////    setCookie("GST_Reg_Status_key", gst_reg_status);
////    setCookie("GST_Reg_Status_value", $("#gst_reg_status option:selected").text());
////    setCookie("GST_Gstin_Uinno", gstin_uin_no);

////    alert('Gst Details Saved!');
////    $('#myModal').attr("style","display='none'");
////}

function validatePan(val) {
    if (new RegExp('[A-Z]{5}[0-9]{4}[A-Z]{1}').test(val)) {
        //console.log("pan card correct ");
        return true;
    }
    return false;
}

function gstinnoValidation(val) {
    if (new RegExp('[0-9]{2}[A-Z]{3}[PCHABGJLEFT][A-Z][0-9]{4}[A-Z]{1}[0-9A-Z]{1}[Z]{1}[0-9A-Z]{1}').test(val)) {
        //console.log("gstin correct ");
        return true;
    }
    return false;
}

function UINNoValidation(uin_no) {
    if (new RegExp('[0-9]{2}[0-9]{2}[A-Z]{3}[0-9]{5}[A-Z]{3}').test(uin_no)) {
        //console.log("uin correct.");
        return true;
    }
    return false;
}

$("input[name='isGSTINUIN']").click(function () {
    if ($("#isGSTIN").is(":checked")) {
        $('#lbl_gstinuin').text('GSTIN No');
        //$(this).parent().parent().parent().prev('a').addClass('MyClickActive');
    } else {
        $('#lbl_gstinuin').text('UIN No');
    }
});

//$('.deploy-toggle-1').on('click',function(){
//    if($(this).hasClass('toggle-1-active')){
//        $(this).removeClass('toggle-1-active');
//        $(this).next('.toggle-content').css('display','none');
//    }
//    else{
//        $('.deploy-toggle-1').removeClass('toggle-1-active');
//        $('.toggle-content').css('display','none');
//        $(this).addClass('toggle-1-active');
//        $(this).next('.toggle-content').css('display','block');
//    }
//});



$(window).ready(function () {
    $('.picker__footer button').removeClass('ui-btn ui-shadow ui-corner-all');
});


$('#prevpolicyprovider').change(function () {
    var title = $(this).val();
    var vtype = getCookie("motorVehicletype");
    if (title == "ICICI LOMBARD" && vtype == "4") {
        $('#modal_ICICIpvp').modal('show');
    }
});
function cancelICICIpvp() {
    $('#prevpolicyprovider').val('0');
    $('#modal_ICICIpvp').modal('hide');
}
$('#modal_ICICIpvp').on('hidden.bs.modal', function (e) {
    cancelICICIpvp();
})