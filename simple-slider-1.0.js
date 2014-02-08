var simpleSlider = function (element, options) {

    /* -------------------------------------------
        > Defaults
    ------------------------------------------- */
    var $el = document.querySelectorAll(element);
    //
    if ( $el.length <= 0 ) return;
    //
    var $childs, $targetItem, $currentItem;

    /* -------------------------------------------
        >
    ------------------------------------------- */
    var $w = window;

    /* -------------------------------------------
        > Slider
    ------------------------------------------- */
    function createSlider (opts) {
        buttons(opts)
        containerSize(opts);
        childsReset(opts);
    }

    function buttons(opts) {
        var button = {
            prev: document.querySelectorAll(opts.prev),
            next: document.querySelectorAll(opts.next)
        }

        /* Prev */
        for ( var i = 0; i < button.prev.length; i++ ) {
            button.prev[i].addEventListener('click', function (event) {
                event.preventDefault();
                movePrevItem(opts);
            });
        }

        /* Next */
        for ( var i = 0; i < button.next.length; i++ ) {
            button.next[i].addEventListener('click', function (event) {
                event.preventDefault();
                moveNextItem(opts);
            });
        }
    }

    function containerSize(opts) {
        var container = $el.parentNode;
            container.className = 'slider-container';
            // Styles
            if ( !!opts.center ) {
                container.style.marginLeft  = 'auto';
                container.style.marginRight = 'auto';
            }
            container.style.height  = opts.height+'px';
            container.style.overflow= 'hidden';
            container.style.position= 'relative';
            container.style.width   = opts.width+'px';
            // EL
            $el.style.width = $childs.length * opts.width + 'px';
            $el.style.position = 'absolute';
            $el.style.left = $targetItem + 'px';
            $el.style.position = 0;
    }

    function childsReset(opts) {
        for (var i = 0; i < $childs.length; i++) {
            $childs[i].style.float = 'left';
            $childs[i].style.position = 'relative';
            $childs[i].style.height = opts.height + 'px';
            $childs[i].style.width = opts.width + 'px';

            if ( i === 0 ) {
                $childs[i].className += ' first active-slide-item';
            }
        };
    }

    function movePrevItem (opts) {
        console.log('move prev');
    }
    function moveNextItem (opts) {
        $currentItem++;
        var move = -opts.width * $currentItem + 'px';
        $el.style.left = move;
        console.log('move next', move);
    }



    /* -------------------------------------------
        > Init
    ------------------------------------------- */
    this.init = function ($el) {
        $w.el = $el;

        switch ( options.fx ) {
            case 'slide' :
                createSlider(options);
                break;
            default:
                return;
                break;
        }
    }

    for ( var i = 0; i < $el.length; i++ ) {
        $el = $el[0];
        // Primary definitions
        $childs = $el.children;
        $targetItem = options.first ? options.first : 0;
        $currentItem = $targetItem;
        //
        this.init($el);
    }
};
