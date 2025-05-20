import { ACTION_TYPES } from '../actions';

const INITIAL_APP_STATE = {
	wasLogout: false,
	modal: {
		isOpen: false,
		text: '',
		onConfirm: () => {},
		onCancel: () => {},
	},
};

export const appReducer = (state = INITIAL_APP_STATE, action) => {
	switch (action.type) {
		case ACTION_TYPES.OPEN_MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					...action.payload,
					isOpen: true,
				},
			};
		case ACTION_TYPES.CLOSE_MODAL:
			return INITIAL_APP_STATE;
		case ACTION_TYPES.LOGOUT:
			return { ...state, wasLogout: !state.wasLogout };
		default:
			return state;
	}
};
