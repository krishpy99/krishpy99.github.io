import { includeHTML, select, onscroll, scrollto, on, toggleBacktotop, initTypeAnimation, closeMobileNavIfActive } from './helper.js';
import { initNavbar, updateUrl } from './navbar.js';
import { initSkills } from './skills.js';

import { initPortfolio } from './portfolio.js';

(async function () {
    "use strict";

    window.addEventListener('load', () => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        })
    });

    await includeHTML();

    // Attach the scroll event listener
    window.addEventListener('scroll', (e) => {
        e.preventDefault(); updateUrl();
    });

    // Optionally, you might also want to call the function on page load
    window.addEventListener('load', (e) => {e.preventDefault(); updateUrl()});

    //updateUrlOnScroll();

    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
        window.addEventListener('load', () => toggleBacktotop(backtotop))
        onscroll(document, () => toggleBacktotop(backtotop))
    }

    /**
     * change between lines and x in toggle button for mobile view
     */
    on('click', '.mobile-nav-toggle', function (e) {
        select('body').classList.toggle('mobile-nav-active')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })

    /**
     * move to particular section, if mobile view, remove the header
     */
    on('click', '.scrollto', function (e) {
        if (select(this.hash)) {
            e.preventDefault();
            closeMobileNavIfActive(); // Call the helper function
            scrollto(this.hash);
        }
    }, true);

    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });

    initNavbar();
    initTypeAnimation();
    initSkills();
    initPortfolio();

    new PureCounter();
})();