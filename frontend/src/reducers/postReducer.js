import { ACTION_TYPES } from '../actions';

const INITIAL_POST_STATE = {
	id: '',
	title: '',
	imageUrl: '',
	content: '',
	publishedAt: '',
	comments: [],
};

export const postReducer = (state = INITIAL_POST_STATE, action) => {
	switch (action.type) {
		case ACTION_TYPES.ADD_COMMENT:
			return {
				...state,
				comments: [...state.comments, action.payload],
			};
		case ACTION_TYPES.REMOVE_COMMENT:
			return {
				...state,
				comments: state.comments.filter(
					(comment) => comment.id !== action.payload,
				),
			};
		case ACTION_TYPES.SET_POST_DATA:
			return { ...state, ...action.payload };
		default:
			return state;
	}
};
