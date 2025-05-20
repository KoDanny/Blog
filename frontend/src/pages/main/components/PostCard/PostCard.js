import styled from 'styled-components';
import { Icon } from '../../../../components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PostCardContainer = ({
	className,
	id,
	title,
	imageUrl,
	publishedAt,
	commentsCount,
}) => {
	return (
		<div className={className}>
			<Link to={`/post/${id}`}>
				<div className="img-block">
					<img src={imageUrl} alt={title}></img>
				</div>
				<div className="post-card-footer">
					<h4>{title}</h4>
					<div className="post-card-info">
						<div className="published-at">
							<Icon id="fa-calendar-o" margin="0 7px 0 0" size="18px" />
							{publishedAt}
						</div>
						<div className="comments-count">
							<Icon id="fa-comment-o" margin="0 7px 0 0" size="18px" />
							{commentsCount}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const PostCard = styled(PostCardContainer)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 280px;
	height: 280px;
	margin: 10px;
	border: 1px solid #333;

	& .img-block {
		width: 100%;
		height: 160px;
		overflow: hidden;
		margin: 0;
	}

	& img {
		display: block;
		width: 100%;
		object-fit: contain;
		border-bottom: 1px solid #333;
	}

	& h4 {
		margin: 0;
	}

	& .post-card-footer {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 5px;
		min-height: 120px;
	}

	& .post-card-info {
		display: flex;
		justify-content: space-between;
		margin: 5px;
	}

	& .published-at,
	& .comments-count {
		display: flex;
		height: 20px;
		align-items: center;
		margin-top: 10px;
	}
`;

PostCard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	commentsCount: PropTypes.number.isRequired,
};
