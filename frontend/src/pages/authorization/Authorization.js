import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Input, Button, H2, AuthFormError } from '../../components';
import { setUser } from '../../actions';
import styled from 'styled-components';
import { Link, Navigate } from 'react-router-dom';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';
import { useResetForm } from '../../hooks';
import { request } from '../../utils';

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Введите имя пользователя')
		.matches(/\w+$/, 'Неверно заполнено имя пользователя. Допускаются буквы и цифры')
		.min(3, 'Неверно заполнено имя пользователя. Должно быть минимум 3 символа')
		.max(10, 'Неверно заполнено имя пользователя. Максимум 10 символов'),
	password: yup
		.string()
		.required('Введите пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Допускаются буквы, цифры и знаки #, %',
		)
		.min(6, 'Неверно заполнен пароль. Должно быть минимум 6 символа')
		.max(12, 'Неверно заполнен пароль. Максимум 12 символов'),
});

const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: underline;
	font-size: 18px;
	margin: 20px 0;
`;

const AuthorizationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();

	useResetForm(reset);

	const onFormSubmit = ({ login, password }) => {
		request('/login', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}
			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;

	const errorMessage = formError || serverError;

	const roleId = useSelector(selectUserRole);

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<H2>Авторизация</H2>
			<form onSubmit={handleSubmit(onFormSubmit)}>
				<Input
					type="text"
					placeholder="Имя пользователя"
					{...register('login', { onChange: () => setServerError(null) })}
				></Input>
				<Input
					type="password"
					placeholder="Пароль"
					{...register('password', { onChange: () => setServerError(null) })}
				></Input>
				<Button type="submit" disabled={!!formError}>
					Авторизоваться
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}

				<StyledLink to="/register">Зарегистрироваться</StyledLink>
			</form>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;

	& > form {
		width: 260px;
		display: flex;
		flex-direction: column;
	}
`;
