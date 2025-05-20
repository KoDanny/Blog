import { ACTION_TYPES } from './ACTION_TYPES';

export const setPostData = (postData) => ({
	type: ACTION_TYPES.SET_POST_DATA,
	payload: postData,
});
