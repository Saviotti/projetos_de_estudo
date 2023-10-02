export default interface IMatches {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export type IMatchesUpdate = {
  id: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
};
