document.addEventListener('DOMContentLoaded', () => {
  const questionInput = document.getElementById('questionInput');
  const submitQuestionBtn = document.getElementById('submitQuestionBtn');
  const qnaListDiv = document.getElementById('qnaList');

  // Attach event listeners to existing toggle buttons (for initial hardcoded Q&A)
  qnaListDiv.querySelectorAll('.toggle-answer-btn').forEach(button => {
      button.addEventListener('click', toggleAnswer);
  });

  if (submitQuestionBtn) {
      submitQuestionBtn.addEventListener('click', submitQuestion);
  }

  async function submitQuestion() {
      const questionText = questionInput.value.trim();
      if (!questionText) {
          alert('Please enter your question.');
          return;
      }

      // In a real application, you'd send this to a backend (e.g., php/qna_api.php)
      // For demonstration, we'll simulate adding it and then manually add an answer.
      console.log('Submitting question:', questionText);

      // Simulate API call and success
      const newQuestion = {
          id: Date.now(), // Unique ID for demonstration
          question: questionText,
          answer: "Thank you for your question! We will provide an answer soon. (This is a placeholder answer from the client-side)",
          answered: false // Initially not answered by an admin
      };

      addQnAItemToDOM(newQuestion);
      questionInput.value = ''; // Clear the input

      // In a real scenario:
      /*
      try {
          const response = await fetch('php/qna_api.php', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ question: questionText })
          });
          const result = await response.json();
          if (result.success) {
              alert('Your question has been submitted successfully!');
              // Optionally, refresh Q&A list or add the new question to the list
              fetchQnAs(); // Re-fetch all Q&As to show the new one
          } else {
              alert('Failed to submit question: ' + (result.message || 'Unknown error.'));
          }
      } catch (error) {
          console.error('Error submitting question:', error);
          alert('An error occurred while submitting your question.');
      }
      */
  }

  // Function to add a Q&A item to the DOM
  function addQnAItemToDOM(qna) {
      const qnaItemDiv = document.createElement('div');
      qnaItemDiv.classList.add('qna-item');

      const questionP = document.createElement('p');
      questionP.classList.add('question');
      questionP.textContent = `Q: ${qna.question}`;

      const answerP = document.createElement('p');
      answerP.classList.add('answer');
      answerP.textContent = `A: ${qna.answer}`;

      const toggleButton = document.createElement('button');
      toggleButton.classList.add('toggle-answer-btn');
      toggleButton.textContent = 'Show Answer';
      toggleButton.addEventListener('click', toggleAnswer);

      qnaItemDiv.appendChild(questionP);
      qnaItemDiv.appendChild(answerP);
      qnaItemDiv.appendChild(toggleButton);

      qnaListDiv.prepend(qnaItemDiv); // Add to the top
  }

  function toggleAnswer(event) {
      const button = event.target;
      const qnaItem = button.closest('.qna-item');
      const answer = qnaItem.querySelector('.answer');

      if (answer) {
          answer.classList.toggle('show');
          button.textContent = answer.classList.contains('show') ? 'Hide Answer' : 'Show Answer';
      }
  }

  // In a real app, you would fetch existing Q&As on page load
  /*
  async function fetchQnAs() {
      try {
          const response = await fetch('php/qna_api.php');
          const qnas = await response.json();
          qnaListDiv.innerHTML = ''; // Clear existing
          qnas.forEach(qna => addQnAItemToDOM(qna));
      } catch (error) {
          console.error('Error fetching Q&As:', error);
          qnaListDiv.innerHTML = '<p>Could not load questions. Please try again.</p>';
      }
  }
  // Call on page load
  fetchQnAs();
  */
});