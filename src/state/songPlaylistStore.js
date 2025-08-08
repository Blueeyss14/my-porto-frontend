import { create } from 'zustand';
import { songData, mapSong } from '../helper/songData';

const songs = mapSong(songData);

const useSongPlaylistStore = create((set, get) => ({
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isMuted: false,
  audioRef: null,
  currentSongIndex: 0,
  isLoading: false,
  songs,

  setAudioRef: (ref) => set({ audioRef: ref }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentTime: (currentTime) => set({ currentTime }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => set({ volume }),
  setIsMuted: (isMuted) => set({ isMuted }),
  setCurrentSongIndex: (index) => set({ currentSongIndex: index }),
  setIsLoading: (isLoading) => set({ isLoading }),

  formatTime: (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  },

  setupAudioListeners: () => {
    const audio = get().audioRef;
    if (!audio) return;

    const updateTime = () => {
      if (!audio.paused) {
        get().setCurrentTime(audio.currentTime);
      }
    };

    const handlePlay = () => {
      get().setIsPlaying(true);
      get().setIsLoading(false);
    };
    
    const handlePause = () => get().setIsPlaying(false);

    const handleEnded = () => {
      get().setIsPlaying(false);
      get().playNextSong();
    };

    const handleLoadStart = () => {
      get().setIsLoading(true);
    };

    const handleCanPlay = () => {
      get().setIsLoading(false);
    };

    const setAudioDuration = () => {
      if (!isNaN(audio.duration)) {
        get().setDuration(audio.duration);
      }
    };

    const handleError = (e) => {
      console.error('Audio error:', e);
      get().setIsPlaying(false);
      get().setIsLoading(false);
    };

    audio.removeEventListener('timeupdate', updateTime);
    audio.removeEventListener('loadedmetadata', setAudioDuration);
    audio.removeEventListener('play', handlePlay);
    audio.removeEventListener('pause', handlePause);
    audio.removeEventListener('ended', handleEnded);
    audio.removeEventListener('loadstart', handleLoadStart);
    audio.removeEventListener('canplay', handleCanPlay);
    audio.removeEventListener('error', handleError);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', setAudioDuration);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', setAudioDuration);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
    };
  },

  togglePlayPause: async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const audio = get().audioRef;
    if (!audio || get().isLoading) return;

    try {
      if (get().isPlaying) {
        audio.pause();
      } else {
        await audio.play();
      }
    } catch (error) {
      console.log('Audio play error:', error);
      get().setIsPlaying(false);
    }
  },

  handleSeek: (e) => {
    const audio = get().audioRef;
    if (!audio || get().isLoading) return;

    const clickX = e.nativeEvent.offsetX;
    const width = e.currentTarget.offsetWidth;
    const newTime = (clickX / width) * get().duration;
    audio.currentTime = newTime;
    get().setCurrentTime(newTime);
  },

  handleVolumeChange: (e) => {
    const newVolume = parseFloat(e.target.value);
    const audio = get().audioRef;
    if (!audio) return;

    audio.volume = newVolume;
    get().setVolume(newVolume);
    get().setIsMuted(newVolume === 0);
  },

  toggleMute: () => {
    const audio = get().audioRef;
    if (!audio) return;

    if (get().isMuted) {
      audio.volume = get().volume;
      get().setIsMuted(false);
    } else {
      audio.volume = 0;
      get().setIsMuted(true);
    }
  },

  getProgressPercent: () => {
    const { currentTime, duration } = get();
    return duration ? (currentTime / duration) * 100 : 0;
  },

  playNextSong: async () => {
    const currentIndex = get().currentSongIndex;
    const songs = get().songs;
    const nextIndex = (currentIndex + 1) % songs.length;
    
    await get().playSongByIndex(nextIndex);
  },

  playPreviousSong: async () => {
    const currentIndex = get().currentSongIndex;
    const songs = get().songs;
    const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    
    await get().playSongByIndex(prevIndex);
  },

  playSongByIndex: async (index) => {
    const audio = get().audioRef;
    if (!audio) return;

    const song = get().songs[index];
    if (!song) return;

    if (!audio.paused) {
      audio.pause();
    }

    get().setIsLoading(true);
    get().setIsPlaying(false);
    get().setCurrentSongIndex(index);
    
    get().setCurrentTime(0);
    get().setDuration(0);

    audio.src = song.song;
    audio.load();

    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      await audio.play();
    } catch (err) {
      console.error('Playback error:', err);
      get().setIsPlaying(false);
      get().setIsLoading(false);
    }
  },
}));

export default useSongPlaylistStore;