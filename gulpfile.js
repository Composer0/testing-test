// !Dependencies

const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const terser = require('gulp-terser');
const imagewebp = require('gulp-webp');
const mozjpeg = require('imagemin-mozjpeg');
const browserSync = require('browser-sync').create(); // Import browser-sync
const bsConfig = require('./bs-config');
const { exec } = require('child_process');


// !Task for running the build script
function build(callback) {
    exec('npm run build', (error, stdout, stderr) => {
      if (error) {
        console.error(`Build script error: ${error}`);
      }
      console.log(stdout);
      console.error(stderr);
      callback();
    });
  }


// !Functions
//*SCSS
function compilescss() {
    return src( 'src/scss/*.scss' )
        .pipe(sass().on('error', sass.logError))  // Log the error in the terminal
        .pipe( prefix() )
        .pipe( minify() )
        .pipe( dest( 'dist/css' ) )
        .pipe( browserSync.stream() );
}

//*JavaScript
function jsmin() {
    return src( 'src/js/*.js' )
        .pipe( terser() )
        .pipe( dest( 'dist/js' ) )
        .pipe( browserSync.stream() );
}

// !Images
// *Optimize Images


async function optimizeimg() {
    const imagemin = await import('gulp-imagemin');
    
    return src('src/img/*.{jpg,png}')
      .pipe(
        imagemin.default([
          mozjpeg({ quality: 80, progressive: true }),
        ])
      )
      .pipe(dest('dist/img'))
      .pipe( browserSync.stream() );
  }
  

// *Webp Images
function webpImage() {
    return src( 'dist/images/*.{ jpg, png }' ) //Analyzes files onces they have made it to the distribution folder.
        .pipe( imagewebp() )
        .pipe( dest( 'dist/images' ))
        .pipe( browserSync.stream() );

}

// !Watchtask
function liteServer() {
    browserSync.init({
        injectChanges: true,
        server: {
            baseDir: './dist' //Serve files from the dist directory
        },
        port: 3000, // use port 3000
        ...( bsConfig ), // spread operator used to merge in the options object.
        // notify: false // disable browserSync notifications
    })

    watch('src/scss/**/*.scss', compilescss).on('change', browserSync.reload);
    // * Watch JS Files to trigger build from webpack
    watch('src/js/**/*.js', { ignoreInitial: false }, function (cb) {
        build(() => {
            cb();
            // jsmin();
        });
      }).on('change', browserSync.reload);
    watch('src/images/**/*.{jpg,png}', series(optimizeimg, webpImage)).on('add', optimizeimg).on('change', browserSync.reload);
    watch('**/*.html').on('change', browserSync.reload);
    
    
    // Reloads the browser on save when a change occurs to an html or src folder file.
    // gulp.watch('*.html').on('change', browserSync.reload);
    // gulp.watch('src/scss/*.scss', series(compilescss)).on('change', browserSync.reload);
    // gulp.watch('src/js/*.js', series(jsmin)).on('change', browserSync.reload);
    // gulp.watch('src/images/*.{ jpg, png }', series(optimizeimg)).on('change', browserSync.reload);
}

// !Live Server
// function startServer() {
//     connect.server({
//         root: 'dist',
//         livereload: true,
//         port: 3000
//     })
// }

// !Gulp
// * Runs all four automatically
exports.default = series(
    parallel(compilescss,
    jsmin,
    optimizeimg,
    webpImage,),
    // serve
    liteServer
);