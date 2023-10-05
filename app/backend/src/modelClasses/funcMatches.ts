import sequelize = require('sequelize');
import TeamsModel from '../database/models/TeamsModel';
import IMatches, { ICreateMatch, IMatchesUpdate } from '../Interfaces/IMatches';
import IMatchesModel from '../Interfaces/IMatchesModel';
import MatchesModel from '../database/models/MatchModel';

export default class MatcheModel implements IMatchesModel {
  private model = MatchesModel;

  public async findAll(): Promise<IMatches[]> {
    const matches = await this.model.findAll({
      include: [
        { model: TeamsModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamsModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  public async finishMatches(id: number): Promise<string> {
    await this.model.update({ inProgress: false }, { where: { id } });
    return 'Finished';
  }

  public async updateMatches(matchData: IMatchesUpdate): Promise<void> {
    const { id, homeTeamGoals, awayTeamGoals } = matchData;
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  public async createMatches(newMatchData: ICreateMatch): Promise<IMatches> {
    const newMatches = { ...newMatchData, inProgress: true };
    const data = await this.model.create(newMatches);
    return data;
  }

  public async getAllHomeMatches(teamId: number): Promise<IMatches[]> {
    const allTems = await this.model.findAll({
      where: {
        [sequelize.Op.or]: [{ homeTeamId: teamId }],
        inProgress: false,
      },
    });
    return allTems;
  }
}
