var alpha = /^[a-zA-Z\s]+$/;
var email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
var phone = /^[0-9]{10}$/;

$(document).ready(function () {
    $('#txtFullName').focus();
});

function isUndefinedOrNull(val) {
    return val === null || val == "" || val == "undefined" || val == "null"
}

function isAlpha(val) {
    if (!alpha.test(val)) {
        return false;
    }
    else {
        return true;
    }
}

function isPhone(val) {
    if (!phone.test(val)) {
        return false;
    }
    else {
        return true;
    }
}

function isEmailValid(val) {
    if (!email.test(val)) {
        return false;
    }
    else {
        return true;
    }
}

function SaveUserDetails() {
    var fnm = $("#txtFullName").val();
    var mobno = $("#txtMobileNo").val();
    var emailid = $("#txtEmailId").val();

    if (isUndefinedOrNull(fnm)) {
        bootbox.alert({ title: "Alert", message: "Please provide your name." });
        return;
    }
    else if (!isAlpha(fnm)) {
        bootbox.alert({ title: "Alert", message: "Please provide valid name." });
        return;
    }
    else if (isUndefinedOrNull(mobno)) {
        bootbox.alert({ title: "Alert", message: "Please provide mobile no." });
        return;
    }
    else if (!isPhone(mobno)) {
        bootbox.alert({ title: "Alert", message: "Please provide valid mobile no." });
        return;
    }
    else if (isUndefinedOrNull(emailid)) {
        bootbox.alert({ title: "Alert", message: "Please provide email id." });
        return;
    }
    else if (!isEmailValid(emailid)) {
        bootbox.alert({ title: "Alert", message: "Please provide valid email id." });
        return;
    }
    
    var formdata = new FormData();
    formdata.append("CustName", fnm);
    formdata.append("MobNo", mobno);
    formdata.append("EmailId", emailid);
    
    $.ajax({
        type: "POST",
        url: '' + ServerURL + 'MotorInsurance/SaveUserDetails',
        data: formdata,
        processData: false,
        contentType: false,
        beforeSend: function () {
            $(".backdrop").removeClass('hidden');
        },
        success: function (return_Data) {
            if (return_Data.n == 1) {
                //console.log(return_Data.msg);
                var vtype = getCookie("motorVehicletype");
                if (vtype == "4") {
                    window.location = '' + ServerURL + 'requestforimobile/requestPageKRG?vehicleType=4';
                }
                else if (vtype == "2") {
                    window.location = '' + ServerURL + 'requestforimobile/requestPageKRG?vehicleType=2';
                }
                else {
                    window.location = '' + ServerURL + 'motorinsurance/products';
                }
                
            }
            else {
                bootbox.alert({ title: 'Failed', message: 'Saving user details failed!' });
                $(".backdrop").addClass('hidden');
            }
        },
        complete: function () {
           
        }
    });
}