import jwt, { JwtPayload } from "jsonwebtoken";

interface IJWTService {
  signToken(payload: object, expiresIn?: string): string;
  verifyToken(token: string): JwtPayload | string;
}

class JWTService implements IJWTService {
  private static instance: JWTService | null = null;

  private secretKey: string;

  private constructor() {
    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY is not defined in .env");
    }

    this.secretKey = process.env.SECRET_KEY!;
  }

  public static getInstance(): JWTService {
    if (this.instance === null) {
      this.instance = new JWTService();
    }

    return this.instance;
  }

  public signToken(payload: object, expiresIn: string = "1h"): string {
    return jwt.sign(payload, this.secretKey, { expiresIn });
  }

  public verifyToken(token: string): JwtPayload | string {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  }
}

const jwtService = JWTService.getInstance();
export default jwtService;
