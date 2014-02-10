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
                    $private.movePrevItem(opts);
                });
            }

            /* Next */
            for ( var i = 0; i < button.next.length; i++ ) {
                button.next[i].addEventListener('click', function (event) {
                    event.preventDefault();
                    $private.moveNextItem(opts);
                });
            }
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

        $private.movePrevItem = function (opts) {
            console.log('move prev');
        }

        $private.moveNextItem = function (opts) {
            $currentItem++;
            var move = -opts.width * $currentItem + 'px';
            $el.style.left = move;
            console.log('move next', move);
        }

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