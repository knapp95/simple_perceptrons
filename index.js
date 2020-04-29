angular.module("app", []).controller("neural", function($scope) {  
		
	class Perceptron {
		constructor(number,values) {
			this.number = number;
			this.values = values;
		}

		/* Kazdy z perceptronow uczymy na zbiorach (po 3 na jedna liczbe) uczacych, aby uczenie dzialalo lepiej nie bierzemy zbiorow po kolei tylko losowo */
		static learn(perceptron) {
			for (i = 0; i < 1000; i++) {
				let randomPerceptronNumber = Math.floor(Math.random() * 10);
				let randomPerceptronArray  = $scope.learnNumbers[randomPerceptronNumber];
				let randomLearningPerceptron = randomPerceptronArray.learningValues[Math.floor(Math.random() * 3)];
					
				/* Sumujemy wagi perceptronu z przykladem uczacym otrzymany wynik przekazujemy do funkcji aktywacji 
				 ERR = WARTOŚĆ OCZEKIWANA - wynik funkcji aktywacji  */
				let sum = 0;
				for (j = 0; j < 35; j++) {
					sum = sum + (perceptron.values[j] * randomLearningPerceptron[j]);
				}
				
				if (perceptron.number == randomPerceptronArray.number) {
					let valueExpect = 1;
				} else {
					let valueExpect = -1;
				}
			
				let ERR = valueExpect - $scope.getResultFunctionActivation(sum);
				/* Jezeli ERR jest rozny od 0 aktualizujemy wagi w perceptronie */
				if (ERR == 0) {
					continue;
				} else {
					for (j = 0; j < 35; j++) {
						perceptron.values[j] = perceptron.values[j] + constLearn * ERR * perceptron.number;
					}
				} 
			
			}
		}
	}
	var constLearn = 0.6;
	
	/* $scope.board - macierz z zaznaczonymi kwadracikami na ekranie  */
	$scope.board = new Array(7);
	for (i = 0; i < 7; i++) {
		
		$scope.board[i] = new Array(5);
		for (j = 0; j < 5; j++) {
			$scope.board[i][j] = 0;
		}
	}
	
	/* Po najechaniu na 'kwadrat' zmieniamy jego wartosc (przy ng-clicku za dlugo by to trwalo) */
	$scope.changeValue = function(i,j) {
		if ($scope.board[i][j] == 0) {
			$scope.board[i][j] = 1;
		} else {
			$scope.board[i][j] = 0;
		}
	}
	
	/* Prosta funkcja aktywacyjna */
	$scope.getResultFunctionActivation = function(sum) {
		if (sum < 0) {
			return -1;
		} else {
			return 1;
		}
	}
	
	/* Obliczamy dla wprowadzonej liczby spodziewany wynik */
	$scope.calculate = function() {
		$scope.insert = new Array();
		for (i = 0; i < $scope.board.length; i++) {
			let row = $scope.board[i];
			for (j = 0; j < row.length; j++) {
				$scope.insert.push(row[j]);	
			}
		}
		
		$scope.result = new Array(9);
		
		$scope.perc.forEach(function(perceptron,index) {
			let sum = 0; 
			for (i = 0; i < $scope.insert.length; i++) {
				sum = sum + $scope.insert[i] * perceptron.values[i] 
			}
			$scope.result[perceptron.number] = $scope.getResultFunctionActivation(sum);
		});
	}
	
	/* Inicjujemy nasz zbior uczacy - dane muszą być wpisane "na sztywno" ponieważ 
		są to po 3 przykłady "narysowanej liczby od 0 do 9 */
	$scope.initializeLearn = function() {
		$scope.learnNumbers = new Array();
		
		let learningValues = new Array();
		learningValues.push([1,1,1,1,1,1, 1,0,0,0,1, 1,0,0,0,1, 1,0,0,0,1, 1,0,0,0,1, 1,0,0,0,1, 1,1,1,1,1]);
		learningValues.push([1,1,1,1,1,1, 1,1,1,1,1, 1,1,0,1,1, 1,1,0,1,1, 1,1,0,1,1, 1,1,1,1,1, 1,1,1,1,1]);
		learningValues.push([1,1,1,1,1,1, 1,1,1,1,1, 1,0,0,0,1, 1,0,0,0,1, 1,0,0,0,1, 1,1,1,1,1, 1,1,1,1,1]);
		let learnElement = {
			number:  0,
			learningValues: learningValues
		};
		$scope.learnNumbers.push(learnElement);
		
		learningValues = new Array();
		learningValues.push([1,0,0,0,1,1, 0,0,1,1,1, 0,0,1,0,1, 0,0,0,0,1, 0,0,0,0,1, 0,0,0,0,1, 0,0,0,0,1]);
		learningValues.push([1,0,0,0,1,1, 0,0,0,1,1, 0,0,0,1,1, 0,0,0,1,1, 0,0,0,1,1, 0,0,0,1,1, 0,0,0,1,1]);
		learningValues.push([1,0,0,0,0,1, 0,0,0,0,1, 0,0,0,0,1, 0,0,0,0,1, 0,0,0,0,1, 0,0,0,0,1, 0,0,0,0,1]);
		learnElement = {
			number:  1,
			learningValues: learningValues
		};
		$scope.learnNumbers.push(learnElement);
		
		learningValues = new Array();
		learningValues.push([1,1,1,1,1,1, 0,0,0,0,1, 0,0,0,0,1, 1,1,1,1,1, 1,0,0,0,0, 1,0,0,0,0, 1,1,1,1,1]);
		learningValues.push([1,1,1,1,1,1, 0,0,0,1,1, 0,0,1,1,0, 0,1,1,0,0, 1,1,0,0,0, 1,0,0,0,0, 1,1,1,1,1]);
		learningValues.push([1,1,1,1,1,0, 0,0,0,1,0, 0,0,0,1,0, 1,1,1,1,0, 1,0,0,0,0, 1,0,0,0,0, 1,1,1,1,0]);
		learnElement = {
			number:  2,
			learningValues: learningValues
		};
		$scope.learnNumbers.push(learnElement);
		
		learningValues = new Array();
		learningValues.push([1,1,1,1,1,1, 0,0,0,0,1, 0,0,0,0,1, 1,1,1,1,1, 0,0,0,0,1, 0,0,0,0,1, 1,1,1,1,1]);
		learningValues.push([1,1,1,1,1,1, 0,0,0,0,1, 0,0,0,0,1, 0,0,1,1,1, 0,0,0,0,1, 0,0,0,0,1, 1,1,1,1,1]);
		learningValues.push([1,0,0,1,1,1, 0,0,0,0,1, 0,0,0,0,1, 0,0,1,1,1, 0,0,0,0,1, 0,0,0,0,1, 0,0,1,1,1]);
		learnElement = {
			number:  3,
			learningValues: learningValues
		};
		$scope.learnNumbers.push(learnElement);
		
		learningValues = new Array();
		learningValues.push([1,1,0,0,0,0, 1,0,0,0,0, 1,0,0,0,0, 1,1,1,1,1, 0,0,1,0,0, 0,0,1,0,0, 0,0,1,0,0]);
		learningValues.push([1,0,0,0,1,0, 0,0,1,1,0, 0,1,0,1,0, 1,1,1,1,1, 0,0,0,1,0, 0,0,0,1,0, 0,0,0,1,0]);
		learningValues.push([1,1,0,0,0,0, 1,0,0,0,0, 1,0,1,0,0, 1,1,1,1,0, 0,0,1,0,0, 0,0,1,0,0, 0,0,1,0,0]);
		learnElement = {
			number:  4,
			learningValues: learningValues
		};
		$scope.learnNumbers.push(learnElement);
		
		learningValues = new Array();
		learningValues.push([1,1,1,1,1,1, 1,0,0,0,0, 1,0,0,0,0, 1,1,1,1,1, 0,0,0,0,1, 0,0,0,0,1, 1,1,1,1,1]);
		learningValues.push([1,0,1,1,1,1, 0,1,0,0,0, 0,1,0,0,0, 0,1,1,1,1, 0,0,0,0,1, 0,0,0,0,1, 0,1,1,1,1]);
		learningValues.push([1,0,0,0,0,0, 0,1,1,1,0, 0,1,0,0,0, 0,1,1,1,0, 0,0,0,1,0, 0,1,1,1,0, 0,0,0,0,0]);
		learnElement = {
			number:  5,
			learningValues: learningValues
		};
		$scope.learnNumbers.push(learnElement);
		
		learningValues = new Array();
		learningValues.push([1,1,1,1,1,1, 1,0,0,0,0, 1,0,0,0,0, 1,1,1,1,1, 1,0,0,0,1, 1,0,0,0,1, 1,1,1,1,1]);
		learningValues.push([1,0,0,0,0,0, 0,1,1,1,0, 0,1,0,0,0, 0,1,1,1,0, 0,1,0,1,0, 0,1,1,1,0, 0,0,0,0,0]);
		learningValues.push([1,0,1,1,0,0, 1,0,0,0,0, 1,0,0,0,0, 1,1,1,1,0, 1,0,0,0,1, 1,0,0,0,1, 0,1,1,1,1]);
		learnElement = {
			number:  6,
			learningValues: learningValues
		};
		$scope.learnNumbers.push(learnElement);
		
		learningValues = new Array();
		learningValues.push([1,1,1,1,1,1, 0,0,0,1,1, 0,0,1,1,0, 0,1,1,0,0, 0,1,1,0,0, 1,1,0,0,0, 1,0,0,0,0]);
		learningValues.push([1,0,0,0,0,0, 1,1,1,1,1, 0,0,0,0,1, 0,0,0,1,0, 0,0,1,0,0, 0,1,0,0,0, 1,0,0,0,0]);
		learningValues.push([1,1,1,1,1,1, 1,1,1,1,1, 0,0,0,1,1, 0,0,1,1,0, 0,1,1,0,0, 1,1,0,0,0, 1,0,0,0,0]);
		learnElement = {
			number:  7,
			learningValues: learningValues
		};
		$scope.learnNumbers.push(learnElement);
		
		learningValues = new Array();
		learningValues.push([1,1,1,1,1,1, 1,0,0,0,1, 1,0,0,0,1, 1,1,1,1,1, 1,0,0,0,1, 1,0,0,0,1, 1,1,1,1,1]);
		learningValues.push([1,0,0,0,0,0, 1,1,1,0,0, 1,0,1,0,0, 1,0,1,0,0, 1,1,1,0,0, 1,0,1,0,0, 1,1,1,0,0]);
		learningValues.push([1,0,0,0,0,0, 0,1,1,1,0, 0,1,0,1,0, 0,1,1,1,0, 0,1,0,1,0, 0,1,1,1,0, 0,0,0,0,0]);
		learnElement = {
			number:  8,
			learningValues: learningValues
		};
		$scope.learnNumbers.push(learnElement);
		
		learningValues = new Array();
		learningValues.push([1,0,0,0,0,0, 0,1,1,1,0, 0,1,0,1,0, 0,1,1,1,0, 0,0,0,1,0, 0,1,1,1,0, 0,0,0,0,0]);
		learningValues.push([1,1,1,1,1,1, 1,0,0,0,1, 1,0,0,0,1, 1,1,1,1,1, 0,0,0,0,1, 0,0,0,0,1, 1,1,1,1,1]);
		learningValues.push([1,0,0,0,0,0, 0,0,1,1,1, 0,0,1,0,1, 0,0,1,0,1, 0,0,1,1,1, 0,0,0,0,1, 0,0,1,1,1]);
		learnElement = {
			number:  9,
			learningValues: learningValues
		};
		$scope.learnNumbers.push(learnElement);
		
		$scope.perc = new Array();
		for (i = 0; i < 10; i++) {
			
			weightArray = new Array();
			for (j = 0; j < 35; j++) {
				weightArray[j] = (Math.random() * (1.00 + 1.00) - 1.00);
			}
			$scope.perc.push(new Perceptron(i,weightArray));
		}
		
		
	}
	
	$scope.initializeLearn();
	
	/* Uczymy kazdy z perceptronow */
	$scope.learn = function() {
		$scope.perc.forEach(function(perceptron,index) {
			Perceptron.learn(perceptron);
		});
	}
} )