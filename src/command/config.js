import cli from './_index.js';
import storage from '../core/storage.js';
import { is_valid_minecraft_dir } from '../util/check.js';

cli
    .command('config')
    .description('Config opvm')
    .option('-m, --minecraft-dir <string>', 'Path to ".minecraft" directory')
    .action(async option => {
        if (option.minecraftDir !== undefined) {
            if (!await is_valid_minecraft_dir(option.minecraftDir)) {
                console.error(`❌ The directory '${option.minecraftDir}' is invalid`);
            } else {
                await storage.update_minecraft_dir(option.minecraftDir);
                console.log(`✅ Minecraft directory updated!`);
            }
        }
    });
