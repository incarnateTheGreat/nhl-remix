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

type GameState = "PRE" | "FUT" | "LIVE" | "CRIT" | "ON" | "OFF" | "FINAL";

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
  awayValue: number;
  homeValue: number;
};

type Clock = {
  timeRemaining: string;
  secondsRemaining: number;
  running: boolean;
  inIntermission: boolean;
};

type SkaterStats = {
  gamesPlayed: number;
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
  avgTimeOnIce: string;
  teamId: number;
  toi: number;
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
  savePctg: number;
  evenStrengthGoalsAgainst: number;
  powerPlayGoalsAgainst: number;
  shorthandedGoalsAgainst: number;
  pim: number;
  goalsAgainst: number;
  min: string;
  starter: boolean;
  decision: string;
  teamId: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
  otLosses: number;
  goalsAgainstAvg: number;
  shotsAgainst: number;
  toi: number;
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

type TeamLeadersL5 = {
  category: string;
  awayLeader: {
    playerId: number;
    name: {
      default: string;
    };
    firstName: {
      default: string;
    };
    lastName: {
      default: string;
    };
    sweaterNumber: number;
    positionCode: string;
    headshot: string;
    value: number;
  };
  homeLeader: {
    playerId: number;
    name: {
      default: string;
    };
    firstName: {
      default: string;
    };
    lastName: {
      default: string;
    };
    sweaterNumber: number;
    positionCode: string;
    headshot: string;
    value: number;
  };
};

type SeriesStatus = {
  round: number;
  seriesAbbrev: string;
  seriesLetter: string;
  seriesTitle: string;
  neededToWin: number;
  topSeedTeamAbbrev: string;
  topSeedWins: number;
  bottomSeedTeamAbbrev: string;
  bottomSeedWins: number;
  gameNumberOfSeries: number;
};

type Matchup = {
  season: number;
  gameType: number;
  teamLeadersL5: TeamLeadersL5[];
  gameInfo: {
    awayTeam: {
      headCoach: {
        default: string;
      };
    };
    homeTeam: {
      headCoach: {
        default: string;
      };
    };
  };
  goalieSeasonStats: GoalieStats[];
  skaterSeasonStats: SkaterStats[];
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
  gameState: GameState;
  gameScheduleState: string;
  awayTeam: Team;
  homeTeam: Team;
  seriesStatus: SeriesStatus;
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
  tvBroadcasts: [
    {
      id: number;
      market: string;
      countryCode: string;
      network: string;
      sequenceNumber: number;
    },
  ];
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
  matchup: Matchup;
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
  Matchup,
  PenaltiesType,
  PeriodDescriptior,
  PlayerByGameStats,
  SeriesStatus,
  SkaterStats,
  Summary,
  Team,
  TeamGameStats,
  TeamLeadersL5,
};
