document.addEventListener('DOMContentLoaded', () => {
    const WaveSurfer = window.WaveSurfer;
    const commentForm = document.getElementById('comment-form');

    const fetchSongData = async () => {
        const creator = window.location.pathname.split('/')[2];
        const title = window.location.pathname.split('/')[3];

        try {
            const response = await fetch(`/api/feed/${creator}/${title}`);

            if (response.status !== 200) {
                throw new Error('Cannot fetch the data');
            }

            let data = await response.json();
            return data;
        } catch (err) {
            throw err;
        }
    };
    fetchSongData().then((data) => {
        // if (data.comments.length > 0) {
        //     const commentSectionContainer = document.getElementById('comments-container');
        //     const headerContainer = Object.assign(document.createElement('div'), { className: 'header-container' });
        //     const commentHeader = Object.assign(document.createElement('h5'), { innerHTML: 'Comments' });
        //     const commentList = Object.assign(document.createElement('ul'), { className: 'comment-list' });
    
        //     commentSectionContainer.appendChild(headerContainer);
        //     headerContainer.appendChild(commentHeader);
        //     commentSectionContainer.appendChild(commentList);
    
        //     for (let i = 0; i < data.comments.length; i++) {
        //         const commentLi = Object.assign(document.createElement('li'), { className: 'comment' });
        //         const commentBody = Object.assign(document.createElement('div'), { className: 'comment-body', id: 'comment-container' });
        //         const commentAuthor = Object.assign(document.createElement('p'), { id: 'artist-name' });
        //         const commentAuthorLink = Object.assign(document.createElement('a'), { className: 'comment-author', href: `/profile/${data.comments[i].creator}`, innerHTML: data.comments[i].creator });
        //         const commentText = Object.assign(document.createElement('p'), { className: 'comment-text text-black', innerHTML: data.comments[i].text });
    
        //         commentLi.appendChild(commentBody);
        //         commentBody.appendChild(commentAuthor);
        //         commentAuthor.appendChild(commentAuthorLink);
        //         commentBody.appendChild(commentText);
        //         commentList.appendChild(commentLi);
        //     }
        // }

        const wavesurfer = WaveSurfer.create({
            container: `#waveform`,
            waveColor: '#c77dff',
            progressColor: '#7400b8',
            cursorColor: '#480ca8',
            fillParent: true,
        });

        wavesurfer.load(data.audioFile);

        const audioBtn = document.getElementById(`audio-btn`)

        audioBtn.innerHTML = wavesurfer.isPlaying() ? 'Pause' : 'Play';

        audioBtn.addEventListener('click', () => {
            wavesurfer.playPause();

            audioBtn.innerHTML = wavesurfer.isPlaying() ? 'Pause' : 'Play';
        });

        audioBtn.addEventListener('keydown', (event) => {
            if (event.key === ' ') {
                event.preventDefault();
                wavesurfer.playPause();
                audioBtn.innerHTML = wavesurfer.isPlaying() ? 'Pause' : 'Play';

            }
        });

        audioBtn.setAttribute('tabindex', '0');

    });
    commentForm?.addEventListener('submit', async (event) => {
        event.preventDefault();

        const creator = window.location.pathname.split('/')[2];
        const title = window.location.pathname.split('/')[3];
        
        const text = document.getElementById('comment-box').value.trim();

        console.log('TEXT', text);

        const response = await fetch(`/api/feed/${creator}/${title}/comments`, {
            method: 'POST',
            body: JSON.stringify({ text, creator }),
            headers: { 'Content-Type': 'application/json' },
        });

        console.log(response);

        if (response.ok) {
            const html = await response.text();
            document.location.reload();
            document.querySelector('.comment-list').insertAdjacentHTML('afterbegin', html);
        } else {
            alert('Failed to create comment');
        }
    });
});