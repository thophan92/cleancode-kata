import { TennisGame } from './TennisGame';


export class TennisGame2 implements TennisGame {
  P1point: number = 0;
  P2point: number = 0;

  P1res: string = '';
  P2res: string = '';

  private player1Name: string;
  private player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  getScoreIfEqual(m_score) {
    let score = ""
    let memo = {
      0 : 'Love-All', 
      1 : 'Fifteen-All', 
      2 : 'Thirty-All'
    }
    if (m_score in memo) {
      return memo[m_score]      
    }
    return "Deuce"
  }

  getScoreIfHasZeroPoint(score) {
    let point = [1,2,3]
    let scores = ["Fifteen", "Thirtdy", "Forty"]
    return scores[point.findIndex(idx => idx == score)] + "-Love"
  }

  getScoreIfSmallGap(point1, point2) {
    let marks = [1,2,3]
    let scores = ["Fifteen", "Thirty", "Forty"]
    let res1 = scores[marks.findIndex(idx => idx == point1)]
    let res2 = scores[marks.findIndex(idx => idx == point2)]
    return res1 + "-" + res2
  }

  getScoreIfAdvantageOrWin(point1, point2) {
    let score = ''
    if (Math.min(point1, point2) >= 3) {
      if (point1 > point2) {
        score = 'Advantage player1'
      } else {
        score = 'Advantage player2'
      }
    } else {
      if (point1 > point2) {
        score = 'Win for player1'
      } else {
        score = 'Win for player2'
      }
    }
    return score
  }

  getScoreIfDifferent(point1, point2) {
    let score = ''
    if (Math.max(point1, point2) < 4) {
      if (point1 > point2) {
        score = this.getScoreIfSmallGap(point1, point2)
      } else {
        score = this.getScoreIfSmallGap(point2, point1)
      }
    }
    else {
      score = this.getScoreIfAdvantageOrWin(point1, point2)
    }
    return score
  }
  getScore(): string {
    let score: string = '';
    if (this.P1point === this.P2point) {
      score = this.getScoreIfEqual(this.P1point)
    }

    if (this.P1point === 0 || this.P2point === 0) {
      score = this.getScoreIfHasZeroPoint(this.P1point)
    } 
    else {
      score = this.getScoreIfDifferent(this.P1point, this.P2point)
    }
    return score;
  }

  SetP1Score(score: number): void {

    for (let i = 0; i < score; i++) {
      this.P1Score();
    }

  }

  SetP2Score(score: number): void {

    for (let i = 0; i < score; i++) {
      this.P2Score();
    }

  }

  P1Score(): void {
    this.P1point++;
  }

  P2Score(): void {
    this.P2point++;
  }

  wonPoint(player: string): void {
    if (player === 'player1')
      this.P1Score();
    else
      this.P2Score();
  }
}
