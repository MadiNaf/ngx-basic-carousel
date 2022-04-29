import { ComponentFixture, TestBed } from '@angular/core/testing';

import Slide from './models/slide.model';
import { NgxBasicCarouselComponent } from './ngx-basic-carousel.component';

describe('NgxBasicCarouselComponent_Properties', () => {
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
  
  it('should have a slides property', () => {
    expect(component.hasOwnProperty('slides')).toBeTrue();
  });
  it('slides property should be an empty array', () => {
    expect(component.slides.length).toEqual(0);
  });

  it('should have a interval property', () => {
    expect(component.hasOwnProperty('interval')).toBeTrue();
  });
  it('interval property should be equal to 3000', () => {
    expect(component.interval).toEqual(3000);
  });

  it('should have a width property', () => {
    expect(component.hasOwnProperty('width')).toBeTrue();
  });
  it('width property should be equal to 650px', () => {
    expect(component.width).toEqual('650px');
  });

  it('should have a height property', () => {
    expect(component.hasOwnProperty('height')).toBeTrue();
  });
  it('height property should be equal to 326px', () => {
    expect(component.height).toEqual('326px');
  });

  it('should have a showDots property', () => {
    expect(component.hasOwnProperty('showDots')).toBeTrue();
  });
  it('showDots property should be true', () => {
    expect(component.showDots).toBeTrue();
  });

  it('should have a activeDotColor property', () => {
    expect(component.hasOwnProperty('activeDotColor')).toBeTrue();
  });
  it('activeDotColor property should be equal to #000', () => {
    expect(component.activeDotColor).toEqual('#000');
  });

  it('should have a inactiveDotColor property', () => {
    expect(component.hasOwnProperty('inactiveDotColor')).toBeTrue();
  });
  it('inactiveDotColor property should be equal to #fff', () => {
    expect(component.inactiveDotColor).toEqual('#fff');
  });
});

describe('NgxBasicCarouselComponent_Methods', () => {
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

  // afterAll(() => component.intervalId = 1);

  it('should create NgxBasicCarouselComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Should transform an array of Slide object to an array of CarouselItem Object', () => {
    const slides: Slide[] = [ {image: 'image1', targetLink: 'image2'}, {image: 'image3', targetLink: ''}, {image: '', targetLink: ''} ];
    component.transformSlidesToCarouselItem(slides);
    expect(component.carousel.length).toEqual(3);
  });

  it('Shoul sort carousel items', async () => {
    const {prevSlide, currentSlide, nextSlide} = await component.sortElementPosition();
    expect(component.currentPosition).toEqual(0);
    expect(component.prevElement).toEqual(prevSlide);
    expect(component.currentElement).toEqual(currentSlide);
    expect(component.nextElement).toEqual(nextSlide);
  });

  // it('Should call startCarousel', () => {
  //   component.interval = 1;
  //   component.nbImages = 1;
  //   const spyStartCarousel = spyOn<any>(component, 'startCarousel').and.callThrough();
  //   component.onPlayCarousel();
  //   setTimeout(() => expect(spyStartCarousel).toHaveBeenCalled(), 30);
  // });

  // it('Should call forward animation method', () => {
  //   const spyToLeftFromRight = spyOn<any>(component, 'toLeftFromRight').and.callThrough();
  //   component.moveToNext();
  //   expect(spyToLeftFromRight).toHaveBeenCalled();
  // });


});
