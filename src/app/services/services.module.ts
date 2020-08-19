import { NgModule, InjectionToken } from '@angular/core';
// import { HomeService } from './home.service';

export const API_CONFIG = new InjectionToken('ApiConfigToken');
@NgModule({
  declarations: [],
  imports: [],
  providers: [
    {
      provide: API_CONFIG,
      useValue: 'http://localhost:3000/'
    }
  ]
  // providers: [HomeService]——和在service里的providerIn添加效果一样,但这样添加ng无法做treeshaking
})
export class ServicesModule {}
