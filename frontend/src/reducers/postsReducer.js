import { ACTION_TYPES } from '../actions';

const INITIAL_POSTS_STATE = {};

export const postsReducer = (state = INITIAL_POSTS_STATE, action) => {
	switch (action.type) {
		case ACTION_TYPES.RESET_POST_DATA:
			return INITIAL_POSTS_STATE;
		default:
			return state;
	}
};
