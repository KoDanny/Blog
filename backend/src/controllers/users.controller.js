const bcrypt = require('bcrypt');
const { User } = require('../models');
const {
	token: { generate },
} = require('../helpers');
const { ROLES } = require('../constants');

// Register
async function register(login, password) {
	if (!password) throw new Error('Password is empty');
	const passwordHash = await bcrypt.hash(password, 10);

	const user = await User.create({ login, password: passwordHash });
	const token = generate({ id: user.id });

	return { user, token };
}

// Login

async function login(login, password) {
	const user = await User.findOne({ login });

	if (!user) throw new Error('User not found');

	const isPasswordCorrect = await bcrypt.compare(password, user.password);

	if (!isPasswordCorrect) throw new Error('Wrong password');

	const token = generate({ id: user.id });
	return { user, token };
}

function getUsers() {
	return User.find();
}

function getRoles() {
	return [
		{ id: ROLES.ADMINISTRATOR, name: 'Administrator' },
		{ id: ROLES.MODERATOR, name: 'Moderator' },
		{ id: ROLES.USER, name: 'User' },
	];
}

// Delete user

function deleteUser(id) {
	return User.deleteOne({ _id: id });
}

// Edit user roles

function updateUser(id, userData) {
	return User.findByIdAndUpdate(id, userData, { returnDocument: 'after' });
}

module.exports = {
	register,
	login,
	getUsers,
	getRoles,
	deleteUser,
	updateUser,
};
