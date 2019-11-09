import { IScreenPosition } from '../interfaces/IPosition';

export abstract class ScreenObject {

    public abstract getDrawable(): any;

    public abstract getDrawingPos(screenHeight: number, screenWidth: number): IScreenPosition;
}