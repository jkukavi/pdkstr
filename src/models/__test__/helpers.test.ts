import { hashPasswordIn } from "models/helpers";
import { getRandomCode } from "utils";
import * as bcrypt from "bcrypt";

it("should properly return pending Account with hashed password", async () => {
  const password = getRandomCode();

  const dummyPendingAccount: PendingAccount = {
    activationCode: getRandomCode(),
    accountInfo: {
      email: "hash@hash.test",
      password,
      username: "sda",
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
