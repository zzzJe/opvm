import cli from './_index.js';
import storage from '../core/storage.js';

cli
    .command('uninstall')
    .description('Uninstall Optifine package')
    .argument('<string>', 'Optifine version')
    .action(async ver => {
        if (!storage.check(ver)) {
            console.log(`❌ You don't have Optifine version '${ver}'`);
            return;
        }
        try {
            await storage.remove(ver);
            console.log(`✅ Optifine version ${ver} has been uninstalled`);
        } catch {
            console.error(`❌ Failed to uninstall version '${ver}'`);
        }
    });
