// import * as bcrypt from 'bcryptjs';
// import * as jwt from 'jsonwebtoken';
import { ServiceResponse } from '../Interfaces/serviceResponse';
// import IUsers from '../Interfaces/IUsers';
import UserModel from '../modelClasses/funcUsers';
import IUsersModel from '../Interfaces/IUsersModel';

// const jwtsecretenv = process.env.JWT_SECRET || 'jwt_secret';

export default class UsersService {
  constructor(
    private userModel: IUsersModel = new UserModel(),
  ) {}

  public async login(email: string, password: string)
    : Promise<ServiceResponse<string | object>> {
    const token = await this.userModel.login(email, password);

    if (token === 'User not found' || token === 'Invalid password') {
      return { status: 401, data: { message: 'Invalid email or password' } };
    }
    return { status: 200, data: token };
  }

  public async getRole(email: string) {
    const role = await this.userModel.findByEmail(email);
    return role;
  }
}
