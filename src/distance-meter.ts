import { DISTANCE_METER_CONFIGS as configs } from './configs.constants';

export class DistanceMeter {
    private distanceRan: number;
    private highestscore: number;

    private msPerFrame: number;
    private lastDistanceUpdatetime: number; // in ms

    //TODO: add highscore flashing

    constructor(msPerFrame: number, highScore: number, distance: number = 0) {
        this.distanceRan = distance;
        this.highestscore = highScore;
        this.msPerFrame = msPerFrame;
        this.lastDistanceUpdatetime = Date.now();
    }

    public update(): void {
        const now = Date.now();
        const delta = now - (this.lastDistanceUpdatetime || now); // ms between function calls
        this.lastDistanceUpdatetime = now;

        this.distanceRan += delta / this.msPerFrame; // 1 px per frame.
        if (this.distanceRan > this.highestscore) {
            this.highestscore = this.distanceRan;
        }

    }

    /**
     * Resets the distance meter back to zero
     */
    public reset(): void {
        this.distanceRan = 0;
        this.lastDistanceUpdatetime = Date.now();
    }

    /**
     * converts pixel distance to a 'real' distance
     * @param pixel distance ran
     * @return real distance ran
     */
    public getActualDistance(): number {
        return this.distanceRan ? Math.round(this.distanceRan * configs.COEFFICIENT) : 0;
    }
}
