import { NgModule } from '@angular/core';
import { NgxBasicCarouselComponent } from './ngx-basic-carousel.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    NgxBasicCarouselComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgxBasicCarouselComponent
  ]
})
export class NgxBasicCarouselModule { }
