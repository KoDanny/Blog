import styled from 'styled-components';
import { Icon } from '../../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_MODAL, openModal, removeCommentAsync } from '../../../../../actions';
import { checkAccess } from '../../../../../utils';
import { ROLE } from '../../../../../constants';
import { selectUserRole } from '../../../../../selectors';
import PropTypes from 'prop-types';

const CommentContainer = ({
	className,
	comment: { id, publishedAt, content, author },
	postId,
}) => {
	const dispatch = useDispatch();

	const onCommentRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий',
				onConfirm: () => {
					dispatch(removeCommentAsync(postId, id));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const userRole = useSelector(selectUserRole);

	const isAdminOrModerator = checkAccess(
		[ROLE.ADMINISTRATOR, ROLE.MODERATOR],
		userRole,
	);

	return (
		<div className={className}>
			<div className="comment">
				<div className="information-panel">
					<div className="author">
						<Icon id="fa-user-circle-o" size="18px" margin="0 10px 0 0" />
						{author}
					</div>
					<div className="published-at">
						<Icon id="fa-calendar-o" size="18px" margin="0 10px 0 0" />
						{publishedAt}
					</div>
				</div>
				<div className="comment-text">{content}</div>
			</div>
			{isAdminOrModerator && (
				<Icon
					id="fa-trash-o"
					size="21px"
					margin="0 0 0 10px"
					isButton={true}
					onClick={() => onCommentRemove(id)}
				/>
			)}
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	margin: 20px 0 0;

	& .comment {
		width: 550px;
		border: 1px solid black;
		padding: 5px 10px;
	}
	& .information-panel {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}
	& .author {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 20px;
	}
	& .published-at {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 20px;
	}

	& .comment-text {
		margin-bottom: 5px;
	}
`;

Comment.propTypes = {
	id: PropTypes.string.isRequired,
	authorId: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	authorLogin: PropTypes.string.isRequired,
};
