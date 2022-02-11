const playListContainerTag = document.getElementsByClassName("playListContainer")[0];

const audioTag = document.getElementsByClassName('audioTag')[0];
const currentAudioTotalTimeTag = document.getElementsByClassName('currentAudioTotalTime')[0];
const currentProgressTag = document.getElementById('currentProgress');
const playButtonTag = document.getElementsByClassName('playButton')[0];
const pauseButtonTag = document.getElementsByClassName('pauseButton')[0];
const previousButtonTag = document.getElementsByClassName('previousButton')[0];
const nextButtonTag = document.getElementsByClassName('nextButton')[0];


const tracks = [
    {trackId: "music/akazi1.mp3", title: "akazi1 "},
    {trackId: "music/akazi2.mp3", title: "akazi2 "},
    {trackId: "music/waimaesaga.mp3", title: "wamasage "},
    {trackId: "music/payiate.mp3", title: "payiate "},
    {trackId: "music/Justin_Bieber_Alone_ft_Tyga_(New_song_2015)-1-1.mp3", title: "JustinBiber "},
];

for (let i = 0; i < tracks.length; i++) {
    const trackTag = document.createElement('div');
    trackTag.addEventListener("click", () => {
        const trackId = tracks[i].trackId;
        audioTag.src = trackId;
        audioTag.play();
        isPlaying = true;
        updatePlayAndPauseButton();
        currentPlayingIndex = i;
        // console.log(audioTag.duration);
    });
    trackTag.classList.add('trackItem');
    const title = (i + 1).toString() + ". " + tracks[i].title;
    trackTag.textContent =title;
    playListContainerTag.append(trackTag);    
}

let duration =0;
let durationText = "00:00";
audioTag.addEventListener('loadeddata', () => {
    duration = Math.floor(audioTag.duration); //234.5444739393
    durationText = createMinuteAndSecondText(duration);
    // console.log(duration);
});

audioTag.addEventListener('timeupdate', () => {
    const currentTime = Math.floor(audioTag.currentTime);
    const currentTimeText = createMinuteAndSecondText(currentTime);
    const currentTimeTextAndDuration =  currentTimeText + " / " + durationText;
    currentAudioTotalTimeTag.textContent = currentTimeTextAndDuration;
    updateDuration(currentTime);
});

const updateDuration = (currentTime) => {
    const currentProgressWidth  =(500/duration) * currentTime;
    currentProgressTag.style.width = currentProgressWidth.toString() + "px"; //5px
}

const createMinuteAndSecondText = (totalSecond) => {
    const minute = Math.floor(totalSecond / 60);
    const second = totalSecond % 60;
    const minuteText = minute < 10 ? "0" + minute.toString() : minute;
    const secondText = second < 10 ? "0" + second.toString() : second;
    return minuteText + ":" + secondText;
    // console.log(minute + ":" + second);
}

let currentPlayingIndex = 0;
let isPlaying = false;
playButtonTag.addEventListener('click', () => {
    isPlaying = true;
    const currentTime = Math.floor(audioTag.currentTime);
    if(currentTime === 0){
        const songIdToPlay = tracks[currentPlayingIndex].trackId;
        audioTag.src= songIdToPlay;
        audioTag.play();
        updatePlayAndPauseButton();
    }else{
        audioTag.play();
        updatePlayAndPauseButton();
    }
});

pauseButtonTag.addEventListener('click', () => {
    isPlaying = false;
    audioTag.pause();   
    updatePlayAndPauseButton();
});

previousButtonTag.addEventListener('click', () => {
    if(currentPlayingIndex === 0){
        return;
    }
    currentPlayingIndex -= 1;
    playSong();
});

nextButtonTag.addEventListener('click', () => {
    if( currentPlayingIndex === tracks.length -1){
        return;
    }
    currentPlayingIndex += 1;
    playSong();
});

const playSong = () =>{
    const songIdToPlay = tracks[currentPlayingIndex].trackId;
    audioTag.src = songIdToPlay;
    audioTag.play();
    isPlaying = true;
    updatePlayAndPauseButton();
}
const updatePlayAndPauseButton = () => {
    if(isPlaying){
        playButtonTag.style.display = "none";
        pauseButtonTag.style.display = "inline";
    }else{
        playButtonTag.style.display = "inline";
        pauseButtonTag.style.display = "none";
    }
};
