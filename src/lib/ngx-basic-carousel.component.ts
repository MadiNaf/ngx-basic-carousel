import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import Slide from './models/slide.model';

@Component({
  selector: 'lib-ngx-basic-carousel',
  template: `<div id="carousel">
                <div class="center-container d-flex justify-content-center align-center">
                  <div class="container">
                    <!-- Contenue du carousel -->
                    <div class="carousel-container">
                      <!-- Image du carousle -->
                      <!-- <section class="img-section" *ngFor="let image of carousel" [ngClass]="image.cssClass + ' ' + image.animationCss">
                        <img [src]="image.src" (click)="openLinkInNewTab(image.url)" [ngClass]="[image.url ? 'pointer' : '']" />
                      </section> -->
          
                      <!-- Les circles de navigation -->
                      <section class="controller-section d-flex justify-content-center align-start ">
                        <ng-container *ngFor="let item of slides; let i = index">
                          <div class="circle"  (click)="handleDotClick(i)"></div>
                        </ng-container>
                      </section>
                    </div>
 
                  </div>
                </div>
              </div>

            <!-- <div class="circle" [ngClass]=" i === dotPosition ? 'active-dot' : 'inactive-dot'"  (click)="handleDotClick(i)"></div> -->
  `,
  styles: []
})
export class NgxBasicCarouselComponent implements OnInit {

  @Input() slides: Slide[] = [];
  @Input() interval: number = 0;

  public dotPosition: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.slides = [
      { image: 'https://images.freeimages.com/images/large-previews/aaf/abstract-paper-free-photo-1175904.jpg', targetLink: '' },
      { image: 'https://images.freeimages.com/images/large-previews/107/green-leaves-1410259.jpg', targetLink: '' },
      { image: 'https://images.freeimages.com/images/large-previews/5f1/beach-resort-1395730.jpg', targetLink: '' },
    ];
  }

  public handleDotClick(position: number): void {
    console.log('dot_position:: ', position);
  }

}
