let host = 'http://server.wsr.ru';

$(document).ready(function () {
	//Регистрация
	$('#register_form').submit(function () {
		event.preventDefault();
		$.ajax({
			method: 'POST',
			url: `${host}/api/register`,
			contentType: 'application/json',
			data : JSON.stingify({
				first_name: $('#first_name').val(),
				last_name: $('#last_name').val(),
				document_number: $('#document_number').val(),
				phone: $('#phone').val(),
				password: $('#password').val(),
			}),
				success: function (data) {
					console.log(data)
				},
		});
	});
	$('#personal_area').click(function () {
		$('#login').show();
		$('#register').hide();
		$('#search').hide();
	});
	$('#register_button').click(function (){
		$('#register').show();
		$('#login').hide();
		$('#search').hide();
	});
});