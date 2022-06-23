/*!
* Start Bootstrap - Freelancer v7.0.6 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 


window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 72,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

function showLoader(){
            document.getElementById("loader").style.display = "block";
          }

function hideLoder(){
  document.getElementById("loader").style.display = "none";
}

function copyExample(){
  document.getElementById('dropdown').value = document.getElementById('prompt').value;
}

document.getElementById('dropdown').addEventListener('click', function(event){
  event.preventDefault();
});
const btn_new = document.querySelector(".toggle-btn-new");
// Select the stylesheet <link>
const theme_new = document.querySelector("#theme-link");

// Listen for a click on the button
function modechange(){
  // If the current URL contains "styles.css"
  if (theme_new.getAttribute("href") == "{{ url_for('static', filename='/css/styles.css')}}") {
    // ... then switch it to "dark-theme.css"
    theme_new.href = "{{ url_for('static', filename='/css/dark-mode.css')}}";
  // Otherwise...
  } else {
    // ... switch it to "light-theme.css"
    theme_new.href = "{{ url_for('static', filename='/css/styles.css')}}";
  }
});


