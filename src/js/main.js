var dragula = require("dragula");
window.addEventListener( 'touchmove', function() {})



    var source = Array.from(document.querySelectorAll('.draggable-container'));
    var dest = Array.from(document.querySelectorAll('.droppable'));
    var draggables = source.concat(dest);
    // console.log(source, dest)



var draggable = dragula({
    isContainer: function (el) {
        return el.classList.contains('isdraggable');
    },
    accepts: function(el, target, source, sibling) {
        if (target.classList.contains('draggable-container')) {
            return false
        } else if (target.classList.contains('droppable')) {
            console.log("can drop here")
            return true
        }
        // console.log(el, target, source, sibling)
    }
});

draggable.on('drag', function(el){
    $(document).on('touchstart', function(e) {
        e.preventDefault();
    });
});

var mirror; 
// We put mirror on the global scope so it's accessible later. 

draggable.on('cloned', function(clone, original, type){
    mirror = clone;
    console.log(type, mirror);
})

draggable.on('drop', function(el, target, source){
    // Prevents janky scroll on touch devices 
    $(document).off('touchstart');

    var $el = $(el);
    var cloneZone = $(mirror).offset();
    var dropZone = $el.offset();
    
    console.log('clone was at', cloneZone);
    console.log('dropzone is at', dropZone);

    var offsetTop = cloneZone.top - dropZone.top;
    var offsetLeft = cloneZone.left - dropZone.left;

    console.log(offsetTop, offsetLeft);
    
    $el.css('transform', 'translate(' + offsetLeft + 'px, ' + offsetTop + 'px)');

    setTimeout(function($el) {
        $el.css('transition', 'all 0.5s ease-in-out');
        $el.css('transform','translate(0px, 0px)')
    }, 250, $el);

    validateAnswer(el, target, source);
})

function isAnswerCorrect(target, source) {
    // console.log(target,source);
    var a = source.dataset.question;
    var b = target.dataset.answer;
    // console.log(a,b);
    if (a==b) {console.log("yas"); return true} else {console.log("boo"); return false}
}

function validateAnswer(el, target, source) {
    if ( isAnswerCorrect(target,source) ) {
        target.classList.remove("isdraggable");
    } else {
        target.classList.add("incorrect");
        source.appendChild(el);
    }
}
