export abstract class ScreenObject {

    public abstract getDrawable(): any;

    public abstract updateDimensions(width: number, height: number): void;

}