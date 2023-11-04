// /app/redux/actions.ts
export const FETCH_DATA = 'FETCH_DATA';
export const SET_DATA = 'SET_DATA';

export const fetchData = () => ({ type: FETCH_DATA });
export const setData = (data: any) => ({ type: SET_DATA, payload: data });



// DATA WEDDING_SLUG
export const FETCH_NEW_DATA = 'FETCH_NEW_DATA';
export const SET_NEW_DATA = 'SET_NEW_DATA';

export const fetchNewData = () => ({ type: FETCH_NEW_DATA });
export const setNewData = (data: any) => ({ type: SET_NEW_DATA, payload: data });
