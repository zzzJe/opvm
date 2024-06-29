import { Command } from 'commander';

const cli = new Command();

cli
    .name('opvm')
    .description('Optifine Version Manager CLI tool')
    .version('0.1.0');

export default cli;
