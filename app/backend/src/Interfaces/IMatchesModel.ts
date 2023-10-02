import IMatches from './IMatches';

export default interface IMatchesModel {
  findAll(): Promise<IMatches[]>
  finishMatches(id: number): Promise<string>
}
