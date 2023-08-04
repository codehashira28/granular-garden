document.addEventListener('DOMContentLoaded', () => {
    const WaveSurfer = window.WaveSurfer;

    const fetchSongData = async () => {
        try {
            const response = await fetch('/api/feed');

            if (response.status !== 200) {
                throw new Error('Cannot fetch the data');
            }

            let data = await response.json();
            console.log(data);
            return data;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
    fetchSongData().then((data) => {
        console.log('DATA', data);
        for (let i = 0; i < data.length; i++) {

            const wavesurfer = WaveSurfer.create({
                container: `#waveform${i}`,
                waveColor: '#c77dff',
                progressColor: '#7400b8',
                cursorColor: '#480ca8',
            });

            wavesurfer.load(data[i].audioFile);

            document.getElementById(`audio-btn${i}`).addEventListener('click', () => {
                wavesurfer.playPause();
        
                if (audioBtn.innerHTML === 'Play' && wavesurfer.isPlaying() === true) {
                    audioBtn.innerHTML = 'Pause';
                } else if (audioBtn.innerHTML === 'Pause' && wavesurfer.isPlaying() === false) {
                    audioBtn.innerHTML = 'Play';
                }
            });
        }
    });
});
