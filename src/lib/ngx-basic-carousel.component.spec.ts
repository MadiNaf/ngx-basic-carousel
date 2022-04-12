import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxBasicCarouselComponent } from './ngx-basic-carousel.component';

describe('NgxBasicCarouselComponent', () => {
  let component: NgxBasicCarouselComponent;
  let fixture: ComponentFixture<NgxBasicCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxBasicCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxBasicCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
