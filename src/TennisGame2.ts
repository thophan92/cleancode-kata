import { TennisGame } from './TennisGame';


export class TennisGame2 implements TennisGame {
  player1Point: number = 0;
  player2Point: number = 0;

  player1Result: string = '';
  player2Result: string = '';

  private player1Name: string;
  private player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  getScoreIfEqual(playerScore) {
    let memo = {
      0 : 'Love-All', 
      1 : 'Fifteen-All', 
      2 : 'Thirty-All'
    }
    if (playerScore in memo) {
      return memo[playerScore]      
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
    let result1 = scores[marks.findIndex(idx => idx == point1)]
    let result2 = scores[marks.findIndex(idx => idx == point2)]
    return result1 + "-" + result2
  }

  getScoreIfAdvatange(point1, point2) {
    if (point1 > point2) {
      return 'Advantage player1'
    }
    return 'Advantage player2'
  }

  getScoreIfWin(point1, point2) {
    if (point1 > point2) {
      return 'Win for player1'
    }
    return 'Win for player2'
  }
  getScoreIfAdvantageOrWin(point1, point2) {
    let score = ''
    if (Math.min(point1, point2) >= 3) {
      score = this.getScoreIfAdvatange(point1, point2)
    } else {
      score = this.getScoreIfWin(point1, point2)
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
    if (this.player1Point === this.player2Point) {
      score = this.getScoreIfEqual(this.player1Point)
    }

    if (this.player1Point === 0 || this.player2Point === 0) {
      score = this.getScoreIfHasZeroPoint(this.player1Point)
    } 
    else {
      score = this.getScoreIfDifferent(this.player1Point, this.player2Point)
    }
    return score;
  }

  SetPlayer1Score(score: number): void {

    for (let i = 0; i < score; i++) {
      this.Player1Score();
    }

  }

  SetPlayer2Score(score: number): void {

    for (let i = 0; i < score; i++) {
      this.Player2Score();
    }

  }

  Player1Score(): void {
    this.player1Point++;
  }

  Player2Score(): void {
    this.player2Point++;
  }

  wonPoint(player: string): void {
    if (player === 'player1')
      this.Player1Score();
    else
      this.Player2Score();
  }
}
