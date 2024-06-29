import { readFile, writeFile, readdir, unlink } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import { download_target_dir, base_name, join } from '../util/path.js';
import parser from './../util/parser.js';
import { is_valid_minecraft_dir } from '../util/check.js';

const installed_packages = new Set();
const status = JSON.parse(await readFile(join(base_name, 'static', 'status.json')));
status.installedVersion.forEach(v => installed_packages.add(v));

async function update_ver() {
    const to_stored = {
        ...status,
        installedVersion: [...installed_packages.values()]
            .sort((a, b) => b.localeCompare(a))
    };
    await writeFile(
        join(base_name, 'static', 'status.json'),
        JSON.stringify(to_stored)
    );
}

async function update_use(name) {
    const to_stored = {
        ...status,
        appliedVersion: name
    };
    await writeFile(
        join(base_name, 'static', 'status.json'),
        JSON.stringify(to_stored)
    );
}

async function update_minecraft_dir(dir) {
    const to_stored = {
        ...status,
        minecraftDir: dir
    };
    await writeFile(
        join(base_name, 'static', 'status.json'),
        JSON.stringify(to_stored)
    );
}

async function set(applied_ver, all_vers_iter) {
    const to_stored = {
        ...status,
        appliedVersion: applied_ver,
        installedVersion: [...all_vers_iter]
            .sort((a, b) => b.localeCompare(a))
    };
    await writeFile(
        join(base_name, 'static', 'status.json'),
        JSON.stringify(to_stored)
    );
}

async function add(name, stream) {
    if (installed_packages.has(name)) {
        // console.log('[DBG] \'add\' no action taken');
        return;
    }
    const file_target = join(download_target_dir, `${name}.jar`);
    const file_stream = createWriteStream(file_target);
    stream.pipe(file_stream);
    await new Promise((resolve, reject) => {
        file_stream.on('finish', resolve);
        file_stream.on('error', reject);
    });
    installed_packages.add(name);
    await update_ver();
}

async function use(name) {
    if (status.appliedVersion === name) {
        // console.log('[DBG] \'use\' no action taken 1');
        return;
    }
    const minecraft_dir = await readdir(join(status.minecraftDir, 'versions'));
    if (!minecraft_dir.includes(parser.game_version(name))) {
        // console.log('[DBG] \'use\' no action taken 2');
        return;
    }
    await update_use(name);
}

async function remove(name) {
    if (!installed_packages.has(name)) {
        // console.log('[DBG] \'remove\' no action taken');
        return;
    }
    const file_target = join(download_target_dir, `${name}.jar`);
    await unlink(file_target);
    installed_packages.delete(name);
    const new_applied_ver = status.appliedVersion === name
        ? null
        : status.appliedVersion;
    await set(new_applied_ver, installed_packages.values());
}

function check(name) {
    return installed_packages.has(name);
}

function version() {
    return status.appliedVersion;
}

function minecraft_dir() {
    return status.minecraftDir;
}

function list() {
    return installed_packages.values();
}

async function is_configured() {
    try {
        return await is_valid_minecraft_dir(status.minecraftDir);
    } catch {
        return false;
    }
}

export default {
    add,
    check,
    list,
    use,
    remove,
    version,
    minecraft_dir,
    update_minecraft_dir,
    is_configured,
};
