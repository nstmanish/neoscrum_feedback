const generator = require('generate-password');

// This function is use to generate random password
exports.password = generator.generate({
	length: 10,
	numbers: true
});