const User = require('../models/User');

async function createUser(name,username,hashedPassword) {
    const user = new User({ name, username, hashedPassword });
    await user.save();
    return user;
}


async function getUserByUsername(username) {
    const match = new RegExp(`^${username}$`, 'i');
    const user = await User.findOne({ username: { $regex: match } });
    return user;
}

// async function getUserByEmail(email) {
//     const match = new RegExp(`^${email}$`);
//     const user = await User.findOne({ email: { $regex: match } });
//     return user;
// }


module.exports = {
    createUser,
    getUserByUsername,
}