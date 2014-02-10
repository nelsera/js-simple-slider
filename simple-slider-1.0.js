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
    var $wSize;

    /* -------------------------------------------
        > Slider
    ------------------------------------------- */
    function createSlider (opts) {
        buttons(opts)
        containerSize(opts);
        childsReset(opts);
        responsive(opts);
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
                if ( $targetItem-1 >= 1 ) movePrevItem(opts);
            });
        }

        /* Next */
        for ( var i = 0; i < button.next.length; i++ ) {
            button.next[i].addEventListener('click', function (event) {
                event.preventDefault();
                if ( $targetItem+1 < $childs.length-1 ) moveNextItem(opts);
            });
        }
    }
    function movePrevItem (opts) {
        $currentItem--;
        $targetItem--;
        var position = -opts.width * $currentItem;
        // $el.style.left = move;
        move($el, position, 'right');
    }
    function moveNextItem (opts) {
        $currentItem++;
        $targetItem++;
        var position = -opts.width * $currentItem;
        move($el, position, 'left');
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
            $el.style.margin = 0;
            $el.style.padding = 0;
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

    function responsive(opts) {
        if ( !opts.responsive ) return;
        // images
        var imgs = $el.querySelectorAll('img');
        for (var i = 0; i < imgs.length; i++) {
            imgs[i].style.width = '100%';
            imgs[i].style['max-width'] = opts.width + 'px';
        };
        //

        $w.onresize = function (opts) {
            $wSize = window.innerWidth;

            opts.width = $wSize + 'px';

            $el.style.width = $wSize + 'px';

            for (var i = 0; i < $childs.length; i++) {
                $childs[i].style.height = opts.height + 'px';
                $childs[i].style.width = $wSize + 'px';
            };

        }
    }

    /* -------------------------------------------
        > Animate
    ------------------------------------------- */
    function move(elem, position, direction) {
        var bottom  = 0;
        var right   = 0;
        var top     = 0;


        switch ( direction ) {
            case 'left':
                moveLeft(elem, position);
                break;
            case 'right':
                moveRight(elem, position);
                break;
            default:
                return;
                break;
        }
    }

    function moveLeft(elem, position) {
        var elem = elem;
        var left = elem.style.left.split('px')[0];
        var position = position;

        function moveEl() {
            left-=10;

            elem.style.left = left + 'px';

            if (left === position) clearInterval(id);
        }

        var id = setInterval(moveEl, 2);
    }

    function moveRight(elem, position) {
        var elem = elem;
        var left = elem.style.left.split('px')[0];
        var position = position;

        function moveEl() {
            left = parseInt(left, 10) + 10;

            elem.style.left = left + 'px';

            if (left === position) clearInterval(id);
        }

        var id = setInterval(moveEl, 2);
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
