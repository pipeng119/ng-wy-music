import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-wy-carousel',
  templateUrl: './wy-carousel.component.html',
  styleUrls: ['./wy-carousel.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyCarouselComponent implements OnInit {
  @Input()
  activeIndex = 0;

  @Output()
  changeSlide = new EventEmitter<'pre' | 'next'>();
  // static：动态模板是false，静态是true
  @ViewChild('dot', { static: true })
  dotRef: TemplateRef<any>;

  constructor() {}

  ngOnInit(): void {}

  onChangeSlide(type: 'pre' | 'next') {
    this.changeSlide.emit(type);
  }
}
