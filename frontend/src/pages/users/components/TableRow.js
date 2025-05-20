import PropTypes from 'prop-types';
import styled from 'styled-components';

const TableRowContainer = ({ className, children }) => (
	<div className={className}>{children}</div>
);
export const TableRow = styled(TableRowContainer)`
	display: flex;
	align-items: center;
	border: ${({ border }) => (border ? '1px solid black;' : 'none;')};
	padding: 5px 20px;

	& .login-column {
		width: 170px;
	}

	& .registered-at-column {
		width: 200px;
	}

	& .role-column {
		width: 170px;
	}

	& > div {
		display: flex;
	}
`;

TableRow.propTypes = {
	children: PropTypes.node.isRequired,
};
