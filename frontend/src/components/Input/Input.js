import styled from 'styled-components';
import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const InputContainer = forwardRef(({ className, width, ...props }, ref) => {
	return <input className={className} {...props} ref={ref} />;
});

export const Input = styled(InputContainer)`
	height: 40px;
	width: ${({ width = '100%' }) => width};
	padding: 5px 10px;
	margin-bottom: 10px;
	border: 1px solid #111;
	font-size: 18px;
`;

Input.propTypes = {
	width: PropTypes.string,
};
