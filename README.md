# NgxBasicCarousel

[![npm](https://img.shields.io/npm/v/ngx-basic-carousel?color=green)](https://www.npmjs.com/package/ngx-basic-carousel)
[![demo](https://img.shields.io/badge/demo-angular%20project-red)](https://demo-ngx-ae7lro7lc-madinaf.vercel.app/)

# About

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

This is a package for a carousel on Angular..

## Install

`npm install ngx-basic-carousel`

## Import

In your app.module.ts file

```ts
// ...
import { NgxBasicCarouselModule } from 'ngx-basic-carousel';

@NgModule({
  // ...
  imports: [
    // ...
    NgxBasicCarouselModule,
    // ...
  ]
})
export class AppModule {}
```

## Usage

```html
<lib-ngx-basic-carousel></lib-ngx-basic-carousel>
```

### Attributes

##### Basic options

| Input    | Type       | Description                      | Default value |
| -------- | ---------- | -------------------------------- | ------------- |
| slides   | `Slide []` | An array of [Slide](#slideType). | `[]`          |
| interval | `number`   | Loop interval in milliseconds.   | `3000`        |
| width    | `string`   | width value in `px`.             | `650px`       |
| height   | `string`   | height value in `px`.            | `326px`       |

example:

```html
<lib-ngx-basic-carousel [slides]="mySlides"
                        [interval]="1000"
                        width="1920px"
                        height="1080px"></lib-ngx-basic-carousel>
```

##### Dots customisation

| Input            | Type      | Description              | Default value |
| ---------------- | --------- | ------------------------ | ------------- |
| showDots         | `boolean` | Display dots navigation. | `true`        |
| activeDotColor   | `string`  | Active dot color .       | `#000`        |
| inactiveDotColor | `string`  | Inactive dot color.      | `#fff`        |

### Type reference

<a name="slideType">Slide</a>

```ts
interface Slide {
  image: string;
  targetLink: string;
}
```

| Property   | Type     | Description                                                                                      |
| ---------- | -------- | ------------------------------------------------------------------------------------------------ |
| image      | `string` | Image url.                                                                                       |
| targetLink | `string` | Redirection link if the slide is clickable, if there is no link the slide will not be clickable. |

## Test the package locally

Clone the package repo : ` git clone https://github.com/MadiNaf/ngx-basic-carousel ` .

Build the package : ` ng build ngx-basic-carousel `.

Create a symlink in your npm global  folder, go to: `~/dist/ngx-basic-carousel` and run ` npm link `.

To verify that everything was done correctly, you can check whether the symlink for the package has been created using the following command: ` npm ls --depth=0 --link=true `.
Now you need to create a new angular projet: ` ng new test-pkg `, go to the project folder and link your project with the package : ` npm link ngx-basic-carousel `.
After that you can import and use the package like we do when we use `npm install` instead of `npm link`.
