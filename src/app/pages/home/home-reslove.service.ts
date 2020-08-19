import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import {
  Banner,
  HotTag,
  SongSheet,
  Singer
} from 'src/app/services/data-types/common.types';
import { HomeService } from 'src/app/services/home.service';
import { SingerService } from 'src/app/services/singer.service';
import { take, first } from 'rxjs/internal/operators';

type HomeDataType = [Banner[], HotTag[], SongSheet[], Singer[]];
@Injectable({
  providedIn: 'root'
})
export class HomeResolverService implements Resolve<HomeDataType> {
  constructor(
    private homeServer: HomeService,
    private singerServer: SingerService
  ) {}

  resolve(): Observable<HomeDataType> {
    //   类似Promise.all
    return forkJoin([
      this.homeServer.getBanners(),
      this.homeServer.getHotTags(),
      this.homeServer.getPerosonalSheetList(),
      this.singerServer.getEnterSinger()
    ]).pipe(first()); //只取这个流的第一个，后面的都不要了
  }
}
