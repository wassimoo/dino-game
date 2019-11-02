import { ScreenObject } from './object';

export class Runway extends ScreenObject {
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
        super();
        this.width = width;
        this.height = height;

    }

    public getDrawable(): string {
        let drawable: string = '';

        for (let i = 0; i < this.width; i++) {
            drawable += '_';
        }

        return drawable;
    }

    public updateDimensions(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }
}
