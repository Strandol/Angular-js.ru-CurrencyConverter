const WRONG_VALUE_REGEXP = /[-|a-zA-ZА-Яа-яі|=<>/\\]|/g;

let app = angular.module('currencyExchange', []);
app.controller('currencyController', function($scope) {
    $scope.currencyList = [
        { 
          currency: 'USD',
          to: {
            'UAH': { buy: '25.90', sell: '25.95' },
            'RUB': { buy: '59.54', sell: '60.35' },
            'EUR': { buy: '0.87', sell: '0.88' }
          }
        },
        { 
          currency: 'UAH',
          to: {
            'USD': { buy: '0.04', sell: '0.06' },
            'RUB': { buy: '2.30', sell: '2.33' },
            'EUR': { buy: '0.03', sell: '0.03' }
          }
        },
        { 
          currency: 'RUB',
          to: {
            'USD': { buy: '0.02', sell: '0.04' },
            'UAH': { buy: '0.43', sell: '0.44' },
            'EUR': { buy: '0.0145', sell: '0.0147' }
          }
        },
        { 
          currency: 'EUR',
          to: {
            'USD': { buy: '1.14', sell: '1.15' },
            'RUB': { buy: '67.98', sell: '69.05' },
            'UAH': { buy: '29.57', sell: '29.69' }
          }
        }
    ];  
    $scope.selectedCurrency = $scope.currencyList[0];
    $scope.resultCurrency = $scope.currencyList[1];
    $scope.enteredValue = 0;
    $scope.exchangeType = 'buy';
    $scope.resultValue = 0;
    $scope.getAvaliableCurrency = function (item) {
        return item !== $scope.resultCurrency;
    }
    $scope.getAvaliableResultCurrency = function (item) {
        return item !== $scope.selectedCurrency;
    }
    $scope.setResultValue = function () {
        let value = $scope.enteredValue.toString().replace(WRONG_VALUE_REGEXP, '');
        $scope.enteredValue = value;
        $scope.resultValue = (value * $scope.selectedCurrency.to[$scope.resultCurrency.currency][$scope.exchangeType]).toFixed(3);
        if ($scope.resultValue === 'NaN') {
            $scope.resultValue = 'error';
        }
    }
})
