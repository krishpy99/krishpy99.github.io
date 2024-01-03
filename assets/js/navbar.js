// navbar.js
import {select, scrollto, on} from './helper.js';

/**
 * Navbar links active state on scroll
 */
export const navbarlinksActive = (navbarlinks) => {

    navbarlinks.forEach(navbarlink => {
        if (window.location.hash === navbarlink.hash) {
            navbarlink.classList.add('active');
        } else {
            navbarlink.classList.remove('active');
        }
    });
}

export const updateUrl = () => {
    let position = window.scrollY + 200;
    let navbarlinks = select('#navbar .scrollto', true)
    for (const navbarlink of navbarlinks) {
        if (!navbarlink.hash) continue;

        const section = select(navbarlink.hash);
        if (!section) continue;

        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (position >= sectionTop && position <= sectionBottom) {
            const sectionId = section.id;
            const newUrl = window.location.pathname + window.location.search + `#${sectionId}`;
            history.replaceState({}, document.title, newUrl);
            break; // Once the first matching section is found, exit the loop
        }
    }
    navbarlinksActive(navbarlinks);
};

/**
 * Initialize Navbar
 */
export const initNavbar = () => {
    on('click', '.scrollto', function (e) {
        if (select(this.hash)) {
            let body = select('body');
            if (body.classList.contains('mobile-nav-active')) {
                body.classList.remove('mobile-nav-active');
                let navbarToggle = select('.mobile-nav-toggle');
                navbarToggle.classList.toggle('bi-list');
                navbarToggle.classList.toggle('bi-x');
            }
            window.location.hash = this.hash;
            scrollto(this.hash);
        }
    }, true);
}