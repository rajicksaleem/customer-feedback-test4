document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('feedback-form');
    const popup = document.getElementById('popup');

    // Questions array
    const questions = [
        "How satisfied you are with the welcome by the Reception Staff?",
        "How you rate the Reception Staff’s knowledge about the documents required of Each Service?",
        "Rate your Satisfaction about the Cashiering Que Time?",
        "How You Satisfied with the Customer Happiness staff & their Services?",
        "How you rate the Service Time taken For your Transactions?",
        "How Good Customer Service Team Free from Making Errors In Services?",
        "Rate your Satisfaction about the Supervisors and their Supports?",
        "How Satisfied you are with the Welcome by Lectures In Training Room?",
        "Rate your Satisfaction about the Lectures and their Knowledge about UAE Labour Laws and Responses to the Customers?",
        "Do you satisfied with facilities arranged for Disabled Citizens?"
    ];

    // Generate questions
    const questionsContainer = document.querySelector('.questions');
    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `
            <span>${question}</span>
            <label>
                <input type="radio" name="q${index + 1}" value="3" required> 3
            </label>
            <label>
                <input type="radio" name="q${index + 1}" value="2" required> 2
            </label>
            <label>
                <input type="radio" name="q${index + 1}" value="1" required> 1
            </label>
        `;
        questionsContainer.appendChild(questionDiv);
    });

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const feedback = {};
        formData.forEach((value, key) => {
            feedback[key] = value;
        });

        fetch('http://localhost:3000/submit-feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feedback)
        })
        .then(response => {
            if (response.ok) {
                popup.style.display = 'block';
                setTimeout(() => {
                    popup.style.display = 'none';
                    form.reset();
                }, 3000);
            } else {
                alert('There was a problem with submitting your feedback. Please try again later.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
