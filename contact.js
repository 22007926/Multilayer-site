document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const contactFormStatus = document.getElementById('contactFormStatus');

  if (contactForm) {
      contactForm.addEventListener('submit', async (event) => {
          event.preventDefault(); // Prevent default form submission

          contactFormStatus.textContent = 'Sending message...';
          contactFormStatus.style.color = 'orange';

          const formData = new FormData(contactForm);
          const data = Object.fromEntries(formData.entries());

          try {
              const response = await fetch('php/submit_contact.php', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(data)
              });

              const result = await response.json();

              if (result.success) {
                  contactFormStatus.textContent = 'Message sent successfully!';
                  contactFormStatus.style.color = 'green';
                  contactForm.reset(); // Clear the form
              } else {
                  contactFormStatus.textContent = 'Failed to send message: ' + (result.message || 'Unknown error.');
                  contactFormStatus.style.color = 'red';
              }
          } catch (error) {
              console.error('Error submitting contact form:', error);
              contactFormStatus.textContent = 'An error occurred. Please try again.';
              contactFormStatus.style.color = 'red';
          }
      });
  }
});