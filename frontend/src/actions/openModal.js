import { ACTION_TYPES } from './ACTION_TYPES';

export const openModal = (modalParams) => ({
	type: ACTION_TYPES.OPEN_MODAL,
	payload: modalParams,
});
