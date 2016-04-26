(function() {
    var app = angular.module('tyrant', []);
    
    app.controller('TyrantCtrl', function($scope) {
        var self = this;
        this.useNoun = true;
        this.useAdjective = true;
        this.useAdverb = true;
        
        this.calculated = false;
        
        this.generate = function() {

            $.getJSON('https://randomuser.me/api/', function(data) {
                $scope.$apply(function() {
                    self.calculated = true;
                    self.name = capitalize(data.results[0].name.first);
                })
            });
            
            $.getJSON(
                'http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=false&includePartOfSpeech=noun&excludePartOfSpeech=noun-plural&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=3&maxLength=-1&api_key=b31c941c00950856390000acc730aeb1a4430235f8656d018',
                function(data) {
                    $scope.$apply(function() {
                        self.noun = capitalize(data.word);
                    });
                });
                
            $.getJSON('http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=false&includePartOfSpeech=adjective&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=3&maxLength=-1&api_key=b31c941c00950856390000acc730aeb1a4430235f8656d018', function(data) {
                $scope.$apply(function() {
                    self.adjective = capitalize(data.word);
                });
            });
            
            $.getJSON('http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=false&includePartOfSpeech=adverb&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=3&maxLength=-1&api_key=b31c941c00950856390000acc730aeb1a4430235f8656d018', function(data) {
                $scope.$apply(function() {
                    self.adverb = capitalize(data.word);
                });
            });
        };
        
        function capitalize(str) {
            return str[0].toUpperCase() + str.slice(1);
        }
    });
})();