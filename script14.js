// script14.js
document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.querySelector('form');

  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const enteredUsername = document.querySelector('input[type="text"]').value;
    const enteredPassword = document.querySelector('input[type="password"]').value;

    // Correct username and password
    const correctUsername = 'raza';
    const correctPassword = '1234';

    if (enteredUsername === correctUsername && enteredPassword === correctPassword) {
      // Successful login, redirect to another page or perform other actions
      const intervalId = setInterval(function () {
        window.location.href = 'index15.html'; // Uncomment this line to redirect to another page
        clearInterval(intervalId); // Clear the interval after executing once
      }, 300);
       // Uncomment this line to redirect to another page
    } else {
      alert('Invalid credentials. Please try again.');
    }
  });
});
