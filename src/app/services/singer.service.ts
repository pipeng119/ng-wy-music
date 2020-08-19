import { Injectable, Inject } from '@angular/core';
import { ServicesModule, API_CONFIG } from './services.module';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';
import { Singer } from './data-types/common.types';
import queryString from 'query-string';

type SingerParams = {
  offset: number;
  limit: number;
  cat?: string;
};

const defaultParam: SingerParams = {
  offset: 0,
  limit: 9,
  cat: '5001'
};

@Injectable({
  //不再是根组件的service
  // 如果没有用到，ng在treeshaking的时候可以进行优化
  providedIn: ServicesModule
})
export class SingerService {
  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private uri: string
  ) {}

  // 获取入驻歌手
  getEnterSinger(args?: SingerParams): Observable<Singer[]> {
    const params = new HttpParams({ fromString: queryString.stringify(args) });
    return this.http
      .get(`${this.uri}artist/list`, { params })
      .pipe(map((res: { artists: Singer[] }) => res.artists.slice(0, 9)));
  }
}
