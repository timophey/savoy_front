import gulp from 'gulp';
// import sass from 'gulp-sass'
import config from '../config';
import autoPrefixer from 'gulp-autoprefixer';
import gcmq from 'gulp-group-css-media-queries';
// import cleanCSS from 'gulp-clean-css';

const sass = require('gulp-sass')(require('sass'));



export const sassBuild = () => (
    gulp.src(`${config.src.sass}/main.scss`)
        .pipe(sass())
        .pipe(gcmq())
        .pipe(autoPrefixer({}))
        // .pipe(cleanCSS({ level: 2 }))
        .pipe(gulp.dest(config.dest.css))
)

export const sassWatch = () => gulp.watch(`${config.src.sass}/**/*.scss`,sassBuild);
