import IMatches, { ICreateMatch, IMatchesUpdate } from './IMatches';

export default interface IMatchesModel {
  findAll(): Promise<IMatches[]>
  finishMatches(id: number): Promise<string>
  updateMatches(matchData: IMatchesUpdate): Promise<void>
  createMatches(newMatchData: ICreateMatch): Promise<any>
  getAllHomeMatches(teamId: number): Promise<any>
}
