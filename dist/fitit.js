(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//Forwardfill element.matches if it has a vendor prefixed version.
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

if (!HTMLElement.prototype.matches) {
    ['msMatchesSelector', 'webkitMatchesSelector', 'mozMatchesSelector'].filter(function (method) {
        return !!HTMLElement.prototype[method];
    }).map(function (vendorMatches) {
        return HTMLElement.prototype.matches = HTMLElement.prototype[vendorMatches];
    });
}

var fitSelectors = [],

// We create a single observer that will check against a list
// of selectors whenever nodes are added.
observer = new MutationObserver(function (mutations) {
    return mutations.map(function (mutation) {
        return [].concat(_toConsumableArray(mutation.addedNodes)).map(function (node) {
            return fitSelectors.map(
            //`node` may be a text node which does not have `matches`.
            function (selector) {
                return node.matches && node.matches(selector) && initVid(node);
            });
        });
    });
}),
    resize = function resize(vid) {
    var ratio = parseFloat(vid.dataset.ratio, 10),
        width = parseInt(window.getComputedStyle(vid).width, 10);

    vid.style.height = width / ratio + 'px';
},
    initVid = function initVid(vid) {
    if (vid.dataset.ratio === undefined) {
        (function () {
            var styles = window.getComputedStyle(vid),
                width = parseInt(vid.getAttribute('width') || styles.width, 10),
                height = parseInt(vid.getAttribute('height') || styles.height, 10),
                ratio = width / height;

            ratio = Number.isFinite(ratio) || ratio !== 0 ? ratio : NaN;
            Object.defineProperty(vid.dataset, 'ratio', {
                get: function get() {
                    if (Number.isNaN(ratio)) {
                        var _styles = window.getComputedStyle(vid);
                        ratio = parseInt(_styles.width, 10) / parseInt(_styles.height, 10);
                    }
                    return ratio;
                }
            });
        })();
    }

    vid.style.width = '100%';
    vid.style.transition = 'height .1s ease';
    vid.removeAttribute('width');
    vid.removeAttribute('height');
    resize(vid);
},
    onReady = function onReady(cb) {
    var isReady = function isReady() {
        return ['interactive', 'complete', 'loaded'].some(function (state) {
            return state === document.readyState;
        });
    };

    if (isReady()) {
        cb();
    } else {
        document.addEventListener('readystatechange', function RSC() {
            if (isReady()) {
                document.removeEventListener('readystatechange', RSC);
                cb();
            }
        });
    }
},
    debounce = function debounce(func, wait) {
    var timeout = undefined;
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        clearTimeout(timeout);
        timeout = setTimeout(function () {
            return func.apply(undefined, args);
        }, wait);
    };
},
    fitIt = function fitIt(selector) {
    var fitThem = function fitThem() {
        return [].concat(_toConsumableArray(document.querySelectorAll(selector))).map(initVid);
    },
        debounced = debounce(fitThem, 100);

    fitSelectors.push(selector);
    onReady(fitThem);
    window.addEventListener('resize', debounced);
};

observer.observe(document.documentElement, { subtree: true, childList: true });

window.fitIt = fitIt;

exports['default'] = fitIt;
module.exports = exports['default'];

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvY29yeWJyb3duL2NvZGUvZml0SXQvZml0aXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUNDQSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7QUFDaEMsS0FBQyxtQkFBbUIsRUFBRSx1QkFBdUIsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE1BQU07ZUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7S0FBQSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsYUFBYTtlQUFJLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO0tBQUEsQ0FBQyxDQUFBO0NBQ3BOOztBQUVELElBQU0sWUFBWSxHQUFHLEVBQUU7Ozs7QUFJbkIsUUFBUSxHQUFHLElBQUksZ0JBQWdCLENBQzNCLFVBQUEsU0FBUztXQUFJLFNBQVMsQ0FBQyxHQUFHLENBQ3RCLFVBQUEsUUFBUTtlQUFJLDZCQUFJLFFBQVEsQ0FBQyxVQUFVLEdBQUUsR0FBRyxDQUNwQyxVQUFBLElBQUk7bUJBQUksWUFBWSxDQUFDLEdBQUc7O0FBRXBCLHNCQUFBLFFBQVE7dUJBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUM7YUFBQSxDQUN0RTtTQUFBLENBQ0o7S0FBQSxDQUNKO0NBQUEsQ0FDSjtJQUVELE1BQU0sR0FBRyxTQUFULE1BQU0sQ0FBSSxHQUFHLEVBQUs7QUFDZCxRQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO1FBQ3pDLEtBQUssR0FBRyxRQUFR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QkFBTSxJQUFJLGtCQUFJLElBQUksQ0FBQztTQUFBLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDbkQsQ0FBQztDQUNMO0lBRUQsS0FBSyxHQUFHLFNBQVIsS0FBSyxDQUFJLFFBQVEsRUFBSztBQUNsQixRQUFJLE9BQU8sR0FBRyxTQUFWLE9BQU87ZUFBUyw2QkFBSSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEdBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQztLQUFBO1FBQ3JFLFNBQVMsR0FBRyxRQUFRLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDOztBQUV2QyxnQkFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM1QixXQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDakIsVUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztDQUNoRCxDQUFBOztBQUVMLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7O0FBRTdFLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDOztxQkFFWixLQUFLIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vRm9yd2FyZGZpbGwgZWxlbWVudC5tYXRjaGVzIGlmIGl0IGhhcyBhIHZlbmRvciBwcmVmaXhlZCB2ZXJzaW9uLlxuaWYgKCFIVE1MRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcykge1xuICAgIFsnbXNNYXRjaGVzU2VsZWN0b3InLCAnd2Via2l0TWF0Y2hlc1NlbGVjdG9yJywgJ21vek1hdGNoZXNTZWxlY3RvciddLmZpbHRlcihtZXRob2QgPT4gISFIVE1MRWxlbWVudC5wcm90b3R5cGVbbWV0aG9kXSkubWFwKHZlbmRvck1hdGNoZXMgPT4gSFRNTEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgPSBIVE1MRWxlbWVudC5wcm90b3R5cGVbdmVuZG9yTWF0Y2hlc10pXG59XG5cbmNvbnN0IGZpdFNlbGVjdG9ycyA9IFtdLFxuXG4gICAgLy8gV2UgY3JlYXRlIGEgc2luZ2xlIG9ic2VydmVyIHRoYXQgd2lsbCBjaGVjayBhZ2FpbnN0IGEgbGlzdFxuICAgIC8vIG9mIHNlbGVjdG9ycyB3aGVuZXZlciBub2RlcyBhcmUgYWRkZWQuXG4gICAgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihcbiAgICAgICAgbXV0YXRpb25zID0+IG11dGF0aW9ucy5tYXAoXG4gICAgICAgICAgICBtdXRhdGlvbiA9PiBbLi4ubXV0YXRpb24uYWRkZWROb2Rlc10ubWFwKFxuICAgICAgICAgICAgICAgIG5vZGUgPT4gZml0U2VsZWN0b3JzLm1hcChcbiAgICAgICAgICAgICAgICAgICAgLy9gbm9kZWAgbWF5IGJlIGEgdGV4dCBub2RlIHdoaWNoIGRvZXMgbm90IGhhdmUgYG1hdGNoZXNgLlxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvciA9PiBub2RlLm1hdGNoZXMgJiYgbm9kZS5tYXRjaGVzKHNlbGVjdG9yKSAmJiBpbml0VmlkKG5vZGUpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICApXG4gICAgKSxcblxuICAgIHJlc2l6ZSA9ICh2aWQpID0+IHtcbiAgICAgICAgY29uc3QgcmF0aW8gPSBwYXJzZUZsb2F0KHZpZC5kYXRhc2V0LnJhdGlvLCAxMCksXG4gICAgICAgICAgICAgIHdpZHRoID0gcGFyc2VJbnQod2luZG93LmdldENvbXB1dGVkU3R5bGUodmlkKS53aWR0aCwgMTApO1xuXG4gICAgICAgIHZpZC5zdHlsZS5oZWlnaHQgPSBgJHsod2lkdGgvcmF0aW8pfXB4YDtcbiAgICB9LFxuXG4gICAgaW5pdFZpZCA9ICh2aWQpID0+IHtcbiAgICAgICAgaWYgKHZpZC5kYXRhc2V0LnJhdGlvID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHZpZCksXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoID0gcGFyc2VJbnQoKHZpZC5nZXRBdHRyaWJ1dGUoJ3dpZHRoJykgfHwgc3R5bGVzLndpZHRoKSwgMTApLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSBwYXJzZUludCgodmlkLmdldEF0dHJpYnV0ZSgnaGVpZ2h0JykgfHwgc3R5bGVzLmhlaWdodCksIDEwKSxcbiAgICAgICAgICAgICAgICAgICAgcmF0aW8gPSB3aWR0aC9oZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICByYXRpbyA9IChOdW1iZXIuaXNGaW5pdGUocmF0aW8pIHx8IHJhdGlvICE9PSAwKSA/IHJhdGlvIDogTmFOO1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh2aWQuZGF0YXNldCwgJ3JhdGlvJywge1xuICAgICAgICAgICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKHJhdGlvKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh2aWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhdGlvID0gcGFyc2VJbnQoc3R5bGVzLndpZHRoLCAxMCkvcGFyc2VJbnQoc3R5bGVzLmhlaWdodCwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJhdGlvO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmlkLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgICAgICB2aWQuc3R5bGUudHJhbnNpdGlvbiA9ICdoZWlnaHQgLjFzIGVhc2UnO1xuICAgICAgICB2aWQucmVtb3ZlQXR0cmlidXRlKCd3aWR0aCcpO1xuICAgICAgICB2aWQucmVtb3ZlQXR0cmlidXRlKCdoZWlnaHQnKTtcbiAgICAgICAgcmVzaXplKHZpZCk7XG4gICAgfSxcblxuICAgIG9uUmVhZHkgPSAoY2IpID0+IHtcbiAgICAgICAgY29uc3QgaXNSZWFkeSA9ICgpID0+IFsnaW50ZXJhY3RpdmUnLCAnY29tcGxldGUnLCAnbG9hZGVkJ10uc29tZShzdGF0ZSA9PiBzdGF0ZSA9PT0gZG9jdW1lbnQucmVhZHlTdGF0ZSk7XG5cbiAgICAgICAgaWYgKGlzUmVhZHkoKSkge2NiKCk7fVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3JlYWR5c3RhdGVjaGFuZ2UnLCBmdW5jdGlvbiBSU0MoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzUmVhZHkoKSkge1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdyZWFkeXN0YXRlY2hhbmdlJywgUlNDKTtcbiAgICAgICAgICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBkZWJvdW5jZSA9IChmdW5jLCB3YWl0KSA9PiB7XG4gICAgICAgIGxldCB0aW1lb3V0O1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IGZ1bmMoLi4uYXJncyksIHdhaXQpO1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBmaXRJdCA9IChzZWxlY3RvcikgPT4ge1xuICAgICAgICBsZXQgZml0VGhlbSA9ICgpID0+IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKV0ubWFwKGluaXRWaWQpLFxuICAgICAgICAgICAgZGVib3VuY2VkID0gZGVib3VuY2UoZml0VGhlbSwgMTAwKTtcblxuICAgICAgICBmaXRTZWxlY3RvcnMucHVzaChzZWxlY3Rvcik7XG4gICAgICAgIG9uUmVhZHkoZml0VGhlbSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBkZWJvdW5jZWQpO1xuICAgIH1cblxub2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHtzdWJ0cmVlOiB0cnVlLCBjaGlsZExpc3Q6IHRydWV9KTtcblxud2luZG93LmZpdEl0ID0gZml0SXQ7XG5cbmV4cG9ydCB7IGZpdEl0IGFzIGRlZmF1bHQgfVxuIl19
