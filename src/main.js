import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import {DinoIpsum} from './js/dinoipsum-service.js';
// import {hangman} from './js/hangman.js';
function StartUp(wordArray) {
  for(let i = 0; i < wordArray.length; i++) {
    $(".puzzle").append(`<div class="space${i} inline-block">   </div>`);
    $(".space" + i).append("___");
    $("#dinoSubmit").hide();
    $("#input").show();
    $("#guessButton").show();
  }
}

function Guessing(letter, wordArray) {
  if (letter === "") {
    alert("Please enter a letter.");
    return;
  }
  $(".guessed").append(letter + "  ");
  for(let i = 0; i < wordArray.length; i++) {
    if (wordArray[i].includes(letter)) {
      $(".space" + [i]).empty();
      $(".space" + [i]).text(letter);
    }
  }
  $("#input").val("");
}

$(document).ready(function() {
  let wordArray = [];
  $("#dinoSubmit").click(function() {
    //clearFields();
    let promise = DinoIpsum.getDinoIpsum();
    promise.then(function(response) {
      const body = JSON.parse(response);
      console.log(body);
      wordArray = body[0][0].toUpperCase().split("");
      console.log(wordArray);
      StartUp(wordArray);

 //   }, function(error) {
 //    $(".showErrors").text(`ERROR!`)
    });
  });
  $('#guessButton').click(function(){
    let letter = $("#input").val();
    letter = letter.toUpperCase();
    Guessing(letter, wordArray);
  });
});