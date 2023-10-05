import { ServiceResponse } from '../Interfaces/serviceResponse';
import { ILeaderboarder } from '../Interfaces/ILeaderboard';
import ITeamsModel from '../Interfaces/ITeamsModel';
import MatcheModel from '../modelClasses/funcMatches';
import TeamModel from '../modelClasses/TeamModel';
import IMatchesModel from '../Interfaces/IMatchesModel';
import IMatches from '../Interfaces/IMatches';
import ITeam from '../Interfaces/ITeam';

type Results = 'totalVictories' | 'totalDraws' | 'totalLosses';

export default class LeaderboarderService {
  constructor(
    private matchModel: IMatchesModel = new MatcheModel(),
    private teamModel: ITeamsModel = new TeamModel(),
  ) {}

  private static defaultLeaderboarder(): ILeaderboarder {
    return {
      name: '',
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    };
  }

  static calculateEfficiency(totalPoints: number, totalGames: number): number {
    return ((totalPoints / (totalGames * 3)) * 100);
  }

  private static calculateEstatistics(homeGoals: number, awayGoals: number): [number, Results] {
    const diffGoals = homeGoals - awayGoals;
    if (diffGoals > 0) return [3, 'totalVictories'];
    if (diffGoals < 0) return [0, 'totalLosses'];
    return [1, 'totalDraws'];
  }

  private static editClassifications(teamId: ITeam['id'], match: IMatches): ILeaderboarder {
    const teamClassifications = LeaderboarderService.defaultLeaderboarder();
    const [points, result] = match.homeTeamId === teamId
      ? LeaderboarderService.calculateEstatistics(match.homeTeamGoals, match.awayTeamGoals)
      : LeaderboarderService.calculateEstatistics(match.awayTeamGoals, match.homeTeamGoals);

    teamClassifications.goalsFavor = match.homeTeamId
     === teamId ? match.homeTeamGoals : match.awayTeamGoals;
    teamClassifications.goalsOwn = match.homeTeamId
     === teamId ? match.awayTeamGoals : match.homeTeamGoals;

    teamClassifications.totalPoints += points;
    teamClassifications[result] += 1;
    teamClassifications.totalGames += 1;

    return teamClassifications;
  }

  private static addClassifications(allClassifications: ILeaderboarder[]): ILeaderboarder {
    const newClassifications = allClassifications.reduce((acc, currTeam) => {
      acc.totalPoints += currTeam.totalPoints;
      acc.totalGames += currTeam.totalGames;
      acc.totalVictories += currTeam.totalVictories;
      acc.totalDraws += currTeam.totalDraws;
      acc.totalLosses += currTeam.totalLosses;
      acc.goalsFavor += currTeam.goalsFavor;
      acc.goalsOwn += currTeam.goalsOwn;
      return acc;
    }, LeaderboarderService.defaultLeaderboarder());

    return {
      name: allClassifications[0].name,
      ...newClassifications,
      goalsBalance: newClassifications.goalsFavor - newClassifications.goalsOwn,
      efficiency: LeaderboarderService
        .calculateEfficiency(newClassifications.totalPoints, newClassifications.totalGames),
    };
  }

  private static sortClassifications(allClassifications: ILeaderboarder[]): ILeaderboarder[] {
    return allClassifications.sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => (b.goalsBalance || 0) - (a.goalsBalance || 0))
      .sort((a, b) => b.totalVictories - a.totalVictories)
      .sort((a, b) => b.totalPoints - a.totalPoints);
  }

  async getHomeLeaderBoard(): Promise<ServiceResponse<ILeaderboarder[]>> {
    const allTeams = await this.teamModel.findAll();

    const results = await Promise.all(allTeams.map(async (team) => {
      const homeTeamsMatches = await this.matchModel.getAllHomeMatches(team.id);
      const teamClassifications: ILeaderboarder[] = [];

      homeTeamsMatches.forEach((match: IMatches) => {
        const teamClassificationMatch = LeaderboarderService.editClassifications(team.id, match);
        teamClassifications.push(teamClassificationMatch);
      });

      const finalClassification = LeaderboarderService.addClassifications(teamClassifications);
      finalClassification.name = team.teamName;

      return finalClassification;
    }));

    const sortedAllTeamsLB = LeaderboarderService.sortClassifications(results);

    return { status: 200, data: sortedAllTeamsLB };
  }
}
