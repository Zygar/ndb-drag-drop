// This simply splits the pairings in two and returns them as new arrays.
// It is invoked once per column.

module.exports =  function(pairings, side) {
    let returnedSplit = [];
    for (var i = pairings.length - 1; i >= 0; i--) {
        // console.log(pairings[i]);
        let individualSplit = pairings[i][side];
        if (side == 0) {
            let answer = pairings[i][1].text;
            // console.log(answer);
            individualSplit.answer = answer;
        }
        
        returnedSplit.push(individualSplit)
    }
    console.log(returnedSplit)
    return returnedSplit;
}



