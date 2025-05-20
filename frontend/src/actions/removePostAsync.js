import { request } from '../utils';

export const removePostAsync = (id) => (dispatch) => request(`/posts/${id}`, 'DELETE');
