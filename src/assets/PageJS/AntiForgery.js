var RandomKey = (Math.random() + ' ').substring(2, 10) + (Math.random() + ' ').substring(2, 10);
var currentdate = new Date();
var IVKey = ((currentdate.getUTCDate() < 10) ? "0" + currentdate.getUTCDate() : currentdate.getUTCDate()) + "/" + (((currentdate.getUTCMonth() + 1) < 10) ? "0" + (currentdate.getUTCMonth() + 1) : (currentdate.getUTCMonth() + 1)) + "/" + currentdate.getUTCFullYear() + "iciciInsurance";
function EncryptPassword(AESEncryptionKey, PlainPassword) {
    var key = CryptoJS.enc.Utf8.parse(AESEncryptionKey);
    var iv = CryptoJS.enc.Utf8.parse(IVKey);
    var encryptedpassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(PlainPassword), key,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encryptedpassword.toString();
}
//window.history.forward();
//$(document).ready(function () {
//    $.ajaxSetup({
//        beforeSend: function (xhr) {
//            ////debugger;
//            RandomKey = (Math.random() + ' ').substring(2, 10) + (Math.random() + ' ').substring(2, 10);
//            xhr.setRequestHeader("__RequestVerificationToken", $('[name="__RequestVerificationToken"]').val());
//            xhr.setRequestHeader("Input", EncryptPassword(RandomKey, $('[name="__RequestVerificationToken"]').val()));
//            xhr.setRequestHeader("SyncVal", RandomKey);
//        },
//        cache: true
//    });
//});

$(document).ajaxSend(function (ev, jqhr, settings) {
    RandomKey = (Math.random() + ' ').substring(2, 10) + (Math.random() + ' ').substring(2, 10);
    jqhr.setRequestHeader("__RequestVerificationToken", $('[name="__RequestVerificationToken"]').val());
    jqhr.setRequestHeader("Input", EncryptPassword(RandomKey, $('[name="__RequestVerificationToken"]').val()));
    jqhr.setRequestHeader("SyncVal", RandomKey);
})