
//var $input = $('#txtRegistration2').pickadate();
$("#txtCarNo").keypress(function (event) {
    if (event.keyCode == 13) {
        $("#btnGetQuote").click();
    }
});
$(document).ready(function () {
    $('#txtCarNo').focus();
});

var modal = document.getElementById("RTODetailsModel");
var span = document.getElementsByClassName("close")[0];
span.onclick = function () {
    modal.style.display = "none";
}
span.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
function cancel() {
    $('#RTODetailsModel').css('display', 'none');
}
function getRTOList() {
    var formdata = new FormData();
    
    $.ajax({
        type: "POST",
        url: '' + ServerURL + 'Premium/getRTOList',
        data: formdata,
        processData: false,
        contentType: false,
        async: false,
        success: function (return_Data) {
            if (return_Data.n == 1) {
                $("#ddlRTO").html(return_Data.isparam1);
                getManuList('', return_Data.isparam2)
            }
        }
    });
}

function getManuList(manuid, rtoid) {
    var formdata = new FormData();
    formdata.append("ManufactureID", manuid);
    if (rtoid != undefined && rtoid != "")
        formdata.append("RTOId", rtoid);
    else
        formdata.append("RTOId", $("#ddlRTO").val());
    

    $.ajax({
        type: "POST",
        url: '' + ServerURL + 'Premium/getManufactureList',
        data: formdata,
        processData: false,
        contentType: false,
        async: false,
        success: function (return_Data) {
            if (return_Data.n == 1) {
                $("#ddlManufacturer").html(return_Data.isparam1);
                $("#ddlManufacturer").val("-1");
            }
        }
    });
}
function getModelList(modelid) {
    var formdata = new FormData();
    formdata.append("ManufactureID", $("#ddlManufacturer").val());
    formdata.append("ModelId", modelid);
    

    $.ajax({
        type: "POST",
        url: '' + ServerURL + 'Premium/getModelListOfManu',
        data: formdata,
        processData: false,
        contentType: false,
        async: false,
        success: function (return_Data) {
            if (return_Data.n == 1) {
                $("#ddlModel").html(return_Data.isparam1);
                $("#ddlModel").val("-1");
            }
        }
    });
}

function specialCharValidator(number) {
    if (number.match(/^[\w&.\-]+$/))
        return true;
    return false;
}

function resetModelpopup() {
    $('#ddlRTO').val('');
    $('#txtRegistration2').val('');
    $('#ddlManufacturer').val('-1');
    $('#ddlModel').val('-1');
}

$('#RTODetailsModel').on('hidden.bs.modal', function () {
    resetModelpopup();
});

function getquote(element) {
    setCookie("isNew", "N");
    //e.preventDefault();
    var vehicleNo = $('#txtCarNo').val().trim();
    if (vehicleNo == "") {
        bootbox.alert({
            title: "Alert",
            message: "Registration number cannot be blank"
        });
        return false;
    }
    if (vehicleNo.indexOf("-") > -1) {
        vehicleNo = vehicleNo.split("-").join("");
    }
    vehicleNo = vehicleNo.toUpperCase();


    if (vehicleNo.length > 25 || !specialCharValidator(vehicleNo)) {
        bootbox.alert({
            title: "Alert",
            message: "Enter valid vehicle registration number"
        });
        return false;
    }

    setCookie("registrationNumberIs", vehicleNo);
    setCookie("isRollOver", true);
    //setCookie("motorVehicletype",vehicleNo);
    var motor_vehicle_type = getCookie("motorVehicletype");
    setCookie(motor_vehicle_type + "W_VehicleRegistrationDetails", "");
    setCookie("is4wheeler", motor_vehicle_type == "4");

    var formdata = new FormData();
    formdata.append("regNo", vehicleNo);

    $.ajax({
        type: "POST",
        url: '' + ServerURL + 'CarRegDetails/GetVehicleRegDetails',
        data: formdata,
        processData: false,
        contentType: false,
        beforeSend: function () {
            $(".backdrop").removeClass('hidden');
            // $("#cover-spin").show();
            $(element).prop('disabled', true);
            var loader = "Please wait..";
            $(element).html(loader);
        },
        success: function (return_Data) {
            if (return_Data.n == 4) //breakin 
            {
                $(".backdrop").addClass('hidden');
                bootbox.alert({
                    title: "Alert",
                    message: return_Data.Msg,
                    callback: function () {
                        //console.log('This was logged in the callback!');
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
            else if (return_Data.n == 0) {
                $(".backdrop").addClass('hidden');
                modal.style.display = "block";
                resetModelpopup();
                //bootbox.alert({
                //    title: "Alert",
                //    message: return_Data.Msg
                //});
            }
            else if (return_Data.n == 2) {
                $(".backdrop").addClass('hidden');
                modal.style.display = "block";
                resetModelpopup();
                //bootbox.alert({
                //    title: "Alert",
                //    message: "Record not found for entered registration number, Please fill details manually.",
                //    callback: function () {

                //        modal.style.display = "block";
                //        $('#ddlRTO').val('');
                //        getRTOList();
                //        getModelList('');
                //    }
                //});
            }
            else if (return_Data.n == 1 && return_Data.StatusCode == 1) {
                if (motor_vehicle_type == "4") {
                    $(".backdrop").removeClass('hidden');
                    // $("#cover-spin").show();
                    $(element).prop('disabled', true);
                    var loader = "Please wait..";
                    $(element).html(loader);
                    window.location.href = ServerURL + "premium/Packages";
                }
                else if (motor_vehicle_type == "2") {
                    $(".backdrop").removeClass('hidden');
                    // $("#cover-spin").show();
                    $(element).prop('disabled', true);
                    var loader = "Please wait..";
                    $(element).html(loader);
                    window.location.href = ServerURL + "premium/Index";
                }

            } else {
                $(".backdrop").addClass('hidden');
                modal.style.display = "block";
                resetModelpopup();
                //bootbox.alert({
                //    title: "Alert",
                //    message: return_Data.Msg
                //});
            }


            //if (return_Data.n == 1) {
            //    $("#ProfileImage").attr("src", return_Data.isparam1);
            //    //reset();
            //    //bootbox.alert(return_Data.msg);
            //    //$("#btnShowAdd").removeClass('hidden');
            //    //$("#AddDiv").slideUp(500);
            //    //refreshDataTable($("#ddlCategoryFilter").val());
            //}
            //else if (return_Data.n == 5) {
            //    bootbox.alert(return_Data.msg, function () {
            //        window.location.href = ServerURL + "/SignIn/";
            //    });
            //}
            //else {
            //    bootbox.alert(return_Data.msg);
            //}
        },
        complete: function () {

            $(element).prop('disabled', false);
            $(element).html('Get Quote');
        }
    });
}

//function callBootbox() {
//    bootbox.alert({
//        title: "Alert",
//        message: "This is the small alert! This is the small alert! This is the small alert!"
//    });
//}


function Calc() {
    var ddlRTO = $("#ddlRTO").val();
    var txtRegistration2 = $("#txtRegistration2").val().trim();
    var motor_vehicle_type = getCookie("motorVehicletype");
    //const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    //console.log(txtRegistration2);
    //var parts = txtRegistration2.split('-');
    //var today = new Date(parts[0], parts[1] - 1, parts[2]);
    //var dd = today.getDate();
    //var mm = monthNames[today.getMonth()]

    //var yyyy = today.getFullYear();
    //if (dd < 10) {
    //    dd = '0' + dd;
    //}
    //if (mm < 10) {
    //    mm = '0' + mm;
    //}
    //txtRegistration2 = dd + '-' + mm + '-' + yyyy;

    var ddlManufacturer = $("#ddlManufacturer").val();
    var ddlModel = $("#ddlModel").val();
    if (ddlRTO == '' || ddlRTO == '-1') {
        bootbox.alert({
            title: "Alert",
            message: 'Please select RTO'
        });
        return false;
    }
    else if (txtRegistration2 == '') {
        bootbox.alert({
            title: "Alert",
            message: 'Please enter registration date'
        });
        return false;
    }
    else if (ddlManufacturer == '' || ddlManufacturer == '-1') {
        bootbox.alert({
            title: "Alert",
            message: 'Please select Manufacturer'
        });
        return false;
    }
    else if (ddlModel == '-1' || ddlModel == '') {
        bootbox.alert({
            title: "Alert",
            message: 'Please select model'
        });
        return false;
    }


    var formdata = new FormData();
    formdata.append("RTOId", ddlRTO);
    formdata.append("ManuId", ddlManufacturer);
    formdata.append("ModelId", ddlModel);
    formdata.append("RTOName", $("#ddlRTO option:selected").text());
    formdata.append("ManuName", $("#ddlManufacturer option:selected").text());
    formdata.append("ModelName", $("#ddlModel option:selected").text());
    formdata.append("regDate", txtRegistration2);

    $.ajax({
        type: "POST",
        url: '' + ServerURL + 'CarRegDetails/SubmitVehicleData',
        data: formdata,
        processData: false,
        contentType: false,
        beforeSend: function () {
            $(".backdrop").removeClass('hidden');
            //$("#cover-spin").show();
            $("#btnSubmit").prop('disabled', true);
            var loader = "Please wait..";
            $("#btnSubmit").html(loader);
        },
        success: function (return_Data) {
            if (return_Data.n == 4) //breakin 
            {
                modal.style.display = "none";
                $(".backdrop").addClass('hidden');
                bootbox.alert({
                    title: "Alert",
                    message: return_Data.msg,
                    callback: function () {
                        //console.log('This was logged in the callback!');
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
            else if (return_Data.n == 1) {
                if (motor_vehicle_type == "4") {
                    // $("#cover-spin").show();
                    $("#btnGetQuote").prop('disabled', true);
                    var loader = "Please wait..";
                    $("#btnGetQuote").html(loader);
                    window.location.href = ServerURL + "premium/Packages";
                }
                else if (motor_vehicle_type == "2") {
                    // $("#cover-spin").show();
                    $("#btnGetQuote").prop('disabled', true);
                    var loader = "Please wait..";
                    $("#btnGetQuote").html(loader);
                    window.location.href = ServerURL + "premium/index";
                }
            }
            else if (return_Data.n == 0) {
                bootbox.alert({
                    title: "Alert",
                    message: return_Data.msg
                });
                $(".backdrop").addClass('hidden');
            }
        },
        complete: function () {
            //$(".backdrop").addClass('hidden');
            // $("#cover-spin").hide();
            $("#btnSubmit").prop('disabled', false);
            $("#btnSubmit").html('Submit');
        }
    });
}

function openPopup() {
    var formdata = new FormData();
    formdata.append("RTOName", $("#ddlRTO").val());
   

    $.ajax({
        data: formdata,
        type: 'POST',
        url: '' + ServerURL + 'Premium/getRTO',
        processData: false,
        contentType: false,
        async: false,
        success: function (data) {
            productIds = new Object();
            productNames = [];
            FinalData = data;
            $.each(data, function (index, product) {
                productIds[data[index].Value] = data[index].Key;
                productNames.push(data[index].Value);
            });
            $('#ddlRTO').removeClass('ui-autocomplete-loading');

        },
        error: function (data) {
            $('#ddlRTO').removeClass('ui-autocomplete-loading');
        }
    })
}

function showModal() {
    setCookie("isNew", "N");
    openModal();
}

function openModal() {
    $(".backdrop").removeClass('hidden');
    modal.style.display = "block";
    resetModelpopup();
    $('#ddlRTO').focus();
    $(".backdrop").addClass('hidden');
}

function showModalforNC() {
    setCookie("isNew", "Y");
    openModal();
}