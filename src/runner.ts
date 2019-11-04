import * as readline from 'readline';
import { TTY } from './tty';
import { RUNNER_CONFIGS as configs } from './configs.constants';
import { DistanceMeter } from './distance-meter';

export class Runner {
    private terminal: TTY;
    private distanceMeter: DistanceMeter;

    private commandkeys = ['up', 'space', // JUMP
        'down', // DUCK
        'return', // RESTART
    ];

    private isPaused: boolean;
    private obstacles;

    private lastUpdate: number; // in ms
    private msPerFrame = 1000 / configs.FPS;

    //configs
    constructor() {
        readline.emitKeypressEvents(process.stdin);
        this.terminal = new TTY();
        this.distanceMeter = new DistanceMeter(0, 0);
    }

    init() {
        // TODO: move to constructor
        this.setupKeyPressActions();
        this.setupScreenResizeListner();

        this.terminal.drawScreen();

        this.lastUpdate = Date.now();
        this.nextFrame(0);

        this.update();
    }

    private update() {
        setInterval(() => {
            const now = Date.now();
            const deltaTime = now - (this.lastUpdate || now); // ms between function calls
            this.lastUpdate = now;
            this.nextFrame(deltaTime);

        }, this.msPerFrame);
    }

    private nextFrame(deltaTime: number) {
        const distance = deltaTime / this.msPerFrame;
        const actualDistance = this.distanceMeter.update(distance);

        this.terminal.scoreboard.updateCurrentScore(actualDistance);
        this.terminal.drawScoreBoard();
        this.terminal.drawTrex();
    }

    private setupScreenResizeListner() {
        process.stdout.on('resize', () => {
            this.terminal.updateScreen();
        });
    }

    private setupKeyPressActions(): void {
        process.stdin.on('keypress', (str, key) => {
            const name = key.name;

            if (name === 'q') {
                this.exit();
            }

            if (this.isValidCommand(name)) {
                TTY.print('yup!');
            }

        });
    }

    private isValidCommand(code: string) {
        return (this.commandkeys.find(c => c === code));
    }

    private exit() {
        this.terminal.clear();
        process.exit(0);
    }
}
