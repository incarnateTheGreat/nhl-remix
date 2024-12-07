type Team = {
  id: number;
  commonName: { default: string };
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
  discreteClip: number;
  discreteClipFr: number;
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
  servedBy: string;
  timeInPeriod: string;
  type: string;
  duration: number;
  committedByPlayer: string;
  teamAbbrev: {
    default: string;
  };
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
  sog: number;
  shots: number;
  shifts: number;
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

type TeamSeasonStatsPerTeam = {
  ppPctg: number;
  pkPctg: number;
  faceoffWinningPctg: number;
  goalsForPerGamePlayed: number;
  goalsAgainstPerGamePlayed: number;
  ppPctgRank: number;
  pkPctgRank: number;
  faceoffWinningPctgRank: number;
  goalsForPerGamePlayedRank: number;
  goalsAgainstPerGamePlayedRank: number;
};

type TeamSeasonStats = {
  awayTeam: TeamSeasonStatsPerTeam;
  homeTeam: TeamSeasonStatsPerTeam;
};

type SeasonSeries = {
  id: number;
  season: number;
  gameType: number;
  gameDate: string;
  startTimeUTC: string;
  easternUTCOffset: string;
  venueUTCOffset: string;
  gameState: GameState;
  gameScheduleState: string;
  awayTeam: {
    id: number;
    abbrev: string;
    logo: string;
    score: number;
  };
  homeTeam: {
    id: number;
    abbrev: string;
    logo: string;
    score: number;
  };
  clock: {
    timeRemaining: string;
    secondsRemaining: number;
    running: false;
    inIntermission: false;
  };
  gameCenterLink: string;
  periodDescriptor: {
    number: number;
    periodType: string;
    maxRegulationPeriods: number;
  };
  gameOutcome: { lastPeriodType: string };
};

type Shootout = {
  sequence: number;
  playerId: number;
  teamAbbrev: string;
  firstName: string;
  lastName: string;
  shotType: string;
  result: string;
  headshot: string;
  gameWinner: boolean;
};

type Summary = {
  shotsByPeriod: LinescoreByPeriodObject[];
  teamGameStats: TeamGameStats[];
  seasonSeries: SeasonSeries[];
  scoring: {
    periodDescriptor: PeriodDescriptior;
    goals: GoalsType[];
  }[];
  penalties: {
    periodDescriptor: PeriodDescriptior;
    penalties: PenaltiesType[];
  }[];
  shootout: Shootout[];
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

interface Name {
  default: string;
}
interface AwayLeader {
  playerId: number;
  name: Name;
  firstName: Name;
  lastName: Name;
  sweaterNumber: number;
  positionCode: string;
  headshot: string;
  value: number;
}
interface Leader {
  category: string;
  awayLeader: AwayLeader;
  homeLeader: AwayLeader;
}
interface TeamLeaders {
  context: string;
  contextSeason: number;
  leaders: Leader[];
}
interface TeamTotals {
  record: string;
  gaa: number;
  savePctg: number;
  shutouts: number;
}
interface Leader2 {
  playerId: number;
  name: Name;
  firstName: Name;
  lastName: Name;
  sweaterNumber: number;
  headshot: string;
  positionCode: string;
  gamesPlayed: number;
  seasonPoints: number;
  record: string;
  gaa: number;
  savePctg: number;
  shutouts: number;
}
interface HomeTeam {
  teamTotals: TeamTotals;
  leaders: Leader2[];
}
interface Name2 {
  default: string;
  cs?: string;
  sk?: string;
}
interface Leader3 {
  playerId: number;
  name: Name2;
  firstName: Name;
  lastName: Name2;
  sweaterNumber: number;
  headshot: string;
  positionCode: string;
  gamesPlayed: number;
  seasonPoints: number;
  record: string;
  gaa: number;
  savePctg: number;
  shutouts: number;
}
interface AwayTeam {
  teamTotals: TeamTotals;
  leaders: Leader3[];
}
interface GoalieComparison {
  homeTeam: HomeTeam;
  awayTeam: AwayTeam;
}
interface PastGameResult {
  opponentAbbrev: string;
  gameResult: string;
}
interface Last10RecordTeam {
  record: string;
  streakType: string;
  streak: number;
  pastGameResults: PastGameResult[];
}
interface Last10Record {
  awayTeam: Last10RecordTeam;
  homeTeam: Last10RecordTeam;
}
interface Name3 {
  default: string;
  cs?: string;
  fi?: string;
  sk?: string;
}
interface SkaterSeasonStat {
  playerId: number;
  teamId: number;
  sweaterNumber: number;
  name: Name3;
  position: string;
  gamesPlayed: number;
  goals: number;
  assists: number;
  points: number;
  plusMinus: number;
  pim: number;
  avgPoints: number;
  avgTimeOnIce: string;
  gameWinningGoals: number;
  shots: number;
  shootingPctg: number;
  faceoffWinningPctg: number;
  powerPlayGoals: number;
  blockedShots: number;
  hits: number;
}
interface GoalieSeasonStat {
  playerId: number;
  teamId: number;
  sweaterNumber: number;
  name: Name2;
  gamesPlayed: number;
  wins: number;
  losses: number;
  otLosses: number;
  shotsAgainst: number;
  goalsAgainst: number;
  goalsAgainstAvg: number;
  savePctg: number;
  shutouts: number;
  saves: number;
  toi: string;
}
interface Matchup {
  season: number;
  gameType: number;
  teamLeaders: TeamLeaders;
  goalieComparison: GoalieComparison;
  last10Record: Last10Record;
  skaterSeasonStats: SkaterSeasonStat[];
  goalieSeasonStats: GoalieSeasonStat[];
}

type Game = {
  id: number;
  season: number;
  gameType: number;
  limitedScoring: boolean;
  matchup: Matchup;
  last10Record: Last10Record;
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
  shotsByPeriod: LinescoreByPeriodObject[];
  teamGameStats: TeamGameStats[];
  seasonSeries: SeasonSeries[];
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
  };
  playerByGameStats: PlayerByGameStats;
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
  teamSeasonStats: TeamSeasonStats;
};

type GameWeek = {
  date: string;
  dayAbbrev: string;
  numberOfGames: number;
  label: string;
};

type GamesType = {
  incompleteGames: {
    preGames: number;
    activeGames: number;
  };
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
  Last10RecordTeam,
  LinescoreByPeriod,
  LinescoreByPeriodObject,
  LinescoreTotals,
  PastGameResult,
  PenaltiesType,
  PeriodDescriptior,
  PlayerByGameStats,
  SeasonSeries,
  SeriesStatus,
  Shootout,
  SkaterStats,
  Summary,
  Team,
  TeamGameStats,
  TeamLeadersL5,
  TeamSeasonStats,
  TeamSeasonStatsPerTeam,
};
