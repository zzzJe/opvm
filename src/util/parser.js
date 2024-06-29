/**
 * 'http://adfoc.us/serve/sitelinks/?id=475250&url=http://optifine.net/adloadx?f=OptiFine_1.11.2_HD_U_B9.jar&x=5046' -> 'http://optifine.net/adloadx?f=OptiFine_1.11.2_HD_U_B9.jar&x=5046'
 * @param {string} adfoc 
 * @returns 
 */
const parse_download_url = adfoc => adfoc.match(/(?<=url\=)(.*)/)[0];
/**
 * 'http://optifine.net/adloadx?f=OptiFine_1.11.2_HD_U_B9.jar&x=5046' -> 'OptiFine_1.11.2_HD_U_B9.jar'
 * @param {string} optifine 
 * @returns 
 */
const parse_archive_name = optifine => optifine.match(/(?<=f\=)(.*)(?=&x\=(.*))/)[0];
/**
 * 'OptiFine_1.11.2_HD_U_B9.jar' -> '1.11.2_HD_U_B9'
 * @param {string} archive 
 * @returns 
 */
const parse_package_version = archive => archive.match(/(?<=OptiFine_)(.*)(?=\.jar)/)[0];
/**
 * '1.11.2_HD_U_B9' -> '1.11.2'
 * @param {string} pack 
 * @returns 
 */
const parse_game_version = pack => pack.split('_')[0];

export default {
    download_url: parse_download_url,
    archive_name: parse_archive_name,
    package_version: parse_package_version,
    game_version: parse_game_version,
};
