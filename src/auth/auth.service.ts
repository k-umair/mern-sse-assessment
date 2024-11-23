import bcrypt from "bcryptjs";

import jwtService from "../config/jwt.service";
import { removePassword } from "../utils/user.parse";
import userSchema, { IUser } from "../users/user.schema";
import { UserRoles } from "../users/enums/user-role.enum";

class AuthService {
  public async signUp(input: Partial<IUser>): Promise<{ token: string }> {
    const { username, password } = input;
    const userExists = await userSchema.findOne({ username });

    if (userExists) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(String(password), 10);

    const newUser = new userSchema({
      ...input,
      password: hashedPassword,
    });

    await newUser.save();
    const tokenClaims = removePassword(newUser);
    const token = jwtService.signToken(tokenClaims);

    return { token };
  }

  public async login(
    input: Pick<IUser, "email" | "username" | "password">
  ): Promise<{ token: string }> {
    const { email, username, password } = input;

    const condition = email ? { email } : { username };

    const user = await userSchema.findOne(condition);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    const tokenClaim = removePassword(user);
    console.log(tokenClaim);
    const token = jwtService.signToken(tokenClaim);

    return { token };
  }

  public async switchRole(token: string): Promise<{ token: string }> {
    let decodedToken: any;
    try {
      decodedToken = jwtService.verifyToken(token);
    } catch (error) {
      throw new Error("Invalid or expired token");
    }

    const { _id, role } = decodedToken;
    const newRole = role === UserRoles.BUYER ? "seller" : "buyer";

    const user = await userSchema.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }

    user.role = newRole;
    await user.save();

    const tokenClaim = removePassword(user);
    const newToken = jwtService.signToken(tokenClaim);

    return { token: newToken };
  }
}

export default new AuthService();
