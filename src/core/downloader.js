import axios from 'axios';
import storage from './storage.js';

async function download_archive_to_static(url, filename) {
    const response = await axios({
        method: 'get',
        url: url,
        responseType: 'stream'
    });
    await storage.add(filename, response.data);
};

export {
    download_archive_to_static,
};
