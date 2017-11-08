var draggable = require('webpack-jquery-ui/draggable');
var droppable = require('webpack-jquery-ui/droppable');
var touchpunch = require('jquery-ui-touch-punch');


// var sources = document.querySelector('.draggable');
// var destinations = document.querySelector('.droppable');

// console.log(sources,destinations)
// dragula([sources,destinations])

var $sources = $(".draggable");
var $destinations = $(".droppable");
$sources.draggable({
    // revert:true,
    snap: '.droppable'

});
$destinations.droppable({
    accept: ".draggable",
    hoverClass: "drop-hover"
})


