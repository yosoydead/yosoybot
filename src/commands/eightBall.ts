const eightBall: string[] = [
  "As i see it, yes",
  "Ask again later",
  "Better not tell you now",
  "Cannot predict now",
  "Concentrate and ask again",
  "Don't count on it",
  "It is certain",
  "It is decidedly so"
];

export default (): string => {
  const index: number = Math.floor(Math.random() * eightBall.length);
  return eightBall[index];
};