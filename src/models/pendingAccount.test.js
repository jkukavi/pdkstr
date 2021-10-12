const pendingAccounts = require("./pendingAccount");
const { dropTestCollection, connect, close } = require("../db");
const { getRandomCode } = require("../utils");

describe("CRUD operations for pending accounts collection", () => {
  const dummyPendingAccount = {
    activationCode: getRandomCode(),
    accountInfo: {
      email: "pendingAccount@test",
      password: "hello",
    },
  };
  let id;

  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await close();
  });

  afterEach(async () => {
    if (id) {
      await pendingAccounts.removeById(id);
      id = null;
    }
  });

  it("should save pending account", async () => {
    const { insertedId } = await pendingAccounts.save(dummyPendingAccount);
    id = insertedId.toString();
    const retrievedPendingAccount = await pendingAccounts.findOne({
      activationCode: dummyPendingAccount.activationCode,
      id,
    });
    expect(retrievedPendingAccount.accountInfo.email).toBe(
      dummyPendingAccount.accountInfo.email
    );
  });

  test("should fail if trying to save pending account with same email", async (done) => {
    try {
      const { insertedId } = await pendingAccounts.save(dummyPendingAccount);
      id = insertedId.toString();
      await pendingAccounts.save(dummyPendingAccount);
      throw new Error(
        "It is possible to save pending Account with the same email as another pendingAccount or user"
      );
    } catch (e) {
      if (e.message === "Email already exists") {
        done();
      } else {
        throw new Error(
          "Saving might have failed due to reasons other than email uniqueness. Check the error message thrown and make sure it's the same as in the test (since that is how uniqueness check fail is detected)."
        );
      }
    }
  });

  it("should find pending account by activationCode and id", async () => {
    const { insertedId } = await pendingAccounts.save(dummyPendingAccount);
    id = insertedId.toString();
    const retrievedPendingAccount = await pendingAccounts.findOne({
      id,
      activationCode: dummyPendingAccount.activationCode,
    });

    expect(retrievedPendingAccount.accountInfo.email).toBe(
      dummyPendingAccount.accountInfo.email
    );
  });

  it("should remove pendingAccount", async () => {
    const { insertedId } = await pendingAccounts.save(dummyPendingAccount);
    id = insertedId.toString();
    let retrievedAccount = await pendingAccounts.findOne({
      id,
      activationCode: dummyPendingAccount.activationCode,
    });

    await pendingAccounts.removeById(retrievedAccount._id.toString());

    retrievedAccount = await pendingAccounts.findOne({
      id,
      activationCode: dummyPendingAccount.activationCode,
    });

    expect(retrievedAccount).toEqual(null);
  });
});
