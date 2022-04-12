import { TestBed } from '@angular/core/testing';

import { NgxBasicCarouselService } from './ngx-basic-carousel.service';

describe('NgxBasicCarouselService', () => {
  let service: NgxBasicCarouselService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxBasicCarouselService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
