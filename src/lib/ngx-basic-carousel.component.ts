import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import CarouselItem from './models/carousel-item';
import Slide from './models/slide.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-ngx-basic-carousel',
  templateUrl: './ngx-basic-carousel.component.html', 
  styleUrls: ['ngx-basic-carousel.component.scss']
})
export class NgxBasicCarouselComponent implements OnInit {

  @Input('slides') slides: Slide[] = [];
  @Input('interval') interval: number = 3000;
  @Input('width') width: string = '650px';
  @Input('height') height: string = '327px';
 
  public currentElement?: CarouselItem; // L'élement courant
  public prevElement?: CarouselItem; //  Elément précedent (si retour en arrière)
  public nextElement?: CarouselItem; // Elément suivant

  public currentPosition: number = 0; // Index de l'imge afficher sur le 
  public dotPosition: number = 0;
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

  // *********************** Récupération et construction des données *********************************
  
  private transformSlidesToCarouselItem(slides: Slide[]): Promise<void> {
    return new Promise((resolve, reject) => {
      if (Array.isArray(slides) && slides.length) {
        this.carousel = this.slides.map(slide => {
          return {...slide, cssClass: this.defaultCssClass, isActive: false, animation:'' }});
        resolve();
      } else {
        reject();
      }
    });
  }

  private buildAndStart(): void {
    this.transformSlidesToCarouselItem(this.slides).then(() => this.initCarouselState());
  }

  // *********************** Initialisation et configuration du carousel *********************************
  
  /**
   * Permet de récuperer les éléments du carousel à manipuler par rapport à l'élément courant.
   * On par toujours d'une base de trois élément: précédent <- courant -> suivant
   * @returns retourne les trois éléments courant, précédent et suivant
   */
  public sortElementPosition(): Promise<{[key: string]: CarouselItem }> {
    return new Promise(resolve => {
      this.currentElement = this.carousel[this.currentPosition];
      this.prevElement = this.currentPosition === 0 ? this.carousel[this.nbImages - 1] : this.carousel[this.currentPosition - 1]
      this.nextElement = this.currentPosition === this.nbImages - 1 ? this.carousel[0] : this.carousel[this.currentPosition + 1]
      resolve({currentSlide: this.currentElement, prevSlide: this.prevElement, nextSlide: this.nextElement});
    });
  }

  /**
   * Permet de positionner les éléments du carousel
   * @param currentSlide - L'élements courant (celui qui srea afficher)
   * @param prevSlide - L'élément précédent
   * @param nextSlide -L'élément suivant
   */
  public setupCssClass(prevSlide: CarouselItem, currentSlide: CarouselItem, nextSlide: CarouselItem): void {
    this.carousel = this.carousel.map(item => {
      if(currentSlide && item.image === currentSlide.image) {
        return { ...item, cssClass: `${this.defaultCssClass} current-item`, isActive: true, animation: '' };
      } else if (nextSlide && item.image === nextSlide.image) {
        return { ...item, cssClass: `${this.defaultCssClass} next-item`, isActive: false, animation: '' };
      } else if (prevSlide && item.image === prevSlide.image) {
        return { ...item, cssClass: `${this.defaultCssClass} prev-item`, isActive: false, animation: '' };
      } else {
        return { ...item, cssClass: `${this.defaultCssClass} other-item`, isActive: false, animation: '' };
      }
    });
  }

  /**
   * Démarre l'animation du carousel par rapport à une direction
   * @param direction - next | prev
   */
  private startCarousel(direction: string): void {
    if (!this.isAnimation) {
      this.isAnimation = true;
      direction === 'next' ? this.moveToNext() : this.isAnimation = false;
    }
  }

  public onPlayCarousel(): void {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => this.startCarousel('next'), this.interval * this.nbImages);
    }
  }

  private async initCarouselState() {
    this.nbImages = this.carousel.length;
    if (this.nbImages > 0) {
      const { currentSlide, prevSlide, nextSlide } = await this.sortElementPosition();
      this.setupCssClass(prevSlide, currentSlide, nextSlide);
      this.onPlayCarousel();
    }
  }

  // *********************** Animation direction *********************************
  // Animation vert l'élément suivant (next)
  public moveToNext() {
    if (this.currentPosition < this.nbImages - 1) {
      this.toLeftFromRight(this.currentPosition, this.currentPosition + 1)
          .then(() => this.updateAfterAnimation(this.currentPosition + 1));
    } else {
      this.toLeftFromRight(this.currentPosition, 0)
          .then(() => this.updateAfterAnimation(0));
    }
  }
    
  // Animation vers l'élément précédent (prev)
  public moveToPrev() {
    if (this.currentPosition > 0) {
      this.toRightFromLeft(this.currentPosition, this.currentPosition - 1)
          .then(() => this.updateAfterAnimation(this.currentPosition - 1));
    } else { // Sinon on relance le carousel
      this.toRightFromLeft(this.currentPosition, this.nbImages - 1)
          .then(() => this.updateAfterAnimation(this.nbImages - 1));
    }
  }
    
  /**
   * Mets à jour la position des slides après chaque animation
   * @param newPosition
   */
  private async updateAfterAnimation(newPosition: number): Promise<void> {
    this.currentPosition = newPosition;
    const {currentSlide, prevSlide, nextSlide} = await this.sortElementPosition();
    this.setupCssClass(currentSlide, prevSlide, nextSlide);
    this.isAnimation = false;
  }
    
  // *********************** Animation *************************************
     
  /**
   * Animation du carousel de droite vers la gauche (correspond à la direction next)
   * @param currentPosition - la position courante
   * @param nextPosition - la position suivante
   */
    private async toLeftFromRight(currentPosition: number, nextPosition: number): Promise<void> {
    return new Promise((resolve) => {
      this.carousel[currentPosition] = { ...this.carousel[currentPosition], animation: 'to-left'};
      this.carousel[nextPosition] = { ...this.carousel[nextPosition], animation: 'from-right'}
      this.setDotsPosition(nextPosition);
    
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
   * Animation du carousel de gauche vers la droite (correspond à la direction prev)
   * @param currentPosition
   * @param prevPosition
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
     
  // *********************** Evenments sur les dots controller *********************************
  public async handleDotClick(targetPosition: number): Promise<void> {
    clearInterval(this.intervalId); // Arret de l'animation en cours
    clearTimeout(this.timeoutId);
    this.isAnimation = true;
    
    if (this.dotPosition < targetPosition) {
      const prevPosition = (targetPosition === 0) ? this.nbImages - 1
                        : targetPosition === (this.nbImages - 1) ? 0 : targetPosition - 1;
    
      const currentSlide = this.carousel[this.dotPosition];
      const nextSlide = this.carousel[targetPosition];
      const prevSlide = this.carousel[prevPosition];
      this.setupCssClass(currentSlide, prevSlide, nextSlide);
      this.toLeftFromRight(this.dotPosition, targetPosition).then(() => {
        this.updateAfterAnimation(targetPosition);
        this.intervalId = null;
        this.onPlayCarousel();
      });
    
    } else if (this.dotPosition > targetPosition) {
      const nextPosition = targetPosition === (this.nbImages - 1) ? 0 : targetPosition + 1;
      const nextSlide = (nextPosition === targetPosition) || (nextPosition === this.dotPosition)
                        ? { image: 'string', targetLink: 'string', cssClass: '', isActive: false, animation: ''}
                        : this.carousel[nextPosition];
    
      const currentSlide = this.carousel[this.dotPosition];
      const prevSlide = this.carousel[targetPosition];
      this.setupCssClass(currentSlide, prevSlide, nextSlide);
      this.toRightFromLeft(this.dotPosition, targetPosition).then(() => {
        this.updateAfterAnimation(targetPosition);
        this.intervalId = null;
        this.onPlayCarousel();
      });
    }
  }
    
  private setDotsPosition(position: number): void {
    this.dotPosition = position;
  }

  // *********************** Open link in a new tab *********************************
  public openLinkInNewTab(url: string) {
    // window?.open(url, '_blank').focus();
  }
}
