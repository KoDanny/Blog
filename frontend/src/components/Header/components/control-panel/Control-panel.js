import { Icon, Button } from '../../../../components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ROLE } from '../../../../constants';
import styled from 'styled-components';
import { selectUserRole, selectUserLogin } from '../../../../selectors';
import { logout } from '../../../../actions';
import { checkAccess } from '../../../../utils';

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

const UserName = styled.div`
	font-size: 18px;
	font-weight: bold;
	margin: 0 20px 0 0;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);

	const dispatch = useDispatch();

	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
	};

	const isAdmin = checkAccess([ROLE.ADMINISTRATOR], roleId);
	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Button>
						<Link to="/login">Войти</Link>
					</Button>
				) : (
					<>
						<UserName>{login}</UserName>
						<Icon id="fa-sign-out" onClick={onLogout} isButton={true} />
					</>
				)}
			</RightAligned>
			<RightAligned>
				<Icon
					id="fa-backward"
					margin="10px 0 0 0"
					onClick={() => navigate(-1)}
					isButton={true}
				/>
				{isAdmin && (
					<>
						<Link to="/post">
							<Icon
								id="fa-file-text-o"
								margin="10px 0 0 16px"
								isButton={true}
								onClick={() => {}}
							/>
						</Link>
						<Link to="/users">
							<Icon id="fa-users" margin="10px 0 0 16px" isButton={true} />
						</Link>
					</>
				)}
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)``;
