import { createBowlingGame } from "./bowlingGame";

describe('Functional Tests for Bowling Game', () => {
  let game = createBowlingGame();

  beforeEach(() => {
    game = game.resetState();
  });

  it('should get a game with 0 points', () => {
    game = rollManyTimes(20, 0, game);
    expect(game.getFinalScore()).toBe(0);
  });

  it('should get a game with all ones', () => {
    game = rollManyTimes(20, 1, game);
    expect(game.getFinalScore()).toBe(20);
  });

  it('should get a game with a spare', () => {
    game = rollSpare(game);
    game = game.rollBall(3);

    game = rollManyTimes(17, 0, game);
    expect(game.getFinalScore()).toBe(16);
  });

  it('should get a game with a strike', () => {
    game = game.rollBall(10);
    game = game.rollBall(3);
    game = game.rollBall(3);

    game = rollManyTimes(16, 0, game);
    expect(game.getFinalScore()).toBe(22);
  });

  it('should be a perfect game', () => {
    game = rollManyTimes(12, 10, game);
    expect(game.getFinalScore()).toBe(300);
  });
});

function rollSpare(game: any) {
  game = game.rollBall(5);
  game = game.rollBall(5);
  return game;
}

function rollManyTimes(rolls: number, pins: number, game: any) {
  for (let i = 0; i < rolls; i++) {
    game = game.rollBall(pins);
  }
  return game;
}
