import { close, connect } from "db";
import { getRandomCode } from "utils";
import pendingAccounts from "../pendingAccount";

describe("CRUD operations for pending accounts collection", () => {
  const dummyPendingAccount = {
    activationCode: getRandomCode(),
    accountInfo: {
      username: "userniiiam",
      email: "pendingAccount@test",
      password: "hello",
    },
  };
  let id: any;

  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await close();
  });

  beforeEach(async () => {
    const insertionResult = await pendingAccounts.save(dummyPendingAccount);
    if (!insertionResult) {
      throw new Error(
        "Unable to save pending account. Maybe a db connection issue?"
      );
    }

    id = insertionResult.insertedId.toString();
  });

  afterEach(async () => {
    if (id) {
      await pendingAccounts.removeById(id);
      id = null;
    }
  });

  test("should fail if trying to save pending account with same email", async () => {
    try {
      await pendingAccounts.save(dummyPendingAccount);
      throw new Error(
        "It is possible to save pending Account with the same email as another pendingAccount or user"
      );
    } catch (e: any) {
      if (e.message === "Email already exists") {
        return;
      } else {
        throw new Error(
          "Saving might have failed due to reasons other than email uniqueness. Check the error message thrown and make sure it's the same as in the test (since that is how uniqueness check fail is detected)."
        );
      }
    }
  });

  it("should find pending account by activationCode and id", async () => {
    const retrievedPendingAccount = await pendingAccounts.findOne({
      id,
      activationCode: dummyPendingAccount.activationCode,
    });

    if (!retrievedPendingAccount) {
      throw new Error("Unable to find saved account.");
    }

    expect(retrievedPendingAccount.accountInfo.email).toBe(
      dummyPendingAccount.accountInfo.email
    );
  });

  it("should remove pendingAccount", async () => {
    let retrievedAccount = await pendingAccounts.findOne({
      id,
      activationCode: dummyPendingAccount.activationCode,
    });

    if (!retrievedAccount) {
      throw new Error("Unable to fetch account from db.");
    }

    await pendingAccounts.removeById(retrievedAccount._id.toString());

    try {
      retrievedAccount = await pendingAccounts.findOne({
        id,
        activationCode: dummyPendingAccount.activationCode,
      });
      throw new Error();
    } catch {}
  });
});
