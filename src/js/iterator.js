const SplitTable = require("./split-table.js");
const ShuffleArray = require("./shuffle-array.js");

// FIRST! We iterate over each pairing. 
// This is an array of two objects
// Looking like this [{text, url}, {text, url}]

const GenerateDomElements = function(pairings) {
    let sources = SplitTable(pairings, 0), 
        destinations = SplitTable(pairings, 1),
        sourcesTemplates = [],
        destinationsTemplates = [];

    for (var i = sources.length - 1; i >= 0; i--) {
        let populatedTemplate = GenerateSourceElement(sources[i], i);
        sourcesTemplates.push(populatedTemplate); 
    };
    
    for (var i = destinations.length - 1; i >= 0; i--) {
        let populatedTemplate = GenerateDestinationElement(destinations[i], i);
        destinationsTemplates.push(populatedTemplate); 
    }
    
    // Append sources and destinations to DOM 

    var sourcesElements = $('.sources').append(ShuffleArray(sourcesTemplates));
    var destinationsElements = $('.destinations').append(ShuffleArray(destinationsTemplates));
    
    // RETURN a multivariate array of DOM objects: sources and destinations.
    // This will be passed on to Dragula later 
    // console.log([sourcesElements, destinationsElements]);
    return [sourcesElements, destinationsElements]
}

// Template generation in here for now.
const GenerateSourceElement = function (source, index) {
    let ElementTemplate =  `<div class='source'>
                                <div class='source-draggable  isDraggable' id='src-${index}' data-answer=${index}>
                                    <strong>${source.text} </strong>
                                </div>
                            </div>`;
    return ElementTemplate;
}

const GenerateDestinationElement = function (dest, index) {
    let ElementTemplate = `<div class='destination'>
                             <h2>${dest.text}</h2>
                             <div class='destination-droppable  isDraggable' id='dest-${index}'  data-answer=${index}>
                             </div>
                            </div>`;
    return ElementTemplate;
}

module.exports = GenerateDomElements;
