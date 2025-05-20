import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Pagination, PostCard, Search } from './components';
import { PAGINATION_LIMIT } from '../../constants';
import { request } from '../../utils';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);

	const [shouldSearch, setShouldSearch] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');

	useEffect(() => {
		request(
			`/posts?search=${searchPhrase}&page=${currentPage}&limit=${PAGINATION_LIMIT}`,
		).then(({ data: { posts, lastPage } }) => {
			setPosts(posts);
			setLastPage(lastPage);
		});
	}, [currentPage, shouldSearch, searchPhrase]);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		setShouldSearch(!shouldSearch);
	};

	return (
		<div className={className}>
			<div className="post-and-search">
				<Search onChange={onSearch} searchPhrase={searchPhrase} />
				{posts.length < 1 ? (
					<div className="not-found">Ничего не найдено</div>
				) : (
					<div className="post-list">
						{posts.map(({ id, title, imageUrl, publishedAt, comments }) => (
							<PostCard
								key={id}
								id={id}
								title={title}
								imageUrl={imageUrl}
								publishedAt={publishedAt}
								commentsCount={comments.length}
							/>
						))}
					</div>
				)}
			</div>
			<Pagination
				setCurrentPage={setCurrentPage}
				currentPage={currentPage}
				lastPage={lastPage}
			/>
		</div>
	);
};

export const Main = styled(MainContainer)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin: 0 0 20px;
	position: relative;

	& .post-list {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: stretch;
		flex-wrap: wrap;
		padding: 20px 20px 30px;
	}

	& .post-and-search {
		min-height: 720px;
	}

	& .not-found {
		margin: 50px auto;
		font-size: 26px;
		font-weight: 500;
		color: #333;
		text-align: center;
	}
`;
