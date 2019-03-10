jQuery(function( $ ){
    /**
     * Demo binding and preparation, no need to read this part
     */
    //borrowed from jQuery easing plugin
    //http://gsgd.co.uk/sandbox/jquery.easing.php
    $.easing.elasout = function(x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    };
    $('a.back').click(function() {
        $(this).parents('div.pane').scrollTo(0, 800, { queue:true });
        $(this).parents('div.section').find('span.message').text( this.title);
        return false;
    });
    //just for the example, to stop the click on the links.
    $('ul.links').click(function(e){
        var link = e.target;
        if (link.target === '_blank') {
            return;
        }
        e.preventDefault();
        link.blur();
        if (link.title) {
            $(this).parent().find('span.message').text(link.title);
        }
    });

    // This one is important, many browsers don't reset scroll on refreshes
    // Reset all scrollable panes to (0,0)
    $('div.pane').scrollTo(0);
    // Reset the screen to (0,0)
    $.scrollTo(0);

    // TOC, shows how to scroll the whole window
    $('#toc a').click(function() {//$.scrollTo works EXACTLY the same way, but scrolls the whole screen
        $.scrollTo(this.hash, 1500, { easing:'elasout' });
        $(this.hash).find('span.message').text(this.title);
        return false;
    });

    // Target examples bindings
    var $target = $('#pane-target');
    $('#target-examples a').click(function() {
        $target.stop(true);
    });

    $('#relative-selector').click(function() {
        $target.scrollTo('li:eq(7)', 800);
    });
    $('#jquery-object').click(function() {
        $target.scrollTo($('#pane-target li:eq(14)') , 800);
    });
    $('#dom-element').click(function() {
        $target.scrollTo(document.getElementById('twenty'), 800);
    });

});