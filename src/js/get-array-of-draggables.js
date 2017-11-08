module.exports = function (ourArray) {
    let FlattenedArray = [];

    // Top level iterator, runs twice
    // Iterating over [[sources], [destinations]]

    for (var i = ourArray.length - 1; i >= 0; i--) {
       // Call jQuery to grab all the draggables
       let $draggableItems = ourArray[i].find(".isDraggable"); 
       $.each($draggableItems, function(index, value) {
           // Then we push them into the items array
           FlattenedArray.push(value);
       });
    }
    return FlattenedArray
}
