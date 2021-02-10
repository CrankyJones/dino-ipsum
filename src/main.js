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

function Guessing(letter, wordArray, counter, correctLetter) {
  if (letter === " " || letter === "") {
    alert("Please enter a letter.");
    return counter;
  } else if (correctLetter.includes(letter)) {
    alert("Please enter a different letter.");
    return counter;
  }
 
  $(".guessed").append(letter + "  ");
  
  if (wordArray.includes(letter) == false) {
    counter[0]++;
    if (counter[0] > 10) {
      alert("You lose. Wamp wamp.");
      location.reload();
    }
    return counter;
  }
  
  for(let i = 0; i < wordArray.length; i++) {
    if (wordArray[i].includes(letter)) {
      $(".space" + [i]).empty();
      $(".space" + [i]).text(letter);
      correctLetter.push(letter);
      counter[1]++;
      if (correctLetter.length === wordArray.length) {
        alert("You win nothing, but you still win.");
        location.reload();
      }
    }
  }
  return counter;
}

$(document).ready(function() {
  let wordArray = [];
  let counter = [0,0];
  let correctLetter = [];
  $("#dinoSubmit").click(function() {
    let promise = DinoIpsum.getDinoIpsum();
    promise.then(function(response) {
      const body = JSON.parse(response);
      wordArray = body[0][0].toUpperCase().split("");
      console.log(wordArray);
      StartUp(wordArray);
    });
  });
  $('#guessButton').click(function(){
    let letter = $("#input").val();
    letter = letter.toUpperCase();
    counter = Guessing(letter, wordArray, counter, correctLetter);
    $("#input").val("");
    console.log(counter);
  });
});