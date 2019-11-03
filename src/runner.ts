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

    private msPerFrame = 1000 / configs.FPS;

    //configs
    constructor() {
        readline.emitKeypressEvents(process.stdin);
        this.terminal = new TTY();
        this.distanceMeter = new DistanceMeter(this.msPerFrame, 0);
    }

    init() {
        this.setupKeyPressActions();
        this.terminal.drawScreen();

        this.update();
    }

    private update() {
        setInterval(() => {
            this.terminal.drawTrex();
            this.distanceMeter.update();
            const distance = this.distanceMeter.getActualDistance();
            this.terminal.scoreboard.updateCurrentScore(distance);
            this.terminal.drawScoreboard();
        }, this.msPerFrame);
    }

    
    private onScreenSizeChange() {
        process.stdout.on('resize', () => {
            
        })
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
