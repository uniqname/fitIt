/*******
Usage: fitIt(<selector>)
       fitIt('[src*="youtube.com"]');

       All elements that match the selector will be made responsive and full width with it's container -- including any asynchronously loaded nodes.
********/

(function () {
    'use strict';
    var matches = function (el, selector) {
            var matchesMethod = ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector'].filter(function (method) {
                return !!el[method];
            })[0];
      
            if (matchesMethod) {
              return el[matchesMethod](selector);
            }
        },
        resize = function (vid) {
            var ratio = parseFloat(vid.dataset.ratio, 10),
                width = parseInt(window.getComputedStyle(vid).width, 10);

            vid.style.height = (width/ratio) + 'px';
        },
        initVid = function (vid) {
            var styles = window.getComputedStyle(vid),
                width = parseInt(styles.width, 10),
                height = parseInt(styles.height, 10),
                ratio = width/height;

            vid.onload = function () { console.log('vid loaded', vid);};
            vid.dataset.ratio = ratio;
            vid.style.width = '100%';
            vid.removeAttribute('width');
            vid.removeAttribute('height');
            resize(vid);
        },
        fitIt = function (selector, root) {
            var observer,
                ready = false;
            root = root || document.documentElement;
            if (document.readyState === 'complete' || document.readyState === 'loaded') {
                [].slice.call(document.querySelectorAll(selector)).forEach(initVid);
            } else {
                document.addEventListener('readystatechange', function () {
                  if (document.readyState === 'complete' || document.readyState === 'loaded') {
                    [].slice.call(document.querySelectorAll(selector)).forEach(initVid);
                  }
                });
            }

            window.addEventListener('resize', function () {
                //This should be more optimized.
                [].slice.call(document.querySelectorAll(selector)).forEach(resize);
            });
          
            observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.addedNodes.length) {
                        [].slice.call(mutation.addedNodes).forEach(function (node) {
                            if (matches(node, selector)) {
                                initVid(node);
                            }
                        });
                    }
                });
            });

            observer.observe(root, {subtree: true, childList: true});
        };
  
    window.fitIt = fitIt;
})();