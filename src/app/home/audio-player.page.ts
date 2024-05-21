import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.page.html',
  styleUrls: ['./audio-player.page.scss'],
})
export class AudioPlayerPage implements OnInit {
  audio: HTMLAudioElement;

  constructor() { }

  ngOnInit() {
    this.audio = new Audio('../../assets/deeper_space.mp3');
  }

  playAudio() {
    this.audio.play();
  }

  pauseAudio() {
    this.audio.pause();
  }

  skipForward() {
    this.audio.currentTime += 10; // Skip forward 10 seconds
  }

  skipBackward() {
    this.audio.currentTime -= 10; // Skip backward 10 seconds
  }
}
