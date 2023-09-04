## Requirements

[NodeJS](http://nodejs.org/) 16+

## Installation
Run the following command in the project root directory:

```
npm install
```

or

```
yarn install
```

## Development

To start the development server run:

```
npm run dev
```

## Build

To build the project assets for production run:

```
npm run prod
```

The built assets can be found in the `./build/` folder.
The source assets can be found in the `./src/` folder.

## Walkthrough

Media files such as images and videos are stored in `./src/assets/media/`

Local font files are stored in `./src/assets/fonts/`

SCSS source files are stored in `./src/scss/`

JavaScript source files are stored in `./src/js/`

HTML snippets are stored in `./src/html/`

## Importing Assets

Load an HTML snippet:
```
<load ="html/components/test.html"/>
```

The URL is always based from the page's directory (even if including snippet inside snippet).
To include other assets inside the snippet URLs start from the page's directory.

Linking a page:
```
<a href="home.html">Home</a>
```

**For the following the URLs should always start like mentioned. Dev and Build asset URLs are handled differently. These are tested and work with both.**

Load image inside HTML:
```
<img src="/media/temp/image.jpg" alt="">
```

Load a local font file:
```
url('/fonts/Roboto-Regular.woff2')
```

Load image inside SCSS:
```
url('/media/icons/ico-arrow.svg')
```

## Importing Dependencies

Custom exports of packages can be found in:
`node_modules/<package-name>/package.json` -> `"exports"`

Example imports of JS files from `node_modules` in `./assets/js/bundle.js`:

```
import Swiper from 'swiper/bundle'; // custom export
import Choices from 'choices.js';
```

Example imports of CSS files from `node_modules` in `./assets/scss/bundle.scss`:

```
@import 'swiper/swiper-bundle.css'; // custom export
@import 'choices.js/public/assets/styles/choices.min.css';
```

## Configuration

The built assets are processed through vite.
The config file `vite.config.js` can be found in the project root directory.
