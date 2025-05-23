import { request } from '../utils';
import { setPostData } from './setPostData';

export const savePostAsync = (id, newPostData) => (dispatch) => {
	const saveRequest = id
		? request(`/posts/${id}`, 'PATCH', newPostData)
		: request('/posts', 'POST', newPostData);

	return saveRequest.then((updatedPost) => {
		dispatch(setPostData(updatedPost.data));

		return updatedPost.data;
	});
};
