import ITeam from './ITeam';

export default interface ITeamsModel {
  findAll(): Promise<ITeam[]>
  findOne(id: number): Promise<ITeam | null>
}
