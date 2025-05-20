import { Routes, Route } from 'react-router-dom';
import { Header, Footer, Modal, Error } from './components';
import { Authorization, Main, Post, Registration, Users } from './pages';
import styled from 'styled-components';
import { useLayoutEffect } from 'react';
import { setUser } from './actions';
import { useDispatch } from 'react-redux';
import { ERRORS } from './constants';

const Page = styled.div`
	padding: 120px 0 20px;
`;

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	min-height: 100%;
	background-color: #fff;
	margin: 0 auto;
`;

export const Blog = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) return;

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) }));
	}, [dispatch]);

	return (
		<AppColumn>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<Main />}></Route>
					<Route path="/login" element={<Authorization />}></Route>
					<Route path="/register" element={<Registration />}></Route>
					<Route path="/users" element={<Users />}></Route>
					<Route path="/post" element={<Post />}></Route>
					<Route path="/post/:id" element={<Post />}></Route>
					<Route path="/post/:id/edit" element={<Post />}></Route>
					<Route path="*" element={<Error error={ERRORS.NOT_FOUND} />}></Route>
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</AppColumn>
	);
};
