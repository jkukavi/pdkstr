import { useDatabase } from "db";
import bcrypt from "bcrypt";
import { Db, ObjectId } from "mongodb";

async function save({
  accountInfo,
  activationCode,
}: {
  accountInfo: UserInfo;
  activationCode: string;
}) {
  return useDatabase(async (db) => {
    const uniqueEmail = await checkIfUnique(db, accountInfo.email);

    if (!uniqueEmail) {
      throw new Error("Email already exists");
    }

    let newAccountInfo = {
      ...accountInfo,
      password: await bcrypt.hash(accountInfo.password, 14),
      favourites: [],
      history: [],
    };

    const newPendingAccount: PendingAccount = {
      accountInfo: newAccountInfo,
      activationCode,
    };

    return await db.collection("pendingAccounts").insertOne(newPendingAccount);
  });
}

async function removeById(id: string) {
  return useDatabase(async (db) => {
    return await db
      .collection("pendingAccounts")
      .deleteOne({ _id: new ObjectId(id) });
  });
}

async function findOne({
  id,
  activationCode,
}: {
  id: string;
  activationCode: string;
}) {
  return useDatabase(async (db) => {
    return await db
      .collection("pendingAccounts")
      .findOne({ _id: new ObjectId(id), activationCode });
  });
}

const checkIfUnique = async (db: Db, email: string) => {
  const pendingAccount = await db
    .collection("pendingAccounts")
    .findOne({ "accountInfo.email": email });
  const user = await db.collection("users").findOne({ email });
  return !pendingAccount && !user;
};

export default { save, removeById, findOne };
