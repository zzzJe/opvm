import { exec as execCallback } from 'node:child_process';
import { promisify } from 'node:util';
import { readFile } from 'node:fs/promises';
import cli from './_index.js';
import storage from '../core/storage.js';
import { download_target_dir, join } from './../util/path.js';
const exec = promisify(execCallback);

async function check_java_installed() {
    try {
        await exec('java --version');
        return true;
    } catch {
        return false;
    }
}

async function run_optifine_jar(name) {
    const jar_path = join(download_target_dir, `${name}.jar`);
    await exec(`java -jar ${jar_path}`);
}

cli
    .command('use')
    .description('Apply Optifine to your machine')
    .argument('<string>', 'Optifine version')
    .action(async ver => {
        if (!await storage.is_configured()) {
            console.error(`🔰 ".minecraft" path has not been correctly configired`);
            console.error(`🔰 try runing the following command:`);
            console.error(`👉 opvm config --minecraft-dir="<path/to/.minecraft>"`);
            return;
        }
        if (!storage.check(ver)) {
            console.error(`❌ You don't have Optifine version '${ver}'`);
            return;
        }
        if (!await check_java_installed()) {
            console.error(`☕ Cannot detect avaliable java path`);
            return;
        }
        try {
            const launcher_profile_before = JSON.parse((await readFile(join(storage.minecraft_dir(), 'launcher_profiles.json'))).toString());
            if (launcher_profile_before.profiles.OptiFine === undefined) {
                await run_optifine_jar(ver);
                await storage.use(ver);
                return;
            }
            if (launcher_profile_before.profiles.OptiFine.lastVersionId.replace('-OptiFine', '') === ver) {
                console.error(`⚠ The Optifine version has already been applied`);
                return;
            }
            await run_optifine_jar(ver);
            const launcher_profile_after = JSON.parse((await readFile(join(storage.minecraft_dir(), 'launcher_profiles.json'))).toString());
            // if (launcher_profile_before?.profiles?.OptiFine?.lastVersionId
            //  !== launcher_profile_after?.profiles?.OptiFine?.lastVersionId
            // )   console.log('[DBG] use version change');
            if (launcher_profile_before.profiles.OptiFine.lastVersionId
             !== launcher_profile_after.profiles.OptiFine.lastVersionId
            )   await storage.use(ver);
        } catch {
            console.error(`❌ Failed to apply '${ver}'`);
        }
    });
