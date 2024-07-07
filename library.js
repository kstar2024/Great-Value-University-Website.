document.addEventListener('DOMContentLoaded', function() {
  // Function to handle catalog search
  document.querySelector('form[action="/search"]').addEventListener('submit', function(event) {
      event.preventDefault();
      const query = event.target.query.value;
      if (query) {
          alert(`Searching for: ${query}`);
          // Implement actual search functionality here
      } else {
          alert('Please enter a search term.');
      }
  });

  // Function to handle contact form submission (if applicable)
  const contactForm = document.querySelector('form#contact-form');
  if (contactForm) {
      contactForm.addEventListener('submit', function(event) {
          event.preventDefault();
          const name = event.target.name.value;
          const email = event.target.email.value;
          const message = event.target.message.value;
          
          if (name && email && message) {
              alert(`Thank you, ${name}. Your message has been sent.`);
              // Implement actual form submission here (e.g., via AJAX)
              contactForm.reset();
          } else {
              alert('Please fill out all fields.');
          }
      });
  }
});
