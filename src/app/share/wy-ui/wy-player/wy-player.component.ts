import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppStoreModule } from 'src/app/store';
import {
  getSongList,
  getPlayList,
  getCurrentIndex,
  getPlayMode,
  getCurrentSong
} from 'src/app/store/selectors/player.selector';
import { getPlayer } from 'src/app/store/reducers/player.reducer';
import { Song } from 'src/app/services/data-types/common.types';
import { PlayMode } from './player-type';
import { SetCurrentIndex } from 'src/app/store/actions/player.action';

@Component({
  selector: 'app-wy-player',
  templateUrl: './wy-player.component.html',
  styleUrls: ['./wy-player.component.less']
})
export class WyPlayerComponent implements OnInit {
  percent = 0;

  bufferPercent = 0;

  songList: Song[];
  playList: Song[] = [];
  currentIndex: number;
  currentSong: Song;

  // 总时长
  duration: number;
  // 歌曲当前播放时间
  currentTime: number;

  // 播放状态
  playing = false;

  // 是否可以播放
  songReady = false;

  @ViewChild('audio', { static: true })
  private audio: ElementRef;

  private audioEl: HTMLAudioElement;
  constructor(private store$: Store<AppStoreModule>) {
    const appStore$ = this.store$.pipe(select(getPlayer));
    // appStore$.pipe(select(getSongList)).subscribe(list => {
    //   console.log('songlist: ', list);
    // });
    // appStore$.pipe(select(getPlayList)).subscribe(list => {
    //   console.log('playlist: ', list);
    // });
    // appStore$.pipe(select(getCurrentIndex)).subscribe(index => {
    //   console.log('index: ', index);
    // });

    const stateArr = [
      {
        type: getSongList,
        cb: list => this.watchList(list, 'songList')
      },
      {
        type: getPlayList,
        cb: list => this.watchList(list, 'playList')
      },
      {
        type: getCurrentIndex,
        cb: index => this.watchCurrentIndex(index)
      },
      {
        type: getPlayMode,
        cb: mode => this.watchPlayMode(mode)
      },
      {
        type: getCurrentSong,
        cb: song => this.watchCurrentSong(song)
      }
    ];

    stateArr.forEach((item: any) => {
      appStore$.pipe(select(item.type)).subscribe(item.cb);
    });
  }

  ngOnInit(): void {
    this.audioEl = this.audio.nativeElement;
  }

  private watchList(list: Song[], type: string) {
    this[type] = list;
  }

  private watchCurrentIndex(index: number) {
    this.currentIndex = index;
  }

  private watchPlayMode(mode: PlayMode) {
    console.log('mode: ', mode);
  }
  private watchCurrentSong(song: Song) {
    if (song) {
      this.currentSong = song;
      this.duration = song.dt / 1000;
    }
  }

  // 控制歌曲播放进度
  onPercentChange(per) {
    console.log('per: ', per);
    this.audioEl.currentTime = this.duration * (per / 100);
  }

  // 播放/暂停
  onToggle() {
    if (!this.currentSong) {
      //没有当前歌曲，但歌曲列表中有内容的话就播放第一首歌
      if (this.playList.length) {
        this.updateIndex(0);
      }
    } else {
      if (this.songReady) {
        this.playing = !this.playing;
        if (this.playing) {
          this.audioEl.play();
        } else {
          this.audioEl.pause();
        }
      }
    }
  }

  // 上一曲
  onPrev(index: number) {
    if (!this.songReady) return;
    if (this.playList.length === 1) {
      this.loop();
    } else {
      const newIndex = index <= 0 ? this.playList.length - 1 : index;
      this.updateIndex(newIndex);
    }
  }
  //下一曲
  onNext(index: number) {
    if (!this.songReady) return;
    if (this.playList.length === 1) {
      this.loop();
    } else {
      const newIndex = index >= this.playList.length ? 0 : index;
      this.updateIndex(newIndex);
    }
  }

  // 单曲循环
  private loop() {
    this.audioEl.currentTime = 0;
    this.play();
  }

  private updateIndex(index: number) {
    this.store$.dispatch(SetCurrentIndex({ currentIndex: index }));
    this.songReady = false;
  }

  onCanplay() {
    this.songReady = true;
    this.play();
  }

  // 监听歌曲当前播放时间
  onTimeUpdate(e: Event) {
    this.currentTime = (<HTMLAudioElement>e.target).currentTime;
    this.percent = (this.currentTime / this.duration) * 100;
    const buffered = this.audioEl.buffered;
    if (buffered.length && this.bufferPercent < 100)
      this.bufferPercent = (buffered.end(0) / this.duration) * 100;
  }

  private play() {
    this.audioEl.play();
    this.playing = true;
  }

  get picUrl(): string {
    return this.currentSong
      ? this.currentSong.al.picUrl
      : '//s4.music.126.net/style/web2/img/default/default_album.jpg';
  }
}
