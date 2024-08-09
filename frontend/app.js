document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get the values from the form
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Basic validation
    if (username === '' || password === '') {
        document.getElementById('error-message').textContent = 'Please fill in all fields.';
        return;
    }

    try {
        // Send POST request to backend
        const response = await fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        // Check response status
        if (response.ok) {
            const data = await response.json();
            document.getElementById('error-message').textContent = '';
            alert(data.message);
            // Redirect to the other page
        } else {
            const errorData = await response.json();
            document.getElementById('error-message').textContent = errorData.message;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('error-message').textContent = 'An error occurred. Please try again.';
    }
});

