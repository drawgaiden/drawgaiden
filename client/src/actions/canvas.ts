import { push } from 'react-router-redux';
import { HistoryEntry } from '../../../defs/canvas';
import { Coord } from '../../../defs/canvas';
import { Response, CreateCanvasResponse, JoinCanvasResponse } from '../../../defs/protocol';

export function createCanvas() {
    return (dispatch, getState) => {
        let socket = getState().connection.socket;
        socket.emit('canvas:create', {}, (resp: CreateCanvasResponse) => {
            if (resp.success) {
                dispatch(push(`/canvas/${resp.id}`));
            } else {
                console.error(resp.errorMessage);
            }
        });
    }
}

export function joinCanvas(canvasID: string) {
    return (dispatch, getState) => {
        dispatch({ type: 'JOIN_CANVAS_STARTED' });
        let socket = getState().connection.socket;
        socket.emit('canvas:join', { canvasID }, (resp: JoinCanvasResponse) => {
            if (resp.success) {
                dispatch({
                    type: 'JOIN_CANVAS_SUCCESS',
                    payload: {
                        canvas: resp.canvas,
                        history: resp.history,
                        users: resp.users
                    }
                });
            } else {
                // dispatch({
                //     type: 'JOIN_CANVAS_FAILED',
                //     payload: resp.errorMessage
                // });
                dispatch(push('/404'));
            }
        });
    };
}

export function draw(entry: HistoryEntry) {
    return (dispatch, getState) => {
        let socket = getState().connection.socket;
        socket.emit('canvas:draw', { entry }, (resp: Response) => {
            if (!resp.success) {
                console.error(resp.errorMessage);
            }
        });
    }
}

export function setMousePosition(coord: Coord) {
    return (dispatch, getState) => {
        let socket = getState().connection.socket;
        socket.emit('user:position:set', { coord }, (resp: Response) => {
            if (!resp.success) {
                console.error(resp.errorMessage);
            }
        });
    }
}