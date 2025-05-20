import styled from 'styled-components';
import { Icon } from '../../../components';
import { TableRow } from './TableRow';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { PROP_TYPES } from '../../../constants';
import { request } from '../../../utils';

const UserRowContainer = ({
	className,
	id,
	login,
	registeredAt,
	roleId,
	roles,
	onUserRemove,
}) => {
	const [selectedRoleId, setSelectedRoleId] = useState(roleId);
	const [initialRoleId, setInitialRoleId] = useState(roleId);

	const onRoleChange = ({ target }) => setSelectedRoleId(Number(target.value));

	const isSaveButtonDisabled = selectedRoleId === initialRoleId;

	const onUserRoleSave = (userId, newUserRoleId) => {
		request(`/users/${userId}`, 'PATCH', { roleId: newUserRoleId }).then(() => {
			setInitialRoleId(newUserRoleId);
		});
	};

	return (
		<div className={className}>
			<TableRow border={true}>
				<div className="login-column">{login}</div>
				<div className="registered-at-column">{registeredAt}</div>
				<div className="role-column">
					<select value={selectedRoleId} onChange={onRoleChange}>
						{roles.map((role) => (
							<option key={role.id} value={role.id}>
								{role.name}
							</option>
						))}
					</select>
					<Icon
						id="fa-floppy-o"
						margin="0 0 0 10px"
						disabled={isSaveButtonDisabled}
						isButton={true}
						onClick={() => onUserRoleSave(id, selectedRoleId)}
					></Icon>
				</div>
			</TableRow>
			<Icon
				id="fa-trash-o"
				margin="0 0 0 10px"
				onClick={onUserRemove}
				isButton={true}
			/>
		</div>
	);
};

export const UserRow = styled(UserRowContainer)`
	display: flex;
	align-items: center;
	margin-top: 10px;
	width: 640px;

	& select {
		font-size: 16px;
		padding: 0 5px;
	}
`;

UserRow.propTypes = {
	id: PropTypes.string.isRequired,
	login: PropTypes.string.isRequired,
	registeredAt: PropTypes.string.isRequired,
	roleId: PROP_TYPES.ROLE,
	roles: PropTypes.arrayOf(PROP_TYPES.ROLE),
	onUserRemove: PropTypes.func.isRequired,
};
