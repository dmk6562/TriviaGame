$(document).ready(function (){
//Start game
// resetText();
$(".time").hide();

//Trivia questions
var triviaQuestion =[{
	question: "what city was the first skyscraper built?",
	choices:   ["A.London", "B.Chicago", "C.Hong Kong", "D.Paris"],
	answer: "B.Chicago"
},	{
	question: "What city is well known for its Carnival?",
	choices:  ["A.Kiev", "B.New Orleans", "C.Rio de Janeiro", "D.Mexico-City"],
	answer: "C.Rio de Janeiro"
},	{
	question: "At the heart of which city can a commons be found?",
	choices: ["A.Philadelphia", "B.Boston", "C.San-Francisco", "D.Minneapolis"],
	answer: "B.Boston"
},	{
	question:  "Which Indian city is famed for its clock tower?",
	choices:  ["A.Delhi", "B.Kolkata", "C.Mumbai", "D.Pune"],
	answer: "C.Mumbai"
},	{
	question: "What is the largest city in Turkey?", 
	choices: ["A.Damascus", "B.Ankara", "C.Istanbul", "D.Adana,"],
	answer: "C.Istanbul"
}
]; 

//Variables
var numCorrect = 0;
var numIncorrect = 0;
var numUnanswered = 0;
var userGuess;
var questionIndex = 0;
var number = 5;
var intervalId = 0;
var timer = 15;

//Start button click function
$("button").click(function(){
	$("button").hide();
	$(".time").show();
	loadQuestion();
})	
	

function resetText(){
	$("#correctAnswer").text('');
	$("#answersBox").hide();	
	$("#triviaQuestion").text('');	
}

//Load Question function to set count down hide out of time and correct answer
function loadQuestion(){
	clearInterval(intervalId);
	intervalId = setInterval(decrement, 3000);
}

// prevent time remaining from going negative
function getTimeRemaining(timer){
	if(timer > 0){
		return timer;
	}else{
		return 0;
	}
}

//Countdown begin
function decrement(){
	timer --;
	
	//Display on DOM
	$("#correctAnswer").text('');
	$("#answersBox").show();
	$("#timeRemaining").text(getTimeRemaining(timer));
	$("#triviaQuestion").text(triviaQuestion[questionIndex].question);
	$("#choiceA").text(triviaQuestion[questionIndex].choices[0]);
	$("#choiceB").text(triviaQuestion[questionIndex].choices[1]);
    $("#choiceC").text(triviaQuestion[questionIndex].choices[2]);
    $("#choiceD").text(triviaQuestion[questionIndex].choices[3]);
    $("#choiceE").text(triviaQuestion[questionIndex].choices[4]);
	//-----console log answer to test---//
	console.log(triviaQuestion[questionIndex].answer);
	//---Run timeUp function when countdown reaches 0
	if (timer < 1){
		timeUp();
	}
}

//timeUp function when countdwon reaches 0
function timeUp(){
	clearInterval(intervalId);
//Displays results
	$("#answersBox").hide();
	$("#triviaQuestion").text("Out of Time!");
	$("#correctAnswer").text("The correct answer is:  " + triviaQuestion[questionIndex].answer);
	timer = 15; //reset countdown number
	questionIndex ++; //set next question index
	numUnanswered ++; //increase unanswered number by 1
	//Run end game function if reached last question
	if (questionIndex === (triviaQuestion.size-1)){
	// if (questionIndex === 4){
	setTimeout(endGame, 3000);
	}
	//Load another question if last question has not been reached
	else {
	setTimeout(loadQuestion, 3000);
	}
}

//Display "correct" message, reset counter, and increase number correct
function rightAnswer(){
	clearInterval(intervalId);
	$("#answersBox").hide();
	$("#triviaQuestion").text("Correct!");
	// number = 5;	
	numCorrect ++;
	//Run end game function if reached last question
	// if (questionIndex === 0){
	if (questionIndex === (triviaQuestion.size-1)){
	setTimeout(endGame, 3000);
	}
	//Load another question if last question has not been reached
	else {
	questionIndex ++;
	setTimeout(loadQuestion, 3000);
	}

}

// // User Guess
// $("#ChoiceA.answerChoice").addEventListener ("click", function(){
// 	console.log("CHOICE-A = "+$(this).text);
// });
//userGuess
// $('.answerChoice').click(function () {
// 	if ($(this).text() === triviaQuestion[questionIndex].answer) {
// 		rightAnswer();
// 		timeUp();
// 	} 
// 	else {
// 		wrongAnswer();
// 		timeUp();
// 	}
// });

$('#answersBox').click(function (){
	var userGuess = $(this).attr("value");
	console.log("show now");
});

//checks the user's answer choice
function checkAnswer() {
	clearInterval(intervalId);
	if (userGuess === triviaQuestion[questionIndex].answer) {
		rightAnswer();
	}
	else if (userGuess != triviaQuestion[questionIndex].answer){
		wrongAnswer();
	}
	}


//Display "wrong" message, reset counter, and increase number correct
function wrongAnswer(){
	clearInterval(intervalId);
	$("#answersBox").hide();
	$("#triviaQuestion").text("Wrong!");
	// number = 5;
	
	numIncorrect ++;
	//Run end game function if reached last question
	// if (questionIndex === 0){
	if (questionIndex === (triviaQuestion.size-1)){
	setTimeout(endGame, 3000);
	}
	//Load another question if last question has not been reached
	else {
	questionIndex ++;
	setTimeout(loadQuestion, 3000);
	}

}

//Display trivia totals, reset game variables, and display restart button
function endGame(){
	$("#correctAnswer").text("");
	$("#answersBox").show();
	$("#triviaQuestion").text("All done, here's how you did:");
	$("#choiceA").text("Correct Answers: " + numCorrect);
	$("#choiceB").text("Incorrect Answers: " + numIncorrect);
    $("#choiceC").text("Unanswered: " + numUnanswered);
    $("#choiceD").text("Unanswered: " + numUnanswered);
    $("#choiceE").text("Unanswered: " + numUnanswered);
	$("button").text("Start Over?");
	$("button").show();
	questionIndex = 0;
	numCorrect = 0;
	numIncorrect = 0;
	numUnanswered = 0;
	resetText();
}


});

