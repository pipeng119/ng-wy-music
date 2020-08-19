import { NgModule } from '@angular/core';
import { SingleSheetComponent } from './single-sheet/single-sheet.component';
import { PlayCountPipe } from '../play-count.pipe';
import { WyPlayerModule } from './wy-player/wy-player.module';

// 用于管理通用UI组件
@NgModule({
  declarations: [SingleSheetComponent, PlayCountPipe],
  imports: [WyPlayerModule],
  exports: [SingleSheetComponent, PlayCountPipe, WyPlayerModule]
})
export class WyUiModule {}
