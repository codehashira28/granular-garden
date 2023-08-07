document.addEventListener('DOMContentLoaded', () => {
    const WaveSurfer = window.WaveSurfer;

    const fetchSongData = async () => {
        try {
            const response = await fetch('/api/feed');

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
        for (let i = 0; i < data.length; i++) {

            const wavesurfer = WaveSurfer.create({
                container: `#waveform${i}`,
                waveColor: '#c77dff',
                progressColor: '#7400b8',
                cursorColor: '#480ca8',
                fillParent: true,
            });

            wavesurfer.load(data[i].audioFile);

            const audioBtn = document.getElementById(`audio-btn${i}`)

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
        }
    });
});
