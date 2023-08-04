
function toggleCover() {
    if ($(".personal_accident_check").hasClass('fa-check')) {
        $("#MAKE_NETBANKING_PAYMENT").prop('disabled', true);
    }
    else {
        $("#MAKE_NETBANKING_PAYMENT").prop('disabled', false);
    }
    $(".personal_accident_check").toggleClass("fa-check fa-minus1");
    $(".personal-cover").toggleClass("personal-cover-enabled personal-cover-disabled");
}
$('.panel-collapse').on('show.bs.collapse', function () {
    $(this).siblings('.panel-heading').addClass('active');
});

$('.panel-collapse').on('hide.bs.collapse', function () {
    $(this).siblings('.panel-heading').removeClass('active');
});

function RedirectToMobile() {
    var empRefNo = $("#customer_ref_no").val();

    //if (empRefNo == "") {
    //    bootbox.alert({ title: "Alert", message: "Please enter employee reference number." });
    //    return false;
    //}

    var formdata = new FormData();
    formdata.append("EmpRefNo", empRefNo);
    $.ajax({
        type: "POST",
        url: '' + ServerURL + 'Summary/CommonPayment',
        data: formdata,
        processData: false,
        contentType: false,
        beforeSend: function () {
            $("#MAKE_NETBANKING_PAYMENT").prop('disabled', true);
            var loader = "Please wait..";
            $("#MAKE_NETBANKING_PAYMENT").html(loader);
            //$("#cover-spin").show();
            $(".backdrop").removeClass('hidden');
        },
        success: function (return_Data) {
            if (return_Data.n == 1) {
                $(".backdrop").removeClass('hidden');
                window.sessionStorage.LS_PaymentID = return_Data.isparam1;
                window.location.href =   ServerURL + 'ibankpayment/Index';
                //$.ajax({
                //    type: "POST",
                //    url: '' + ServerURL + 'Summary/PostToIBankPayment',
                //    data: formdata,
                //    processData: false,
                //    contentType: false,
                //    beforeSend: function () {
                //        $("#MAKE_NETBANKING_PAYMENT").prop('disabled', true);
                //        var loader = "Please wait..";
                //        $("#MAKE_NETBANKING_PAYMENT").html(loader);
                //    },
                //    success: function (return_Data) {
                //        if (return_Data.n == 1) {
                //            //var URLstr = '@System.Configuration.ConfigurationManager.AppSettings["imobilePaymentUrl"]';
                //            //var URLstr ='@Config.imobilePaymentUrl';
                //            //URLstr = URLstr.replace("[PaymentID]", return_Data.isparam1);
                //            var URLstr = return_Data.isparam1;
                //            console.log("URLstr" + URLstr);
                //            window.location = URLstr;
                //        } else {
                //            bootbox.alert(return_Data.msg);
                //        }
                //    },
                //    complete: function () {
                //        $("#MAKE_NETBANKING_PAYMENT").prop('disabled', true);
                //        var loader = "Continue";
                //        $("#MAKE_NETBANKING_PAYMENT").html(loader);
                //    }
                //});

            }
            else {
                bootbox.alert('Sorry, we are unable to execute the request at the moment.Please try again.');
                $(".backdrop").addClass('hidden');
            }
        },
        complete: function () {
            $("#MAKE_NETBANKING_PAYMENT").prop('disabled', false);
            var loader = "Continue";
            $("#MAKE_NETBANKING_PAYMENT").html(loader);
            //$("#cover-spin").hide();
            
        }
    });
}

//var modal2 = document.getElementById("ModalBreakUp");
//var btn2 = document.getElementById("btnViewBreakUp");

//btn2.onclick = function () {
//    modal2.style.display = "block";
//}

//var span2 = document.getElementsByClassName("close")[0];
//span2.onclick = function () {
//    modal2.style.display = "none";
//}
