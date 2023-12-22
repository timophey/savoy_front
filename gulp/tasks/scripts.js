import fs from 'fs';
import gulp, {src, dest} from "gulp";
import browserify from "browserify";
import config from '../config';
import babel from 'gulp-babel';
// import concat fom ""
var merge = require('merge-stream');
var glob = require('glob');
var path = require('path');
const concat = require('gulp-concat');
const map = require('gulp-sourcemaps');

export const scriptsBuild = () => {
    var files = glob.sync(`${config.src.js}/*.js`);
    // browserify(`${config.src.js}/main.js`)
    //     .transform("babelify", {presets: ["@babel/preset-env"]})
    //     .bundle()
    //     .on('error',function browserifyError(error){
    //         console.log(error.stack);
    //         this.emit('end');
    //     })
    //     .pipe(fs.createWriteStream(`${config.dest.js}/main.js`))
    var files = glob.sync(`${config.src.js}/*.js`);
    // return merge(files.map( file => {
    //     return browserify(file)
    // }));
    // console.log(files)
    // return files.map(file => {
    //     // console.log(path.basename(file))
    //     return browserify(file)
    //         .transform("babelify", {presets: ["@babel/preset-env"]})
    //         .bundle()
    //         .on('error',function browserifyError(error){
    //             console.log(error.stack);
    //             this.emit('end');
    //         })
    //         .pipe(fs.createWriteStream(`${config.dest.js}/${path.basename(file)}`))
    // })[0];
    return src(`${config.src.js}/*.js`)
        .pipe(map.init())
        .pipe(concat('main.js'))
        // .transform("babelify", {presets: ["@babel/preset-env"]})
        .pipe(babel({presets: ["@babel/preset-env"]}))
        // .pipe(map.write('../sourcemaps'))
        .pipe(dest(`${config.dest.js}`));

}

export const vendorBuild = () => {
    return src(`${config.src.js}/vendor/*.js`)
        .pipe(concat('vendor.js'))
        // .pipe(babel({presets: ["@babel/preset-env"]}))
        .pipe(dest(`${config.dest.js}`));
}

export const scriptsWatch = () => gulp.watch(`${config.src.js}/**/*.js`,gulp.parallel(scriptsBuild, vendorBuild));
// export const scriptsWatch = () => gulp.watch(`${config.src.js}/**/*.js`,gulp.parallel(scriptsBuild, vendorBuild));