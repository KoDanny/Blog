import { useSelector } from 'react-redux';
import { Error } from '../Error/Error';
import { selectUserRole } from '../../selectors';
import { ERRORS, PROP_TYPES } from '../../constants';
import { checkAccess } from '../../utils';
import PropTypes from 'prop-types';

export const PrivateContent = ({ children, access, serverError }) => {
	const userRole = useSelector(selectUserRole);

	const accessError = checkAccess(access, userRole) ? null : ERRORS.ACCESS_DENIED;
	const error = serverError || accessError;

	return error ? <Error error={error} /> : children;
};

PrivateContent.propTypes = {
	children: PropTypes.node.isRequired,
	access: PropTypes.arrayOf(PROP_TYPES.ROLE),
	serverError: PROP_TYPES.ERRORS,
};
