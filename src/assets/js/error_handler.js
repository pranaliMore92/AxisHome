
function error_handler(title,err_msg){
	var dialog = bootbox.dialog({
		title: title,
		message: err_msg,
		buttons: {
			cancel: {
				label: '<i class="fa fa-times"></i> Close'
			}
		}
	});
}