type Team = {
  id: number;
  name: { default: string };
  abbrev: string;
  placeName: { default: string };
  score: number;
  sog: number;
  logo: string;
  radioLink: string;
  record: string;
};

type PeriodDescriptior = {
  number: number;
  periodType: string;
  otPeriods: number;
};

type LinescoreByPeriodObject = {
  periodDescriptor: PeriodDescriptior;
  away: number;
  home: number;
};

type LinescoreByPeriod = [LinescoreByPeriodObject];

type LinescoreTotals = {
  away: number;
  home: number;
};

type Assists = {
  playerId: number;
  firstName: { default: string };
  lastName: { default: string };
  name: { default: string };
  assistsToDate: 4;
};

type GameState = "FUT" | "LIVE" | "CRIT" | "ON" | "OFF" | "FINAL";

type GoalsType = {
  situationCode: string;
  strength: string;
  playerId: number;
  firstName: { default: string };
  lastName: { default: string };
  name: { default: string };
  teamAbbrev: { default: string };
  headshot: string;
  highlightClip: number;
  highlightClipFr: number;
  goalsToDate: number;
  awayScore: number;
  homeScore: number;
  leadingTeamAbbrev: { default: string };
  timeInPeriod: string;
  shotType: string;
  goalModifier: string;
  assists: Assists[];
};

type PenaltiesType = {
  timeInPeriod: string;
  type: string;
  duration: number;
  committedByPlayer: string;
  teamAbbrev: string;
  drawnBy: string;
  descKey: string;
};

type TeamGameStats = {
  category: string;
  awayValue: number | string;
  homeValue: number | string;
};

type Clock = {
  timeRemaining: string;
  secondsRemaining: number;
  running: boolean;
  inIntermission: boolean;
};

type SkaterStats = {
  playerId: number;
  sweaterNumber: number;
  name: {
    default: string;
  };
  position: string;
  goals: number;
  assists: number;
  points: number;
  plusMinus: number;
  pim: number;
  hits: number;
  powerPlayGoals: number;
  shots: number;
  faceoffWinningPctg: number;
  toi: string;
};

type GoalieStats = {
  playerId: number;
  sweaterNumber: number;
  name: {
    default: string;
  };
  position: string;
  evenStrengthShotsAgainst: string;
  powerPlayShotsAgainst: string;
  shorthandedShotsAgainst: string;
  saveShotsAgainst: string;
  savePctg: string;
  evenStrengthGoalsAgainst: number;
  powerPlayGoalsAgainst: number;
  shorthandedGoalsAgainst: number;
  pim: number;
  goalsAgainst: number;
  toi: string;
  starter: boolean;
  decision: string;
};

type PlayerByGameStats = {
  awayTeam: {
    forwards: SkaterStats[];
    defense: SkaterStats[];
    goalies: GoalieStats[];
  };
  homeTeam: {
    forwards: SkaterStats[];
    defense: SkaterStats[];
    goalies: GoalieStats[];
  };
};

type Summary = {
  shotsByPeriod: LinescoreByPeriodObject[];
  teamGameStats: TeamGameStats[];
  scoring: {
    periodDescriptor: PeriodDescriptior;
    goals: GoalsType[];
  }[];
  penalties: {
    periodDescriptor: PeriodDescriptior;
    penalties: PenaltiesType[];
  }[];
  linescore: {
    byPeriod: LinescoreByPeriod;
    totals: LinescoreTotals;

    //   iceSurface: { awayTeam: [Object], homeTeam: [Object] },
    //
    //   shootout: [],
    //   threeStars: [],

    //   seasonSeries: [
    //     [Object], [Object],
    //     [Object], [Object],
    //     [Object], [Object],
    //     [Object]
    //   ],
    //   gameInfo: {
    //     referees: [Array],
    //     linesmen: [Array],
    //     awayTeam: [Object],
    //     homeTeam: [Object]
    //   },
    //   gameReports: {
    //     gameSummary: string
    //     eventSummary: string
    //     playByPlay: string
    //     faceoffSummary: string
    //     faceoffComparison: string
    //     rosters: string
    //     shotSummary: string
    //     toiAway: string
    //     toiHome: string
    //   },
    //   seasonSeriesWins: { awayTeamWins: 1, homeTeamWins: 1, neededToWin: 4 }
  };
};

type GameBoxType = {
  id: number;
  season: number;
  gameType: number;
  gameDate: string;
  venue: { default: string };
  startTimeUTC: string;
  easternUTCOffset: string;
  venueUTCOffset: string;
  gameState: string;
  gameScheduleState: string;
  awayTeam: Team;
  homeTeam: Team;
  seriesStatus: {
    round: number;
    seriesAbbrev: string;
    seriesLetter: string;
    neededToWin: number;
    topSeedTeamAbbrev: string;
    topSeedWins: number;
    bottomSeedTeamAbbrev: string;
    bottomSeedWins: number;
    gameNumberOfSeries: number;
  };
  period: number;
  periodDescriptor: PeriodDescriptior;
  clock: Clock;
  situation: {
    teamAbbrev: string;
    timeRemaining: string;
    situationCode: string;
  };
  gameCenterLink: string;
  seriesUrl: string;
  neutralSite: false;
  venueTimezone: string;
  ticketsLink: string;
  // teamLeaders: [ [Object], [Object], [Object], [Object], [Object], [Object] ]
};

type Game = {
  id: number;
  season: number;
  gameType: number;
  limitedScoring: boolean;
  gameDate: string;
  venue: { default: string };
  venueLocation: { default: string };
  startTimeUTC: string;
  easternUTCOffset: string;
  venueUTCOffset: string;
  venueTimezone: string;
  periodDescriptor: PeriodDescriptior;
  // tvBroadcasts: [
  //   {
  //     id: 385,
  //     market: string
  //     countryCode: string
  //     network: string
  //     sequenceNumber: 4
  //   },
  //   {
  //     id: 501,
  //     market: string
  //     countryCode: string
  //     network: string
  //     sequenceNumber: 6
  //   },
  //   {
  //     id: 519,
  //     market: string
  //     countryCode: string
  //     network: string
  //     sequenceNumber: 9
  //   },
  //   {
  //     id: 282,
  //     market: string
  //     countryCode: string
  //     network: string
  //     sequenceNumber: 21
  //   },
  //   {
  //     id: 284,
  //     market: string
  //     countryCode: string
  //     network: string
  //     sequenceNumber: 22
  //   },
  //   {
  //     id: 281,
  //     market: string
  //     countryCode: string
  //     network: string
  //     sequenceNumber: 31
  //   }
  // ],
  gameState: GameState;
  gameScheduleState: string;
  awayTeam: Team;
  homeTeam: Team;
  shootoutInUse: boolean;
  regPeriods: number;
  otInUse: boolean;
  tiesInUse: boolean;
  clock: Clock;
  summary: Summary;
  playerByGameStats: PlayerByGameStats;
};

type GameWeek = {
  date: string;
  dayAbbrev: string;
  numberOfGames: number;
  label: string;
};

type GamesType = {
  currentDate: string;
  prevDate: string;
  nextDate: string;
  gameWeek: GameWeek[];
  games: GameBoxType[];
};

export type {
  Assists,
  Clock,
  Game,
  GameBoxType,
  GameState,
  GamesType,
  GameWeek,
  GoalieStats,
  GoalsType,
  LinescoreByPeriod,
  LinescoreByPeriodObject,
  LinescoreTotals,
  PenaltiesType,
  PeriodDescriptior,
  PlayerByGameStats,
  SkaterStats,
  Summary,
  Team,
  TeamGameStats,
};
