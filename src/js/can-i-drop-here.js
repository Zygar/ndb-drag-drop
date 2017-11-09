// Can I drop here?
// Helper function referred to in Dragula's initialization. 
// Checks if the element we're "over" is an acceptable dropzone.

module.exports = function (el, target, source) {
    if (target.classList.contains('destination-droppable')) {
        return true
    } else return false
}

