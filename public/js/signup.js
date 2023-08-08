document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('.signup-form');

    const signupFormHandler = async (event) => {
        event.preventDefault();

        const username = document.querySelector('#username-signup').value.trim();
        const email = document.querySelector('#email-signup').value.trim();
        const password = document.querySelector('#password-signup').value.trim();
        const confirmPassword = document.querySelector('#confirm-password-signup').value.trim();

        if (!username || !email || !password || !confirmPassword) {
            alert('Please fill in all required fields.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                body: JSON.stringify({ username, email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/feed');
            } else {
                alert('Failed to sign up.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during signup.');
        }
    };

    signupForm?.addEventListener('submit', signupFormHandler);
});

