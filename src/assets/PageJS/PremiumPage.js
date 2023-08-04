function toggleCover(str) {
    if ($(".PersonalAccidentcover").hasClass('fa-check')) {
        $("#PersonalAccidentcover_NewDiv").show();
        UpdateAdditionalCover('PersonalAccidentcover', "true", '', '', 'true');
        $(".PersonalAccidentcover").toggleClass("fa-check fa-minus1");
        $(".personal-cover").toggleClass("personal-cover-enabled personal-cover-disabled");
        $("input[name='PersonalAccidentcover1_Radio']").prop('checked', false);
    }
    else if ($(".personal_accident_check").hasClass('fa-minus1')) {
        UpdateAdditionalCover('PersonalAccidentcover', "false", '', '', 'false');
        $("#PersonalAccidentcover_NewDiv").hide();
        $(".PersonalAccidentcover").toggleClass("fa-check fa-minus1");
        $(".personal-cover").toggleClass("personal-cover-enabled personal-cover-disabled");
    }
    if (str == '3') {
        $(".PersonalAccidentcover1").toggleClass("fa-check fa-minus1");
        $(".personal-cover").toggleClass("personal-cover-enabled personal-cover-disabled");
    }
}

function setRadioValueInCookie() {
    var radioValue = $("input[name='PersonalAccidentcover1_Radio']:checked").val();
    setCookie("PersonalAccidentcoverValue", radioValue);
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
    setCookie("IsConsumableYes", "0");
    setCookie("IsZDYes", "0");
});
$('.panel-collapse').on('show.bs.collapse', function () {
    $(this).siblings('.panel-heading').addClass('active');
});

$('.panel-collapse').on('hide.bs.collapse', function () {
    $(this).siblings('.panel-heading').removeClass('active');
});

function fetchRSAplanDetails() {
    var vtype = getCookie("motorVehicletype");
    var CoverValue = "";
    if (vtype == "4") {
        CoverValue = $("#ddlRoad").val();
    }
    else {
        CoverValue = $('#ddlRoadBike').val();
    }
    var formdata = new FormData();
    formdata.append("CoverValue", CoverValue);

    $.ajax({
        type: "POST",
        url: '' + ServerURL + 'Premium/fetchRSAplanDetails',
        data: formdata,
        processData: false,
        contentType: false,
        beforeSend: function () {
            //$("#btnSubmit").attr('disabled', true);
            //var loader = "Please wait..";
            //$("#btnSubmit").html(loader);

            $(".backdrop").removeClass('hidden');
        },
        success: function (return_Data) {
            if (return_Data.n == 1) {

                var str = "";
                if (return_Data.stringarr != null && return_Data.stringarr.length > 0) {
                    $("#RSAheading").html(return_Data.stringarr[0]);
                    for (var i = 1; i < return_Data.stringarr.length; i++) {
                        str += "<li>" + return_Data.stringarr[i] + "</li>";
                    }
                    $("#RSAplanList").html(str);
                }
            }
            else {
                $("#RSAheading").html("No data found");
                $("#RSAplanList").html("No data found");
            }
            $("#RSAStandardModel").modal('show');
        },
        complete: function () {
            $(".backdrop").addClass('hidden');
            //$("#btnSubmit").attr('disabled', false);
            //$("#btnSubmit").html('Submit');
        }
    });


}

function ShowDropDown(str) {
    if ($("#chk_" + str).is(":checked")) {
        if (str == "KeyProtect") {
            UpdateAdditionalCover('KeyProtect', '', 'KeyProtectKeyDemo', 'KeyProtectValueDemo', 'true');
        }
        else if (str == "LossOfPersonal") {
            UpdateAdditionalCover('LossOfPersonal', '', 'LossPersonalKeyDemo', 'LossPersonalValueDemo', '');
        }
        else if (str == "RoadSide") {
            UpdateAdditionalCover('RoadSide', 'roadsidedemo', '', '', '');
        }
        else {
            if (str == "ZeroDepreciation") {
                $('#chk_ZeroDepreciationPPNo').prop('checked', false);
                $('#chk_ZeroDepreciationPPYes').prop('checked', false);
                $('#collapseFour').addClass('in');
                $('#headingFour').addClass('active');

                UpdateAdditionalCover('ZeroDepreciation', $("#ddlZero").val(), '', '', 'false');
            }
            else if (str == "Consumables") {
                $('#chk_ConsumablesPPNo').prop('checked', false);
                $('#chk_ConsumablesPPYes').prop('checked', false);
                $('#collapseFive').addClass('in');
                $('#headingFive').addClass('active');

                UpdateAdditionalCover('Consumables', 'true', '', '', 'false');
            }
            else if (str == "EngineProtectCover") {
                $('#chk_EngineProtectCoverPPNo').prop('checked', false);
                $('#chk_EngineProtectCoverPPYes').prop('checked', false);
                $("#collapseThree").addClass('in');
                $('#headingThree').addClass('active');

                UpdateAdditionalCover('EngineProtectCover', 'true', '', '', 'false');
            }
        }
    }
    else {
        if (str == "RoadSide") {

            UpdateAdditionalCover('RoadSide', '0', '', '', '');
        }
        else if (str == "ZeroDepreciation") {
            $('#chk_ZeroDepreciationPPNo').prop('checked', false);
            $('#chk_ZeroDepreciationPPYes').prop('checked', false);

            UpdateAdditionalCover('ZeroDepreciation', '0', '', '', 'false');

            setCookie("IsZDYes", "0");
            $('#collapseFour').removeClass('in');
            $('#headingFour').removeClass('active');
        }
        else if (str == "KeyProtect") {
            UpdateAdditionalCover('KeyProtect', '', '0', '', 'false');
        }
        else if (str == "LossOfPersonal") {
            UpdateAdditionalCover('LossOfPersonal', '', '0', '', '');
        }
        else if (str == "EngineProtectCover") {
            $('#chk_EngineProtectCoverPPNo').prop('checked', false);
            $('#chk_EngineProtectCoverPPYes').prop('checked', false);

            UpdateAdditionalCover('EngineProtectCover', 'false', '', '', 'false');

            $("#collapseThree").removeClass('in');
            $('#headingThree').removeClass('active');
        }
        else if (str == "Consumables") {
            $('#chk_ConsumablesPPNo').prop('checked', false);
            $('#chk_ConsumablesPPYes').prop('checked', false);

            UpdateAdditionalCover('Consumables', 'false', '', '', 'false');

            setCookie("IsConsumableYes", "0");
            $('#collapseFive').removeClass('in');
            $('#headingFive').removeClass('active');
        }
        //else if (str == "ReturnInvoiceCover") {
        //    UpdateAdditionalCover('ReturnInvoiceCover', 'false', '', '', 'false');
        //}
    }
}

function ShowPPDiv(str) {
    $("#PreviousPolicyDiv_" + str).removeClass('hidden');
    if (str == 'LossOfPersonal') {
        GetPersonalBelongingSI();
    }
}

function cancelAdditionalCoverPopup(str) {
    $('#AdditionalCoverModel').modal('hide');
    //var mtype = getCookie("motorVehicletype");
    //var nc = getCookie("nCount");
    //if (mtype == "4" && nc == "") {
    //    setCookie("nCount", "1");
    //}
    //else {
    //    $("#chk_" + str).prop('checked', false);
    //}

    //$('#AdditionalCoverModel').removeClass('in');
    //$('body').removeClass('modal-open');
    //$(".AdditionalCoverDiv").addClass('hidden');
}

function scrolltoelement(element) {
    Element.prototype.documentOffsetTop = function () {
        return this.offsetTop + (this.offsetParent ? this.offsetParent.documentOffsetTop() : 0);
    };

    var top = element.documentOffsetTop() - (window.innerHeight / 3);
    window.scrollTo({
        top: top,
        behavior: 'smooth',
    });
    //window.scrollTo(0, top);
}

function CheckForPP() {
    var isNew = getCookie("isNew");
    if (isNew != "Y") {
        $('#AdditionalCoverDiv_ZeroDepreciation').removeClass('visible-content');
        $('#AdditionalCoverDiv_Consumables').removeClass('visible-content');
        $('#AdditionalCoverDiv_EngineProtectCover').removeClass('visible-content');
        $('.BlurableDiv').removeClass('invisible-contnet');
        if (getCookie("motorVehicletype") == "4") {
            if ($('#chk_EngineProtectCover').prop("checked") == true && getCookie("IsEngineProtectCoverPP") == "") {
                $('.BlurableDiv').addClass('invisible-contnet');

                $('#AdditionalCoverDiv_EngineProtectCover').addClass('visible-content');
                $('#AdditionalCoverDiv_EngineProtectCover').focus();
                scrolltoelement(document.getElementById('AdditionalCoverDiv_EngineProtectCover'));
            }
            else if ($('#chk_ZeroDepreciation').prop("checked") == true && getCookie("IsZeroDepreciationCoverPP") == "") {
                $('.BlurableDiv').addClass('invisible-contnet');

                $('#AdditionalCoverDiv_ZeroDepreciation').addClass('visible-content');
                $('#AdditionalCoverDiv_ZeroDepreciation').focus();
                scrolltoelement(document.getElementById('AdditionalCoverDiv_ZeroDepreciation'));
            } else if ($('#chk_Consumables').prop("checked") == true && getCookie("IsConsumablesPP") == "") {

                $('.BlurableDiv').addClass('invisible-contnet');

                $('#AdditionalCoverDiv_Consumables').addClass('visible-content');
                $('#AdditionalCoverDiv_Consumables').focus();
                scrolltoelement(document.getElementById('AdditionalCoverDiv_Consumables'));
            }
        } else {

        }
    }

}

function AddPPDetails(CoverName, CoverAdditionalValuePP) {

    if (CoverName == "Consumables") {
        if (CoverAdditionalValuePP.toUpperCase() == "1") {
            setCookie("IsConsumablesPP", "true");
        }
        else {
            setCookie("IsConsumablesPP", "false");
        }
        AddAdditionalCover(CoverName);
        $('#chk_Consumables').prop("checked", true);
    }

    if (CoverName == "EngineProtectCover") {
        if (CoverAdditionalValuePP.toUpperCase() == "1") {
            setCookie("IsEngineProtectCoverPP", "true");
        }
        else {
            setCookie("IsEngineProtectCoverPP", "false");
        }
        AddAdditionalCover(CoverName);
        $('#chk_EngineProtectCover').prop("checked", true);
    }

    if (CoverName == "ZeroDepreciation") {
        if (CoverAdditionalValuePP.toUpperCase() == "1") {
            setCookie("IsZeroDepreciationCoverPP", "true");
        }
        else {
            setCookie("IsZeroDepreciationCoverPP", "false");
        }
        AddAdditionalCover(CoverName);
        $('#chk_ZeroDepreciation').prop("checked", true);
    }
    CheckForPP();

}

function AddAdditionalCover(str) {

    if (str == "RoadSide") {
        UpdateAdditionalCover('RoadSide', $("#ddlRoad").val(), '', '', '');
    }
    else if (str == "ZeroDepreciation") {
        if ($("#chk_ZeroDepreciationPPYes").is(":checked"))
            UpdateAdditionalCover('ZeroDepreciation', $("#ddlZero").val(), '', '', 'true');
        else
            UpdateAdditionalCover('ZeroDepreciation', $("#ddlZero").val(), '', '', 'false');
    }
    else if (str == "KeyProtect") {
        //var val = $('#ddlKeyProtect').val();
        //var key = $('#ddlKeyProtect option:selected').text();
        var val = "KeyProtectDemoVal";
        var key = "KeyProtectDemoKey";
        UpdateAdditionalCover('KeyProtect', '', key, val, 'true');
    }
    else if (str == "LossOfPersonal") {
        //var val = $('#ddlLoss').val();
        //var key = $('#ddlLoss option:selected').text();
        var val = "LossPersonalDemoVal";
        var key = "LossPersonalDemoKey";
        UpdateAdditionalCover('LossOfPersonal', '', key, val, '');
    }
    else if (str == "EngineProtectCover") {
        if ($("#chk_EngineProtectCoverPPYes").is(":checked"))
            UpdateAdditionalCover('EngineProtectCover', 'true', '', '', 'true');
        else
            UpdateAdditionalCover('EngineProtectCover', 'true', '', '', 'false');

    }
    else if (str == "Consumables") {
        if ($("#chk_Consumables").is(":checked")) {
            //var conschk = getCookie("IsConsumableYes");
            if ($("#chk_ConsumablesPPYes").is(":checked")) {
                UpdateAdditionalCover('Consumables', 'true', '', '', 'true');

            }
            else {
                UpdateAdditionalCover('Consumables', 'true', '', '', 'false');
            }
        }
        else {
            UpdateAdditionalCover('Consumables', 'false', '', '', 'false');
        }
    }
    //else if (str == "ReturnInvoiceCover") {
    //    if ($("#chk_ReturnInvoiceCoverPPYes").is(":checked"))
    //        UpdateAdditionalCover('ReturnInvoiceCover', 'true', '', '', 'true');
    //    else
    //        UpdateAdditionalCover('ReturnInvoiceCover', 'false', '', '', 'false');
    //}
}

function GetPersonalBelongingSI() {
    var CoverValue = "";
    CoverValue = $('#ddlLoss').val();

    var formdata = new FormData();
    formdata.append("CoverValue", CoverValue);

    $.ajax({
        type: "POST",
        url: '' + ServerURL + 'Premium/GetPersonalBelongingSI',
        data: formdata,
        processData: false,
        contentType: false,
        beforeSend: function () {
            //$("#btnSubmit").attr('disabled', true);
            //var loader = "Please wait..";
            //$("#btnSubmit").html(loader);
            //$(".backdrop").removeClass('hidden');
        },
        success: function (return_Data) {
            if (return_Data.n == 1) {
                $('#PersonalPlanText').html(return_Data.isparam1);
            }
            else {
                $('#PersonalPlanText').html("");
            }
        },
        complete: function () {
            //$("#cover-spin").hide();
            //$("#btnSubmit").attr('disabled', false);
            //$("#btnSubmit").html('Submit');
        }
    });


}

function Recalculate() {

    var formdata = new FormData();
    $.ajax({
        type: "POST",
        url: '' + ServerURL + 'Premium/Recalculate',
        data: formdata,
        processData: false,
        contentType: false,
        beforeSend: function () {
            $(".backdrop").removeClass('hidden');
        },
        success: function (return_Data) {
            if (return_Data.n == 1) {

                //for showing label and hiding textbox
                $('#lblCoverValue').removeClass('hidden');
                $('#txtNewIDV').addClass('hidden');
                $('#lblIDVRange').addClass('hidden');

                $('#btnRecalculate').hide();
                $('#btnBuy').show();
                //PremiumDiv
                if (return_Data.isparam1 != null && return_Data.isparam1 != "" && return_Data.isparam1 != "0.00") {

                    $("#PremiumDiv").html('<div class="col-md-12 col-xs-12 text-center pd15 pd-mob"> <p class="text-buy">Buy For</p><h2 class="color-orange mg0"><i class="fa fa-inr"></i> <span id="lblPremium">' + return_Data.isparam3 + '</span></h2> </div><div class="col-md-12 col-xs-12 text-left pd15"> <p class="cover-text" style="font-size:16px !important"> Insured Declared Value : <i class="fa fa-inr"></i> <span id="lblCoverValue">' + return_Data.isparam1 + '</span> <span><input class="form-input font16 hidden" style="width:90px;" type="text" id="txtNewIDV" onkeyup="idvChanged();" onchange="IfIDVChange()" placeholder="" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" autofocus/></span> <span style="margin-left:5px;cursor:pointer;" title="Click to change IDV" onclick="showIDV()"><i id="iconIDV" class="fa fa-pencil"></i></span> </p><p style="font-size:12px;margin-top: 4px;" id="lblIDVRange"></p><p></p></div>');

                }
                else {
                    $("#PremiumDiv").html('<div class="col-md-12 col-xs-12 text-center pd15 pd-mob"><p class="text-buy">Buy For</p><h2 class="color-orange mg0"> <i class="fa fa-inr"></i> <span id="lblPremium">' + return_Data.isparam3 + '</span></h2></div>');
                }
                $("#lblPremium").html(return_Data.isparam3);
                $("#lblCoverValue").html(return_Data.isparam1);


                //just for warning
                ////if ($("#chk_EngineProtectCover").is(":checked")) {
                ////    if ($("input:radio[name='chk_EngineProtectCoverPP']").is(":checked")) {
                ////        if ($("input:radio[name='chk_EngineProtectCoverPP']:checked").val() == "0") {

                ////            bootbox.alert({
                ////                title: "Alert",
                ////                message: "The vehicle would need a surveyor inspection since there was no Engine Protect cover in your previous policy. Kindly contact your nearest Sales Representative."
                ////            });
                ////            //return false;
                ////        }
                ////    }
                ////}
            }
            else {
                bootbox.alert({
                    title: "Alert",
                    message: "Cannot update Preminum. please try again later."
                });
            }
        },
        complete: function () {
            $(".backdrop").addClass('hidden');
        }
    });
}

function UpdateAdditionalCover(CoverName, CoverValue, CoverAdditionalValue, CoverAdditionalKey, CoverAdditionalValuePP) {

    //if (CoverName == "Consumables") {
    //    if (CoverAdditionalValuePP.toUpperCase() == "TRUE")
    //    {
    //        setCookie("IsConsumablesPP", "true");
    //    }
    //    else {
    //        setCookie("IsConsumablesPP", "false");
    //    }
    //}

    //if (CoverName == "EngineProtectCover") {
    //    if (CoverAdditionalValuePP.toUpperCase() == "TRUE")
    //    {
    //        setCookie("IsEngineProtectCoverPP", "true");
    //    }
    //    else {
    //        setCookie("IsEngineProtectCoverPP", "false");
    //    }

    //}

    //if (CoverName == "ZeroDepreciation") {
    //    if (CoverAdditionalValuePP.toUpperCase() == "TRUE")
    //    {
    //        setCookie("IsZeroDepreciationCoverPP", "true");
    //    }
    //    else {
    //        setCookie("IsZeroDepreciationCoverPP", "false");
    //    }
    //}

    $('#btnRecalculate').show();
    $('#btnBuy').hide();

    if (CoverName == 'ZeroDepreciation' && CoverAdditionalValuePP == 'true' && CoverValue == '') {
        CoverValue = $("#ddlZeroBig").val();
    }

    var formdata = new FormData();
    formdata.append("CoverName", CoverName);
    formdata.append("CoverValue", CoverValue);
    formdata.append("CoverAdditionalValue", CoverAdditionalValue);
    formdata.append("CoverAdditionalKey", CoverAdditionalKey);
    formdata.append("CoverAdditionalValuePP", CoverAdditionalValuePP);

    $.ajax({
        type: "POST",
        url: '' + ServerURL + 'Premium/UpdateAdditionalCover',
        data: formdata,
        processData: false,
        contentType: false,
        beforeSend: function () {
            //$(".backdrop").removeClass('hidden');
        },
        success: function (return_Data) {
            if (return_Data.n == 1) {

                ////PremiumDiv
                //if (return_Data.isparam1 != null && return_Data.isparam1 != "" && return_Data.isparam1 != "0.00") {
                //    $("#PremiumDiv").html('<div class="col-md-12 col-xs-12 text-center pd15 pd-mob"><p class="text-buy">Buy For</p><h2 class="color-orange mg0"><i class="fa fa-inr"></i> <span id="lblPremium">' + return_Data.isparam3 + '</span></h2></div><div class="col-md-12 col-xs-12 text-left pd15"><p class="cover-text">Insured Declared Value : <i class="fa fa-inr"></i> <span id="lblCoverValue">' + return_Data.isparam1 + '</span><span style="margin-left:5px;cursor:pointer;" title="Click to change IDV" onclick="showIDV()"><i class="fa fa-edit"></i></span></p></div>');
                //}
                //else {
                //    $("#PremiumDiv").html('<div class="col-md-12 col-xs-12 text-center pd15 pd-mob"><p class="text-buy">Buy For</p><h2 class="color-orange mg0"> <i class="fa fa-inr"></i> <span id="lblPremium">' + return_Data.isparam3 + '</span></h2></div>');
                //}
                //$("#lblPremium").html(return_Data.isparam3);
                //$("#lblCoverValue").html(return_Data.isparam1);
                if (CoverName == "LossOfPersonal") {
                    GetPersonalBelongingSI();
                }
                else if (CoverName == "ZeroDepreciation") {
                    if (CoverValue != '' && CoverValue != '0') {
                        setCookie("IsZDYes", "1");
                        //var consumechk = getCookie("IsConsumableYes");
                        //if ($("#chk_Consumables").is(":checked")) {
                        //    if (consumechk == "0") {
                        //        ShowDropDown("Consumables");
                        //        return;
                        //    }
                        //}
                    }
                    else {
                        setCookie("IsZDYes", "0");
                    }
                }
                else if (CoverName == "Consumables") {
                    if (CoverValue == "true") {
                        setCookie("IsConsumableYes", "1");
                    }
                    else {
                        setCookie("IsConsumableYes", "0");
                    }
                }
            }
            else if (return_Data.n == 2) {

                if (CoverName == 'ZeroDepreciation' || CoverName == 'Consumables') {
                    setCookie("IsConsumableYes", "0");
                    setCookie("IsZDYes", "0");
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
                else {
                    bootbox.alert({
                        title: "Alert",
                        message: return_Data.msg
                    });
                    $("#chk_" + CoverName).prop('checked', !$("#chk_" + CoverName)[0].checked);
                }

            }
            else {
                bootbox.alert({
                    title: "Alert",
                    message: "Cannot update Preminum. please try again later."
                });
                //if (CoverName == 'ZeroDepreciation') {
                $("#chk_" + CoverName).prop('checked', !$("#chk_" + CoverName)[0].checked);
                //}

                //$("#chk_" + CoverName).prop('checked', false);
            }
        },
        complete: function () {
            //$(".backdrop").addClass('hidden');
        }
    });
}


function UpdateAdditionalCoverOfBike(CoverName, CoverValue, CoverAdditionalValue, CoverAdditionalKey, CoverAdditionalValuePP) {

    $('#btnRecalculate').show();
    $('#btnBuy').hide();

    var formdata = new FormData();
    formdata.append("CoverName", CoverName);
    formdata.append("CoverValue", CoverValue);
    formdata.append("CoverAdditionalValue", CoverAdditionalValue);
    formdata.append("CoverAdditionalKey", CoverAdditionalKey);
    formdata.append("CoverAdditionalValuePP", CoverAdditionalValuePP);

    $.ajax({
        type: "POST",
        url: '' + ServerURL + 'Premium/UpdateAdditionalCoverBike',
        data: formdata,
        processData: false,
        contentType: false,
        beforeSend: function () {
            //$(".backdrop").removeClass('hidden');
        },
        success: function (return_Data) {
            if (return_Data.n == 1) {
                //$("#lblPremium").html(return_Data.isparam3+'');
                //$("#lblCoverValue").html(return_Data.isparam1);
            }
            else if (return_Data.n == 2) {
                bootbox.alert({
                    title: "Alert",
                    message: return_Data.msg
                });
            }
            else {
                bootbox.alert({
                    title: "Alert",
                    message: "Cannot update Preminum. please try again later."
                });
                if (CoverName == "RoadSide") {
                    $("#ddlRoadBike").val(0);
                    $("#ddlRoadBike").parent().parent().parent().parent().parent().prev('a').removeClass('MyClickActive');
                    $("#ddlRoadBike").parent().parent().parent().parent().parent().prev('a').removeClass('toggle-1-active');
                    $("#ddlRoadBike").parent().parent().parent().parent().parent().css('display', 'none');
                    $("#showServiceBike").addClass('hidden');
                }
                if (CoverName == "ZeroDepreciation") {
                    $("#ddlZeroBike").val(0);
                    $("#DepbPACoverYesBike").attr('checked', true);
                    $("#DepbPACoverNoBike").attr('checked', false);
                    $(".zeroYesBike").addClass('hidden');
                    $("#ddlZeroBike").parent().parent().parent().parent().parent().prev('a').removeClass('MyClickActive');
                    $("#ddlZeroBike").parent().parent().parent().parent().parent().prev('a').removeClass('toggle-1-active');
                    $("#ddlZeroBike").parent().parent().parent().parent().parent().css('display', 'none');
                }
                if (CoverName == "ReturnInvoiceCover") {
                    $("#ReturnrbPACoverYesBike").attr('checked', false);
                    $("#ReturnrbPACoverNoBike").attr('checked', true);
                    $("#InvoicebPACoverYesBike").attr('checked', true);
                    $("#InvoicebPACoverNoBike").attr('checked', false);
                    $(".ReturnInvoiceBike").addClass('hidden');
                    $("#ReturnrbPACoverYesBike").parent().parent().parent().prev('a').removeClass('MyClickActive');
                    $("#ReturnrbPACoverYesBike").parent().parent().parent().prev('a').removeClass('toggle-1-active');
                    $("#ReturnrbPACoverYesBike").parent().parent().parent().css('display', 'none');
                }
            }
        },
        complete: function () {
            //$(".backdrop").addClass('hidden');
            //$("#btnSubmit").attr('disabled', false);
            //$("#btnSubmit").html('Submit');
        }
    });

}


function myFunction() {
    var popup = document.getElementsByClassName("pop-up two-btn-popup")
    $("#popupid").css('display', 'block');
}

function PPErrorRedirect(msg) {
    bootbox.alert({
        title: "Alert",
        message: msg,
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

function RedirectPage() {
    ////SaveBundledDetailsForBike
    //var zdchk = getCookie("IsZDYes");
    //if ($("#chk_ZeroDepreciation").is(":checked")) {
    //    if (zdchk == "0") {
    //        ShowDropDown("ZeroDepreciation");
    //        return;
    //    }
    //}
    //var consumechk = getCookie("IsConsumableYes");
    //if ($("#chk_Consumables").is(":checked")) {
    //    if (consumechk == "0") {
    //        ShowDropDown("Consumables");
    //        return;
    //    }
    //}
    var isNew = getCookie("isNew");
    if (isNew != "Y") {

        if ($("#chk_EngineProtectCover").is(":checked")) {
            if ($("input:radio[name='chk_EngineProtectCoverPP']").is(":checked")) {
                if ($("input:radio[name='chk_EngineProtectCoverPP']:checked").val() == "0") {
                    //bootbox.alert({
                    //    title: "Alert",
                    //    message: "The vehicle would need a surveyor inspection since there was no Engine Protect cover in your previous policy. Kindly contact your nearest Sales Representative."
                    //});

                    //UpdateAdditionalCover('EngineProtectCover', 'false', '', '', 'false');
                    //return false;
                }
            } else {
                bootbox.alert({
                    title: "Alert",
                    message: "Please select yes/no to confirm if you have engine protect cover in your previous policy"
                });
                return false;
            }
        }

        if ($("#chk_ZeroDepreciation").is(":checked")) {
            if ($("input:radio[name='chk_ZeroDepreciationPP']").is(":checked")) {
                ////if ($("input:radio[name='chk_ZeroDepreciationPP']:checked").val() == "0") {
                ////    PPErrorRedirect("The vehicle would need a surveyor inspection since there was no Zero depreciation cover in your previous policy. Kindly contact your nearest Sales Representative.");
                ////    //UpdateAdditionalCover('ZeroDepreciation', $("#ddlZero").val(), '', '', 'false');
                ////    return false;
                ////}
            } else {
                bootbox.alert({
                    title: "Alert",
                    message: "Please select yes/no to confirm if you have zero depreciation cover in your previous policy"
                });
                return false;
            }
        }

        if ($("#chk_Consumables").is(":checked")) {
            if ($("input:radio[name='chk_ConsumablesPP']").is(":checked")) {
                ////if ($("input:radio[name='chk_ConsumablesPP']:checked").val() == "0") {
                ////    PPErrorRedirect("The vehicle would need a surveyor inspection since there was no Consumables cover in your previous policy. Kindly contact your nearest Sales Representative.");
                ////    return false;
                ////}
            } else {
                bootbox.alert({
                    title: "Alert",
                    message: "Please select yes/no to confirm if you have consumables cover in your previous policy"
                });
                return false;
            }
        }
    }

    if ($("#SaveODDetails").val() == '1') {
        var TPInsurerName = $("#ddlTPInsurer").val();
        var TPPolicyNo = $("#txtTPPolicyNo").val();
        var TPStartDate = $("#txtTPPolicyStratDate").val();
        var TPEndDate = $("#txtTPPolicyEndDate").val();
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
        var formdata = new FormData();
        formdata.append("TPInsurerName", TPInsurerName);
        formdata.append("TPPolicyNo", TPPolicyNo);
        formdata.append("TPStartDate", TPStartDate);
        formdata.append("TPEndDate", TPEndDate);

        $.ajax({
            type: "POST",
            url: '' + ServerURL + 'Premium/SaveBundledDetailsForBike',
            data: formdata,
            processData: false,
            contentType: false,
            beforeSend: function () {
                $(".backdrop").removeClass('hidden');
            },
            success: function (return_Data) {
                if (return_Data.n == 1) {
                    var radioValue = $("input[name='PersonalAccidentcover1_Radio']:checked").val();
                    if ($(".PersonalAccidentcover").hasClass('fa-minus1')) {
                        if (radioValue == null || radioValue == undefined || radioValue == '') {
                            bootbox.alert({ title: "Alert", message: "Kindly select one Personal Accident Cover option." });
                            //alert("Kindly select one radio button.");
                            $(".backdrop").addClass('hidden');
                        }
                        else if (radioValue == '1' || radioValue == '2') {
                            setCookie("PersonalAccidentcoverValue", radioValue);
                            window.location.href = ServerURL + "Proposal/index";
                        }
                    }
                    else {
                        window.location.href = ServerURL + "Proposal/index";
                    }
                }
                else {
                    bootbox.alert({
                        title: "Alert",
                        message: "Cannot update Preminum. please try again later."
                    });
                    $(".backdrop").addClass('hidden');
                }
            },
            complete: function () {

            }
        });
    }
    else {
        //var radioValue = $("input[name='PersonalAccidentcover1_Radio']:checked").val();
        //if ($(".PersonalAccidentcover").hasClass('fa-minus1')) {
        //    if (radioValue == null || radioValue == undefined || radioValue == '') {
        //        bootbox.alert({ title: "Alert", message: "Kindly select one Personal Accident Cover option." });
        //        //alert("Kindly select one radio button.");
        //    }
        //    else if (radioValue == '1' || radioValue == '2') {
        //        setCookie("PersonalAccidentcoverValue", radioValue);
        //        window.location.href = ServerURL + "Proposal/index";
        //    }
        //}
        //else
        window.location.href = ServerURL + "Proposal/index";
    }
}
// registration modal

function openPopup() {
    //$(".backdrop").removeClass('hidden');
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
                location.reload();
                //$("#txtRTO").html(ddlRTO);
                //$("#txtRegDate").html(txtRegistration2);
                //$("#txtManufacturer").html($("#ddlManufacturer option:selected").text() + ' | ' + $("#ddlModel option:selected").text());
                //$("#lblPremium").html(return_Data.isparam3);
                //$("#lblCoverValue").html(return_Data.isparam1);
                //$("#YearDiffHdn").val(return_Data.idparam1);
                //if (return_Data.idparam1 >= 5) {
                //    $("#chk_ZeroDepreciation").prop('disabled', true);
                //    $("#chk_ZeroDepreciation").prop('checked', false);
                //}
                //else {
                //    $("#chk_ZeroDepreciation").prop('disabled', false);
                //    $("#chk_ZeroDepreciation").prop('checked', false);
                //}
                //$('#RTODetailsModel').css('display', 'none');
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

//ncb percentage

function SaveNCBPercentage() {
    $('#btnRecalculate').show();
    $('#btnBuy').hide();

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

                //if (return_Data.isparam2 != null && return_Data.isparam2 != "" && return_Data.isparam2 != "0.00") {
                //    $("#PremiumDiv").html('<div class="col-md-12 col-xs-12 text-center pd15 pd-mob"><p class="text-buy">Buy For</p><h2 class="color-orange mg0"><i class="fa fa-inr"></i> <span id="lblPremium">' + return_Data.isparam2 + '</span></h2></div><div class="col-md-12 col-xs-12 text-left pd15"><p class="cover-text">Insured Declared Value : <i class="fa fa-inr"></i> <span id="lblCoverValue">' + return_Data.isparam3 + '</span></p></div>');
                //}
                //else {
                //    $("#PremiumDiv").html('<div class="col-md-12 col-xs-12 text-center pd15 pd-mob"><p class="text-buy">Buy For</p><h2 class="color-orange mg0"> <i class="fa fa-inr"></i> <span id="lblPremium">' + return_Data.isparam2 + '</span></h2></div>');
                //}
            }
            else {
                
                bootbox.alert({
                    title: "Alert",
                    message: return_Data.msg
                });
                $("#ddlNCBPercentage").val(return_Data.isparam1);
            }
        },
        complete: function () {
            //$(".backdrop").addClass('hidden');
        }
    });
}


function ShowNCBPercentage(str) {
    $('#btnRecalculate').show();
    $('#btnBuy').hide();

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
                //bootbox.alert({
                //    title: "Alert",
                //message: "no of claims updated successfully."
                //});
                if (ddlNoOfClaims == 0) {
                    $("#NCBPercentageDiv").removeClass('hidden');
                }
                else {
                    $("#NCBPercentageDiv").addClass('hidden');
                }
                //if (return_Data.isparam2 != null && return_Data.isparam2 != "" && return_Data.isparam2 != "0.00") {
                //    $("#PremiumDiv").html('<div class="col-md-12 col-xs-12 text-center pd15 pd-mob"><p class="text-buy">Buy For</p><h2 class="color-orange mg0"><i class="fa fa-inr"></i> <span id="lblPremium">' + return_Data.isparam2 + '</span></h2></div><div class="col-md-12 col-xs-12 text-left pd15"><p class="cover-text">Insured Declared Value : <i class="fa fa-inr"></i> <span id="lblCoverValue">' + return_Data.isparam3 + '</span></p></div>');
                //}
                //else {
                //    $("#PremiumDiv").html('<div class="col-md-12 col-xs-12 text-center pd15 pd-mob"><p class="text-buy">Buy For</p><h2 class="color-orange mg0"> <i class="fa fa-inr"></i> <span id="lblPremium">' + return_Data.isparam2 + '</span></h2></div>');
                //}
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
    $('#btnBuy').hide();

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
                //if (return_Data.isparam2 != null && return_Data.isparam2 != "" && return_Data.isparam2 != "0.00") {
                //    $("#PremiumDiv").html('<div class="col-md-12 col-xs-12 text-center pd15 pd-mob"><p class="text-buy">Buy For</p><h2 class="color-orange mg0"><i class="fa fa-inr"></i> <span id="lblPremium">' + return_Data.isparam2 + '</span></h2></div><div class="col-md-12 col-xs-12 text-left pd15"><p class="cover-text">Insured Declared Value : <i class="fa fa-inr"></i> <span id="lblCoverValue">' + return_Data.isparam3 + '</span></p></div>');
                //}
                //else {
                //    $("#PremiumDiv").html('<div class="col-md-12 col-xs-12 text-center pd15 pd-mob"><p class="text-buy">Buy For</p><h2 class="color-orange mg0"> <i class="fa fa-inr"></i> <span id="lblPremium">' + return_Data.isparam2 + '</span></h2></div>');
                //}
            }
            else {
                $("#txtPrevPolicyDate").val(return_Data.isparam1);
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

function ShowCollapsedDiv(str) {
    $("#" + str + "CollapsedDiv").slideToggle(500);
    $("#" + str + "ParentDiv").toggleClass('CollapseDivPadding');
    $("#" + str + "HeadTitle").toggleClass('HeadTitleMargin');
}


$("#txtTPPolicyStratDate").on('change', function () {

    var tt = document.getElementById('txtTPPolicyStratDate').value;

    //var date = new Date(tt);
    //var newdate = new Date(date);
    //if (newdate == 'Invalid Date') {

    //}
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
    //alert(date1);
    var yearsPrior = 5;
    var year = Math.abs(date1.getFullYear());
    //alert(year);
    date1.setFullYear(year + yearsPrior);
    var daysPrior = 1;
    date1.setDate(date1.getDate() - daysPrior);
    //alert(date1);
    var dd = date1.getDate();
    var mm = date1.getMonth();
    var y = Math.abs(date1.getFullYear());
    var newdd = dd.toString().length == 1 ? "0" + dd : dd;
    var someFormattedDate = newdd + '-' + monthNames[mm] + '-' + y;
    document.getElementById('txtTPPolicyEndDate').value = someFormattedDate;

    $("#txtTPPolicyEndDate").parent().parent().addClass('focused');
});

function ConfirmVehRegDetails() {
    $('#footerDiv').show();
    $('.confirmbox').hide();
    $('.disabled-overlay').remove();

    //var formdata = new FormData();
    //formdata.append("PrevPolicyDate", PrevPolicyDate);
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


function showIDV() {
    var exp = getCookie("QQBRK_ShowroomPrice");
    var expmin = getCookie("Sel_IDVShwroomMinRange");
    var expmax = getCookie("Sel_IDVShwroomMaxRange");
    var idv = getCookie("QQBRK_IDV");
    var vehicletype = getCookie("motorVehicletype");

    //$('#btnCalculateIDV').text('Calculate');
    // LS_exshowroom_price , ShowRoomPrice, QQBRK_actual_IDV
    // LS_actual_exshowroom_price, QQBRK_IDV, QQBRK_ShowroomPrice
    var idvration = 0;
    var idvmin = 0;
    var idvmax = 0;
    idvratio = parseInt(exp) / parseInt(idv);
    if (vehicletype == "2") {
        idvmin = parseInt(parseInt(expmin) / idvratio);
        idvmin = idvmin + 1;
        idvmax = parseInt(parseInt(expmax) / idvratio);
    }
    else {
        idvmin = parseInt(expmin);
        idvmax = parseInt(expmax);
    }
    setCookie("idvmin", idvmin);
    setCookie("idvmax", idvmax);
    setCookie("idvratio", idvratio);


    var idvminCurrencyFormat = Number(idvmin).toLocaleString('en-IN');
    var idvmaxCurrencyFormat = Number(idvmax).toLocaleString('en-IN');

    //$('#lblExShowroomPrice').text(exp);
    //$('#lblIDV').text(idv);
    //$('#lblIDVRange').html('IDV Range: <span onclick="fillIDV(' + idvmin + ')" style="cursor:pointer;font-weight: bold;text-decoration: underline;">' + idvmin + '</span> to <span onclick="fillIDV(' + idvmax + ')" style="cursor:pointer;font-weight: bold;text-decoration: underline;">' + idvmax + '</span>');
    //$('#lblIDVRange').html('IDV Range: ' + idvmin + ' to ' + idvmax + '');
    $('#lblIDVRange').html('Min. value is <i class="fa fa-inr"></i> <span onclick="fillIDV(' + idvmin + ')" style="cursor:pointer;font-weight: bold;text-decoration: underline;">' + idvminCurrencyFormat + '</span> and max. value is <i class="fa fa-inr"></i> <span onclick="fillIDV(' + idvmax + ')" style="cursor:pointer;font-weight: bold;text-decoration: underline;">' + idvmaxCurrencyFormat + '</span>.');

    $('#lblCoverValue').addClass('hidden');
    $('#txtNewIDV').val(idv);
    $('#txtNewIDV').removeClass('hidden');
    $('#lblIDVRange').removeClass('hidden');
    //$('#iconIDV').removeClass('fa-edit').addClass('fa-check');
    //$('#dv_NewExSP').attr("style", "display:none;");
    //$('#dvIDVFooter').attr("style", "display:none;");

    //$('#Model_IDV').modal('show');
    $('#txtNewIDV').focus();
}


function Calculate() {
    var newIDV = $('#txtNewIDV').val();
    if (newIDV == '') {
        bootbox.alert({ title: "Alert", message: "Please provide new IDV" });
        return;
    }
    else if (isNaN(newIDV) == true) {
        bootbox.alert({ title: "Alert", message: "Please provide valid new IDV" });
        $('#txtNewIDV').val('');
        $('#txtNewIDV').focus();
        return;
    }
    var idvmin = getCookie("idvmin");
    var idvmax = getCookie("idvmax");
    if (parseInt(newIDV) < parseInt(idvmin)) {
        bootbox.alert({ title: "Alert", message: "new IDV cannot be less than minimum IDV " + idvmin });
        return;
    }
    else if (parseInt(newIDV) > parseInt(idvmax)) {
        bootbox.alert({ title: "Alert", message: "new IDV cannot be more than maximum IDV " + idvmax });
        return;
    }
    var idvratio = getCookie("idvratio");
    var newexpprice = parseInt(parseInt(newIDV) * idvratio);
    //$('#lblNewExShowroomPrice').text(newexpprice);
    setCookie("newExp", newexpprice);
    setCookie("newIdv", newIDV);
    //$('#dv_NewExSP').attr("style", "display:block;");
    //$('#dvIDVFooter').attr("style", "display:block;");
    ////continueToReCalculate();

    var formdata = new FormData();
    formdata.append("NewExp", newexpprice);

    $.ajax({
        type: "POST",
        url: '' + ServerURL + 'Premium/RecalculateQuote',
        data: formdata,
        processData: false,
        contentType: false,
        beforeSend: function () {
            $(".backdrop").removeClass('hidden');
        },
        success: function (return_Data) {
            if (return_Data.n == 1) {

                setCookie("QQBRK_ShowroomPrice", newexpprice);
                setCookie("QQBRK_IDV", newIDV);
                //$('#lblCoverValue').text(newIdv);
                //window.location.reload();

                $('#lblCoverValue').val(newIDV);
                //$('#lblCoverValue').removeClass('hidden');
                //$('#txtNewIDV').addClass('hidden');
                //$('#lblIDVRange').addClass('hidden');

                Recalculate();
            }
            else {
                $(".backdrop").addClass('hidden');
            }
        },
        complete: function () {

        }
    });
}

function continueToReCalculate() {
    var newexp = getCookie("newExp");
    var newIdv = getCookie("newIdv");
    var formdata = new FormData();
    formdata.append("NewExp", newexp);

    $.ajax({
        type: "POST",
        url: '' + ServerURL + 'Premium/RecalculateQuote',
        data: formdata,
        processData: false,
        contentType: false,
        beforeSend: function () {
            $(".backdrop").removeClass('hidden');
        },
        success: function (return_Data) {
            if (return_Data.n == 1) {

                setCookie("QQBRK_ShowroomPrice", newexp);
                setCookie("QQBRK_IDV", newIdv);
                $('#lblCoverValue').text(newIdv);
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

function fillIDV(idvval) {

    $('#txtNewIDV').val(idvval);

    $('#btnRecalculate').show();
    $('#btnBuy').hide();

    //Calculate();
    //$('#btnCalculateIDV').text('Re-Calculate');
}

function idvChanged() {
    if ($('#txtNewIDV').val() != '' && $('#btnCalculateIDV').text() != 'Re-Calculate') {



        $('#btnRecalculate').show();
        $('#btnBuy').hide();

        //$('#btnCalculateIDV').text('Re-Calculate');
    }
}

function IfIDVChange() {
    //if ($('#txtNewIDV').val() != '' && $('#btnCalculateIDV').text() != 'Re-Calculate') {
    //    Calculate();
    //}
}



function RecalculateQuoteRequest() {

    var isNew = getCookie("isNew");
    if (isNew != "Y") {


        if ($("#chk_EngineProtectCover").is(":checked")) {
            if ($("input:radio[name='chk_EngineProtectCoverPP']").is(":checked")) {
                if ($("input:radio[name='chk_EngineProtectCoverPP']:checked").val() == "0") {
                    //bootbox.alert({
                    //    title: "Alert",
                    //    message: "The vehicle would need a surveyor inspection since there was no Engine Protect cover in your previous policy. Kindly contact your nearest Sales Representative."
                    //});

                    //UpdateAdditionalCover('EngineProtectCover', 'false', '', '', 'false');
                    //return false;
                }
            } else {
                bootbox.alert({
                    title: "Alert",
                    message: "Please select yes/no to confirm if you have engine protect cover in your previous policy"
                });
                return false;
            }
        }

        if ($("#chk_ZeroDepreciation").is(":checked")) {
            if ($("input:radio[name='chk_ZeroDepreciationPP']").is(":checked")) {
                ////if ($("input:radio[name='chk_ZeroDepreciationPP']:checked").val() == "0") {
                ////    PPErrorRedirect("The vehicle would need a surveyor inspection since there was no Zero depreciation cover in your previous policy. Kindly contact your nearest Sales Representative.");
                ////    //UpdateAdditionalCover('ZeroDepreciation', $("#ddlZero").val(), '', '', 'false');
                ////    return false;
                ////}
            } else {
                bootbox.alert({
                    title: "Alert",
                    message: "Please select yes/no to confirm if you have zero depreciation cover in your previous policy"
                });
                return false;
            }
        }

        if ($("#chk_Consumables").is(":checked")) {
            if ($("input:radio[name='chk_ConsumablesPP']").is(":checked")) {
                //if ($("input:radio[name='chk_ConsumablesPP']:checked").val() == "0") {
                //    PPErrorRedirect("The vehicle would need a surveyor inspection since there was no Consumables cover in your previous policy. Kindly contact your nearest Sales Representative.");
                //    return false;
                //}
            } else {
                bootbox.alert({
                    title: "Alert",
                    message: "Please select yes/no to confirm if you have consumables cover in your previous policy"
                });
                return false;
            }
        }
    }

    var idv = getCookie("QQBRK_IDV");
    var txtvalue = $('#txtNewIDV').val();


    if (txtvalue != "" && idv != txtvalue) {
        Calculate();
    } else {
        Recalculate();
    }

}