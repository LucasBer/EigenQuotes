'use strict'

angular.module('QuotesApp', ['ngRoute'])

.config(function($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'assets/views/home.html',
                controller: 'homeCtrl'
            })
            .when('/persons', {
                templateUrl: 'assets/views/persons.html',
                controller: 'personsCtrl'
            })
            .when('/quotes/:person_id', {
                templateUrl: 'assets/views/quotes.html',
                controller: 'quotesCtrl'
            })
            .otherwise({
                redirectTo: '/home'
            });
    })
    .controller('homeCtrl', function($scope, getObjectServ){
    	getObjectServ.getObject();
    })
    .controller('personsCtrl', function($scope, personsServ){
    	$scope.persons = personsServ.getAllPersons(); 
    })
    .controller('quotesCtrl', function($scope, $routeParams, quotesServ, personsServ){
    	$scope.person = personsServ.getPerson(parseInt($routeParams.person_id));
    	$scope.quotes = quotesServ.AllQuotes($scope.person);
    	console.log($scope.quotes);
    })
    .service('personsServ', function(){
    	var persons = [{
            'id': 0,
            'name': 'Person 1'
        }, {
            'id': 1,
            'name': 'Person 2'
        }];
    	return {
    	getAllPersons : function() {
    		return persons; 
    		},
    	getPerson : function(person_id){
    		for (var index = 0; index < persons.length; index++){
    			if (persons[index].id == person_id){
    				return persons[index];
    			}
    		}
    		return null;
    	}
    	}
    })
    .service('quotesServ', function(){
    	this.AllQuotes = function (person){
    		var quotes = [{
                'id': 0,
                'quotes': ["Quote 1",
                    "Quote 2"
                ]
               }, {
                'id': 1,
                'quotes': ["Quote 3","Quote 4"]
               }];
    		for (var j = 0; j < quotes.length; j++){
    			if (quotes[j].id == person.id){
    				return quotes[j].quotes;
    			}
    		}
    		return null;
    	}
    })
    .service('getObjectServ', function ($http){
    	this.getObject = function(){
    		$.get('../../../index', function(data){
    			console.log(data);
    		})
    	}
    });