const bcrypt = require('bcryptjs');

// Hash Password
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

// Compare Password
const comparePassword = async (inputPassword, hashedPassword) => {
    return bcrypt.compare(inputPassword, hashedPassword);
};

module.exports = {
    hashPassword,
    comparePassword,
};
