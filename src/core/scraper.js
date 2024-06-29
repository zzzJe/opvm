import axios from 'axios';
import { parse } from 'node-html-parser';
import Parser from './../util/parser.js';

const raw_html_content = (await axios.get('https://optifine.net/downloads')).data;
const download_tables = parse(raw_html_content)
    .querySelectorAll('.downloadTable');

// try to get resolved download url
const download_anchors = download_tables
    .map(table => table.querySelectorAll('tr .colDownload a'))
    .flat()
    .map(a => a.rawAttributes.href)
    .map(Parser.download_url);

// try to get filename
const archive_names = download_anchors
    .map(Parser.archive_name);

// try to get version
const package_version = archive_names
    .map(Parser.package_version);

const versions = package_version
    .map(Parser.game_version);

const archive_version_map = new Map(
    [... new Set(versions)]
        .map(version => [version, []])
);

const archive_download_url_map = new Map();

const archive_mcver_download_url_map = new Map(
    [... new Set(versions)]
        .map(version => [version, new Map()])
);

for (const [index, version] of versions.entries()) {
    archive_version_map
        .set(version, [
            ...archive_version_map.get(version),
            package_version[index]
        ]);

    archive_download_url_map
        .set(package_version[index], async () => {
            const raw_html = (await axios.get(download_anchors[index])).data;
            const parsed_html = parse(raw_html);
            const url = 'https://optifine.net/' + parsed_html.querySelector('.downloadButton a').rawAttributes.href;
            return url;
        });
    
    archive_mcver_download_url_map
        .get(version)
        .set(package_version[index], archive_download_url_map.get(package_version[index]));
}

export {
    archive_version_map,
    archive_download_url_map,
    archive_mcver_download_url_map,
};
