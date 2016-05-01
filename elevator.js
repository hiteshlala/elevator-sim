//Albert toy problem: Elevator
/*
Generate markup HTML and CSS Add functionality to existing code
Turn in your work Provide feedback
Phase 1:
For this portion of the code challenge, you will develop code that renders
  an elevator panel that matches the provided mockup. You will then be adding
  JS code to make the elevator panel function according to the functional 
  requirements below. You can control which way the elevator moves by selecting 
  the “floor” buttons on the panel. As soon as a button is selected, the 
  elevator will begin moving toward that floor.

UI Requirements:
A display panel that indicates the number of the current floor Green and 
red lights indicating whether the elevator is going up (green) or down 
(red) Four floor buttons
Four floors behind the elevator panel

Functional Requirements:
1) A floor can be selected from the elevator panel.
2) When a floor is selected, its button is highlighted.
3) Clicking on a floor button in the panel will cause the floors in the background to scroll up and down.
4) Multiple floors can be selected and will be executed in the order that they were selected.
5) The chosen button should remain highlighted until the floor is reached.
6) The current floor is shown on the display panel.
7) The elevator's current direction (up/down) is indicated by highlighting the 
  corresponding green and red indicators in the display panel.
:sunglasses: A visual cue is provided when you have arrived at the selected floor.
9) Selecting a button anchor does not navigate or change the URL.
*/

(function() {
  'use strict';
  window.elevator = {
    
    currentFloor: 1,

    moveTo: [],
    
    moving: false, //possible values false, 'up', 'down'

    travelTime: 1000,
    
    move: function(){
      if(this.moveTo.length > 0) {

        // move upwards
        if(this.currentFloor - this.moveTo[0] < 0) {
          // move the floor
          if(this.moving) {
            $('.elevator-background').css({'background-position': '0 0px'});
            $('.elevator-background').animate({"background-position-y": "+=460px"}, this.travelTime - 100, 'linear');
          } else {
            $('.elevator-background').animate({"background-position-y": "+=460px"}, this.travelTime - 100, 'linear');
          }
          
          this.moving = true;
          $('.up').attr('color','green');

          setTimeout(function(){
            if(elevator.currentFloor < elevator.moveTo[0]){
              elevator.currentFloor += 1;
              $('.floor').text(elevator.currentFloor);
            }
            elevator.move();
          }, this.travelTime);

        // move downwards
        } else if(this.currentFloor - this.moveTo[0] > 0) {
          // move the floor
          if(this.moving) {
            $('.elevator-background').css({'background-position': '0 442px'});
            $('.elevator-background').animate({"background-position-y": "-=460px"}, this.travelTime - 100, 'linear');
          } else {
            $('.elevator-background').animate({"background-position-y": "-=460px"}, this.travelTime - 100, 'linear');
          }

          this.moving = true;
          $('.down').attr('color','red');
          setTimeout(function(){
            if(elevator.currentFloor > elevator.moveTo[0]){
              elevator.currentFloor -= 1;
              $('.floor').text(elevator.currentFloor);
            }
            elevator.move();
          }, this.travelTime);

        // on floor
        } else {
          $('.elevator-background').css({'background-position': '0 442px'});
          this.moveTo.shift();
          $('.up').removeAttr('color');
          $('.down').removeAttr('color');
          this.moving = false;
          $('.floor' + this.currentFloor).removeClass('glow');
          this.openDoor();
        }
      }
    },

    openDoor: function() {
      // open and close door
      $('.door').animate({'width': '0'}, 420, 'linear');
      $('.door').animate({'width': '100%'}, 420, 'linear');


      // see if there are still floors to visit if so call move()
      // leaving enough time for door to open and close
      setTimeout(function() {
        if(elevator.moveTo.length) {
          elevator.move();
        }
      }, elevator.travelTime);
    }

  };

})();

$(function() {
  // maybe include a function to dynamically add the elevator floor buttons

  // add event listener to buttons after document loads
  $('.button').on('click', function(button){
    $(this).addClass('glow');
    elevator.moveTo.push(parseInt(this.dataset.floor));
    if(!elevator.moving) { 
      elevator.move();
    }
  });
  
});