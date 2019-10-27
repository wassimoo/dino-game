import {
    RUNNING_TREX_1,
    RUNNING_TREX_2,
    DEAD_TREX,
} from './object.constants';

export class Trex {
    private width: number;
    private height: number;

    private isAtRunningTrex1: boolean;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;

    }

    /**
     * @returns Trex running objects 1 & 2 alternatively.
     */
    public getDrawable(dead: boolean = false): string {
        if (dead) {
            this.isAtRunningTrex1 = true;
            return DEAD_TREX;
        }

        if (this.isAtRunningTrex1) {
            this.isAtRunningTrex1 = false;
            return RUNNING_TREX_1;
        } else {
            this.isAtRunningTrex1 = true;
            return RUNNING_TREX_2;
        }
    }

}