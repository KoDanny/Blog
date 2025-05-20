import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Input, Button, H2, AuthFormError } from '../../components';
import { setUser } from '../../actions';
import styled from 'styled-components';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';
import { Navigate } from 'react-router-dom';
import { useResetForm } from '../../hooks';
import { request } from '../../utils';

const registerFormSchema = yup.object().shape({
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
	passCheck: yup
		.string()
		.required('Подтвердите пароль')
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

const RegistrationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passCheck: '',
		},
		resolver: yupResolver(registerFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();

	useResetForm(reset);

	const onFormSubmit = ({ login, password }) => {
		request('/register', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}
			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	const formError =
		errors?.login?.message || errors?.password?.message || errors?.passCheck?.message;

	const errorMessage = formError || serverError;

	const roleId = useSelector(selectUserRole);

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<H2>Регистрация</H2>
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
				<Input
					type="password"
					placeholder="Подтверждение пароля"
					{...register('passCheck', { onChange: () => setServerError(null) })}
				></Input>

				<Button type="submit" disabled={!!formError}>
					Зарегистрироваться
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;

	& > form {
		width: 260px;
		display: flex;
		flex-direction: column;
	}
`;
