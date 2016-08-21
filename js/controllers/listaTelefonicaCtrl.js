// instanciando uma controller para o modulo lista telefonica
angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function($scope, contatosAPI, operadorasAPI, serialGenerator){

	$scope.app        = "Lista telefonica";
	$scope.contatos   = [];
	$scope.operadoras = [];			


	var carregarContatos = function() {
		operadorasAPI.getOperadoras().success(function(data, status){
			$scope.contatos = data;
		});
	}

	var carregarOperadoras = function() {
		contatosAPI.getContatos().success(function(data, status){
			$scope.operadoras = data;
		});
	}

	$scope.adicionarContato = function(contato){
		contato.serial = serialGenerator.generate();
		contato.data   = new Date();

		contatosAPI.saveContato(contato).success(function (data){
			delete $scope.contato;
			$scope.contatoForm.$setPristine();
			carregarContatos();
		});
	}

	$scope.classe1 = "selecionado";
	$scope.classe2 = "negrito";

	$scope.apagarContato = function(contatos){
		$scope.contatos = contatos.filter(function(contato){
			if (!contato.selecionado)
				return contato;
		});
	};
	$scope.isContatoSelecionado = function(contatos){
		return contatos.some(function (contato){
			return contato.selecionado;
		});
	};
	$scope.ordernarPor = function(campo){
		$scope.criterioDeOrdenacao = campo;
		$scope.direcaoOrdenacao    = !$scope.direcaoOrdenacao;
	}

	carregarContatos();
	carregarOperadoras();

});