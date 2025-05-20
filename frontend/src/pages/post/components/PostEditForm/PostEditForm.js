import { Icon, Input } from '../../../../components';
import { SpecialPanel } from '../SpecialPanel/SpecialPanel';
import { useRef, useState } from 'react';
import { sanitizeContent } from './utils';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { savePostAsync } from '../../../../actions';
import { useNavigate } from 'react-router-dom';
import { PROP_TYPES } from '../../../../constants';

const PostEditFormContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl || '');
	const [titleValue, setTitleValue] = useState(title || '');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSave = () => {
		const newContent = sanitizeContent(contentRef.current.textContent);
		dispatch(
			savePostAsync(id, {
				imageUrl: imageUrlValue,
				title: titleValue,
				content: newContent,
			}),
		).then(({ id }) => navigate(`/post/${id}`));
	};

	const onImageChange = ({ target }) => setImageUrlValue(target.value);
	const onTitleChange = ({ target }) => setTitleValue(target.value);

	const contentRef = useRef(null);

	return (
		<div className={className}>
			<Input
				value={imageUrlValue}
				placeholder="Изображение"
				onChange={onImageChange}
			/>
			<Input value={titleValue} placeholder="Заголовок" onChange={onTitleChange} />
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				margin="20px 0"
				editButton={
					<Icon
						id="fa-floppy-o"
						size="24px"
						isButton={true}
						onClick={onSave}
						margin="0 10px 0 0"
					/>
				}
			/>

			<div
				contentEditable
				suppressContentEditableWarning
				className="post-text"
				ref={contentRef}
			>
				{content}
			</div>
		</div>
	);
};

export const PostEditForm = styled(PostEditFormContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}

	& .post-text {
		min-height: 160px;
		font-size: 18px;
		white-space: pre-line;
		border: 1px solid black;
		padding: 5px;
	}
`;

PostEditForm.propTypes = {
	post: PROP_TYPES.POST.isRequired,
};
