import { Request, Response } from 'express';
import UsersService from '../Services/UsersService';

export default class UsersController {
  constructor(
    private usersService = new UsersService(),
  ) {}

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const userResponse = await this.usersService.login(email, password);
    return res.status(userResponse.status).json(userResponse.data);
  }

  public async getRole(req: Request, res: Response): Promise<Response> {
    const { email } = req.body.user;
    const serviceUser = await this.usersService.getRole(email);
    return res.status(200).json(serviceUser);
  }
}
