/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { SCompartmentElementSchema, SShapeElement } from 'sprotty/lib/graph'
import { SChildElement, SModelElementSchema, SModelRootSchema } from "sprotty/lib/base"
import { Bounds, Direction } from "sprotty/lib/utils"
import {
    BoundsAware, boundsFeature, Fadeable, fadeFeature, layoutFeature, Layouting, Selectable,
    selectFeature, viewportFeature, hoverFeedbackFeature, popupFeature
} from 'sprotty/lib/features'
import { ViewportRootElement } from "sprotty/lib/features/viewport/viewport-root"
import { CORE_DISTANCE, CORE_WIDTH } from "./views"
import { Hoverable } from "sprotty/lib/features/hover/model"

export interface ProcessorSchema extends SModelRootSchema {
    rows: number
    columns: number
}

export class Processor extends ViewportRootElement implements BoundsAware {
    rows: number = 0
    columns: number = 0

    get bounds(): Bounds {
        return {
            x: -3 * CORE_DISTANCE,
            y: -3 * CORE_DISTANCE,
            width: this.columns * (CORE_WIDTH + CORE_DISTANCE) + 5 * CORE_DISTANCE,
            height: this.rows * (CORE_WIDTH + CORE_DISTANCE) + 5 * CORE_DISTANCE
        }
    }

    hasFeature(feature: symbol): boolean {
        return feature === viewportFeature || feature === boundsFeature
    }
}

export interface CoreSchema extends SModelElementSchema {
    row: number
    column: number
    kernelNr?: number
    selected?: boolean
    layout: string
    resizeContainer: boolean
    children: SCompartmentElementSchema[]
}

export class Core extends SShapeElement implements Selectable, Fadeable, Hoverable, Layouting {
    hoverFeedback: boolean = false
    column: number = 0
    row: number = 0
    kernelNr: number = -1
    selected: boolean = false
    opacity: number = 1
    layout: string = 'vbox'
    resizeContainer: boolean = false

    hasFeature(feature: symbol): boolean {
        return feature === selectFeature || feature === fadeFeature || feature === layoutFeature
            || feature === hoverFeedbackFeature || feature === popupFeature
    }
}

export interface CrossbarSchema extends SModelElementSchema {
    selected?: boolean
    direction: Direction
    load: number
}

export class Crossbar extends SChildElement {
    direction: Direction
    load: number = 0
}

export interface ChannelSchema extends SModelElementSchema {
    row: number
    column: number
    direction: Direction
    selected?: boolean
    load: number
}

export class Channel extends SChildElement implements Selectable {
    column: number = 0
    row: number = 0
    direction: Direction
    load: number = 0
    selected: boolean = false

    hasFeature(feature: symbol): boolean {
        return feature === selectFeature
    }
}


