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
	    //Выделение нужных рейсов в таблицах
    $('#to_table tbody').on('click', 'tr', function () {
        $('#to_table tr').removeClass('selected');
        $(this).addClass('selected');
        selected_to = this.rowIndex - 1;
    });
    $('#back_table tbody').on('click', 'tr', function () {
        $('#back_table tr').removeClass('selected');
        $(this).addClass('selected');
        selected_back = this.rowIndex - 1;
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
			$('#search_name1').append(`<tr>
                    <td class="test-4-fn">${value.flight_code}</td>
                    <td class="test-4-at">Bombardier CRJ200 ${index}</td>
                    <td>
                        <span class="test-4-dd">${value.from.date}</span>
                        at
                        <span class="test-4-dt">${value.from.time}</span>
                    </td>
                    <td class="test-4-aatime">${value.to.time}</td>
                    <td class="test-4-ft">
                        <span class="test-4-fhour"></span>${hour}
                        <span class="test-4-fminutes"></span>${minutes}
                    </td>
                    <td class="test-4-fp">${value.cost}</td>
                </tr>
`) 
		})
		$.each(val.data.flights_back, function (index, value) {
			let hours = dat(value.from.time, value.to.time, 1);
			let minutes = dat(value.from.time, value.to.time, 1);
			$('#search_name2').append(`<tr>
                    <td class="test-4-fn">${value.flight_code}</td>
                    <td class="test-4-at">Bombardier CRJ200 ${index}</td>
                    <td>
                        <span class="test-4-dd">${value.from.date}</span>
                        at
                        <span class="test-4-dt">${value.from.time}</span>
                    </td>
                    <td class="test-4-aatime">${value.to.time}</td>
                    <td class="test-4-ft">
                        <span class="test-4-fhour"></span>${hour}
                        <span class="test-4-fminutes"></span>${minutes}
                    </td>
                    <td class="test-4-fp">${value.cost}</td>
                </tr>
`) 
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
function booking(selected_to, selected_back, val) {
        let cost_to;
        let cost_back;
        let id_flight_from;
        let id_flight_back;
        let date_flight_from;
        let date_flight_back;

        hide_all();
        $('#booking_page').show();
        $.each(val.data.flights_to, function (index, value) {
            if (index == selected_to) {
                cost_to = value.cost;
                id_flight_from = value.flight_id;
                date_flight_from = value.from.date;
                $('#flight_table tbody').append(
                    `              
                <tr>
                    <td class="test-5-fc">${value.flight_code}</td>
                    <td>
                        <span class="test-5-from-cn">${value.from.city}</span>,
                        <span class="test-5-from-an"> ${value.from.airport}</span>
                    </td>
                    <td>
                        <span class="test-5-dd">${value.from.date}</span>
                        at
                        <span class="test-5-dt">${value.from.time}</span>
                    </td>
                    <td class="test-5-to">
                        <span class="test-5-to-cn">${value.to.city}</span>,
                        <span class="test-5-to-an">${value.to.airport}</span>
                    </td>
                    <td class="test-5-at">09:30</td>
                    <td class="test-5-fp">${value.cost}</td>
                </tr>

                    `
                )

            }
        })
        $.each(val.data.flights_back, function (index, value) {
            if (index == selected_back) {
                cost_back = value.cost;
                id_flight_back = value.flight_id;
                date_flight_back = value.from.date;
                $('#flight_table tbody').append(
                    `              
                <tr>
                    <td class="test-5-fc">${value.flight_code}</td>
                    <td>
                        <span class="test-5-from-cn">${value.from.city}</span>,
                        <span class="test-5-from-an"> ${value.from.airport}</span>
                    </td>
                    <td>
                        <span class="test-5-dd">${value.from.date}</span>
                        at
                        <span class="test-5-dt">${value.from.time}</span>
                    </td>
                    <td class="test-5-to">
                        <span class="test-5-to-cn">${value.to.city}</span>,
                        <span class="test-5-to-an">${value.to.airport}</span>
                    </td>
                    <td class="test-5-at">09:30</td>
                    <td class="test-5-fp">${value.cost}</td>
                </tr>

                    `
                )

            }
        })

        $('#flight_table tbody').append(
            `
                 <tr>
                    <td colspan="5" class="text-right">
                        <b>Total cost</b>
                    </td>
                    <td colspan="1" class="text-right test-5-price">${cost_to + cost_back}</td>
                </tr>

            `
        )