import browserSync from 'browser-sync';
import config from '../config';

const server = (cb) => {
    browserSync.create().init({
        server: {
            baseDir: config.dest.root,

        },
        files: [
            `${config.dest.html}/*.html`,
            `${config.dest.js}/*.js`,
            `${config.dest.css}/*.css`,
            
            {
                watch: `${config.dest.images}/**/*`,
                fn: ()=>{
                    this.reload();
                }
            }
        ],
        open: false,
        notify: false,
    });

    cb();
}

export default server;