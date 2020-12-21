import { ping, pong} from "../../../src/commands/ping/ping";

describe("ping and pong commands", () => {
  it("ping should return the string PING", () => {
    expect(ping().toLowerCase()).toContain("ping");
  });

  it("pong should return the string PONG", () => {
    expect(pong().toLowerCase()).toContain("pong");
  });
});