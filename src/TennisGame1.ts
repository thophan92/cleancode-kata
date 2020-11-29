import { TennisGame } from './TennisGame';


export class TennisGame1 implements TennisGame {
  private m_score1: number = 0;
  private m_score2: number = 0;
  private player1Name: string;
  private player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  wonPoint(playerName: string): void {
    if (playerName === 'player1')
      this.m_score1 += 1;
    else
      this.m_score2 += 1;
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
  
  getScoreIfDifferent(m_score1, m_score2) {
    let score = ''
    let tempScore = 0
    if (m_score1 >= 4 || m_score2 >= 4) {
      const minusResult: number = m_score1 - m_score2;
      score = this.getScoreBasedOnMinusResult(minusResult)
    }
    else {
      for (let i = 1; i < 3; i++) {
        score += '-'
        tempScore = m_score2
        if (i == 1) {
          score = ''
          tempScore = m_score1
        }
        score += this.getScoreBasedOnTempScore(tempScore)
      }
    }
    return score
  }

  getScore(): string {
    let score: string = '';
    let tempScore: number = 0;
    if (this.m_score1 === this.m_score2) {
      score = this.getScoreIfEqual(this.m_score1)
    }
    else {
      score = this.getScoreIfDifferent(this.m_score1, this.m_score2)
    }
    return score;
  }
}
