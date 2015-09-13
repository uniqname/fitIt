//Forwardfill element.matches if it has a vendor prefixed version.
if (!HTMLElement.prototype.matches) {
    ['msMatchesSelector', 'webkitMatchesSelector', 'mozMatchesSelector'].filter(method => !!HTMLElement.prototype[method]).map(vendorMatches => HTMLElement.prototype.matches = HTMLElement.prototype[vendorMatches])
}

const fitSelectors = [],

    // We create a single observer that will check against a list
    // of selectors whenever nodes are added.
    observer = new MutationObserver(
        mutations => mutations.map(
            mutation => [...mutation.addedNodes].map(
                node => fitSelectors.map(
                    //`node` may be a text node which does not have `matches`.
                    selector => node.matches && node.matches(selector) && initVid(node)
                )
            )
        )
    ),

    resize = (vid) => {
        const ratio = parseFloat(vid.dataset.ratio, 10),
              width = parseInt(window.getComputedStyle(vid).width, 10);

        vid.style.height = `${(width/ratio)}px`;
    },

    initVid = (vid) => {
        if (vid.dataset.ratio === undefined) {
            (() => {
                let styles = window.getComputedStyle(vid),
                    width = parseInt((vid.getAttribute('width') || styles.width), 10),
                    height = parseInt((vid.getAttribute('height') || styles.height), 10),
                    ratio = width/height;

                ratio = (Number.isFinite(ratio) || ratio !== 0) ? ratio : NaN;
                Object.defineProperty(vid.dataset, 'ratio', {
                    get() {
                        if (Number.isNaN(ratio)) {
                            let styles = window.getComputedStyle(vid);
                            ratio = parseInt(styles.width, 10)/parseInt(styles.height, 10);
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

    onReady = (cb) => {
        const isReady = () => ['interactive', 'complete', 'loaded'].some(state => state === document.readyState);

        if (isReady()) {cb();}
        else {
            document.addEventListener('readystatechange', function RSC() {
                if (isReady()) {
                    document.removeEventListener('readystatechange', RSC);
                    cb();
                }
            });
        }
    },

    debounce = (func, wait) => {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    },

    fitIt = (selector) => {
        let fitThem = () => [...document.querySelectorAll(selector)].map(initVid),
            debounced = debounce(fitThem, 100);

        fitSelectors.push(selector);
        onReady(fitThem);
        window.addEventListener('resize', debounced);
    }

observer.observe(document.documentElement, {subtree: true, childList: true});

window.fitIt = fitIt;

export { fitIt as default }
