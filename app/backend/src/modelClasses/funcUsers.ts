import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
// import IUsers from '../Interfaces/IUsers';
import UsersModel from '../database/models/UsersModel';

const jwtsecretenv = process.env.JWT_SECRET || 'jwt_secret';

export default class UserModel {
  private model = UsersModel;

  public async login(email: string, password: string): Promise<string | object> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) { return 'User not found'; }

    const passwordValidation = await bcrypt.compare(password, user.password);
    if (!passwordValidation) { return 'Invalid password'; }

    const tokenString = jwt.sign({ id: user.id, email: user.email }, jwtsecretenv);
    return { token: tokenString };
  }

  public async findByEmail(email: string): Promise<string | object> {
    const userEmail = await this.model.findOne({ where: { email } });
    return { role: userEmail?.role };
  }
}
