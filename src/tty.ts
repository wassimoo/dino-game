
import ansiEscapes from 'ansi-escapes';
import { Trex } from './objects/trex.object';
import { Runway } from './objects/runway.object';
import {
    RUNWAY_BOTTOM_MARGIN,
    SCOREBOARD_RIGHT_MARGIN,
    SCOREBOARD_TOP_MARGIN,
    TREX_WIDTH,
    TREX_HEIGHT
} from './objects/object.constants';
import { Scoreboard } from './objects/scoreboard.object';
import { IObjectScreenPosition, IScreenPosition } from './interfaces/IPosition';

export const INITIAL_POSITION: IObjectScreenPosition = {
    TREX: { x: -1, y: -1 },
    RUNWAY: { x: -1, y: -1 },
    SCOREBOARD: { x: -1, y: -1 },
}; // not real values, calculated based on screen resolution on object construction
export class TTY {
    private _width: number;
    private _height: number;

    public trex: Trex;
    public runway: Runway;
    public scoreboard: Scoreboard;

    constructor() {
        this._height = process.stdout.rows;
        this._width = process.stdout.columns;
        this.trex = new Trex(this._width, this._height);
        this.runway = new Runway(this._width, this._height);
        this.scoreboard = new Scoreboard(this._width, this._height, 0);

        INITIAL_POSITION.TREX = this.trex.getDrawingPos(this._width, this._height);
        INITIAL_POSITION.RUNWAY = this.runway.getDrawingPos(this._width, this._height);
        INITIAL_POSITION.SCOREBOARD = this.scoreboard.getDrawingPos(this._width, this._height);
    }

    public drawScreen(): void {
        this.setRawMode();
        this.clear();

        this.drawRunway();
        this.drawTrex();
        this.drawScoreBoard();

        this.hideCursor();
    }

    /**
     * should be called on screen resize only.
     */
    public updateScreen(): void {
        this._height = process.stdout.rows;
        this._width = process.stdout.columns;

        // update objects drawing pos
        INITIAL_POSITION.TREX = this.trex.getDrawingPos(this._width, this._height);
        INITIAL_POSITION.RUNWAY = this.runway.getDrawingPos(this._width, this._height);
        INITIAL_POSITION.SCOREBOARD = this.scoreboard.getDrawingPos(this._width, this._height);

        this.clear();
        this.hideCursor();
        this.drawRunway();
        this.drawTrex();
        this.drawScoreBoard();
    }


    public drawRunway(): void {
        TTY.cursorTo(INITIAL_POSITION.RUNWAY);
        TTY.print(this.runway.getDrawable());
    }

    public drawTrex(): void {
        TTY.cursorTo(INITIAL_POSITION.TREX);
        TTY.print(this.trex.getDrawable());
    }

    public drawScoreBoard(): void {
        if (this.scoreboard.isDrawable()) {
            this.scoreboard.getDrawable().forEach((row, index) => {

                const pos: IScreenPosition = {
                    x: INITIAL_POSITION.SCOREBOARD.x,
                    y: INITIAL_POSITION.SCOREBOARD.y + index,
                };
                TTY.cursorTo(pos);
                TTY.print(row);

            });
        }

    }

    public clear(): void {
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

    public static print(out: string): void {
        process.stdout.write.bind(process.stdout)(out);
    }

    public static cursorTo(pos: IScreenPosition): void {
        TTY.print(ansiEscapes.cursorTo(pos.x, pos.y));
    }
}