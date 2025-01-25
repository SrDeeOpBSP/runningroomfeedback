// Display Crew Details from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const crewId = localStorage.getItem('crewId');
    const crewName = localStorage.getItem('crewName');
    const crewDesg = localStorage.getItem('crewDesg');
    const crewHq = localStorage.getItem('crewHq');

    // Display crew details if they exist in localStorage
    if (crewId && crewName && crewDesg && crewHq) {
        document.getElementById('crew-id').textContent = crewId;
        document.getElementById('crew-name').textContent = crewName;
        document.getElementById('crew-desg').textContent = crewDesg;
        document.getElementById('crew-hq').textContent = crewHq;
    } else {
        // If crew details are missing, redirect to login page
        alert('Please log in first!');
        window.location.href = 'index.html';
    }
});

// Handle Feedback Form Submission
document.getElementById('feedback-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Disable the submit button to prevent multiple submissions
    const submitButton = event.target.querySelector('button');
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...'; // Optional: Change button text to show submission is in progress

    // Get Crew Details from localStorage
    const crewId = localStorage.getItem('crewId');
    const crewName = localStorage.getItem('crewName');
    const crewDesg = localStorage.getItem('crewDesg');
    const crewHq = localStorage.getItem('crewHq');

    // Get form data
    const mealType = document.getElementById('meal-type').value;
    const mealMenu = document.getElementById('meal-menu').value;
    const taste = document.getElementById('taste').value;
    const quality = document.getElementById('quality').value;
    const timelyServed = document.getElementById('timely_served').value;
    const hygiene = document.getElementById('hygiene').value;
    const suggestions = document.getElementById('suggestions').value;
    const runningroom = document.getElementById('running-room').value;
    const couponnumber = document.getElementById('food-coupon').value;

    // Ensure all required data is available
    if (!crewId || !crewName || !crewDesg || !crewHq) {
        alert('Crew details are missing! Please log in again.');
        window.location.href = 'index.html';
        submitButton.disabled = false; // Re-enable submit button
        submitButton.textContent = 'Submit'; // Reset button text
        return;
    }

    try {
        // Send data to Google Apps Script Web App
        const response = await fetch('https://script.google.com/macros/s/AKfycbxv5zzvOhZM4a8VIaCm-UXst85ZNjITRJpAhn7BfbiBQzz_lXV9YgoL0BHT8ulVyMCR/exec', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                crewId,
                crewName,
                crewDesg,
                crewHq,
                mealType,
                mealMenu,
                taste,
                quality,
                timelyServed,
                hygiene,
                suggestions,
                runningroom,
                couponnumber
            })
        });

        const result = await response.json();

        if (result.success) {
            alert('Feedback submitted successfully!');
            document.getElementById('feedback-form').reset(); // Clear the form
        } else {
            alert('Failed to submit feedback. Please try again.');
        }
    } catch (error) {
        console.error('Error submitting feedback:', error);
        alert('An error occurred. Please try again.');
    } finally {
        // Re-enable the submit button regardless of the result
        submitButton.disabled = false;
        submitButton.textContent = 'Submit'; // Reset button text
    }
});
