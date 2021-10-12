const bcrypt = require("bcrypt");

const hashPasswordIn = async (accountInfo) => {
  const hashedPassword = await bcrypt.hash(accountInfo.password, 14);
  return { ...accountInfo, password: hashedPassword };
};

module.exports = {
  hashPasswordIn,
};
