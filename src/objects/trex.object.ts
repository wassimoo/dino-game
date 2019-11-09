import { ScreenObject } from './object';
import { IScreenPosition } from '../interfaces/IPosition';
import {
    RUNWAY_BOTTOM_MARGIN,
    TREX_HEIGHT,
} from './object.constants';

import {
    RUNNING_TREX_1,
    RUNNING_TREX_2,
    DEAD_TREX,
} from './object.constants';

export class Trex extends ScreenObject {
    private screenWidth: number;
    private screenHeight: number;

    private isAtRunningTrex1: boolean;

    constructor(screenWidth: number, screenHeight: number) {
        super();
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

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

    public getDrawingPos(screenWidth: number, screenHeight: number): IScreenPosition {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        return { x: 1, y: this.screenHeight - TREX_HEIGHT - RUNWAY_BOTTOM_MARGIN };
    }
}
