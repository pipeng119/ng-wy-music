import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import {
  Banner,
  HotTag,
  SongSheet,
  Singer
} from 'src/app/services/data-types/common.types';
import { NzCarouselComponent } from 'ng-zorro-antd';
import { SingerService } from 'src/app/services/singer.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators';
import { SheetService } from 'src/app/services/sheet.service';
import { AppStoreModule } from 'src/app/store';
import { Store } from '@ngrx/store';
import {
  SetSongList,
  SetPlayList,
  SetCurrentIndex
} from 'src/app/store/actions/player.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  carouselActiveIndex: number = 0;
  banners: Banner[];
  hotTags: HotTag[];
  songSheetList: SongSheet[];
  singers: Singer[];

  // 获取轮播组件的实例
  @ViewChild(NzCarouselComponent, { static: true })
  private nzCarouse: NzCarouselComponent;

  constructor(
    // private homeService: HomeService,
    // private singerService: SingerService,
    private route: ActivatedRoute,
    private sheetServer: SheetService,
    private store$: Store<AppStoreModule>
  ) {
    this.route.data
      .pipe(map(res => res.homeDatas))
      .subscribe(([banners, hotTags, songSheetList, singers]) => {
        this.banners = banners;
        this.hotTags = hotTags;
        this.songSheetList = songSheetList;
        this.singers = singers;
      });
    // this.getBanners();
    // this.getHotTags();
    // this.getPersonalizedSheetList();
    // this.getEnterSingers();
  }

  ngOnInit(): void {}

  // private getBanners() {
  //   this.homeService.getBanners().subscribe(banners => {
  //     this.banners = banners;
  //   });
  // }

  // private getHotTags() {
  //   this.homeService.getHotTags().subscribe(tags => {
  //     this.hotTags = tags;
  //   });
  // }

  // private getPersonalizedSheetList() {
  //   this.homeService.getPerosonalSheetList().subscribe(sheets => {
  //     console.log(sheets);
  //     this.songSheetList = sheets;
  //   });
  // }
  // private getEnterSingers() {
  //   this.singerService.getEnterSinger().subscribe(singers => {
  //     this.singers = singers;
  //   });
  // }

  onBeforeChange({ to }): void {
    this.carouselActiveIndex = to;
  }

  onChangeSlide(type: string) {
    this.nzCarouse[type]();
  }

  onPlaySheet(id: number) {
    this.sheetServer.playSheet(id).subscribe(list => {
      // console.log(res);
      this.store$.dispatch(SetSongList({ songList: list }));
      this.store$.dispatch(SetPlayList({ playList: list }));
      this.store$.dispatch(SetCurrentIndex({ currentIndex: 0 }));
    });
  }
}
