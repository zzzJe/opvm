import cli from './_index.js';
import storage from '../core/storage.js';

cli
    .command('list')
    .description('List installed Optifine version')
    .action(async () => {
        if ([...storage.list()].length === 0) {
            console.log('🌟 Oops, looks like we have a whole lot of nothing here!');
            return;
        }
        for (const p of storage.list()) {
            const emoji = storage.version() === p ? '👉' : '  ';
            console.log(emoji + ' ' + p);
        }
    });
