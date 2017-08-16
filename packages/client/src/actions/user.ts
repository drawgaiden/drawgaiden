import { push } from 'react-router-redux';
import { Response } from '../../../common/protocol';

export function login(username: string, redirect?: string) {
    return (dispatch, getState) => {
        dispatch({ type: 'LOGIN_STARTED' });
        let socket = getState().connection.socket;
        socket.emit('login', { username }, (resp: Response) => {
            if (resp.success) {
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: username
                });
                if (redirect) {
                    dispatch(push(redirect));
                }
            } else {
                dispatch({
                    type: 'LOGIN_FAILED',
                    payload: resp.errorMessage
                });
            }
        });
    };
}