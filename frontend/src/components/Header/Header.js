import styled from 'styled-components';

import { ControlPanel, Logo } from './components';

const Description = styled.div`
	font-style: italic;
`;

const HeaderContainer = ({ className }) => {
	return (
		<header className={className}>
			<Logo />
			<Description>
				Веб-технологии
				<br />
				Написание кода
				<br />
				Разбор ошибок
				<br />
			</Description>
			<ControlPanel />
		</header>
	);
};

export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	position: fixed;
	z-index: 100;
	background-color: #fff;
	width: 1000px;
	height: 120px;
	padding: 20px 40px;
	box-shadow: 0 1px 20px #000;
`;
