import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import CarouselItem from './models/carousel-item';
import Slide from './models/slide.model';

@Component({
  selector: 'lib-ngx-basic-carousel',
  templateUrl: './ngx-basic-carousel.component.html', 
  styleUrls: ['ngx-basic-carousel.component.css']
})
export class NgxBasicCarouselComponent implements OnInit {

  // Basic options
  @Input('slides') slides: Slide[] = [];
  @Input('interval') interval: number = 3000;
  @Input('width') width: string = '650px';
  @Input('height') height: string = '326px';

  // Dots customisation
  @Input('showDots') showDots?: boolean = true;
  @Input('activeDotColor') activeDotColor?: string = '#000'   
  @Input('inactiveDotColor') inactiveDotColor?: string = '#fff'
 
  public currentElement?: CarouselItem; // Current element
  public prevElement?: CarouselItem;    // previous element
  public nextElement?: CarouselItem;    // next element

  public currentPosition: number = 0; // Current position (Index of current element)
  public dotPosition: number = 0;     // Current dot position
  public nbImages: number = 0;
  public isAnimation: boolean = false;
  public carousel: CarouselItem [] = [];

  public defaultCssClass: string = 'img-section';

  public intervalId?: any;
  public timeoutId?: any;

  constructor() { }

  ngOnInit(): void {
    this.buildAndStart();
  }

  /**
   * Transform Slide object provide by the user to CarouselItem
   * @param slides - Array of slide object
   * @returns - Void promise
   */
  public transformSlidesToCarouselItem(slides: Slide[]): Promise<void> {
    return new Promise((resolve, reject) => {
      if (Array.isArray(slides) && slides.length) {
        this.carousel = [];
        for(let i =0; i < slides.length; i++) {
          const item = {...slides[i], id: `s${i}`, cssClass: this.defaultCssClass, isActive: false, animation:'' };
          this.carousel.push(item);
        }
        resolve();
      } else {
        reject('slide should be an array of Slide');
      }
    });
  }

  // It is called in the ngonInit to build and launch the carousel
  private buildAndStart(): void {
    this.transformSlidesToCarouselItem(this.slides)
        .then(() => this.initCarouselState())
        .catch((error) => { throw new Error(error) });
  }
 
  /**
   * Repositioning carousel item
   * @returns - Promise with the prev, current and the next item
   */
  public sortElementPosition(): Promise<{[key: string]: CarouselItem }> {
    return new Promise(resolve => {
      this.currentElement = this.carousel[this.currentPosition];
      this.prevElement = this.currentPosition === 0 ? this.carousel[this.nbImages - 1] : this.carousel[this.currentPosition - 1]
      this.nextElement = this.currentPosition === this.nbImages - 1 ? this.carousel[0] : this.carousel[this.currentPosition + 1]
      resolve({prevSlide: this.prevElement, currentSlide: this.currentElement, nextSlide: this.nextElement});
    });
  }

  /**
   * Added a css class for each carousel item
   * @param prevSlide - The prev item
   * @param currentSlide - The current item
   * @param nextSlide - The next item
   */
  public setupCssClass(prevSlide: CarouselItem, currentSlide: CarouselItem, nextSlide: CarouselItem): void {
    this.carousel = this.carousel.map(item => {
      if(currentSlide && item.id === currentSlide.id) {
        return { ...item, cssClass: `${this.defaultCssClass} current-item`, isActive: true, animation: '' };

      } else if (nextSlide && item.id === nextSlide.id) {
        return { ...item, cssClass: `${this.defaultCssClass} next-item`, isActive: false, animation: '' };

      } else if (prevSlide && item.id === prevSlide.id) {
        return { ...item, cssClass: `${this.defaultCssClass} prev-item`, isActive: false, animation: '' };

      } else {
        return { ...item, cssClass: `${this.defaultCssClass} other-item`, isActive: false, animation: '' };
      }
    });
  }

  /**
   * Start carousel animation
   * @param direction - Animation direction, by default next (next -> forward)
   */
  private startCarousel(direction: string): void {
    if (!this.isAnimation) {
      this.isAnimation = true;
      direction === 'next' ? this.moveToNext() : this.isAnimation = false;
    }
  }

  // Play loop carousel
  public onPlayCarousel(): void {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => this.startCarousel('next'), this.interval * this.nbImages);
    }
  }

  // init carousel state (positioning and setup css class)
  private async initCarouselState(): Promise<void> {
    this.nbImages = this.carousel.length;
    if (this.nbImages > 0) {
      const {prevSlide, currentSlide, nextSlide} = await this.sortElementPosition();
      this.setupCssClass(prevSlide, currentSlide, nextSlide);
      this.onPlayCarousel();
    }
  }

  // Forward animation
  public moveToNext(): void {
    if (this.currentPosition < this.nbImages - 1) {
      this.toLeftFromRight(this.currentPosition, this.currentPosition + 1)
          .then(() => this.updateAfterAnimation(this.currentPosition + 1));
    } else {
      this.toLeftFromRight(this.currentPosition, 0)
          .then(() => this.updateAfterAnimation(0));
    }
  }
    
  // Rearward animation
  public moveToPrev(): void {
    if (this.currentPosition > 0) {
      this.toRightFromLeft(this.currentPosition, this.currentPosition - 1)
          .then(() => this.updateAfterAnimation(this.currentPosition - 1));
    } else { // Restart
      this.toRightFromLeft(this.currentPosition, this.nbImages - 1)
          .then(() => this.updateAfterAnimation(this.nbImages - 1));
    }
  }
    
  /**
   * Update carousel state
   * @param newPosition - The new position
   */
  private async updateAfterAnimation(newPosition: number): Promise<void> {
    this.currentPosition = newPosition;
    const {prevSlide, currentSlide, nextSlide} = await this.sortElementPosition();
    this.setupCssClass(prevSlide, currentSlide, nextSlide);
    this.isAnimation = false;
  }
    
  /**
   * Add css class animation (from the middle to the left) for the current item
   * Add css class animation (from the right to the middle) for the next item
   * @param currentPosition - current slide position
   * @param nextPosition - next slide position
   * @returns - void Pormise
   */ 
  private async toLeftFromRight(currentPosition: number, nextPosition: number): Promise<void> {
    return new Promise((resolve) => {
      this.carousel[currentPosition] = { ...this.carousel[currentPosition], animation: 'to-left'};
      this.carousel[nextPosition] = { ...this.carousel[nextPosition], animation: 'from-right'}
      this.setDotsPosition(nextPosition);
    
      // After the animation, we remove all css class animation
      this.timeoutId = setTimeout(() => {
        this.carousel[currentPosition].cssClass = `${this.defaultCssClass} prev-item`;
        this.carousel[currentPosition].animation = '';
        this.carousel[nextPosition].cssClass = `${this.defaultCssClass} current-item`;
        this.carousel[nextPosition].animation = '';
        resolve();
      }, this.interval);
    });
  }
     
  /**
   * Add css class animation (from the middle to the right) for the current item
   * Add css class animation (from the left to the middle) for the prev item
   * @param currentPosition - current slide position
   * @param prevPosition - prev slide position
   * @returns - void promise
   */
  private async toRightFromLeft(currentPosition: number, prevPosition: number): Promise<void> {
    return new Promise((resolve) => {
      this.carousel[currentPosition] = { ...this.carousel[currentPosition], animation: 'to-right'};
      this.carousel[prevPosition] = { ...this.carousel[prevPosition], animation: 'from-left'};
      this.setDotsPosition(prevPosition);
    
      this.timeoutId = setTimeout(() => {
        this.carousel[currentPosition].cssClass = `${this.defaultCssClass} next-item`;
        this.carousel[currentPosition].animation = '';
        this.carousel[prevPosition].cssClass = `${this.defaultCssClass} current-item`;
        this.carousel[prevPosition].animation = '';
        resolve();
      }, this.interval);
    });
  }
     
  /**
   * Handle carousel animation with dots navigation
   * @param targetPosition - Clicked dot position
   */
  public async handleDotClick(targetPosition: number): Promise<void> {
    clearInterval(this.intervalId); // Stop current animation
    clearTimeout(this.timeoutId);
    this.isAnimation = true;
    
    // If the target position is greater than the current position we use the 'next' animation
    if (this.dotPosition < targetPosition) {
      const prevPosition = (targetPosition === 0) ? this.nbImages - 1
                        : targetPosition === (this.nbImages - 1) ? 0 : targetPosition - 1;
    
      const currentSlide = this.carousel[this.dotPosition];
      const nextSlide = this.carousel[targetPosition];
      const prevSlide = this.carousel[prevPosition];
      this.setupCssClass(prevSlide, currentSlide, nextSlide);
      this.toLeftFromRight(this.dotPosition, targetPosition).then(() => {
        this.updateAfterAnimation(targetPosition);
        this.intervalId = null;
        this.onPlayCarousel();
      });
    
    // If the target position is lower than the current position we use the 'prev' animation  
    } else if (this.dotPosition > targetPosition) {
      const nextPosition = targetPosition === (this.nbImages - 1) ? 0 : targetPosition + 1;
      const nextSlide = (nextPosition === targetPosition) || (nextPosition === this.dotPosition)
                        ? { id: '', image: '', targetLink: '', cssClass: '', isActive: false, animation: ''}
                        : this.carousel[nextPosition];
    
      const currentSlide = this.carousel[this.dotPosition];
      const prevSlide = this.carousel[targetPosition];
      this.setupCssClass( prevSlide, currentSlide, nextSlide);
      this.toRightFromLeft(this.dotPosition, targetPosition).then(() => {
        this.updateAfterAnimation(targetPosition);
        this.intervalId = null;
        this.onPlayCarousel();
      });
    }
  }
  
  /**
   * Set dots position
   * @param position - The new position
   */
  private setDotsPosition(position: number): void {
    this.dotPosition = position;
  }

  // *********************** Open link in a new tab *********************************
  /**
   * Open URL on new tab
   * @param url - The target url
   */
  public openLinkInNewTab(url: string): void {
    const windowObjectReference = window?.open(url, '_blank');
    if (windowObjectReference) {
      windowObjectReference.focus();
    }
  }
}
