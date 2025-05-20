const express = require('express');
const { hasRole, authenticated } = require('../middleware');
const { mapUser } = require('../helpers');
const { ROLES } = require('../constants');
const {
	UsersController: { getRoles, getUsers, updateUser, deleteUser },
} = require('../controllers');

const router = express.Router({ mergeParams: true });

router.get(
	'/',
	authenticated,
	hasRole([ROLES.ADMINISTRATOR]),
	async (req, res) => {
		const users = await getUsers();

		res.send({ data: users.map(mapUser) });
	}
);

router.get(
	'/roles',
	authenticated,
	hasRole([ROLES.ADMINISTRATOR]),
	async (req, res) => {
		const roles = getRoles();

		res.send({ data: roles });
	}
);

router.patch(
	'/:id',
	authenticated,
	hasRole([ROLES.ADMINISTRATOR]),
	async (req, res) => {
		const newUser = await updateUser(req.params.id, {
			role: req.body.roleId,
		});

		res.send({ data: mapUser(newUser) });
	}
);

router.delete(
	'/:id',
	authenticated,
	hasRole([ROLES.ADMINISTRATOR]),
	async (req, res) => {
		await deleteUser(req.params.id);

		res.send({ error: null });
	}
);

module.exports = router;
