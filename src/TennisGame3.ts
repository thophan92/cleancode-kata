import { TennisGame } from './TennisGame';


export class TennisGame3 implements TennisGame {
  private point2: number = 0;
  private point1: number = 0;
  private player1Name: string;
  private player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  getScoreIfSmall(point1, point2) {
    let score = ''
    const p: string[] = ['Love', 'Fifteen', 'Thirty', 'Forty'];
    let s = p[point1];
    if (point1 == point2) {
      score = s + '-All'
    } else {
      score = s + '-' + p[point2]
    }
    return score
  }

  isAdvantage(point1, point2) {
    return ((point1 - point2) * (point1 - point2)) === 1
  }

  getScoreIfLarge(point1, point2) {
    let score = ''
    let s: string;
    if (point1 == point2) {
      score = 'Deuce'
    } else {
      s = point1 > point2 ? this.player1Name : this.player2Name;
      score = this.isAdvantage(point1, point2) ? 'Advantage ' + s : 'Win for ' + s;
    }
    return score
  }
  getScore(): string {
    let s: string;
    let score = ''
    if (this.point1 < 4 && this.point2 < 4 && !(this.point1 + this.point2 === 6)) {
      score = this.getScoreIfSmall(this.point1, this.point2)
    } else {
      score = this.getScoreIfSmall(this.point1, this.point2)
    }
    return score
  }

  wonPoint(playerName: string): void {
    if (playerName === 'player1')
      this.point1 += 1;
    else
      this.point2 += 1;

  }
}
