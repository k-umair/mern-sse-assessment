import userSchema, { IUser } from "./user.schema";
import { UserRoles } from "./enums/user-role.enum";

class UserService {
  public async getUser(userId: string): Promise<IUser | null> {
    const user = await userSchema.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  public async updateUser(
    userId: string,
    updateData: Partial<IUser>
  ): Promise<IUser | null> {
    const user = await userSchema.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Update user data with new values
    Object.assign(user, updateData);
    await user.save();
    return user;
  }

  public async deleteUser(userId: string): Promise<string> {
    const user = await userSchema.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    await user.deleteOne();
    return "User profile deleted successfully";
  }
}

export default new UserService();
