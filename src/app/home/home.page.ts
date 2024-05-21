import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Track {
  src: string;
  title: string;
  artist: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  playlist: Track[] = [];
  audio: HTMLAudioElement = new Audio();
  currentTrackIndex: number = 0;
  currentTimePercent: number = 0;
  currentTrack: Track = { src: '', title: '', artist: '' };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadPlaylist().then(() => {
      this.loadTrack(this.currentTrackIndex);
      this.audio.ontimeupdate = () => {
        this.currentTimePercent = (this.audio.currentTime / this.audio.duration) * 100;
      };
      this.playAudio(); // Play the first track automatically
    });
  }

  async loadPlaylist() {
    try {
      const data = await this.http.get<Track[]>('../../assets/playlist.json').toPromise();
      this.playlist = data ?? [];
      if (this.playlist.length > 0) {
        this.currentTrack = this.playlist[0];
      }
    } catch (error) {
      console.error('Failed to load playlist', error);
      this.playlist = [];
    }
  }

  loadTrack(index: number) {
    this.currentTrack = this.playlist[index];
    this.audio.src = this.currentTrack.src;
    this.audio.load();
  }

  playAudio() {
    this.audio.play();
  }

  pauseAudio() {
    this.audio.pause();
  }

  skipForward() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
    this.loadTrack(this.currentTrackIndex);
    this.playAudio();
  }

  skipBackward() {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
    this.loadTrack(this.currentTrackIndex);
    this.playAudio();
  }

  seekTo(event: any) {
    const newValue = event.detail.value;
    this.audio.currentTime = (newValue / 100) * this.audio.duration;
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
