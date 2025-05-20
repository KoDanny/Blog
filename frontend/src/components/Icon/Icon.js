import PropTypes from 'prop-types';
import styled from 'styled-components';

const IconContainer = ({ className, isButton, id, ...props }) => (
	<div className={className} {...props}>
		<i className={`fa ${id}`} aria-hidden="true"></i>
	</div>
);

export const Icon = styled(IconContainer)`
	font-size: ${({ size = '24px' }) => size};
	margin: ${({ margin = '0' }) => margin};
	color: ${({ disabled }) => (disabled ? '#ccc;' : '#000;')};

	&:hover {
		cursor: ${({ isButton }) => (isButton ? 'pointer' : 'default')};
	}
`;

Icon.propTypes = {
	id: PropTypes.string.isRequired,
	isButton: PropTypes.bool,
};
