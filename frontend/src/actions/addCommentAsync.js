import { request } from '../utils';
import { addComment } from './addComment';

export const addCommentAsync = (postId, content) => (dispatch) => {
	request(`/posts/${postId}/comments`, 'POST', { content }).then((comment) => {
		dispatch(addComment(comment.data));
	});
};
