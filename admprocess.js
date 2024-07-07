// script.js

document.addEventListener("DOMContentLoaded", () => {
  // Alert when "Apply for Admission" link is clicked
  const applyLink = document.querySelector('.apply-box ul li a');
  applyLink.addEventListener('click', (event) => {
      event.preventDefault();
      alert('Apply for Admission link clicked!');
  });

  // Change the background color of the header on scroll
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          header.style.backgroundColor = '#333';
      } else {
          header.style.backgroundColor = 'transparent';
      }
  });

  // Highlight the currently active navigation link
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(link => {
      link.addEventListener('click', () => {
          navLinks.forEach(nav => nav.classList.remove('active'));
          link.classList.add('active');
      });
  });

  // Email link should open email client
  const emailLink = document.querySelector('.contact a[href^="mailto:"]');
  emailLink.addEventListener('click', (event) => {
      window.location.href = emailLink.href;
  });
});
