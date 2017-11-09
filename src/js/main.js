// Import modules
var dragula = require("dragula");
const inputData = require("./data.js");
const iterator = require("./iterator.js");
const GetArrayOfDraggables = require("./get-array-of-draggables.js")
const canIDropHere = require("./can-i-drop-here.js");
const interactives = require("./interactives.js");

const InitializedDomElements = iterator(inputData);  
// Iterator populates DOM and returns two arrays of the created objects.
// (Sources and Destinations)

const InitializedDraggables = GetArrayOfDraggables(InitializedDomElements);
// Returns a flattened array of the drag/drop targets for Dragula


// Initialize & Configure Dragula
var drake = dragula(InitializedDraggables, {
    accepts: function(el, target, source) {
        return canIDropHere(el, target, source)  // true or false
    }
});

/* Hacks */ 
    // Prevents scrolling while dragging on mobile
    window.addEventListener( 'touchmove', function() {});
    drake.on('drag', function(el){
        $(document).on('touchstart', function(e) {
            e.preventDefault();
        });
    });


/* Event Bindings */

var currentMirrorInstance;

drake.on('cloned', function(clone) {
    currentMirrorInstance = clone;
});

drake.on('cancel', function(el, source) {
    $(document).off('touchstart');
    interactives.onDropped(el, currentMirrorInstance, source);
});

drake.on('drop', function(el, target, source) {
    $(document).off('touchstart');
    interactives.onPlace(el, currentMirrorInstance, target);
    validateAnswer(el, source, target)
});

function isAnswerCorrect(source, dest) {
    if (source.dataset.answer === dest.dataset.answer) {
        return true
    } else {
        return false
    }
}

function validateAnswer(el, source, target){   
    if (isAnswerCorrect(source, target)) {
        // Unbind source and target
        let droppableInstance = drake.containers.indexOf(target);
        drake.containers.splice(droppableInstance, 1);
        let draggableInstance = drake.containers.indexOf(source);
        drake.containers.splice(draggableInstance, 1);

        $(target).css("background-color", "green")
        console.log("Correct.")
    } else {
        interactives.onWrongAnswer(el, source, target);
        $(target).css("background-color", "red")
        console.log("Incorrect.")
    }
}


/* TODO 
    - Flash styles on correct or incorrect answer.
    - Flash "Nice! All complete." on all complete answers.
*/
