const generator = require('generate-password');

exports.password = generator.generate({
	length: 10,
	numbers: true
});