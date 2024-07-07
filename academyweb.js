document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      if (name && email && subject && message) {
          alert('Thank you for your message! We will get back to you shortly.');
          contactForm.reset();
      } else {
          alert('Please fill out all fields before submitting.');
      }
  });
});

document.addEventListener('DOMContentLoaded', function() {
    const logos = document.querySelectorAll('.logo');
    const logoInfo = document.getElementById('logoInfo');
    const logoTitle = document.getElementById('logoTitle');
    const logoDescription = document.getElementById('logoDescription');
    const closeButton = document.getElementById('closeButton');

    const logoDetails = {
        vlLogo: {
            title: "VL",
            description: "VL is a powerful learning management system that helps teachers and students stay connected and organized."
        },
        zoomLogo: {
            title: "Zoom",
            description: "Zoom is a leading video conferencing platform that enables virtual classes and meetings with ease."
        },
        coolsisLogo: {
            title: "Coolsis",
            description: "Coolsis is a comprehensive school information system that allows for tracking academic progress and discipline."
        }
    };

    logos.forEach(logo => {
        logo.addEventListener('click', () => {
            const id = logo.id;
            if (logoDetails[id]) {
                logoTitle.textContent = logoDetails[id].title;
                logoDescription.textContent = logoDetails[id].description;
                logoInfo.classList.remove('hidden');
                logoInfo.classList.add('visible');
            }
        });
    });

    closeButton.addEventListener('click', () => {
        logoInfo.classList.remove('visible');
        logoInfo.classList.add('hidden');
    });
});
