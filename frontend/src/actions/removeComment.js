import { ACTION_TYPES } from './ACTION_TYPES';

export const removeComment = (commentId) => ({
	type: ACTION_TYPES.REMOVE_COMMENT,
	payload: commentId,
});
