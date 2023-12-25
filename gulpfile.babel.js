import gulp from 'gulp'
import config from './gulp/config';
import clean from './gulp/tasks/clean';
import server from './gulp/tasks/server';
import { scriptsBuild, scriptsWatch, vendorBuild } from './gulp/tasks/scripts';
import { pugBuild, pugWatch } from './gulp/tasks/pug';
import { sassBuild, sassWatch } from './gulp/tasks/styles';

import { assetsBuild, assetsWatch } from './gulp/tasks/assets';
import { imagesBuild, imagesWatch, spriteBuild, spriteWatch } from './gulp/tasks/images';
// import { spritesBuild, spritesWatch } from './gulp/tasks/sprites';

config.setEnv();

// exports.test = () => {
//     console.log(1);
// }

export const build = gulp.series(
    // clean,
    gulp.parallel(
        scriptsBuild,
        vendorBuild,
        pugBuild,
        sassBuild,
        assetsBuild,
        imagesBuild,
        spriteBuild,
    )
);

export const watch = gulp.series(
    build,
    server,
    gulp.parallel(
        scriptsWatch,
        pugWatch,
        sassWatch,
        assetsWatch,
        imagesWatch,
        spriteWatch,
    )
);
