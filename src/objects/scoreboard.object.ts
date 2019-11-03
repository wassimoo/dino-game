import { IScreenPosition } from '../interfaces/IPosition';
import {
    SCOREBOARD_RIGHT_MARGIN,
    SCOREBOARD_TOP_MARGIN,
} from './object.constants';
import { ScreenObject } from './object';

const SCORE_TEXT = 'Current Score:';
const HIGHEST_SCORE_TEXT = 'Highest Score:';

const SCORE_MIN_UNITS = 5;
const SCORE_MAX_UNITS = 7;

const MIN_BOARD_WIDTH = SCORE_MIN_UNITS + SCORE_TEXT.length + 2; // +2 for borders
const MIN_BOARD_HEIGHT = 4; // minimum to display 2 scores (current & highest)

export class Scoreboard extends ScreenObject {

    // screen dimensions
    private screenWidth: number;
    private screenHeight: number;

    // scoreboad dimensions
    private _boardWidth: number;
    private _boardHeight: number;

    // booleans
    private drawable: boolean;
    private showHighScore: boolean; // only if there's enough space.

    // absolute positions
    private boardDrawingPos: IScreenPosition;

    // in board positions
    private inBoardScoreTextPos: IScreenPosition;
    private inBoardHighScoreTextPos: IScreenPosition;

    private inBoardScorePos: IScreenPosition;
    private inBoardHighScorePos: IScreenPosition;

    // actual score units between MIN_UNITS..MAX_UNITS
    private scoreUnits: number;

    // drawable scoreboard
    private scoreBoard: string[];

    // scores
    private highScore: number;
    private currentScore: number;

    constructor(width: number, height: number, highScore: number, score: number = 0) {
        super();
        this.screenWidth = width;
        this.screenHeight = height;

        this.highScore = highScore;
        this.currentScore = score;

        this._boardWidth = Math.floor(this.screenWidth * 0.3); // 30% of width
        this._boardHeight = Math.floor(this.screenHeight * 0.2); // 20% of height

        this.drawable = this._boardHeight >= MIN_BOARD_HEIGHT && this._boardWidth >= MIN_BOARD_WIDTH;

        // assure space for both scores
        if (this._boardHeight % 2 !== 0) {
            this._boardHeight++;
        }

        // in screen position
        this.boardDrawingPos = { x: this.screenWidth - this._boardWidth - SCOREBOARD_RIGHT_MARGIN, y: SCOREBOARD_TOP_MARGIN };

        // calculate actual score units
        this.scoreUnits = this._boardWidth - SCORE_TEXT.length - 2;
        if (this.scoreUnits > SCORE_MAX_UNITS) {
            this.scoreUnits = SCORE_MAX_UNITS;
        }

        // initialize board content
        this.initScoreBoard(7899);
    }

    private initScoreBoard(highScore: number, score: number = 0) {
        const board: string[] = this.initEdges();

        this.calculateScoreTextPosition();
        // calculate score positions relatively to board width, height, score texts and score units
        this.calculateScorePosition();


        this.insertContent(board, SCORE_TEXT, this.inBoardScoreTextPos.y);
        this.insertContent(board, HIGHEST_SCORE_TEXT, this.inBoardHighScoreTextPos.y);
        this.scoreBoard = board;

        this.updateCurrentScore(score);
        this.updateHighScore(highScore);
    }

    public updateDimensions(width: number, height: number): void {

    }

    private updateHighScore(newScore: number) {
        this.highScore = newScore;
        let score = newScore.toString();
        if (score.length < this.scoreUnits) {
            score = score.padStart(this.scoreUnits, '0');
        }
        this.insertContent(this.scoreBoard, score, this.inBoardHighScorePos.y, this.inBoardHighScorePos.x);
    }

    public updateCurrentScore(newScore: number) {
        this.currentScore = newScore;
        let score = newScore.toString();
        if (score.length < this.scoreUnits) {
            score = score.padStart(this.scoreUnits, '0');
        }
        this.insertContent(this.scoreBoard, score, this.inBoardScorePos.y, this.inBoardScorePos.x);
    }

    private calculateScoreTextPosition(): void {
        const topMargin = Math.floor(this._boardHeight * 0.25); // 25% under board top edge
        const bottomMargin = Math.floor(this._boardHeight * 0.25); // 25% above board bottom edge
        const leftMargin = 0;

        // in board position
        this.inBoardScoreTextPos = { x: leftMargin, y: topMargin - 1 };
        this.inBoardHighScoreTextPos = { x: leftMargin, y: this._boardHeight - bottomMargin - 2 };

        // draw high score or not
        this.showHighScore = bottomMargin + topMargin + 4 <= this._boardHeight;
    }

    private calculateScorePosition(): void {

        // rightMargin = freespace * 0.80 ;
        const contentLength = SCORE_TEXT.length + this.inBoardScoreTextPos.x + this.scoreUnits + 2;
        const rightMargin = Math.floor((this._boardWidth - contentLength) * 0.55); // 80% to the right
        const xPos = this._boardWidth - this.scoreUnits - rightMargin - 2;

        this.inBoardScorePos = { x: xPos, y: this.inBoardScoreTextPos.y };
        this.inBoardHighScorePos = { x: xPos, y: this.inBoardHighScoreTextPos.y };

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

    /***************** getters *****************/
    public isDrawable(): boolean {
        return this.drawable;
    }

    public isHighScoreDrawable(): boolean {
        return this.showHighScore;
    }

    public getDrawable(): string[] {
        return this.scoreBoard;
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
}
