module.exports = {
    onPlace: function(el, mirror, dropzone) {
        console.log(el,mirror,dropzone);
        let $el = $(el),
            $mirror = $(mirror),
            $dropzone = $(dropzone);

        let mirrorPos = $mirror.offset(),
            dropzonePos = $dropzone.offset();

        let diffTop = mirrorPos.top - dropzonePos.top,
            diffLeft = mirrorPos.left - dropzonePos.left;

        $el.css('position', 'relative');
        $el.css('top', diffTop +'px');
        $el.css('left', diffLeft +'px');

        // $el.css('transform', 'translate(' + diffLeft + 'px, ' + diffTop + 'px)');
        // BEWARE the race condition
        setTimeout(function($el) {
            console.log("onplace firing")
            $el.css('transition', 'all 0.1s ease-in');
            $el.css('top','0')
            $el.css('left','0')
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
        $el.css('position', 'relative');
        $el.css('top', diffTop +'px');
        $el.css('left', diffLeft +'px');

        // BEWARE the race condition
        setTimeout(function($el) {
            console.log("wronganswer firing")
            $el.css('transition', 'all 0.1s ease-in');
            $el.css('top', '0');
            $el.css('left', '0');
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
        $el.css('position', 'relative');
        $el.css('top', diffTop +'px');
        $el.css('left', diffLeft +'px');

        setTimeout(function($el) {
            $el.css('transition', 'all 0.1s ease-in');
            $el.css('transform','translate(0px, 0px)')
            $el.css('top', '0');
            $el.css('left', '0');
        }, 10, $el);
    }
}
