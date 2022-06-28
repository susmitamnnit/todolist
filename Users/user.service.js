const config = require("../config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../_helper/db");
const User = db.User;

module.exports = {
  authenticate,
  create,
  getById,
};

async function authenticate({ username, password }) {
  const user = await User.findOne({ username });

  console.log(user);
  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithoutHash } = user.toObject();
    const token = jwt.sign({ sub: user.id }, config.secret, {
      expiresIn: "4d",
    });
    return {
      ...userWithoutHash,
      token,
    };
  }
}

async function create(userParam) {
  console.log("userParam",userParam)
  if (await User.findOne({ username: userParam.username })) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  const user = new User(userParam);
  console.log("user created ");
  console.log(user);

  // hash password
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }
  // save user
  await user.save();
}

async function getById(id) {
  console.log("getById for the user");
  console.log(id);
  return await User.findById(id).select('-hash');
}