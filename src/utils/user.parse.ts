import _ from "lodash";
import { IUser } from "../users/user.schema";

export function removePassword(input: IUser): Omit<IUser, "password"> {
  const plainObject = parseObject(input);
  return _.omit(plainObject, "password");
}

export function parseObject(input: IUser): IUser {
  return input?.toObject ? input.toObject() : input;
}
