import styled from 'styled-components';
import { Icon, Input } from '../../../../components';
import PropTypes from 'prop-types';

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input value={searchPhrase} placeholder="Поиск..." onChange={onChange} />
			<Icon id="fa-search" size="26px" />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	position: relative;
	display: flex;
	align-items: center;
	margin: 30px auto 0;
	height: 40px;
	width: 340px;
	text-align: center;

	& input {
		width: 340px;
		margin: 0;
		padding-right: 40px;
	}

	& > div {
		position: absolute;
		top: 1px;
		right: 10px;
	}
`;

Search.propTypes = {
	searchPhrase: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};
