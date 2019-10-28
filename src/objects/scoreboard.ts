const MIN_BOARD_WIDTH = 7; // minimum to display 4 numbers
const MIN_BOARD_HEIGHT = 4; // minimum to display 2 scores (current & highest)


export class Scoreboard {


    private screenWidth: number;
    private screenHeight: number;

    private _boardWidth: number;
    private _boardHeight: number;

    private drawable: boolean;

    private score: number;
    private highscore: number;

    constructor(width: number, height: number) {
        this.screenWidth = width;
        this.screenHeight = height;

        this._boardWidth = Math.floor(this.screenWidth * 0.3); // 30% of width
        this._boardHeight = Math.floor(this.screenHeight * 0.2); // 20% of height

        this.drawable = this._boardHeight >= MIN_BOARD_HEIGHT && this._boardWidth >= MIN_BOARD_WIDTH;

        if (this._boardHeight % 2 !== 0) {
            this._boardHeight++;
        }
    }

    public isDrawable(): boolean {
        return this.drawable;
    }

    public getDrawable(): string[] {
        return this.getDrawableEdges();
    }

    private getDrawableEdges(): string[] {
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
}
