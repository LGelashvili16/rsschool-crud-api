import { UserInterface } from "./db";

const pattern = /([0-9a-zA-Z-]{36})$/;
const pattern2 = /^[0-9a-fA-F-]{36}$/;

export const validateNewUser = (user: UserInterface): boolean => {
  const requiredKeys = ["username", "age", "hobbies"] as const;

  for (const key of requiredKeys) {
    if (user[key] === undefined || user[key] === null) {
      return false;
    }
  }

  return true;
};

export const checkUserIdPattern = (id: string) => {
  return pattern2.test(id);
};
