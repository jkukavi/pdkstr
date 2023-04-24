import bcrypt from "bcrypt";

const hashPasswordIn = async (accountInfo: UserInfo): Promise<UserInfo> => {
  const hashedPassword = await bcrypt.hash(accountInfo.password, 14);
  return { ...accountInfo, password: hashedPassword };
};

export { hashPasswordIn };
