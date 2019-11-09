import { ScreenObject } from './object';
import { IScreenPosition } from '../interfaces/IPosition';
import { RUNWAY_BOTTOM_MARGIN } from './object.constants';
export class Runway extends ScreenObject {
    private screenWidth: number;
    private screenHeight: number;

    constructor(width: number, height: number) {
        super();
        this.screenWidth = width;
        this.screenHeight = height;

    }

    public getDrawable(): string {
        let drawable: string = '';

        for (let i = 0; i < this.screenWidth; i++) {
            drawable += '_';
        }

        return drawable;
    }

    public getDrawingPos(screenWidth: number, screenHeight: number ): IScreenPosition {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        return { x: 0, y: this.screenHeight - RUNWAY_BOTTOM_MARGIN };
    }
}
