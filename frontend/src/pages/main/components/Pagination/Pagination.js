import styled from 'styled-components';
import { Button } from '../../../../components';
import PropTypes from 'prop-types';

const PaginationContainer = ({ className, setCurrentPage, currentPage, lastPage }) => {
	if (lastPage < 2) return null;

	return (
		<div className={className}>
			<Button disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>
				В начало
			</Button>
			<Button
				disabled={currentPage === 1}
				onClick={() => setCurrentPage(currentPage - 1)}
			>
				Предыдущая
			</Button>
			<div className="current-page">Страница: {currentPage}</div>
			<Button
				disabled={currentPage === lastPage}
				onClick={() => setCurrentPage(currentPage + 1)}
			>
				Следующая
			</Button>
			<Button
				disabled={currentPage === lastPage}
				onClick={() => setCurrentPage(lastPage)}
			>
				В конец
			</Button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	position: absolute;
	bottom: -10px;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	margin: 0;
	padding: 0 35px;

	& button {
		margin: 0 5px;
	}

	& .current-page {disabled={page === 1}
		line-height: 28px;
		border: 1px solid #333;
		width: 100%;
		font-size: 18px;
		font-weight: 500;
		height: 32px;
		text-align: center;
		margin: 0 5px;
	}
`;

Pagination.propTypes = {
	setCurrentPage: PropTypes.func.isRequired,
	currentPage: PropTypes.number.isRequired,
	paginationData: PropTypes.object.isRequired,
};
