import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxBasicCarouselComponent } from './ngx-basic-carousel.component';
import { CommonModule } from '@angular/common';

describe('NgxBasicCarouselComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule
      ],
      declarations: [
        NgxBasicCarouselComponent,
      ],
    }).compileComponents();
  });
  // let component: NgxBasicCarouselComponent;
  // let fixture: ComponentFixture<NgxBasicCarouselComponent>;

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [ NgxBasicCarouselComponent ]
  //   })
  //   .compileComponents();
  // });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(NgxBasicCarouselComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(NgxBasicCarouselComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
