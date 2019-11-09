import { DISTANCE_METER_CONFIGS as configs } from './configs.constants';

export class DistanceMeter {
    private distanceRan: number;
    private highestscore: number;

    //TODO: add highscore flashing

    constructor(highScore: number, distance: number = 0) {
        this.distanceRan = distance;
        this.highestscore = highScore;
    }

    public update(distance: number): number {
        if (distance > 0) {
            this.distanceRan += distance; // 1 px per frame.
            if (this.distanceRan > this.highestscore) {
                this.highestscore = this.distanceRan;
            }
            return this.getActualDistance();
        } else {
            this.distanceRan = 0;
            return 0;
        }
    }

    /**
     * Resets the distance meter back to zero
     */
    public reset(): void {
        this.update(0);
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
