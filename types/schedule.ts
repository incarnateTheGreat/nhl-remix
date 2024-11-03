import { GameState } from "./types";

type Team = {
  id: number;
  placeName: { default: string };
  abbrev: string;
  logo: string;
  darkLogo: string;
  awaySplitSquad: false;
  radioLink: string;
  hotelLink: string;
  hotelDesc: string;
  isAway: boolean;
  isHome: boolean;
  score: number;
};

type ScheduledGame = {
  id: number;
  season: number;
  gameType: number;
  gameDate: string;
  venue: string[];
  neutralSite: boolean;
  startTimeUTC: string;
  easternUTCOffset: string;
  venueUTCOffset: string;
  venueTimezone: string;
  gameState: GameState;
  gameScheduleState: string;
  tvBroadcasts: string[];
  awayTeam: Team;
  homeTeam: Team;
  periodDescriptor: string[];
  ticketsLink: string;
  ticketsLinkFr: string;
  gameCenterLink: string;
};

type ScheduleGamesWithIds = Record<string, ScheduledGame>;

type Schedule = {
  previousMonth: string;
  currentMonth: string;
  nextMonth: string;
  calendarUrl: string;
  clubTimezone: string;
  clubUTCOffset: string;
  games: ScheduledGame[];
  gamesWithIds: ScheduleGamesWithIds;
};

export type { Schedule, ScheduledGame, ScheduleGamesWithIds };
