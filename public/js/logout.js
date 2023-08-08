document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.querySelector('.logout-btn');

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

    logoutBtn?.addEventListener('click', logoutHandler);
});