//mascara de telefone
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
//mascara de cep
function mascaraCEP(campo) {
	let valor = campo.value;
	if (valor.length <= 5) {
		campo.value = valor.replace(/\D/g, '').replace(/(\d{5})/, '$1-');
	} else {
		campo.value = valor.replace(/\D/g, '').replace(/(\d{5})(\d{2})/, '$1-$2');
	}
}
//escondendo home de formulário de cadastro e indo para section de usuários
 $(document).ready(function() {
		$('#usuarios').hide();
		$('#usuarios-title').hide();

		$('.navlink').click(function() {
			$('#formCadastro').animate({
			right: '-100%',
			opacity: 0
			}, 500, function() {
			$(this).hide();
			});
			$('#slogan').animate({
				left: '-100%',
				opacity: 0
			}, 500, function() {
				$(this).hide();
			});
			$('#logo').animate({
				left: '-100%',
				opacity: 0
			}, 500, function() {
				$(this).hide();
			});
			$('#usuarios').show().animate({
				top: '20',
				opacity: 1
				}, 2000);
			});
			
	});

//configurações do datepicker e validação de 16 anos
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

//mostrando a janela de escolher data com o datepicker após clique no icon
$("#calendar-icon").click(function() {
	$("#inputDataNascimento").datepicker("show");
});

});

//preenchendo os inputscom os resultados da api
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

//validando as senhas e inserindo tooltip de senhas não iguais
$(document).ready(function(){
  $("#confirmacao-senha").on("input", function(){
    var senha = $("#inputSenha").val();
    var confirmacao = $("#confirmacao-senha").val();

    if (senha !== confirmacao) {
      $(this).addClass("is-invalid");
      if (!$(this).siblings(".invalid-feedback").length) {
        $("<div class='invalid-feedback'>As senhas não conferem.</div>").insertAfter(this);
      }
    } else {
      $(this).removeClass("is-invalid");
      $(this).siblings(".invalid-feedback").remove();
    }
  });
});

//cadastrando usuários no localstorage 
var usuarios = [];
var usuariosArmazenados = JSON.parse(localStorage.getItem("usuarios")) || [];
usuarios = usuarios.concat(usuariosArmazenados);

$("#formCadastro").submit(function(event){
	event.preventDefault();
	var usuario = {
		nome: $("#inputNome").val(),
		email: $("#inputEmail").val(),
		telefone: $("#inputTelefone").val(),
		senha: $("#inputSenha").val(),
		endereco: $("#inputEndereco").val(),
		cep: $("#inputCEP").val()
	};
	usuarios.push(usuario);
	localStorage.setItem("usuarios", JSON.stringify(usuarios));

//criando tabela para ver usuários
var navlinkUsuarios = document.querySelector("#navlink");
var sectionUsuarios = document.querySelector("#usuarios");
var tabelaUsuarios = document.querySelector("#tabelaUsuarios");
var modalEdicao = document.querySelector("#modalEdicao");
var formEdicao = document.querySelector("#formEdicao");
var usuariosArmazenados = JSON.parse(localStorage.getItem("usuarios")) || [];

navlinkUsuarios.addEventListener("click", function() {
sectionUsuarios.style.display = "block";
if (usuariosArmazenados.length > 0) {
var linhas = "<tr>" +
"<th>Nome</th>" +
"<th>Email</th>" +
"<th>Telefone</th>" +
"<th>CEP</th>" +
"<th>Editar</th>" +
"<th>Excluir</th>" +
"</tr>";
tabelaUsuarios.innerHTML = linhas + tabelaUsuarios.innerHTML;

usuariosArmazenados.forEach(function(usuario) {
  if (usuario) {
    linhas += "<tr>" +
                "<td>" + usuario.nome + "</td>" +
                "<td>" + usuario.email + "</td>" +
                "<td>" + usuario.telefone + "</td>" +
                "<td>" + usuario.cep + "</td>" +
                "<td><button class='editar' id='" + usuario.id + "'>Editar</button></td>" +
                "<td><button class='excluir' id='" + usuario.id + "'>Excluir</button></td>" +

              "</tr>";
  }
});

tabelaUsuarios.innerHTML = linhas;
}
});
  
  // Adiciona as informações do usuário na tabela
  var table = $('#tabelas');
  var tr = $('<tr>');
  tr.append($('<td>').text(usuario.nome));
  tr.append($('<td>').text(usuario.telefone));
  table.append(tr);

  const toastHTML = `<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <strong class="mr-auto">Sucesso</strong>
      <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="toast-body w-100">
      Cadastro realizado com sucesso!
    </div>
  </div>`;

  document.querySelector("#toastContainer").innerHTML = toastHTML;
  $(".toast").toast("show");
});


//visualizando usuários
function visualizarUsuarios() {
  let usuariosArmazenados = localStorage.getItem("usuarios");
  if (usuariosArmazenados) {
    let usuarios = JSON.parse(usuariosArmazenados);
    console.log(usuarios);
  }
}

//editando usuário
function editarUsuario(id) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  let usuarioEncontrado = usuarios.find(usuario => usuario.id === id);
  
  if (usuarioEncontrado) {
    $("#inputNomeModal").val(usuarioEncontrado.nome);
    $("#inputTelefoneModal").val(usuarioEncontrado.telefone);
    $("#inputEmailModal").val(usuarioEncontrado.email);
    $("#inputCEPModal").val(usuarioEncontrado.cep);

    $("#modalEditarUsuario").modal("show");

    $("#botaoSalvar").click(function() {
      const nome = $("#inputNomeModal").val();
      const telefone = $("#inputTelefoneModal").val();
      const email = $("#inputEmailModal").val();
      const cep = $("#inputCEPModal").val();
      
      usuarioEncontrado.nome = nome;
      usuarioEncontrado.telefone = telefone;
      usuarioEncontrado.email = email;
      usuarioEncontrado.cep = cep;
      
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      
      atualizarTabela(usuarios);
      
      $("#modalEditarUsuario").modal("hide");
    });
  }
}
//botão editar abrindo modal de edição
$("#tabela").on("click", ".editar", function() {
  let id = $(this).data("id");
  editarUsuario(id);
});

//atualizando a tabela apóos salvar a edição
$("#salvar").click(function() {
  let id = $("#idUsuario").val();
  let usuarios = JSON.parse(localStorage.getItem("usuarios"));
  usuarios[id].nome = $("#inputNomeModal").val();
  usuarios[id].email = $("#inputEmailModal").val();
  usuarios[id].telefone = $("#inpuTelefoneModal").val();
  usuarios[id].cep = $("#inpuCEPMOdal").val();

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  atualizarTabela();
});
function atualizarTabela(usuarios) {
  // Limpar o conteúdo da tabela
  $("#tabela-usuarios tbody").empty();

  // Adicionar cada usuário na tabela
  for (var i = 0; i < usuarios.length; i++) {
    var usuario = usuarios[i];
    $("#tabela-usuarios tbody").append(
      "<tr>" +
        "<td>" + usuario.nome + "</td>" +
        "<td>" + usuario.email + "</td>" +
        "<td>" + usuario.telefone + "</td>" +
        "<td>" + usuario.cep + "</td>" +
        "<td>" +
          "<button class='btn btn-primary btn-editar'>Editar</button>" +
          "<button class='btn btn-danger btn-excluir'>Excluir</button>" +
        "</td>" +
      "</tr>"
    );
  }
}

document.addEventListener("click", function(event) {
  if (event.target.className === "editar") {
    editarUsuario();
  }
});
function excluirUsuario(id) {
  // Cria o modal de confirmação
  var confirmacao = confirm("Excluir usuário?");

  // Se o usuário clicou em OK no modal de confirmação
  if (confirmacao) {
    // Encontra o índice do usuário a ser excluído no array usuariosArmazenados
    var indiceUsuario = usuariosArmazenados.findIndex(function(usuario) {
      return usuario.id === id;
    });

    // Remove o usuário do array usuariosArmazenados
    usuariosArmazenados.splice(indiceUsuario, 1);

    // Atualiza o local storage com o novo array usuariosArmazenados
    localStorage.setItem("usuarios", JSON.stringify(usuariosArmazenados));

    // Atualiza a tabela de usuários
    atualizarTabelaUsuarios();
  }
}

// Event listener que escuta cliques no botão de excluir
tabelaUsuarios.addEventListener("click", function(event) {
  if (event.target.classList.contains("excluir")) {
    var id = event.target.id;
    excluirUsuario(id);
  }
});




