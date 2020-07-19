const { Container } = require('typedi');

module.exports = ({ models }) => {
	models.forEach((m) => {
		Container.set(m.name, m.model);
	});
};
