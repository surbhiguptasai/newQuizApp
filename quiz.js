var allQuestions = [
    {
        question: "Q 1 - Which of the following type of variable is visible everywhere in your JavaScript code?",
        choices: ["global variable", "local variable", "Both of the above","None of the above"],
        correctAnswer: 0
    },
  
    {
        question: "Q 2 - Which built-in method reverses the order of the elements of an array?",
        choices: ["changeOrder(order)", "reverse()", "sort(order)", "None of the above"],
        correctAnswer: 1
    },

    {
        question: "Q 3 - Which of the following jQuery selector select elements whose css class is some-class?",
        choices: ["$('some-class')", "$('#some-class')", "$('.some-class')", "None of the above"],
        correctAnswer: 2
    },
   
    {
        question: "Q 4 - Which of the following jQuery method apply a style on an element?",
        choices: ["addStyle(classes)", "addClass( classes )", "addCSSClass(classes)", "None of the above"],
        correctAnswer: 1
    },
  

    {
        question: "Q 5 - Which of the following jQuery method selects a subset of the matched elements?",
        choices: ["subset( selector )", "getSubset( selector )", "slice(selector)", "None of the above"],
        correctAnswer: 2
    },
  
    {
        question: "Q 6 - Which of the following jQuery method gets a set of elements containing all of the unique immediate children of each of the matched set of elements?",
        choices: ["getChild(selector)","children([selector])","getChildren(selector)","None of the above"],
        correctAnswer: 1
    },


    {
        question: "Q 7 - Which of the following jQuery method gets the inner height (excluding the border) of an element?",
        choices: ["getCSSHeight()","innerHeight()","getInnerHeight()","None of the above"],
        correctAnswer: 1
    },
    

     {
        question: "Q 8 - Which of the following jQuery method removes set of matched elements?",
        choices: ["empty()","delete()","remove(expr)","None of the above"],
        correctAnswer: 2
    },

     {
        question: "Q 9 - Which of the following jQuery method checks if event.stopPropagation() was ever called on this event object?",
        choices: ["isDefaultPrevented()","isPropagationStopped()","isImmediatePropagationStopped()","None of the above"],
        correctAnswer: 1
    },

     {
        question: "Q 10 - Which of the following jQuery method can be used to attach a function to be executed whenever AJAX request completed successfully?",
        choices: ["ajaxStart(callback)","ajaxSuccess(callback)","ajaxSend(callback)","ajaxStop(callback)"],
        correctAnswer: 1
    }
];

var submitBtn = $('#myBtn');
var currentQuestion = 0;
var tally = 0;

var quizForm = $('#quiz');
var question;
var choices;
var radioButtons = document.getElementsByName('radioOption');
var index = 0;
var totalCount=allQuestions.length;
var restartQuiz=$('#restart');
var restartQ=$('#restartQ');

function firstFunc() {

    if (currentQuestion === 0) {
        submitBtn.val("Start Quiz");
    }
}

function askQuestion () {
    if(currentQuestion < totalCount)
    {
    $('#counter').html("<div> Question "+(currentQuestion+1)+" out of "+totalCount+"</div>");
    }
    else
    {
      $('#counter').html("");  
    }


    choices = allQuestions[currentQuestion].choices;
    question = allQuestions[currentQuestion].question;
    if (currentQuestion < allQuestions.length) {
        submitBtn.val("Check my answer");
        var answerhtml="";
        answerhtml+="<h1>" + question + "</h1>";

        for (var i = 0; i < choices.length; i++) {
            answerhtml+= "<label><input type='radio' name='radioOption' id='radioOption' value='" + choices[i] + "'/>" + choices[i] + "</label>";
        
        }
        quizForm.html(answerhtml);


    }
}

function lookForChecked() {
    if (submitBtn.val()==="RestartQuiz")
    {

     location.reload();
    }

    if(currentQuestion == allQuestions.length && submitBtn.val()==="Next" )
    {
         console.log('you have ended the quiz');
         calcQuiz();
         $('#counter').html("");
         $('#answerMessage').html(""); 
       
    }

    if (radioButtons.length > 1 &&  submitBtn.val()==="Check my answer") {

        
            var checked = false;
        for (var i = 0; i < radioButtons.length; i++) {
            var selection = radioButtons[i];

             if (selection.checked) {
             
                var index = [i];
            

                if (i === allQuestions[currentQuestion].correctAnswer) {
                    tally++;
                $('#answerMessage').html(
                    "<div class='green' style='fontSize:20px'> <img class='happyImage' src='http://clipart-library.com/images/zTX5rEgKc.png'> Your answer is correct.</div>");
                
                }
                else{
                $('#answerMessage').html("<div class='red'> <img class='sadImage' src='http://clipart-library.com/data_images/71350.png'> Your answer is incorrect.</div>");
                

                }
                submitBtn.val("Next");
             
                currentQuestion++;
                     break;
            }
        }
        if ($('input[name="radioOption"]:checked').length < 1) {
            alert('Please Make a Selection');
        }
    }

    else if ( submitBtn.val()==="Start Quiz" || submitBtn.val()==="Next" ){
        $('#answerMessage').html("");
        askQuestion();
    } 
 


   
        
}

function calcQuiz() {
    quizForm.html("<h1>You have finished the quiz</h1><p class='total'>You scored a total of " + tally + " out of " + allQuestions.length + "</h1>");
    submitBtn.val("RestartQuiz");
    // submitBtn.remove();
    // restartQuiz.html("<input type='submit' class='restartBtn' id='restartQ' value='RestartQuiz' >");
}
window.onload = firstFunc();
submitBtn.click(function(event) {
   event.preventDefault();
   lookForChecked();
});

