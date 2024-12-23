const jwt = require('jsonwebtoken');

const token = jwt.sign({ id: 1, role: 'Admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
console.log("copy token",token);
