import { Injectable, Inject } from '@angular/core';
import { ServicesModule, API_CONFIG } from './services.module';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, pluck, switchMap } from 'rxjs/internal/operators';
import { SongSheet, Song } from './data-types/common.types';
import { SongService } from './song.service';

@Injectable({
  //不再是根组件的service
  // 如果没有用到，ng在treeshaking的时候可以进行优化
  providedIn: ServicesModule
})
export class SheetService {
  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private uri: string,
    private songServe: SongService
  ) {}

  // 获取入驻歌手
  getSongSheetDetail(id: number): Observable<SongSheet> {
    const params = new HttpParams().set('id', id.toString());
    return this.http
      .get(`${this.uri}playlist/detail`, { params })
      .pipe(map((res: { playlist: SongSheet }) => res.playlist));
  }

  playSheet(id: number): Observable<Song[]> {
    return this.getSongSheetDetail(id).pipe(
      pluck('tracks'),
      switchMap(tracks => this.songServe.getSongList(tracks))
    );
  }
}
