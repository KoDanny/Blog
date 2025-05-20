import { ACTION_TYPES } from '../actions';
import { ROLE } from '../constants';

const INITIAL_USER_STATE = {
	session: null,
	id: null,
	login: null,
	roleId: ROLE.GUEST,
};

export const userReducer = (state = INITIAL_USER_STATE, action) => {
	switch (action.type) {
		case ACTION_TYPES.SET_USER:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPES.LOGOUT:
			return INITIAL_USER_STATE;
		default:
			return state;
	}
};
