const { getRandomCode } = require("../utils");
const { hashPasswordIn } = require("./helpers");
const bcrypt = require("bcrypt");

it("should properly return pending Account with hashed password", async () => {
  const password = getRandomCode();

  const dummyPendingAccount = {
    activationCode: getRandomCode(),
    accountInfo: {
      email: "hash@hash.test",
      password,
    },
  };

  dummyPendingAccount.accountInfo = await hashPasswordIn(
    dummyPendingAccount.accountInfo
  );

  const passwordsMatch = await bcrypt.compare(
    password,
    dummyPendingAccount.accountInfo.password
  );

  expect(passwordsMatch).toBe(true);
});
