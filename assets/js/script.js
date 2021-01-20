let host = 'http://server.wsr.ru';

$(document).ready(function () {
	//Регистрация
	$('#register_form').submit(function (event) {
		event.preventDefault();
		$.ajax({
			method: 'POST',
			url: `${host}/api/register`,
			contentType: 'application/json',
			data : JSON.stringify ({
				first_name: $('#first_name').val(),
				last_name: $('#last_name').val(),
				document_number: $('#document_number').val(),
				phone: $('#phone').val(),
				password: $('#password').val(),
			}),
				success: function (data) {
					console.log(data)
				},
				error: function (error) {
					let frist_name = $('#frist_name');
					let last_name = $('#last_name');
					let document_number = $('#document_number');
					let phone = $('#phone');
					let password = $('#password');
					let password_confirm = $('#password_confirm');
					$('#register_button').click(function{
					if(frist_name == "") {
						$('.errorMess').text('Введите Имя');
						return false;
					} else if(last_name == "") {
						$('.errorMess').text('Введите Фамилию');
						return false;
					} else if(document_number == "") {
						$('.errorMess').text('Введите паспорт');
						return false;
					} else if(phone == "") {
						$('.errorMess').text('Введите номер телефона');
						return false;
					} else if(password  == "") {
						$('.errorMess').text('Введите пароль');
						return false;
					} else if(password_confirm == "") {
						$('.errorMess').text('Повтарите пароль');
						return false;
					}});
				},
			});
		});
	//Авторизация
	$('#login_form').submit(function (event) {
		evenet.preventDefault();
		$.ajax({
			url: `${host}/aoi/login`,
			method: "POST",
			contentType: "application/json"
			data: JSON.stringify({
				phone: $('#login_phone').val(),
				password: $('#login_pass').val(),
			}),
			success: function (data) {
				console.log(data);
				$('#profiel').show();
				$('#login').hide();
			},
			error: function (error) {
				
			},
		});
	});

	$('.personal_area').click(function () {
		$('#login').show();
		$('#register').hide();
		$('#search').hide();
	});
	$('.sign_up').click(function () {
		$('#login').hide();
		$('#register').show();
	});
	$('.log_in').click(function () {
		$('#login').show();
		$('#register').hide();
	});
	$('#register_button').click(function (){
		$('#register').show();
		$('#login').hide();
		$('#search').hide();
	})
});