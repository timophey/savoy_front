import gulp from 'gulp';
import changed from 'gulp-changed';
// import svgSprite from 'gulp-svg-sprite';
const svgSprite = require('gulp-svg-sprite');
// import imagemin from 'gulp-imagemin';
// import imageminPngquant from 'imagemin-pngquant';
// import imageminWebp from 'imagemin-webp';
// import gulpif from 'gulp-if';
// import rename from 'gulp-rename';
import config from '../config';

// https://github.com/svg-sprite/svg-sprite/blob/HEAD/docs/configuration.md

let SVGconfig = {
  dest: `build/icons`,
  mode: {
      // shape: {
      //   transform: ['svgo'],
      // },
      // "shape": {
      //   "transform": [
      //     {
      //       "svgo": {
      //         "plugins": [
      //           {
      //             "name": "convertColors",
      //             "params": {
      //               "currentColor": true
      //             }
      //           }
      //         ]
      //       }
      //     }
      //   ]
      // },
      stack: {
          sprite: '../sprite.svg',
          example: true
      },
      css: {
        render: {
          css: true,
        },
        example: true,
        // layout: "diagonal",
        prefix: ".icon-%s",
      }
  }
}

const copyImages = () => (
  gulp.src(`${config.src.images}/**/*`)
    .pipe(changed(config.dest.images))
    // .pipe(gulpif(config.isProd, imagemin([
    //   imagemin.mozjpeg({ quality: 80 }),
    //   imageminPngquant({ quality: [0.8, 0.9] }),
    //   imagemin.svgo(),
    // ])))
    .pipe(gulp.dest(config.dest.images))
);

const copySVG = () => {
  // console.log(`${config.src.icons}/*.svg`, config.svgicon);
  return gulp.src(`${config.src.icons}/*.svg`)
    .pipe(svgSprite(SVGconfig))
    .pipe(gulp.dest(config.dest.icons));
  // src/assets/icons
}

// const convertImagesToWebp = () => (
//   gulp.src(`${config.src.images}/**/*.{jpg,png}`)
//     .pipe(changed(config.dest.images, { extension: '.webp' }))
//     .pipe(imagemin([
//       imageminWebp({ quality: 80 }),
//     ]))
//     .pipe(rename({
//       extname: '.webp',
//     }))
//     .pipe(gulp.dest(config.dest.images))
// );

export const spriteBuild = gulp.series(copySVG);

export const imagesBuild = gulp.series(copyImages);//, convertImagesToWebp

export const imagesWatch = () => gulp.watch(`${config.src.images}/**/*`, imagesBuild);

export const spriteWatch = () => gulp.watch(`${config.src.icons}/**/*`, copySVG);