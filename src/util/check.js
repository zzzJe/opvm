import { readdir } from 'node:fs/promises';

const is_valid_minecraft_version = ver => /^\d+\.\d+(\.\d+)?$/.test(ver);

const is_valid_minecraft_dir = async path => {
    try {
        const dir = await readdir(path);
        const trait = [
            'assets', 'bin', 'libraries', 'resourcepacks', 'saves', 'versions', 'launcher_profiles.json'
        ];
        const last_dirname = path.match(/[^\\/]+(?=[\\/]*$)/)[0];
        const is_valid = last_dirname === '.minecraft' && trait.every(t => dir.includes(t));
        return is_valid;
    } catch {
        return false;
    }
};

export {
    is_valid_minecraft_version,
    is_valid_minecraft_dir,
};
