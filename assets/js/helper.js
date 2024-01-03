// helper.js

/**
 * Easy selector helper function
 */
export const select = (el, all = false) => {
    el = el.trim();
    if (all) {
        return [...document.querySelectorAll(el)];
    } else {
        return document.querySelector(el);
    }
};

/**
 * Easy event listener function
 */
export const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
        if (all) {
            selectEl.forEach(e => e.addEventListener(type, listener));
        } else {
            selectEl.addEventListener(type, listener);
        }
    }
}

/**
 * Easy on scroll event listener 
 */
export const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
}

/**
 * Include HTML content dynamically
 */
export const includeHTML = async () => {
    var includes, i, element, file;
    includes = document.querySelectorAll('[data-include]');
    for (i = 0; i < includes.length; i++) {
        element = includes[i];
        file = element.getAttribute('data-include');
        if (file) {
            await fetch(file)
                .then(response => response.text())
                .then(data => {
                    element.innerHTML = data;
                });
        }
    }
}

/**
 * Scrolls to an element with header offset
 */
export const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
        top: elementPos,
        behavior: 'smooth'
    })
}

export const toggleBacktotop = (backtotop) => {
    if (window.scrollY > 100) {
        backtotop.classList.add('active')
    } else {
        backtotop.classList.remove('active')
    }
}

export const initTypeAnimation = () => {
    const typed = select('.typed')
    if (typed) {
        let typed_strings = typed.getAttribute('data-typed-items')
        typed_strings = typed_strings.split(',')
        new Typed('.typed', {
            strings: typed_strings,
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000
        });
    }
}

export const closeMobileNavIfActive = () => {
    const body = select('body');
    if (body.classList.contains('mobile-nav-active')) {
      body.classList.remove('mobile-nav-active');
      const navbarToggle = select('.mobile-nav-toggle');
      navbarToggle.classList.toggle('bi-list');
      navbarToggle.classList.toggle('bi-x');
    }
};

const validateForm = (name, email, subject, message) => {
    console.log("validating")
    // Simple checks for required fields
    if (!name || !email || !subject || !message) {
      alert('Please fill in all required fields.');
      return false;
    }

    // Check email format
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }

    // Check minimum length for the message
    if (message.length < 10) {
      alert('Please enter a message with at least 10 characters.');
      return false;
    }

    return true;
}

export const sendEmail = () => {
    console.log("sending request")
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;
    if(!validateForm(name, email, subject, message)) return;
    console.log("successful validation")
    text = ```
            Name: ${name}, 
            Sender Email: ${email},
            Message: ${message}
            ```;

    fetch('https://127.0.0.1:3000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subject, text }),
    })
    .then(data => {
      alert(data.message);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to send email.');
    });
  }