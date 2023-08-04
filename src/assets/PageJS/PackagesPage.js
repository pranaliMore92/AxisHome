$(document).ready(function () {
    //$(window).on('load', function () {
    $('.modal').modal({ backdrop: 'static', keyboard: false, show: false });
    $("#btnSavePackage").attr('disabled', true);
    var loader = "Loading";
    $("#btnSavePackage").html(loader);
    $("#btnClosePolicyType").attr('disabled', true);
    $("#btnClosePolicyType").html(loader);
    $("#btnChangePolicyType").attr('disabled', true);
    $("#btnChangePolicyType").html(loader);
    $("#btnSaveRTODetails").attr('disabled', true);
    $("#btnSaveRTODetails").html(loader);
    $("#btnCloseRTODetails").attr('disabled', true);
    $("#btnCloseRTODetails").html(loader);
    //$("#btnCloseNCBPercentage").attr('disabled', true);
    //$("#btnCloseNCBPercentage").html(loader);
    //$("#btnChangeNCBPercentage").attr('disabled', true);
    //$("#btnChangeNCBPercentage").html(loader);
    //btnSaveRTODetails
    var policytype = $("#hdnPolicyType").val();
    if (policytype == '1') {
        $("#PolicyType1").prop('checked', true);
        //$("#PolicyType2Div").addClass('hidden');
    }
    else if (policytype == '2') {
        $("#PolicyType2").prop('checked', true);
        $("#PolicyType2Div").removeClass('hidden');
    }
    setTimeout(FetchPremiumPlan('3'), 1000);
    
});
var count = 0;

function FetchPremiumPlan(packageno) {
    var formdata = new FormData();
    formdata.append("PackageNo", packageno);
    
    $.ajax({
        type: "POST",
        url: '' + ServerURL + 'Premium/GetPrimiumFromPackages',
        data: formdata,
        processData: false,
        contentType: false,

        beforeSend: function () {

        },
        success: function (return_Data) {
            if (return_Data.n == 1) {
                $('#btnRecalculate').hide();
                $('#btnSavePackage').show();

                $("#Package" + packageno + "Premium").html('<i class="fa fa-inr"></i> ' + return_Data.isparam1 + '');
                $("#Package2Premium").html('<i class="fa fa-inr"></i> ' + return_Data.isparam2 + '');
                $("#Package1Premium").html('<i class="fa fa-inr"></i> ' + return_Data.isparam3 + '');
                var NCBPercentage = $("#ddlNCBPercentage").val();
                //if (parseInt(NCBPercentage) == parseInt($("#hdnHighestNCB").val())) {
                //    $("#Package" + packageno + "Premium").html('<i class="fa fa-inr"></i> ' + return_Data.isparam1 + '*');
                //    $("#Package2Premium").html('<i class="fa fa-inr"></i> ' + return_Data.isparam2 + '*');
                //    $("#Package1Premium").html('<i class="fa fa-inr"></i> ' + return_Data.isparam3 + '*');
                //}
                
                if (return_Data.idparam1 >= 5) {
                    $('[data-value = zd]').addClass('excluded');
                    $('[data-value=zd]').parent().siblings().children().children('input[type="checkbox"]').prop("checked", false);
                }
                $("#YearDiffHdn").val(return_Data.idparam1);

                $("#btnSavePackage").attr('disabled', false);
                var loader = "Continue";
                $("#btnSavePackage").html(loader);

                $("#btnRecalculate").attr('disabled', false);
                var loader = "Re-Calculate";
                $("#btnRecalculate").html(loader);

                $("#btnClosePolicyType").attr('disabled', false);
                $("#btnClosePolicyType").html('Close');
                $("#btnChangePolicyType").attr('disabled', false);
                $("#btnChangePolicyType").html('Submit');
                $("#btnSaveRTODetails").attr('disabled', false);
                $("#btnSaveRTODetails").html("Submit");
                $("#btnCloseRTODetails").attr('disabled', false);
                $("#btnCloseRTODetails").html("Close");
                count = 0;
            }
            else {
                count = count + 1;
                if (count < 3) {
                    setTimeout(FetchPremiumPlan('3'), 1000);
                }
                else {
                    window.location.href = ServerURL + "CarRegDetails/index";
                }
            }

            //if (packageno == '1') {

            //$("#btnCloseNCBPercentage").attr('disabled', false);
            //$("#btnCloseNCBPercentage").html("Close");
            //$("#btnChangeNCBPercentage").attr('disabled', false);
            //$("#btnChangeNCBPercentage").html("Submit");

            //if (packageno != '1') {
            //    packageno = packageno - 1;
            //    setTimeout(FetchPremiumPlan(packageno, 1000));
            //}
            //}
        },
        complete: function () {
            //$("#btnSavePackage").attr('disabled', false);
            //$("#btnSavePackage").html("Continue");
        }
    });
}
$('.card_layout.button').click(function () {
});

function select_plan(curr, type) {
    //console.log(type);
    $('.card_layout').removeClass("active-new");
    $(curr).addClass("active-new");
    //$(".count-final").html($(".active-new").data("cover"));

    $(".covers_class").removeClass('excluded');
    $('.abc').children().find('img').removeClass('excluded');
    //$('.filled').prop("checked", true);

    if (type == 'basic') {
        $(".count-final").html('(2)');
        $('[data-value = zd]').addClass('excluded');
        //$('[data-value=zd]').parent().parent().siblings().children('img').addClass('excluded');
        $('[data-value=zd]').parent().parent().find('img').addClass('excluded');
        $('[data-value = ci]').addClass('excluded');
        $('[data-value=ci]').parent().siblings().children().find('img').addClass('excluded');
        //$('[data-value = rti]').addClass('excluded');
        //$('[data-value=rti]').parent().siblings().children().children('input[type="checkbox"]').prop("checked", false);
        $('[data-value = ep]').addClass('excluded');
        $('[data-value=ep]').parent().siblings().children().find('img').addClass('excluded');
        $('[data-value = kp]').addClass('excluded');
        $('[data-value=kp]').parent().siblings().children().find('img').addClass('excluded');
        $('[data-value = lpb]').addClass('excluded');
        $('[data-value=lpb]').parent().siblings().children().find('img').addClass('excluded');

        $("#PackageNo").val('1');
    }
    else if (type == 'recommended') {
        //$('[data-value = rti]').addClass('excluded');
        //$('[data-value=rti]').parent().siblings().children().children('input[type="checkbox"]').prop("checked", false);
        if (parseInt($("#YearDiffHdn").val()) >= 5) {
            $(".count-final").html('(2)');
            $('[data-value = zd]').addClass('excluded');
            $('[data-value=zd]').parent().parent().find('img').addClass('excluded');

            $('[data-value = ci]').addClass('excluded');
            $('[data-value=ci]').parent().siblings().children().find('img').addClass('excluded');
        }
        else {
            $(".count-final").html('(4)');
            $('[data-value = zd]').removeClass('excluded');
            $('[data-value=zd]').parent().parent().find('img').removeClass('excluded');

            $('[data-value = ci]').removeClass('excluded');
            $('[data-value=ci]').parent().siblings().children().find('img').removeClass('excluded');
        }
        $('[data-value = ep]').addClass('excluded');
        $('[data-value=ep]').parent().siblings().children().find('img').addClass('excluded');
        $('[data-value = kp]').addClass('excluded');
        $('[data-value=kp]').parent().siblings().children().find('img').addClass('excluded');
        $('[data-value = lpb]').addClass('excluded');
        $('[data-value=lpb]').parent().siblings().children().find('img').addClass('excluded');
        $("#PackageNo").val('2');
    }
    else if (type == "premium") {
        $("#PackageNo").val('3');
        $('.card_layout').parent().siblings().children().children('input[type="checkbox"]').prop("checked", true);
        if (parseInt($("#YearDiffHdn").val()) >= 10) {
            $(".count-final").html('(2)');
            $('[data-value = zd]').addClass('excluded');
            //$('[data-value=zd]').parent().siblings().children().children('input[type="checkbox"]').prop("checked", false);
            $('[data-value=zd]').parent().parent().find('img').addClass('excluded');

            $('[data-value = ci]').addClass('excluded');
            $('[data-value=ci]').parent().siblings().children().find('img').addClass('excluded');

            $('[data-value = ep]').addClass('excluded');
            $('[data-value=ep]').parent().siblings().children().find('img').addClass('excluded');
            $('[data-value = kp]').addClass('excluded');
            $('[data-value=kp]').parent().siblings().children().find('img').addClass('excluded');
            $('[data-value = lpb]').addClass('excluded');
            $('[data-value=lpb]').parent().siblings().children().find('img').addClass('excluded');
        }
        else {
            if (parseInt($("#YearDiffHdn").val()) >= 5) {
                $(".count-final").html('(5)');
                $('[data-value = zd]').addClass('excluded');
                //$('[data-value=zd]').parent().siblings().children().children('input[type="checkbox"]').prop("checked", false);
                $('[data-value=zd]').parent().parent().find('img').addClass('excluded');

                $('[data-value = ci]').addClass('excluded');
                $('[data-value=ci]').parent().siblings().children().find('img').addClass('excluded');
            }
            else {
                $(".count-final").html('(7)');
                $('[data-value = zd]').removeClass('excluded');
                $('[data-value=zd]').parent().parent().find('img').removeClass('excluded');

                $('[data-value = ci]').removeClass('excluded');
                $('[data-value=ci]').parent().siblings().children().find('img').removeClass('excluded');
            }
            $('[data-value = ep]').removeClass('excluded');
            $('[data-value=ep]').parent().siblings().children().find('img').removeClass('excluded');
            $('[data-value = kp]').removeClass('excluded');
            $('[data-value=kp]').parent().siblings().children().find('img').removeClass('excluded');
            $('[data-value = lpb]').removeClass('excluded');
            $('[data-value=lpb]').parent().siblings().children().find('img').removeClass('excluded');
        } 
    }
}

$(function () {
    $("#txtRegistration2").datepicker({
        changeMonth: true,
        dateFormat: 'dd-M-yy',
        changeYear: true,
        yearRange: "-100:+0",
        maxDate: 0
    });
    $("#txtTPPolicyStratDate").datepicker({
        changeMonth: true,
        dateFormat: 'dd-M-yy',
        changeYear: true,
        yearRange: "-100:+0",
        maxDate: 0
    });
    $("#txtPrevPolicyDate").datepicker({
        changeMonth: true,
        dateFormat: 'dd-M-yy',
        changeYear: true,
        yearRange: "-100:+5"
    });
});
$('.panel-collapse').on('show.bs.collapse', function () {
    $(this).siblings('.panel-heading').addClass('active');
});

$('.panel-collapse').on('hide.bs.collapse', function () {
    $(this).siblings('.panel-heading').removeClass('active');
});

function SavePackage() {
    var PackageNo = $("#PackageNo").val();
    var TPInsurerName = $("#ddlTPInsurer").val();
    var TPPolicyNo = $("#txtTPPolicyNo").val();
    var TPStartDate = $("#txtTPPolicyStratDate").val();
    var TPEndDate = $("#txtTPPolicyEndDate").val();

    if ($("#SaveODDetails").val() == '1') {
        if (TPInsurerName == '' || TPInsurerName == '-1') {
            bootbox.alert({
                title: "Alert",
                message: "Please select Insurer name"
            });
            return false;
        }
        else if (TPPolicyNo == '' || TPPolicyNo == undefined) {
            bootbox.alert({
                title: "Alert",
                message: "Please enter policy no"
            });
            return false;
        }
        else if (TPStartDate == '' || TPStartDate == undefined) {
            bootbox.alert({
                title: "Alert",
                message: "Please select start date"
            });
            return false;
        }
        else if (TPEndDate == '' || TPEndDate == undefined) {
            bootbox.alert({
                title: "Alert",
                message: "Please select start date again."
            });
            return false;
        }
    }
    var formdata = new FormData();
    formdata.append("PackageNo", PackageNo);
    formdata.append("TPInsurerName", TPInsurerName);
    formdata.append("TPPolicyNo", TPPolicyNo);
    formdata.append("TPStartDate", TPStartDate);
    formdata.append("TPEndDate", TPEndDate);
    $.ajax({
        type: "POST",
        url: '' + ServerURL + 'Premium/SavePackage',
        data: formdata,
        processData: false,
        contentType: false,
        beforeSend: function () {
            $(".backdrop").removeClass('hidden');
        },
        success: function (return_Data) {
            if (return_Data.n == 1) {
                window.location.href = ServerURL + "Premium/index";
            }
            else {
                bootbox.alert({
                    title: "Alert",
                    message: "Cannot update Preminum. please try again later."
                });
                $(".backdrop").addClass('hidden');
            }
        }
    });

}
// registration popup
function openPopup() {
    $(".backdrop").removeClass('hidden');
    var formdata = new FormData();
    formdata.append("RTOName", $("#ddlRTO").val());
    
    $.ajax({
        data: formdata,
        type: 'POST',
        url: '' + ServerURL + 'Premium/getRTO',
        processData: false,
        contentType: false,
        beforeSend: function () {
            $(".backdrop").removeClass('hidden');
            //document.getElementByClass('.backdrop').removeClass('hidden');
        },
        success: function (data) {
            productIds = new Object();
            productNames = [];
            FinalData = data;
            $.each(data, function (index, product) {
                productIds[data[index].Value] = data[index].Key;
                productNames.push(data[index].Value);
            });
            $('#ddlRTO').removeClass('ui-autocomplete-loading');
            getManuList("", getCookie("LS_RTOID"));
            $('#ddlManufacturer').val(getCookie("LS_ManufacturerID"));
            getModelList("");
            
            $("#ddlRTO").focus();
            $('#RTODetailsModel').modal('show');
            $(".backdrop").addClass('hidden');
        },
        error: function (data) {
            $('#ddlRTO').removeClass('ui-autocomplete-loading');
        }
    });

}

function cancel() {
    $('#RTODetailsModel').modal('hide');

}
function Calc() {

    var ddlRTO = $("#ddlRTO").val();
    var txtRegistration2 = $("#txtRegistration2").val().trim();
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
            $("#btnSubmit").attr('disabled', true);
            var loader = "Please wait..";
            $("#btnSubmit").html(loader);
        },
        success: function (return_Data) {
            if (return_Data.n == 4) //breakin 
            {
                $(".backdrop").addClass('hidden');
                bootbox.alert({
                    title: "Alert",
                    message: return_Data.msg,
                    callback: function () {
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
                location.reload();
                //$("#txtRTO").html(ddlRTO);
                //$("#txtRegDate").html(txtRegistration2);
                //$("#txtManufacturer").html($("#ddlManufacturer option:selected").text() + ' | ' + $("#ddlModel option:selected").text());
                //$("#lblPremium").html(return_Data.isparam3);
                //$("#lblCoverValue").html(return_Data.isparam1);
                //if (return_Data.idparam1 >= 5) {
                //    $("#chk_ZeroDepreciation").prop('checked', false);
                //}
                //else if ($("#PackageNo").val() != '1') {
                //    $("#chk_ZeroDepreciation").prop('checked', true);
                //}

                ////$("#Package1Premium").html('<i class="fa fa-inr"></i> ' + return_Data.isparam4);
                ////$("#Package2Premium").html('<i class="fa fa-inr"></i> ' + return_Data.isparam5);
                ////$("#Package3Premium").html('<i class="fa fa-inr"></i> ' + return_Data.isparam6);
                //$("#Package1Premium").html('<img src="../MotorQR_Assets/image/Loadingsome.gif" style="width: 13%;" />');
                //$("#Package2Premium").html('<img src="../MotorQR_Assets/image/Loadingsome.gif" style="width: 13%;" />');
                //$("#Package3Premium").html('<img src="../MotorQR_Assets/image/Loadingsome.gif" style="width: 13%;" />');
                //$("#btnSavePackage").attr('disabled', true);
                //var loader = "Loading";
                //$("#btnSavePackage").html(loader);
                //$("#btnClosePolicyType").attr('disabled', true);
                //var loader = "Please wait..";
                //$("#btnClosePolicyType").html(loader);
                //$("#btnChangePolicyType").attr('disabled', true);
                //$("#btnChangePolicyType").html(loader);
                //$('#RTODetailsModel').css('display', 'none');
                //$("#hdnPolicyType").val('1');
                //$("#PolicyType1").prop('checked', true);
                //$("#PolicyType2Div").addClass('hidden');
                //setTimeout(FetchPremiumPlan('3'), 1000);
            }
            else {
                bootbox.alert({
                    title: "Alert",
                    message: "Cannot update Preminum. please try again later."
                });
                //bootbox.alert("Cannot update Preminum. please try again later.");
            }
        },
        complete: function () {
            $("#btnSubmit").attr('disabled', false);
            $("#btnSubmit").html('Submit');
            $(".backdrop").addClass('hidden');
        }
    });
}

function getRTOList() {
    var formdata = new FormData();
    
    $.ajax({
        type: "POST",
        url: '' + ServerURL + 'Premium/getRTOList',
        //data: formdata,
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
            }
        }
    });
}

//Policy Type Changes
function ChangePolicyType(str) {
    if (str == '1') {
        $("#PolicyType2Div").addClass('hidden');
    }
    else if (str == '2') {
        $("#PolicyType2Div").removeClass('hidden');
    }
}

function SavePolicyType() {
    var policytype = '';
    if ($("#PolicyType1").is(":checked")) {
        policytype = 'Comprehensive';
    }
    else if ($("#PolicyType2").is(":checked")) {
        policytype = 'BundledPackagePolicy';
    }
    var TPInsurerName = $("#ddlTPInsurer").val();
    var TPPolicyNo = $("#txtTPPolicyNo").val();
    var TPStartDate = $("#txtTPPolicyStratDate").val();
    var TPEndDate = $("#txtTPPolicyEndDate").val();

    var formdata = new FormData();
    formdata.append("PolicyType", policytype);
    formdata.append("TPInsurerName", TPInsurerName);
    formdata.append("TPPolicyNo", TPPolicyNo);
    formdata.append("TPStartDate", TPStartDate);
    formdata.append("TPEndDate", TPEndDate);
    
    $.ajax({
        type: "POST",
        url: '' + ServerURL + 'Premium/ChangePolicyType',
        data: formdata,
        processData: false,
        contentType: false,
        beforeSend: function () {
            $(".backdrop").removeClass('hidden');
            $("#btnClosePolicyType").attr('disabled', true);
            var loader = "Please wait..";
            $("#btnClosePolicyType").html(loader);
            $("#btnChangePolicyType").attr('disabled', true);
            $("#btnChangePolicyType").html(loader);
        },
        success: function (return_Data) {
            if (return_Data.n == 1) {
                //debugger;
                if (policytype == 'Comprehensive ') {
                    $("#lblPolicyType").html('Comprehensive');
                    $("#lblPolicyTypeSub").html('');
                    $("#hdnPolicyType").val('1');
                }
                else if (policytype == 'BundledPackagePolicy') {
                    $("#lblPolicyType").html('Own Damage Only');
                    $("#lblPolicyTypeSub").html(($("#ddlTPInsurer :selected").text()).substring(0, 19) + '..');
                    $("#hdnPolicyType").val('2');
                }

                $("#Package1Premium").html('<img src="../MotorQR_Assets/image/Loadingsome.gif" style="width: 13%;" />');
                $("#Package2Premium").html('<img src="../MotorQR_Assets/image/Loadingsome.gif" style="width: 13%;" />');
                $("#Package3Premium").html('<img src="../MotorQR_Assets/image/Loadingsome.gif" style="width: 13%;" />');
                $("#btnSavePackage").attr('disabled', true);
                var loader = "Loading";
                $("#btnSavePackage").html(loader);
                $("#btnClosePolicyType").attr('disabled', true);
                $("#btnClosePolicyType").html(loader);
                $("#btnChangePolicyType").attr('disabled', true);
                $("#btnChangePolicyType").html(loader);
                //$("#btnCloseNCBPercentage").attr('disabled', true);
                //$("#btnCloseNCBPercentage").html(loader);
                //$("#btnChangeNCBPercentage").attr('disabled', true);
                //$("#btnChangeNCBPercentage").html(loader);
                setTimeout(FetchPremiumPlan('3'), 1000);
                $("#PolicyTypeModel").modal('hide');
            }
            else {
                bootbox.alert({
                    title: "Alert",
                    message: return_Data.msg
                });

            }
        },
        complete: function () {
            $(".backdrop").addClass('hidden');
            $("#btnClosePolicyType").attr('disabled', false);
            $("#btnClosePolicyType").html('Close');
            $("#btnChangePolicyType").attr('disabled', false);
            $("#btnChangePolicyType").html('Submit');
        }
    });
}

function ClosePolicyType() {
    var policytype = $("#hdnPolicyType").val();
    if (policytype == '1') {
        $("#lblPolicyType").html('Comprehensive');
        $("#lblPolicyTypeSub").html('');
    }
    else if (policytype == '2') {
        $("#lblPolicyType").html('Own Damage Only');
        $("#lblPolicyTypeSub").html(($("#ddlTPInsurer :selected").text()).substring(0, 19) + '..');
    }
    $("#PolicyTypeModel").modal('hide');
}

$("#txtTPPolicyStratDate").on('change', function () {

    var tt = document.getElementById('txtTPPolicyStratDate').value;

    var date = new Date(tt);
    var newdate = new Date(date);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    //var dd = newdate.getDate() - 1;
    //var mm = newdate.getMonth();
    //var y = newdate.getFullYear() + 3;
    //var newdd = dd.toString().length == 1 ? "0" + dd : dd
    //var someFormattedDate = newdd + '-' + monthNames[mm] + '-' + y;
    //document.getElementById('txtTPPolicyEndDate').value = someFormattedDate;

    var dateString = tt;
    var date1 = new Date(dateString);
    if (date1 == 'Invalid Date') {
        var arrdt = tt.split('-');
        var mnm = monthNames.indexOf(arrdt[1]);
        var n = mnm + 1;
        var ndt = '';
        if (('' + n).length == 1) {
            ndt = '' + arrdt[2] + '-0' + n + '-' + arrdt[0];
        }
        else {
            ndt = '' + arrdt[2] + '-' + n + '-' + arrdt[0];
        }
        date1 = new Date(ndt);
    }
    var yearsPrior = 3;
    var year = Math.abs(date1.getFullYear());
    date1.setFullYear(year + yearsPrior);
    var daysPrior = 1;
    date1.setDate(date1.getDate() - daysPrior);
    var dd = date1.getDate();
    var mm = date1.getMonth();
    var y = Math.abs(date1.getFullYear());
    var newdd = dd.toString().length == 1 ? "0" + dd : dd
    var someFormattedDate = newdd + '-' + monthNames[mm] + '-' + y;
    document.getElementById('txtTPPolicyEndDate').value = someFormattedDate;

    $("#txtTPPolicyEndDate").parent().parent().addClass('focused')
});

//ncb percentage

function SaveNCBPercentage() {
    $('#btnRecalculate').show();
    $('#btnSavePackage').hide();

    var NCBPercentage = $("#ddlNCBPercentage").val();
    var formdata = new FormData();
    formdata.append("NCBPercentage", NCBPercentage);
    
    $.ajax({
        type: "POST",
        url: '' + ServerURL + 'Premium/SaveNCBPercentage',
        data: formdata,
        processData: false,
        contentType: false,
        beforeSend: function () {
            //$(".backdrop").removeClass('hidden');
        },
        success: function (return_Data) {
            if (return_Data.n == 1) {
                //$("#NCBPercentageChange").modal('hide');
                ////bootbox.alert({
                ////    title: "Alert",
                ////    message: "NCB Percentage Changed Successfully."
                ////});
                //$("#Package1Premium").html('<img src="../MotorQR_Assets/image/Loadingsome.gif" style="width: 13%;" />');
                //$("#Package2Premium").html('<img src="../MotorQR_Assets/image/Loadingsome.gif" style="width: 13%;" />');
                //$("#Package3Premium").html('<img src="../MotorQR_Assets/image/Loadingsome.gif" style="width: 13%;" />');
                //$("#btnSavePackage").attr('disabled', true);
                //var loader = "Loading";
                //$("#btnSavePackage").html(loader);
                //$("#btnClosePolicyType").attr('disabled', true);
                //$("#btnClosePolicyType").html(loader);
                //$("#btnChangePolicyType").attr('disabled', true);
                //$("#btnChangePolicyType").html(loader);
                //setTimeout(FetchPremiumPlan('3'), 1000);
            }
            else {
                bootbox.alert({
                    title: "Alert",
                    message: return_Data.msg
                });

            }
        },
        complete: function () {
            //$(".backdrop").addClass('hidden');
        }
    });
}

//function CloseNCBPercentage() {
//    $("#NCBPercentageChange").modal('hide');
//}

function ShowNCBPercentage(str) {
    $('#btnRecalculate').show();
    $('#btnSavePackage').hide();

    //var ddlNoOfClaims = $("#ddlNoOfClaims").val();
    var ddlNoOfClaims = 0;
    if (str == 'Yes')
        ddlNoOfClaims = 1;
    else
        ddlNoOfClaims = 0;
    var formdata = new FormData();
    formdata.append("NoOfClaims", ddlNoOfClaims);
    
    $.ajax({
        type: "POST",
        url: '' + ServerURL + 'Premium/ChangeNoOfClaims',
        data: formdata,
        processData: false,
        contentType: false,
        beforeSend: function () {
            //$(".backdrop").removeClass('hidden');
        },
        success: function (return_Data) {
            if (return_Data.n == 1) {
                if (str == 'No') {
                    $("#NCBPercentageDiv").removeClass('hidden');
                }
                else {
                    $("#NCBPercentageDiv").addClass('hidden');
                }
                //$("#Package1Premium").html('<img src="../MotorQR_Assets/image/Loadingsome.gif" style="width: 13%;" />');
                //$("#Package2Premium").html('<img src="../MotorQR_Assets/image/Loadingsome.gif" style="width: 13%;" />');
                //$("#Package3Premium").html('<img src="../MotorQR_Assets/image/Loadingsome.gif" style="width: 13%;" />');
                //$("#btnSavePackage").attr('disabled', true);
                //var loader = "Loading";
                //$("#btnSavePackage").html(loader);
                //$("#btnClosePolicyType").attr('disabled', true);
                //$("#btnClosePolicyType").html(loader);
                //$("#btnChangePolicyType").attr('disabled', true);
                //$("#btnChangePolicyType").html(loader);
                //setTimeout(FetchPremiumPlan('3'), 1000);
            }
            else {
                $("#ddlNoOfClaims").val(return_Data.isparam1);
                if (str == 'Yes') {
                    $("#ClaimsNo").prop('checked', true);
                    $("#ClaimsYes").prop('checked', false);
                }
                else if (str == 'No') {
                    $("#ClaimsNo").prop('checked', false);
                    $("#ClaimsYes").prop('checked', true);
                }
                bootbox.alert({
                    title: "Alert",
                    message: return_Data.msg
                });

            }
        },
        complete: function () {
            //$(".backdrop").addClass('hidden');
        }
    });

}

function ChangePrevPolicyDate() {
    $('#btnRecalculate').show();
    $('#btnSavePackage').hide();

    var PrevPolicyDate = $("#txtPrevPolicyDate").val();
    var formdata = new FormData();
    formdata.append("PrevPolicyDate", PrevPolicyDate);
    
    $.ajax({
        type: "POST",
        url: '' + ServerURL + 'Premium/ChangePrevPolicyDate',
        data: formdata,
        processData: false,
        contentType: false,
        beforeSend: function () {
            //$(".backdrop").removeClass('hidden');
        },
        success: function (return_Data) {
            if (return_Data.n == 1) {
                //$("#Package1Premium").html('<img src="../MotorQR_Assets/image/Loadingsome.gif" style="width: 13%;" />');
                //$("#Package2Premium").html('<img src="../MotorQR_Assets/image/Loadingsome.gif" style="width: 13%;" />');
                //$("#Package3Premium").html('<img src="../MotorQR_Assets/image/Loadingsome.gif" style="width: 13%;" />');
                //$("#btnSavePackage").attr('disabled', true);
                //var loader = "Loading";
                //$("#btnSavePackage").html(loader);
                //$("#btnClosePolicyType").attr('disabled', true);
                //$("#btnClosePolicyType").html(loader);
                //$("#btnChangePolicyType").attr('disabled', true);
                //$("#btnChangePolicyType").html(loader);
                //setTimeout(FetchPremiumPlan('3'), 1000);
            }
            else {
                $("#txtPrevPolicyDate").val(return_Data.isparam1);
                bootbox.alert({
                    title: "Alert",
                    message: return_Data.msg,
                    callback: function () {
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
        },
        complete: function () {
            //$(".backdrop").addClass('hidden');
        }
    });
}

function Recalculate() {

    $("#Package1Premium").html('<img src="../MotorQR_Assets/image/Loadingsome.gif" style="width: 13%;" />');
    $("#Package2Premium").html('<img src="../MotorQR_Assets/image/Loadingsome.gif" style="width: 13%;" />');
    $("#Package3Premium").html('<img src="../MotorQR_Assets/image/Loadingsome.gif" style="width: 13%;" />');
    $("#btnSavePackage").attr('disabled', true);
    var loader = "Loading";
    $("#btnSavePackage").html(loader);

    $("#btnRecalculate").attr('disabled', true);
    var loader = "Loading";
    $("#btnRecalculate").html(loader);

    $("#btnClosePolicyType").attr('disabled', true);
    $("#btnClosePolicyType").html(loader);
    $("#btnChangePolicyType").attr('disabled', true);
    $("#btnChangePolicyType").html(loader);
    setTimeout(FetchPremiumPlan('3'), 1000);
}

function ShowCollapsedDiv(str) {
    $("#" + str + "CollapsedDiv").slideToggle(500);


    $("#" + str + "ParentDiv").toggleClass('CollapseDivPadding');
    $("#" + str + "HeadTitle").toggleClass('HeadTitleMargin');
}

function ConfirmVehRegDetails() {
    $('#footerDiv').show();
    $('.confirmbox').hide();
    $('.disabled-overlay').remove();

    ////var formdata = new FormData();
    ////formdata.append("PrevPolicyDate", PrevPolicyDate);

    $.ajax({
        type: "POST",
        url: '' + ServerURL + 'Premium/ConfirmVehRegDetails',
        //data: formdata,
        processData: false,
        contentType: false,
        beforeSend: function () {
            $(".backdrop").removeClass('hidden');
        },
        success: function (return_Data) {
            if (return_Data.n == 1) {
                //window.location.reload();
            }
            else {
                $(".backdrop").addClass('hidden');
            }
        },
        complete: function () {
            $(".backdrop").addClass('hidden');
        }
    });
}