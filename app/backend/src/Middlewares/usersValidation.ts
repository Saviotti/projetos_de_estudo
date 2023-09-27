import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export default class userValidation {
  static async emailAndPasswordValidation(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400)
        .json({ message: 'All fields must be filled' });
    }
    next();
  }

  static async emailValidation(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const { email } = req.body;
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!regex.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }

  static async passwordValidation(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const { password } = req.body;
    if (password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }

  static async tokenValitation(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const { authorization } = req.headers;
    if (!authorization) { return res.status(401).json({ message: 'Token not found' }); }

    const tokenWithoutBearer = authorization.split(' ')[1];

    try {
      console.log(process.env.JWT_SECRET);
      const token = await jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET as string);
      console.log(token);

      req.body.user = token;

      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
