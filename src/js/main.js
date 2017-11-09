var dragula = require("dragula");
const inputData = require("./data.js");
const iterator = require("./iterator.js");
const GetArrayOfDraggables = require("./get-array-of-draggables.js")

// Bootstraps the DOM
const InitializedDomElements = iterator(inputData);

// Turns the target drag/drop zones into an array of HTMLElements
// (which is what our Dragging library expects)
const InitializedDraggables = GetArrayOfDraggables(InitializedDomElements);
window.addEventListener( 'touchmove', function() {})
// Can I drop here - helper function which Dragula 
// uses to check if the element we're "over" is an acceptable dropzone
var canIDropHere = function (el, target, source) {
    if (target.classList.contains('destination-droppable')) {
        return true
    } else return false
}

var drake = dragula(InitializedDraggables, {
    accepts: function(el, target, source) {
        return canIDropHere(el, target, source)
    }
});

var currentMirrorInstance;  

const interactives = {
    onPlace: function(el, mirror, dropzone) {
        console.log(el,mirror,dropzone);
        let $el = $(el),
            $mirror = $(mirror),
            $dropzone = $(dropzone);

        let mirrorPos = $mirror.offset(),
            dropzonePos = $dropzone.offset();

        let diffTop = mirrorPos.top - dropzonePos.top,
            diffLeft = mirrorPos.left - dropzonePos.left;

        $el.css('transform', 'translate(' + diffLeft + 'px, ' + diffTop + 'px)');
        // BEWARE the race condition
        setTimeout(function($el) {
            console.log("onplace firing")
            $el.css('transition', 'all 0.1s ease-in');
            $el.css('transform','translate(0px, 0px)')
        }, 10, $el);
    },
    onWrongAnswer: function(el, origSource, dropzone){
        let $el = $(el),
            $origSource = $(origSource),
            $dropzone = $(dropzone);

        let origSourcePos = $origSource.offset(),
            dropzonePos = $dropzone.offset();

        let diffTop = dropzonePos.top - origSourcePos.top,
            diffLeft = dropzonePos.left - origSourcePos.left;

        $el.appendTo($origSource);
        $el.css('transform', 'translate(' + diffLeft + 'px, ' + diffTop + 'px)');

        // BEWARE the race condition
        setTimeout(function($el) {
            console.log("wronganswer firing")
            $el.css('transition', 'all 0.1s ease-in');
            $el.css('transform','translate(0px, 0px)')
        }, 10, $el);
    },
    onDropped: function(el, mirror, origSource){
        let $el = $(el),
            $mirror = $(mirror),
            $origSource = $(origSource);

        let origSourcePos = $origSource.offset(),
            mirrorPos = $mirror.offset();

        let diffTop = mirrorPos.top - origSourcePos.top,
            diffLeft = mirrorPos.left - origSourcePos.left;

        // $el.appendTo($origSource);
        $el.css('transform', 'translate(' + diffLeft + 'px, ' + diffTop + 'px)');

        setTimeout(function($el) {
            $el.css('transition', 'all 0.1s ease-in');
            $el.css('transform','translate(0px, 0px)')
        }, 10, $el);
    }
}

drake.on('drag', function(el){
    $(document).on('touchstart', function(e) {
        e.preventDefault();
    });
});


drake.on('cloned', function(clone) {
    // Slightly dirty hack where we use 
    // the global scope to cache the mirror. 
    currentMirrorInstance = clone;
})

drake.on('cancel', function(el, source) {
    interactives.onDropped(el, currentMirrorInstance, source);
    $(document).off('touchstart');
})

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
// Now we bind events 
drake.on('drop', function(el, target, source) {
    $(document).off('touchstart');
    console.log("I been dropped ")
    interactives.onPlace(el, currentMirrorInstance, target);
    validateAnswer(el, source, target)
})
