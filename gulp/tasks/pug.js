import gulp from 'gulp';
import pug from 'gulp-pug';
import config from '../config';

export const pugBuild = () => (
    gulp.src(`${config.src.pug}/*.pug`)
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(config.dest.html))

);

export const pugWatch = () => gulp.watch(`${config.src.pug}/**/*.pug`,pugBuild);