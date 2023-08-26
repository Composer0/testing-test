# TEMPLATE

# Gulp Build System

This is a Gulp build system for processing SCSS, JavaScript, and images, and setting up a development server using BrowserSync.

## Dependencies

Make sure you have the following dependencies installed:

- gulp
- gulp-sass
- gulp-autoprefixer
- gulp-clean-css
- gulp-terser
- gulp-webp
- imagemin-mozjpeg
- browser-sync

You can install them by running the command:

```shell
npm install gulp gulp-sass gulp-autoprefixer gulp-clean-css gulp-terser gulp-webp imagemin-mozjpeg browser-sync --save-dev
```

## Functions

### SCSS Compilation

The `compilescss` function compiles SCSS files into CSS, applies Autoprefixer, minifies the CSS, and outputs the result to the `dist/css` directory.

### JavaScript Minification

The `jsmin` function minifies JavaScript files using Terser and outputs the result to the `dist/js` directory.

### Image Optimization

The `optimizeimg` function optimizes images (JPEG and PNG) using imagemin and outputs the optimized images to the `dist/images` directory.

### WebP Image Conversion

The `webpImage` function converts images (JPEG and PNG) to WebP format and outputs the converted images to the `dist/images` directory.

### Watch Task and Live Server

The `liteServer` function sets up a development server using BrowserSync. It watches for changes in SCSS, JavaScript, HTML, and image files, triggers the corresponding tasks, and reloads the browser when changes occur.

## Usage

To start the Gulp build system, run the following command:

```shell
gulp
```

This will execute the default task, which runs all the processing functions and starts the live server.

## Configuration

The BrowserSync configuration is stored in the `bs-config.js` file. You can modify the configuration options in that file to suit your needs.

## License

This project is licensed under the [MIT License](LICENSE).
```

Feel free to customize the README.md file further based on your specific project requirements.
