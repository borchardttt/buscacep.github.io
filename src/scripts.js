function mascaraTelefone(campo) {
	let valor = campo.value;
	valor = valor.replace(/\D/g, ''); // remover tudo que não é dígito
	if (valor.length > 2) {
		valor = '(' + valor.substring(0, 2) + ') ' + valor.substring(2);
	}
	if (valor.length > 6) {
		valor = valor.substring(0, 6)  + valor.substring(6);
	}
	if (valor.length > 6) {
		valor = valor.substring(0, 6)  + valor.substring(6);
	}
	campo.value = valor;
}

function mascaraCEP(campo) {
	let valor = campo.value;
	if (valor.length <= 5) {
		campo.value = valor.replace(/\D/g, '').replace(/(\d{5})/, '$1-');
	} else {
		campo.value = valor.replace(/\D/g, '').replace(/(\d{5})(\d{2})/, '$1-$2');
	}
}

$(document).ready(function() {
	$("#inputDataNascimento").datepicker({
		dateFormat: 'dd/mm/yy',
		changeMonth: true,
		changeYear: true,
		prevText: 'Anterior',
		nextText: 'Próximo',
		startView:2,
		endDate:'-16y',
		yearRange: '-100:+0',
		dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
		dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
		monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
		monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
		onSelect: function(selectedDate) {
			$("#inputDataNascimento").val(selectedDate);

			var date = new Date(selectedDate);
			var today = new Date();
			var age = today.getFullYear() - date.getFullYear();
			if (age < 16) {
				$("#inputDataNascimento").tooltip({
					title: "Você precisa ter pelo menos 16 anos para fazer o cadastro",
					trigger: "manual",
					placement: "right"
				});
				$("#inputDataNascimento").tooltip("show");
			} else {
				$("#inputDataNascimento").tooltip("hide");
			}
		}
	});

$("#calendar-icon").click(function() {
	$("#inputDataNascimento").datepicker("show");
});
});
$(document).ready(function() {
	$("#inputCEP").blur(function() {
		var cep = $("#inputCEP").val().replace(/\D/g, '');
		if (cep.length != 8) {
			return;
		}
		$.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function(dados) {
			if (!("erro" in dados)) {
				$("#inputLogradouro").val(dados.logradouro);
				$("#inputComplemento").val(dados.complemento);
				$("#inputBairro").val(dados.bairro);
				$("#inputCidade").val(dados.localidade);
				$("#inputUF").val(dados.uf);
				$("#inputIBGE").val(dados.ibge);
			}
		});
	});
});
$(document).ready(function(){
  $('#inputCEP').blur(function(){
    var cep = $(this).val().replace(/\D/g, '');

    if (cep != "") {
      var validacep = /^[0-9]{8}$/;
      if(validacep.test(cep)) {
        $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {
          if (!("erro" in dados)) {
            $("#inputLogradouro").val(dados.logradouro);
            $("#inputBairro").val(dados.bairro);
            $("#inputCidade").val(dados.localidade);
            $("#inputUF").val(dados.uf);
            $("#inputIBGE").val(dados.ibge);
            $('.form-group').show();
          } else {
            $("#inputCEP").val("CEP não encontrado");
            $('.form-group').hide();
          }
        });
      } else {
        $("#inputCEP").val("Formato de CEP inválido");
        $('.form-group').hide();
      }
    } else {
      $('.form-group').hide();
    }
  });
});

