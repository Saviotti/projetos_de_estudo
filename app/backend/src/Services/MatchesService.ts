import TeamModel from '../modelClasses/TeamModel';
import { ServiceResponse, ServiceMessage } from '../Interfaces/serviceResponse';
import IMatchesModel from '../Interfaces/IMatchesModel';
import MatcheModel from '../modelClasses/funcMatches';
import IMatches, { ICreateMatch, IMatchesUpdate } from '../Interfaces/IMatches';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatcheModel(),
  ) {}

  public async findAll(): Promise<IMatches[]> {
    const data = await this.matchesModel.findAll();
    return data;
  }

  public async findAllInProgressMatches(bool: boolean): Promise<IMatches[]> {
    const matches = (await this.matchesModel.findAll()).filter((match) =>
      match.inProgress === bool);
    return matches;
  }

  public async finishMatch(id: number): Promise<ServiceResponse<ServiceMessage>> {
    const finishIdMatches = await this.matchesModel.finishMatches(id);

    return { status: 200, data: { message: finishIdMatches } };
  }

  public async updateMatches(matchData: IMatchesUpdate): Promise<ServiceResponse<ServiceMessage>> {
    await this.matchesModel.updateMatches(matchData);

    return { status: 200, data: { message: 'Match updated' } };
  }

  public async createMatches(newMatchData: ICreateMatch): Promise<ServiceResponse<IMatches>> {
    const teamModel = new TeamModel();
    const homeTeamDB = await teamModel.findOne(newMatchData.homeTeamId);
    const awayTeamDB = await teamModel.findOne(newMatchData.awayTeamId);
    if (!homeTeamDB || !awayTeamDB) {
      return { status: 404, data: { message: 'There is no team with such id!' } };
    }
    const newCreatedMatches = await this.matchesModel.createMatches(newMatchData);
    return { status: 201, data: newCreatedMatches };
  }
}
