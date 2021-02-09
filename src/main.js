import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import {DinoIpsum} from './js/dinoipsum-service.js'


$(document).ready(function() {
  $("#dinoButton").click(function() {
    //clearFields();
    let promise = DinoIpsum.getDinoIpsum();
    promise.then(function(response) {
      const body = JSON.parse(response);
      let wordArray = body[0][0].split();
      $("#")
    }, function(error) {
      $(".showErrors").text(`ERROR!`)
    });
  });
});