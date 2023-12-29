import {
    SET_CENTER,
    SET_FORMAT,
    SET_HEIGHT,
    SET_ORIENTATION,
    SET_PAGE_SIZE,
    SET_RESOLUTION,
    SET_SCALE,
    SET_WIDTH
} from '../actions/mapPrintActionTypes';

type MapPrintState = {
    center: number[] | null;
    width: number | null;
    height: number | null;
    orientation: string | null;
    format: string | null;
    pageSize: string;
    resolution: string;
    scale: string;
};

export const initialState: MapPrintState = {
    center: null,
    width: null,
    height: null,
    orientation: null,
    format: null,
    pageSize: 'a4-landscape',
    resolution: '200',
    scale: '100'
};

export const reducer = (
    state = initialState,
    action: { type: any; payload: any }
) => {
    switch (action.type) {
        case SET_CENTER:
            return { ...state, center: action.payload };
        case SET_WIDTH:
            return { ...state, width: action.payload };
        case SET_HEIGHT:
            return { ...state, height: action.payload };
        case SET_ORIENTATION:
            return { ...state, orientation: action.payload };
        case SET_FORMAT:
            return { ...state, format: action.payload };
        case SET_PAGE_SIZE:
            return { ...state, pageSize: action.payload };
        case SET_RESOLUTION:
            return { ...state, resolution: action.payload };
        case SET_SCALE:
            return { ...state, scale: action.payload };
        default:
            return state;
    }
};
