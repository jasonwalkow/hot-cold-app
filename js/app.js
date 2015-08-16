
$(document).ready(function(){

	//Declare variables
	var answer = Math.floor((Math.random() * 100) + 1);
	var currentGuess;
	var guessDifference;

	//Start a new game
	$('.new').click(function() {
		newGame();
	});

	//User input guess
	function setGuessValue() {
		currentGuess = parseInt($("#userGuess").val(), 10);
	}

	//Increase guess count
	function increaseCount() {
		$('#count').html(parseInt($('#count').html(), 10) + 1);
	}
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);
  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	//Clear guess input
  	$("#guessButton").click(function(event) {
  		event.preventDefault();
  		setGuessValue();
  		checkInput();
  		$("#userGuess").val("");
  	});

  	//Start a new game - function
  	function newGame() {
  		answer = Math.floor((Math.random() * 100) + 1);
		$('text[type=submit], input[type=submit]').attr('disabled',false);
		$('section ul').empty();
		$('#count').html("0");		
		$('#userGuess').val('');
		$('#feedback').html('Make your guess!');
  	}

  	//Check if user has entered a valid number for the game
  	function checkInput() {
	if (currentGuess == "" || currentGuess %1 != 0){
		alert("Please enter a number");		
	}
	else if (currentGuess < 0 || currentGuess > 100){
		alert("Please enter a number between 0 and 100");	
	}
	else {
		if (parseInt($('#count').text()) == 0){
			checkFirstGuess();
			increaseCount();
		}	
		else {
			checkGuess();
			increaseCount();	
		}		
	}
}

	//Check first guess, establish base number
	function checkFirstGuess() {
	if(currentGuess == answer) {	
		$('#feedback').html('CORRECT!');
		$('text[type=submit], input[type=submit]').attr('disabled',true);
		$("#guessList").append('<li>'+currentGuess+'!</li>');
	}
	else{
		$('#feedback').html("Good first guess, but that's not it");
		$("#guessList").append('<li>'+currentGuess+'</li>');
	}
	guessDifference = Math.abs(answer - currentGuess);
}

	//Check second and proceeding guesses
	function checkGuess () {
	if(currentGuess == answer) {	
		$('#feedback').html('CORRECT!');
		$('text[type=submit], input[type=submit]').attr('disabled',true);
		$("#guessList").append('<li>'+currentGuess+'!</li>');
	}
	else {
		var difference = Math.abs(answer - currentGuess)		
		if (difference > guessDifference){
			$('#feedback').html('Colder');
			$("#guessList").append('<li>'+currentGuess+'</li>');
		}
		else if (difference < guessDifference) {
			$('#feedback').html('Warmer');
			$("#guessList").append('<li>'+currentGuess+'</li>');	
		}
		else {
			$('#feedback').html('Close, but not so close');
			$("#guessList").append('<li>'+currentGuess+'</li>');	
		}
		guessDifference = difference;	
	}
}
});


