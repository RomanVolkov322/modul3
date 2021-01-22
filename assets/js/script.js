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
					console.log(data);
					$('#register').show();
				},
				error: function (error) {
					let frist_name = $('#frist_name');
					let last_name = $('#last_name');
					let document_number = $('#document_number');
					let phone = $('#phone');
					let password = $('#password');
					let password_confirm = $('#password_confirm');
					$('#register_button').click(function () {
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
					};
				});
			},
		});
	});

	$('.personal_area').click(function () {
		$('#login').show();
		$('#register').hide();
		$('#home').hide();
	});

	$('.sign_up').click(function () {
		$('#login').hide();
		$('#register').show();
	});

	$('.log_in').click(function () {
		$('#login').show();
		$('#register').hide();
	});

	$('#register_button').click(function () {
		$('#register').show();
		$('#login').hide();
		$('#home').hide();
	});
	

	//Авторизация
	$('#login_form').submit(function (event) {
		evenet.preventDefault();
		$.ajax({
			url: `${host}/api/login`,
			method: "POST",
			contentType: "application/json",
			data: JSON.stringify ({
				phone: $('#login_phone').val(),
				password: $('#login_pass').val(),
			}),
			success: function (dat) {
				console.log(dat);
				console.log(dat.data.token);
				localStorage.token = dat.data.token;
				name();
				$('#profiel').show();
				$('#login').hide();
			},
			error: function (error) {
				let phone = $('.phone');
				let password = $('.password');
				$('#login_button').click(function () {
					if(phone == "") {
						$('.errorMess').text('Введите номер телефона');
						return false;
					} else if(password == "") {
						$('.errorMess').text('Введите пароль');
						return false;
					};
				});
			},
		});
	});
	//поиск рейсов 
	$("#search_form").submit(function (event) {
		event.preventDefault();
		let from = airport($('#from').val()).data.items[0].iata;
		let to = airport($('#to').val()).data.items[0].iata;
		$.ajax({
			method: 'GET',
			url: `${host}/api/flight`,
			data: {
				from: from,
				to: to,
				date1: $('#date1').val(),
				date2: $('#date2').val(),
				passengers: $('#passengers').val(),
			},
			success: function (data) {
				list_page(data);
				list_data = data;
			},
		})
	});
	function search(val) {
		$('#search').show();
		$('#home_serch').hide();
		$.each(val.data.flights_to, function (index, value) {
			let hours = dat(value.from.time, value.to.time, 1);
			let minutes = dat(value.from.time, value.to.time, 1);
			$('#search_name1').html(`<span class="test-4-fif1">${value.from.city}</span>
				->
				<span class="test-4-fif1">${value.to.city}</span>`) 
		})
		$.each(val.data.flights_back, function (index, value) {
			let hours = dat(value.from.time, value.to.time, 1);
			let minutes = dat(value.from.time, value.to.time, 1);
			$('#search_name2').html(`<span class="test-4-fif1">${value.from.city}</span>
				->
				<span class="test-4-fif1">${value.to.city}</span>`) 
		})
	};
	//Информация о пользователе
	function name() {
		$.ajax({
			url: `${host}/api/user`,
			method: 'GET',
			contentType: 'application/json',
			headers: {'Autorization': 'Bearer ' + localStorage.token},
			success: function (data) {
				localStorage.first_name - data.frist_name;
				localStorage.last_name = data.last_name;
				$('.booking_first_name').val(data.frist_name);
				$('.booking_last_name').val(data.last_name);
				$('.booking_docement_numder').val(data.docement_numder);
			}
		})
	};
});