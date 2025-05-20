import styled from 'styled-components';
import { Comments, PostContent, PostEditForm } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useMatch, useParams } from 'react-router-dom';
import { loadPostAsync } from '../../actions';
import { selectPost } from '../../selectors';
import { Error, PrivateContent } from '../../components';
import { ROLE } from '../../constants';

const PostContainer = ({ className }) => {
	const dispatch = useDispatch();
	const params = useParams();
	const post = useSelector(selectPost);
	const isEditing = !!useMatch('/post/:id/edit');
	const isCreating = !!useMatch('/post');
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false);
			return;
		}
		dispatch(loadPostAsync(params.id)).then((postData) => {
			setError(postData.error);
			setIsLoading(false);
		});
	}, [dispatch, params.id, isCreating]);

	if (isLoading) {
		return null;
	}

	const SpecificPostPage =
		isCreating || isEditing ? (
			<PrivateContent access={[ROLE.ADMINISTRATOR]} serverError={error}>
				<div className={className}>
					<PostEditForm post={isCreating ? { id: '' } : post} />
				</div>
			</PrivateContent>
		) : (
			<div className={className}>
				<PostContent post={post} />
				<Comments comments={post.comments} postId={post.id} />
			</div>
		);

	return error ? <Error error={error} /> : SpecificPostPage;
};

export const Post = styled(PostContainer)`
	padding: 0 80px;
	margin: 40px 0;
`;
