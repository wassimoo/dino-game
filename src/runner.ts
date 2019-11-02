import * as readline from 'readline';
import { TTY } from './tty';

export class Runner {
    private terminal: TTY;
    private commandkeys = ['up', 'space', // JUMP
        'down', // DUCK
        'return', // RESTART
    ];

    private isPaused: boolean;
    private obstacles;

    //configs

    constructor() {
        readline.emitKeypressEvents(process.stdin);
        this.terminal = new TTY();
    }

    init() {
        this.setupKeyPressActions();
        this.setupScreenResizeListner();

        this.terminal.drawScreen();
        this.update();
    }

    private update() {
        setInterval(() => {
            this.terminal.drawTrex();
        }, 150);
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
