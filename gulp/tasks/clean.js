import del from 'del'
import config from '../config';

// 
const clean = (cb) => {
    del(config.dest.root);
    return cb();
}

export default clean;