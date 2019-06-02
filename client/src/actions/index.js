import streams from "../apis/streams";
import history from '../history';
import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from "./types";

// Google Authログイン
export const signIn = userId => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

// Google Authログアウト
export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

/*
* RESTに則ったAPIへ、Streamに関するリクエストを行う
*/
// streamを作成する ここでstreamに対してGoogleのuserIdを紐付ける
// 作成したstreamオブジェクトをstateに保存
export const createStream = formValue => async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await streams.post('/streams', { ...formValue, userId });
    dispatch({type: CREATE_STREAM, payload: response.data});

    // after creating navitation to StreamList page
    history.push('/');
};

// streamの一覧を取得する
// streamオブジェクトの配列をstateに保存
export const fetchStreams = () => async dispatch => {
    const response = await streams.get('./streams');
    dispatch({type: FETCH_STREAMS, payload: response.data});
}

// streamのidから 単一のstreamを取得する
// 修正結果のデータをstateに保存
export const fetchStream = (id) => async dispatch => {
    const response = await streams.get(`/streams/${id}`);
    dispatch({type: FETCH_STREAM, payload: response.data});
}

// streamのidから 単一のstreamの更新情報を送信する (PUTメソッド)
// 修正結果のデータstateに保存
export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.patch(`/streams/${id}`, formValues);
    dispatch({type: EDIT_STREAM, payload: response.data});
    history.push('/');
}

// streamのidから 単一のstreamの削除を実行する (DELETEメソッド)
// レスポンスは利用しない
export const deleteStream = (id)  => async dispatch => {
    await streams.delete(`/streams/${id}`);
    dispatch({type: DELETE_STREAM, payload: id})
    history.push('/');
};
