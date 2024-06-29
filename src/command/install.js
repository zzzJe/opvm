import cli from './_index.js';
import storage from '../core/storage.js';
import { download_archive_to_static } from './../core/downloader.js';

cli
    .command('install')
    .description('Install Optifine package')
    .argument('<string>', 'Optifine version')
    .action(async ver => {
        if (storage.check(ver)) {
            console.log(`🟦 You already have Optifine version ${ver}`);
            return;
        }
        const { archive_download_url_map } = await import('./../core/scraper.js');
        if (archive_download_url_map.get(ver) === undefined) {
            console.error(`❌ No such Optifine version '${ver}'`);
            return;
        }
        try {
            const download_url = await archive_download_url_map.get(ver)();
            await download_archive_to_static(download_url, ver);
            console.log(`✅ Optifine version ${ver} has been installed`);
        } catch {
            console.error(`❌ Failed to download version '${ver}'`);
        }
    });
