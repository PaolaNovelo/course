type State = { 
  rolls: number[] 
}

const INITIAL_STATE: State = {
  rolls: []
}

export const createBowlingGame = (state: State = INITIAL_STATE) => Object.freeze({
  rollBall: (pins: number) => rollBall(pins, state),
  getFinalScore: () => getFinalScore(state),
  resetState: () => resetState()
})

const rollBall = (pins: number, state: State) => {
  const rolls = [...state.rolls, pins];
  return createBowlingGame({ rolls });
}

const getFinalScore = ({ rolls }: State) => {
  let total = 0;
  let throwNumber = 0;
  const FRAMES = 10;

  for (let frame = 0; frame < FRAMES; frame++) {
    if (isStrike(rolls, throwNumber)) {
      total += 10 + getStrikeBonus(rolls, throwNumber);
      throwNumber++;
    } else if (isSpare(rolls, throwNumber)) {
      total += 10 + getSpareBonus(rolls, throwNumber);
      throwNumber += 2;
    } else {
      total += getFrameScore(rolls, throwNumber);
      throwNumber += 2;
    }
  }
  return total;
}

const isStrike = (rolls: number[], throwNumber: number) => rolls[throwNumber] === 10;

const isSpare = (rolls: number[], throwNumber: number) => rolls[throwNumber] + rolls[throwNumber + 1] === 10;

const getStrikeBonus = (rolls: number[], throwNumber: number) => rolls[throwNumber + 1] + rolls[throwNumber + 2];

const getSpareBonus = (rolls: number[], throwNumber: number) => rolls[throwNumber + 2];

const getFrameScore = (rolls: number[], throwNumber: number) => rolls[throwNumber] + rolls[throwNumber + 1];

const resetState = () => createBowlingGame();

export default createBowlingGame;
