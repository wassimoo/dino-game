import { IScreenPosition } from '../interfaces/IPosition';
import {
    SCOREBOARD_RIGHT_MARGIN,
    SCOREBOARD_TOP_MARGIN,
} from './object.constants';

const SCORE_TEXT = 'Current Score:';
const HIGHEST_SCORE_TEXT = 'Highest Score:';

const SCORE_MIN_UNITS = 5;
const SCORE_MAX_UNITS = 7;

const MIN_BOARD_WIDTH = 20;
const MIN_BOARD_HEIGHT = 4; // minimum to display 2 scores (current & highest)

export class Scoreboard {

    private screenWidth: number;
    private screenHeight: number;

    private _boardWidth: number;
    private _boardHeight: number;

    private drawable: boolean;
    private showHighScore: boolean; // only if there's enough space.

    private boardDrawingPos: IScreenPosition;
    private scoreDrawingPos: IScreenPosition;
    private highScoreDrawingPos: IScreenPosition;

    private inBoardScoreDrawingPos: IScreenPosition;
    private inBoardHighScoreDrawingPos: IScreenPosition;

    private scoreBoard: string[];

    private highScore: number;

    constructor(width: number, height: number, highScore: number) {
        this.screenWidth = width;
        this.screenHeight = height;

        this.highScore = highScore;

        this._boardWidth = Math.floor(this.screenWidth * 0.3); // 30% of width
        this._boardHeight = Math.floor(this.screenHeight * 0.2); // 20% of height

        this.drawable = this._boardHeight >= MIN_BOARD_HEIGHT && this._boardWidth >= MIN_BOARD_WIDTH;

        // assure space for both scores
        if (this._boardHeight % 2 !== 0) {
            this._boardHeight++;
        }

        const scoreMarginTop = Math.floor(this._boardHeight * 0.25);
        const highScoreMarginBottom = Math.floor(this._boardHeight * 0.25);

        this.showHighScore = highScoreMarginBottom + scoreMarginTop + 4 <= this._boardHeight;

        // in board position
        this.inBoardScoreDrawingPos = { x: 0, y: scoreMarginTop - 1 };
        this.inBoardHighScoreDrawingPos = { x: 0, y: this._boardHeight - highScoreMarginBottom - 2 };

        // in screen position
        this.boardDrawingPos = { x: this.screenWidth - this._boardWidth - SCOREBOARD_RIGHT_MARGIN, y: SCOREBOARD_TOP_MARGIN };
        const score_x = this.boardDrawingPos.x;
        this.scoreDrawingPos = { x: score_x, y: this.boardDrawingPos.y + scoreMarginTop };
        this.highScoreDrawingPos = { x: score_x, y: this.boardDrawingPos.y + this._boardHeight - highScoreMarginBottom - 2 };

        // initialize board content without actual scores
        this.initScoreBoard();
    }

    private initScoreBoard() {
        const board: string[] = this.initEdges();
        this.insertContent(board, SCORE_TEXT, this.inBoardScoreDrawingPos.y);
        this.insertContent(board, HIGHEST_SCORE_TEXT, this.inBoardHighScoreDrawingPos.y);

        this.scoreBoard = board;
    }

    public isDrawable(): boolean {
        return this.drawable;
    }

    public isHighScoreDrawable(): boolean {
        return this.showHighScore;
    }

    public getDrawable(): string[] {
        return this.scoreBoard;
    }

    /**
     * Inserts text into scoredboard
     * @param board insertion board
     * @param text insertion text
     * @param y 0 based index position
     * @param x 0 based index position
     */
    private insertContent(board: string[], text: string, y: number, x: number = 0) {
        const sc = [...board[y + 1]];
        sc.splice(x + 1, text.length, ...text);
        board[y + 1] = sc.join('');
    }

    private initEdges(): string[] {
        const edges: string[][] = Array(this._boardHeight).fill(false).map((rowVal, rowIndex) =>
            Array(this._boardWidth).fill(false).map((colVal, colIndex) => {
                if (rowIndex === 0 || rowIndex === this._boardHeight - 1) {
                    return '─';
                } else if (colIndex === 0 || colIndex === this._boardWidth - 1) {
                    return '│';
                } else {
                    return ' ';
                }
            }));

        edges[0][0] = '┌';
        edges[0][this._boardWidth - 1] = '┐';
        edges[this._boardHeight - 1][0] = '└';
        edges[this._boardHeight - 1][this._boardWidth - 1] = '┘';

        return edges.map((v) => v.join(''));
    }

    public getBoardWidth(): number {
        return this._boardWidth;
    }

    public getBoardHeight(): number {
        return this._boardHeight;
    }

    public getBoardDrawingPos(): IScreenPosition {
        return this.boardDrawingPos;
    }

    public getScoreDrawingPos(): IScreenPosition {
        return this.scoreDrawingPos;
    }

    public getHighScoreDrawingPos(): IScreenPosition {
        return this.highScoreDrawingPos;
    }
}
