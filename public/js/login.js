document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    const signupForm = document.querySelector('.signup-form');
    const logoutBtn = document.querySelector('.logout-btn');

    const loginFormHandler = async (event) => {
        event.preventDefault();

        const email = document.querySelector('#email-login').value.trim();
        const password = document.querySelector('#password-login').value.trim();

        if (email && password) {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/feed');
            } else {
                alert('Failed to log in.');
            }
        }
    };

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

    const logoutHandler = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/users/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/');
            } else {
                alert('Failed to log out.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during logout.');
        }
    };

    loginForm?.addEventListener('submit', loginFormHandler);
    signupForm?.addEventListener('submit', signupFormHandler);
    logoutBtn?.addEventListener('click', logoutHandler);
});

