import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
    
const base_name = dirname(dirname(dirname(fileURLToPath(import.meta.url))));
const download_target_dir = join(base_name, 'static');

export {
    base_name,
    download_target_dir,
    join,
};
