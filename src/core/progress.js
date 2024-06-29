import ProgressBar from 'progress';

class Progress {
    constructor(name, total) {
        this.name = name;
        this.bar = new ProgressBar(`${name} [:bar] :percent :etas`, {
            complete: '=',
            incomplete: ' ',
            width: 40,
            total: total,
            clear: true,
        });
    }

    update(chunk_length) {
        this.bar.tick(chunk_length);
    }

    finish() {
        this.bar.terminate();
    }
};

export {
    Progress,
};
