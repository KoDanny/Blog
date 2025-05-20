import { ACTION_TYPES } from './ACTION_TYPES';

export const addComment = (comment) => ({
	type: ACTION_TYPES.ADD_COMMENT,
	payload: comment,
});
