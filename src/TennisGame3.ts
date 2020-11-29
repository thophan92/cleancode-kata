import { TennisGame } from './TennisGame';


export class TennisGame3 implements TennisGame {
  private p2: number = 0;
  private p1: number = 0;
  private p1N: string;
  private p2N: string;

  constructor(p1N: string, p2N: string) {
    this.p1N = p1N;
    this.p2N = p2N;
  }

  getScoreIfSmall(p1, p2) {
    let score = ''
    const p: string[] = ['Love', 'Fifteen', 'Thirty', 'Forty'];
    let s = p[p1];
    if (p1 == p2) {
      score = s + '-All'
    } else {
      score = s + '-' + p[p2]
    }
    return score
  }

  isAdvantage(p1, p2) {
    return ((p1 - p2) * (p1 - p2)) === 1
  }

  getScoreIfLarge(p1, p2) {
    let score = ''
    let s: string;
    if (p1 == p2) {
      score = 'Deuce'
    } else {
      s = p1 > p2 ? this.p1N : this.p2N;
      score = this.isAdvantage(p1, p2) ? 'Advantage ' + s : 'Win for ' + s;
    }
    return score
  }
  getScore(): string {
    let s: string;
    let score = ''
    if (this.p1 < 4 && this.p2 < 4 && !(this.p1 + this.p2 === 6)) {
      score = this.getScoreIfSmall(this.p1, this.p2)
    } else {
      score = this.getScoreIfSmall(this.p1, this.p2)
    }
    return score
  }

  wonPoint(playerName: string): void {
    if (playerName === 'player1')
      this.p1 += 1;
    else
      this.p2 += 1;

  }
}
