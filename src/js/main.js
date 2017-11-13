// Import modules
var dragula = require("dragula");
const inputData = require("./data.js");
const iterator = require("./iterator.js");
const GetArrayOfDraggables = require("./get-array-of-draggables.js")
const canIDropHere = require("./can-i-drop-here.js");
const interactives = require("./interactives.js");
const autoScroll = require('dom-autoscroller');

const InitializedDomElements = iterator(inputData);  
// Iterator populates DOM and returns two arrays of the created objects.
// (Sources and Destinations)

const InitializedDraggables = GetArrayOfDraggables(InitializedDomElements);
// Returns a flattened array of the drag/drop targets for Dragula

// Initialize Answer Counter
var totalCount = inputData.length;
var correctCount = 0;
$('#total-count').text(totalCount);
$('#correct-count').text(correctCount);

// Initialize & Configure Dragula
var drake = dragula(InitializedDraggables, {
    accepts: function(el, target, source) {
        return canIDropHere(el, target, source)  // true or false
    }
});

var scroll = autoScroll([
        document.querySelector('.destinations')
    ],{
    margin: 40,
    maxSpeed: 10,
    scrollWhenOutside: true,
    autoScroll: function(){
        //Only scroll when the pointer is down, and there is a child being dragged. 
        return this.down && drake.dragging;
    }
});


/* Hacks */ 
    // Prevents scrolling while dragging on mobile
    window.addEventListener( 'touchmove', function() {});
    drake.on('drag', function(el){
        $(document).on('touchstart', function(e) {
            e.preventDefault();
        });
        $('.sources').css('overflow-x', 'hidden')
        
    });


/* Event Bindings */

var currentMirrorInstance;

drake.on('cloned', function(clone) {
    currentMirrorInstance = clone;
});

drake.on('cancel', function(el, source) {
    $(document).off('touchstart');
    $('.sources').css('overflow-x', 'scroll')
    interactives.onDropped(el, currentMirrorInstance, source);
});

drake.on('drop', function(el, target, source) {
    $(document).off('touchstart');
    $('.sources').css('overflow-x', 'scroll')
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
    var $answerBox = $(target).parent();
    if (isAnswerCorrect(source, target)) {
        // Unbind source and target
        let droppableInstance = drake.containers.indexOf(target);
        drake.containers.splice(droppableInstance, 1);
        let draggableInstance = drake.containers.indexOf(source);
        drake.containers.splice(draggableInstance, 1);

        $(source).parent().hide();
        correctCount++;
        $('#correct-count').text(correctCount);
        if(correctCount == totalCount) {
            $('body').addClass('complete')
        }
        $answerBox.addClass("correct")
        

    } else {
        interactives.onWrongAnswer(el, source, target);
        
        $answerBox.addClass("incorrect");
        setTimeout(function($el) {
            $answerBox.removeClass("incorrect")
        }, 500, $answerBox);
        console.log("Incorrect.")
    }
}


/* TODO 
   - Complete answer counter
   - Flash "Nice! All complete." on all complete answers.
   - Refactor in future uses 
*/
