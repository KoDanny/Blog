import { ACTION_TYPES } from './ACTION_TYPES';

export const setUser = (user) => ({
	type: ACTION_TYPES.SET_USER,
	payload: user,
});
