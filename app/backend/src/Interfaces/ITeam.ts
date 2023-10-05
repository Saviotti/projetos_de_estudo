import IMatches from './IMatches';

export default interface ITeam {
  id: number,
  teamName: string,
}

export interface IHomesAndAwayTeams extends ITeam {
  homeTeam?: IMatches[],
  awayTeam?: IMatches[],
}
