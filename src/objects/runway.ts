
export class Runway {
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
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
}
