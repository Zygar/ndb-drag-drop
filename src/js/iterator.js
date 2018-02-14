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
    
    // let runningDestinationCount = [];
    let dupedElement = [];
    for (var i = destinations.length - 1; i >= 0; i--) {
        // runningDestinationCount.push(destinations[i].text);
        // console.log(runningDestinationCount);

        let populatedTemplate;
        

        if (destinations[i].dupe == 1) {
            console.log(dupedElement, dupedElement.includes(destinations[i].text));
            if (dupedElement.includes(destinations[i].text)) {
                console.log("it's been done")
            } else {
                populatedTemplate = GenerateDoubleDestinationElement(destinations[i], i);
                dupedElement.push(destinations[i].text);
                console.log(dupedElement)
            }
        } else {
            populatedTemplate = GenerateDestinationElement(destinations[i], i);
        }
        destinationsTemplates.push(populatedTemplate); 
    }
    
    // Append sources and destinations to DOM 

    var sourcesElements = $('.sources').append(ShuffleArray(sourcesTemplates));
    var destinationsElements = $('.destinations').append(destinationsTemplates);
    
    // RETURN a multivariate array of DOM objects: sources and destinations.
    // This will be passed on to Dragula later 
    // console.log([sourcesElements, destinationsElements]);
    return [sourcesElements, destinationsElements]
}

// Template generation in here for now.
const GenerateSourceElement = function (source, index) {
    let ElementTemplate =  `<div class='source'>
                                <div class='source-draggable  isDraggable' id='src-${index}' data-answer="${source.answer}">
                                    <div class="tile">
                                        ${source.image ? 
                                        `<img src='${source.image}'>` 
                                        : ''}
                                        <strong>${source.text} </strong>
                                    </div>
                                </div>
                            </div>`;
    return ElementTemplate;
}

const GenerateDestinationElement = function (dest, index) {
    let ElementTemplate = `<div class='destination'>
                             <div class='destination-droppable  isDraggable' id='dest-${index}'  data-answer="${dest.text}" >
                             </div>
                             <div class="meta">
                             <h2>${dest.text}</h2>
                             ${dest.description ? 
                             `<p>${dest.description}</p>` 
                             : ''}
                             ${dest.image ? 
                             `<img src='${dest.image}'>` 
                             : ''}
                             </div>
                             
                            </div>`;
    return ElementTemplate;
}

const GenerateDoubleDestinationElement = function (dest, indexOne, indexTwo) {
    let ElementTemplate = `<div class='destination'>
                             <div class='destination-droppable  isDraggable' id='dest-${indexOne}'  data-answer="${dest.text}" data-otherAnswer="${indexTwo}">
                             </div>
                             <div class='destination-droppable  isDraggable' id='dest-${indexTwo}'  data-answer="${dest.text}" data-otherAnswer="${indexTwo}">
                             </div>
                             <div class="meta">
                             <h2>${dest.text}</h2>
                             ${dest.description ? 
                             `<p>${dest.description}</p>` 
                             : ''}
                             ${dest.image ? 
                             `<img src='${dest.image}'>` 
                             : ''}
                             </div>
                             
                            </div>`;
    return ElementTemplate;
}

module.exports = GenerateDomElements;
