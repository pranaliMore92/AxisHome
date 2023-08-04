$('input').attr('autocomplete', 'off');

$('input, select, option').focus(function () {
    $(this).parents('.form-group').addClass('focused');
});

$('input, select, option').blur(function () {
    var inputValue = $(this).val();
    if (inputValue && $(this).hasClass('hasDatepicker')) {
        if (inputValue == "") {
            $(this).removeClass('filled');
            $(this).parents('.form-group').removeClass('focused');
        } else {
            $(this).addClass('filled');
            $(this).parents('.form-group').addClass('focused');
        }
    }else{
        if (inputValue == "") {
            $(this).removeClass('filled');
            $(this).parents('.form-group').removeClass('focused');
        } else {
            $(this).addClass('filled');
            $(this).parents('.form-group').addClass('focused');
        }
    }
})


$(window).on("load", function () {

    var inputs;

    inputs = document.getElementsByTagName('input');
    for (index = 0; index < inputs.length; ++index) {
        var curr = inputs[index];
        if ($(curr).val() != '') {
            $(curr).addClass('filled');
            $(curr).parents('.form-group').addClass('focused');
        }
    }

    selectbox = document.getElementsByTagName('select');
    for (index = 0; index < selectbox.length; ++index) {
        var curr = selectbox[index];
        if ($(curr).val() != '') {
            $(curr).addClass('filled');
            $(curr).parents('.form-group').addClass('focused');
        }
    }
})
