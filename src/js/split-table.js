// This simply splits the pairings in two and returns them as new arrays.
// It is invoked once per column.

module.exports =  function(pairings, side) {
    let returnedSplit = [];
    for (var i = pairings.length - 1; i >= 0; i--) {
        returnedSplit.push(pairings[i][side])
    }
    return returnedSplit;
}



