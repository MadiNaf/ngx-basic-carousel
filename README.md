# NgxBasicCarousel

---

# About

---



This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

This is a package for a carousel on Angular..



---

## Install

`npm install ngx-basic-carousel`

## Import

In your app.module.ts file

```ts
// ...
import{ NgxBasicCarousel } from 'ngx-basic-carousel'

@NgModule({
  // ...
  imports: [
    // ...
    NgxBasicCarousel,
    // ...
  ]
})
export class AppModule {}
```

## Usage

---

```html
<lib-ngx-basic-carousel></lib-ngx-basic-carousel>
```

### Attributes



##### Basic options

| Input    | Type       | Description                    | Default value |
| -------- | ---------- | ------------------------------ | ------------- |
| slides   | `Slide []` | An array of Slide              | `[ ]`         |
| interval | `number`   | Loop interval in milliseconds. | `3000`        |
| width    | `string`   | width value in `px`            | `650px`       |
| height   | `string`   | height value in `px`           | `327px`       |

exemple:

```html
<lib-ngx-basic-carousel [slides]="mySlides"
                        [interval]="1000"
                        width="1920px"
                        height="1080px"></lib-ngx-basic-carousel>
```



##### Dots customisation

| Input            | Type      | Description             | Default value |
| ---------------- | --------- | ----------------------- | ------------- |
| showDots         | `boolean` | Display dots navigation | `true`        |
| activeDotColor   | `string`  | Active dot color        | `#000`        |
| inactiveDotColor | `string`  | Inactive dot color      | `#fff`        |



### Type reference

```ts
interface Slide {
  image: string; // image url
  targetLink: string;
}
```
