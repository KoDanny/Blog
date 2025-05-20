import { request } from '../utils';
import { ACTION_TYPES } from './ACTION_TYPES';

export const logout = () => {
	request('/logout', 'POST');

	return {
		type: ACTION_TYPES.LOGOUT,
	};
};
