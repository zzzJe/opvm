import storage from './storage.js';

async function download_archive_to_static(url, filename) {
    try {
        const response = await fetch(url);
        await storage.add(filename, response.body);
    } catch (error) {
        // console.error(`Failed to download and store the file ${filename}:`, error);
    }
}

export {
    download_archive_to_static,
};
