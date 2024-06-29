import cli from './_index.js';
import storage from '../core/storage.js';
import { is_valid_minecraft_version } from './../util/check.js';

const group_elements = (arr, group_size) => {
    let result = [];
    for (let i = 0; i < arr.length; i += group_size) {
        result.push(arr.slice(i, i + group_size));
    }
    return result;
}

const transpose_array = array => {
    const max_length = Math.max(...array.map(row => row.length));
    const result = Array.from({ length: max_length }, () => []);

    array.forEach((row, rowIndex) => {
        row.forEach((item, colIndex) => {
            result[colIndex][rowIndex] = item;
        });
    });

    return result;
};

cli
    .command('search')
    .description('Search downloadable Optifine version')
    .argument('[string]', 'Minecraft version', null)
    .action(async ver => {
        if (ver === null) {
            console.log(`📦 Avaliable Minecraft version`);
            const { archive_version_map } = await import('./../core/scraper.js');
            const group = group_elements([...archive_version_map.keys()], 8);
            const trans = transpose_array(group);
            const display = trans.reduce((a, c) => a + c.reduce((a, c) => a + '   ' + c.padEnd(6, ' '), '') + '\n', '').trimEnd();
            console.log(display);
            return;
        }
        if (!is_valid_minecraft_version(ver)) {
            console.error(`❌ No such version '${ver}'`);
            return;
        }
        const { archive_version_map } = await import('./../core/scraper.js');
        const all_downloadable_archive_version = archive_version_map.get(ver);
        if (all_downloadable_archive_version === undefined) {
            console.error(`🔴 No installable content avaliable for version ${ver}`);
        } else {
            console.log(`📦 Avaliable content for version ${ver}`);
            all_downloadable_archive_version.forEach(v => {
                const emoji = storage.check(v) ? '🟢' : '🔘';
                console.log(`${emoji} ${v}`)
            });
        }
    });
