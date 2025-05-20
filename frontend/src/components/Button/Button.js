import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonContainer = ({ className, width, children, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	font-size: 18px;
	width: ${({ width = '100%' }) => width};
	height: 32px;
	border: 1px solid #000;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #eee;

	&:hover {
		cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
	}
`;

Button.propTypes = {
	children: PropTypes.node.isRequired,
	width: PropTypes.string,
};
