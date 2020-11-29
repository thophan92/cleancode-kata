import { TennisGame } from './TennisGame';


export class TennisGame1 implements TennisGame {
  private player1Score: number = 0;
  private player2Score: number = 0;
  private player1Name: string;
  private player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  wonPoint(playerName: string): void {
    if (playerName === 'player1')
      this.player1Score += 1;
    else
      this.player2Score += 1;
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

  getScoreBasedOnTempScore(tempScore) {
    let memoTempScore = {
      0 : 'Love',
      1 : 'Fifteen',
      2 : 'Thirty',
      3 : 'Forty'
    }
    return memoTempScore[tempScore]
  }

  getScoreBasedOnMinusResult(minusResult) {
    if (minusResult < -1) {
      minusResult = - Infinity
    }
    if (minusResult > 1) {
      minusResult = Infinity
    }
    let memoMarks = [-Infinity, -1, 1, Infinity]
    let memoScore = ["Win for player2", "Advantage player2",
                     "Advantage player 1, Win for player1"]
    return memoScore[memoMarks.findIndex(item => item == minusResult )]    
  }
  
  getScoreIfDifferent(player1Score, player2Score) {
    let score = ''
    let tempScore = 0
    if (player1Score >= 4 || player2Score >= 4) {
      const minusResult: number = player1Score - player2Score;
      score = this.getScoreBasedOnMinusResult(minusResult)
    }
    else {
      for (let i = 1; i < 3; i++) {
        score += '-'
        tempScore = player2Score
        if (i == 1) {
          score = ''
          tempScore = player1Score
        }
        score += this.getScoreBasedOnTempScore(tempScore)
      }
    }
    return score
  }

  getScore(): string {
    let score: string = '';
    let tempScore: number = 0;
    if (this.player1Score === this.player2Score) {
      score = this.getScoreIfEqual(this.player1Score)
    }
    else {
      score = this.getScoreIfDifferent(this.player1Score, this.player2Score)
    }
    return score;
  }
}
