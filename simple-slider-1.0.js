var simpleSlider;

(function () {
/* 
    Main instance
   ========================================================================== */
   simpleSlider = function (element, options) {
       return new SimpleSlider(element, options);
   }

   function SimpleSlider (element, options) {
    /* 
        Scope namespaces
       ========================================================================== */
        var $private = {};
        var $public = this.constructor.prototype;


    /* 
        Defaults
       ========================================================================== */
        var $el = document.querySelectorAll(element);
        if ($el.length <= 0) return;

        var $childs, $targetItem, $currentItem;
        

    /* 
        Assets
       ========================================================================== */
        var $w = window;


    /* 
        Slider
       ========================================================================== */
        $public.createSlider = function (opts) {
            $private.buttons(opts);
            $private.containerSize(opts);
            $private.childsReset(opts);
            $private.responsive(opts);
        }

        $private.buttons = function (opts) {
            var button = {
                prev: document.querySelectorAll(opts.prev),
                next: document.querySelectorAll(opts.next)
            }

            /* Prev */
            for ( var i = 0; i < button.prev.length; i++ ) {
                button.prev[i].addEventListener('click', function (event) {
                    event.preventDefault();
                    if ( $targetItem-1 >= 1 ) $private.movePrevItem(opts);
                });
            }

            /* Next */
            for ( var i = 0; i < button.next.length; i++ ) {
                button.next[i].addEventListener('click', function (event) {
                    event.preventDefault();
                    if ( $targetItem+1 < $childs.length-1 ) $private.moveNextItem(opts);
                });
            }
        }

        $private.movePrevItem = function (opts) {
            $currentItem--;
            $targetItem--;
            var position = -opts.width * $currentItem;
            // $el.style.left = move;
            $public.move($el, position, 'right');
        }

        $private.moveNextItem = function (opts) {
            $currentItem++;
            $targetItem++;
            var position = -opts.width * $currentItem;
            $public.move($el, position, 'left');
        }

        $private.containerSize = function (opts) {
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

        $private.childsReset = function (opts) {
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

        $private.responsive = function (opts) {
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


    /* 
        Animation
       ========================================================================== */
        $public.move = function (elem, position, direction) {
            var bottom  = 0;
            var right   = 0;
            var top     = 0;


            switch ( direction ) {
                case 'left':
                    $private.moveLeft(elem, position);
                    break;
                case 'right':
                    $private.moveRight(elem, position);
                    break;
                default:
                    return;
                    break;
            }
        }

        $private.moveLeft = function (elem, position) {
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

        $private.moveRight = function (elem, position) {
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


    /* 
        Init
       ========================================================================== */
        $public.init = function ($el) {
            $w.el = $el;

            switch ( options.fx ) {
                case 'slide' :
                    $public.createSlider(options);
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

        return this;
    }

/* 
    Allow extend methods
   ========================================================================== */
    simpleSlider.fn = SimpleSlider.prototype = {}

}());