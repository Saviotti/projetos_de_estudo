import TeamsModel from '../database/models/TeamsModel';
import IMatches from '../Interfaces/IMatches';
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
}
