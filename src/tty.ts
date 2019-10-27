
import ansiEscapes from 'ansi-escapes';
import { Trex } from './objects/trex';
import { Runway } from './objects/runway';
import {
    TREX_WIDTH,
    TREX_HEIGHT
} from './objects/object.constants';

export const RUNWAY_PADDING = 2;

export class TTY {
    private _width: number;
    private _height: number;

    public trex: Trex;
    public runway: Runway;

    constructor() {
        this._height = process.stdout.rows;
        this._width = process.stdout.columns;
        this.trex = new Trex(this._width, this._height);
        this.runway = new Runway(this._width, this._height);


    }

    public drawScreen() {
        this.setRawMode();
        this.clear();

        this.drawRunway();
        this.drawTrex();
        this.hideCursor();
    }

    public drawRunway() {
        TTY.print(ansiEscapes.cursorTo(0, this._height - RUNWAY_PADDING));
        const drawableRunway: string = this.runway.getDrawable();
        TTY.print(drawableRunway);
    }

    public drawTrex() {
        TTY.print(ansiEscapes.cursorTo(0, this._height - TREX_HEIGHT - RUNWAY_PADDING));
        const drawableRunway: string = this.trex.getDrawable();
        TTY.print(drawableRunway);
    }

    public clear() {
        TTY.print(ansiEscapes.clearScreen);
    }

    public getHeight(): number {
        return this._height;
    }

    public getWidth(): number {
        return this._width;
    }

    private setRawMode(): void {
        process.stdin.setRawMode(true);
        process.stdin.resume();
    }

    private hideCursor(): void {
        TTY.print(ansiEscapes.cursorHide);

    }

    public static print(out: string) {
        process.stdout.write.bind(process.stdout)(out);
    }

}