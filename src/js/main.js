var dragula = require("dragula");
const inputData = require("./data.js");
const iterator = require("./iterator.js");
const GetArrayOfDraggables = require("./get-array-of-draggables.js")

var InitializedDraggables = GetArrayOfDraggables(iterator(inputData));
// GetArrayOfDraggables triggers the bootstrap of the document
// as it depends on the output of our iterator.
// The iterator parses the data and initially generates/appends the DOM elements
// This may not be the cleanest option but we can refactor in version 2

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

// Now we bind events 
drake.on('drop', function(el, target, source) {
    // We'll first animate the snap-to. 
        // We grab mirror's position
        // We diff it against target's position
        // We apply a translate to el 
        // which then transitions to a 0 translate
        // then we'll wait a second to "check" the answer

    // Check Answer
        // if correct
            // we'll trigger the event unbinder 
            // we'll flash a triumphant style 

        // if incorrect, we'll do a few things to move it back from whence it came 
            // we move the element back to source node
            // we trigger an animation
                // calculate distance between source/target
                // apply an offset to el
                // and then transition to a 0 offset. 
            // We also trigger a flash of a style

    // On correct answer we will unbind like so 
    let droppableInstance = drake.containers.indexOf(target);
    drake.containers.splice(droppableInstance, 1);
    
    let draggableInstance = drake.containers.indexOf(source);
    drake.containers.splice(draggableInstance, 1);

    // Otherwise we need to invoke a reset. 
})

// console.log(sourceContainers, destContainers);
// var drake = dragula([sourceContainers, destContainers])
// console.log(drake.containers);
// Dragula expects to receive an array of the draggable HTMLElements. 
// So what we need to do is take the output of inputData
// and explode each source's child (.source > .source-draggable ) into an array
// as well as exploding each destination's child (.destination > .destination-droppable ) into an array
// and then merging the two arrays before Dragula gets it 










// window.addEventListener( 'touchmove', function() {})


//     var source = Array.from(document.querySelectorAll('.draggable-container'));
//     var dest = Array.from(document.querySelectorAll('.droppable'));
//     var draggables = source.concat(dest);
//     // console.log(source, dest)



// var draggable = dragula({
//     isContainer: function (el) {
//         return el.classList.contains('isdraggable');
//     },
//     accepts: function(el, target, source, sibling) {
//         if (target.classList.contains('draggable-container')) {
//             return false
//         } else if (target.classList.contains('droppable')) {
//             console.log("can drop here")
//             return true
//         }
//         // console.log(el, target, source, sibling)
//     }
// });

// draggable.on('drag', function(el){
//     $(document).on('touchstart', function(e) {
//         e.preventDefault();
//     });
// });

// var mirror; 
// // We put mirror on the global scope so it's accessible later. 

// draggable.on('cloned', function(clone, original, type){
//     mirror = clone;
//     console.log(type, mirror);
// })

// draggable.on('drop', function(el, target, source){
//     // Prevents janky scroll on touch devices 
//     $(document).off('touchstart');

//     var $el = $(el);
//     var cloneZone = $(mirror).offset();
//     var dropZone = $el.offset();
    
//     console.log('clone was at', cloneZone);
//     console.log('dropzone is at', dropZone);

//     var offsetTop = cloneZone.top - dropZone.top;
//     var offsetLeft = cloneZone.left - dropZone.left;

//     console.log(offsetTop, offsetLeft);
    
//     $el.css('transform', 'translate(' + offsetLeft + 'px, ' + offsetTop + 'px)');

//     setTimeout(function($el) {
//         $el.css('transition', 'all 0.1s ease-in');
//         $el.css('transform','translate(0px, 0px)')
//     }, 10, $el);

//     validateAnswer(el, target, source);
// })

// function isAnswerCorrect(target, source) {
//     // console.log(target,source);
//     var a = source.dataset.question;
//     var b = target.dataset.answer;
//     // console.log(a,b);
//     if (a==b) {console.log("yas"); return true} else {console.log("boo"); return false}
// }

// function validateAnswer(el, target, source) {
//     console.log(el,target,source)
//     if ( isAnswerCorrect(target,el) ) {
//         target.classList.remove("isdraggable");
//     } else {
//         target.classList.add("incorrect");
//         source.appendChild(el);
//     }
// }
