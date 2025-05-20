import styled from 'styled-components';
import { Icon } from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_MODAL, openModal, removePostAsync } from '../../../../actions';
import { useNavigate } from 'react-router-dom';
import { checkAccess } from '../../../../utils';
import { ROLE } from '../../../../constants';
import { selectUserRole } from '../../../../selectors';
import PropTypes from 'prop-types';

const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onPostRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить статью',
				onConfirm: () => {
					dispatch(removePostAsync(id)).then(() => {
						navigate('/');
					});
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};
	const userRole = useSelector(selectUserRole);
	const isAdmin = checkAccess([ROLE.ADMINISTRATOR], userRole);

	return (
		<div className={className}>
			<div className="published-at">
				{publishedAt && (
					<Icon id="fa-calendar-o" size="20px" margin="0 10px 0 0" />
				)}
				{publishedAt}
			</div>
			{isAdmin && (
				<div className="buttons">
					{editButton}
					{publishedAt && (
						<Icon
							id="fa-trash-o"
							size="24px"
							onClick={() => onPostRemove(id)}
							margin="0 0 0 7px"
							isButton={true}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;

	margin: ${({ margin }) => margin};

	& .buttons {
		display: flex;
		align-items: center;
	}

	& .published-at {
		display: flex;
		align-items: center;
		height: 40px;
		font-size: 20px;
	}

	& i {
		position: relative;
		top: -2px;
	}
`;

SpecialPanel.propTypes = {
	id: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	editButton: PropTypes.func.isRequired,
};
