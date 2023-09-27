import ITeam from '../Interfaces/ITeam';
import ITeamsModel from '../Interfaces/ITeamsModel';
import TeamsModel from '../database/models/TeamsModel';

export default class TeamModel implements ITeamsModel {
  private model = TeamsModel;

  public async findAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  public async findOne(id: number): Promise<ITeam | null> {
    const team = await this.model.findOne({ where: { id } });
    return team;
  }
}
