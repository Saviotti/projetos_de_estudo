import IMatches, { IMatchesUpdate } from './IMatches';

export default interface IMatchesModel {
  findAll(): Promise<IMatches[]>
  finishMatches(id: number): Promise<string>
  updateMatches(matchData: IMatchesUpdate): Promise<void>
}
