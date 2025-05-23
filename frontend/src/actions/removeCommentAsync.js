import { request } from '../utils';
import { removeComment } from './removeComment';

export const removeCommentAsync = (postId, id) => (dispatch) => {
	request(`/posts/${postId}/comments/${id}`, 'DELETE').then(() => {
		dispatch(removeComment(id));
	});
};
