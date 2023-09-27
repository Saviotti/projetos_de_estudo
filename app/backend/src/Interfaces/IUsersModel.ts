export default interface IUsersModel {
  login(email: string, password: string): Promise<string | object>
  findByEmail(id: string): Promise<string | object>
}
