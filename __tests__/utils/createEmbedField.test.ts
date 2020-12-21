import { createEmbedFields } from "../../src/utils/createEmbedFields";

describe("createEmbedFields()", () => {
  it("should return an empty array if the parameter doesn't contain any entries", () => {
    const result = createEmbedFields({});

    expect(result).toBeDefined();
    expect(result.length).toEqual(0);
  });

  it("should return an array of EmbedFields containing an item for each key in the object parameter", () => {
    const result = createEmbedFields({
      "test": "testing",
      "bogdan": "mircea",
      "yosoy": "bot",
      "bla": "bla233"
    });

    expect(result).toBeDefined();
    expect(result.length).toEqual(Object.keys(result).length);
    expect(result[1].name).toEqual("bogdan");
    expect(result[2].value).toEqual("bot");
  });

  it("should return an empty array if there is only one key/value pair and the key is empty", () => {
    const result = createEmbedFields({"": "jknfgldskfds"});
    
    expect(result.length).toEqual(0);
  });

  it("should ignore empty entries of key/value from the param object", () => {
    // aparent, Object.keys iti returneaza mai intai caractere cifre, cuvintele normale si apoi caractere speciale
    /* 
      EX: Object.keys({"test": "a", "132": "132", "b": "a", "1": "b"});
      (4)["1", "132", "test", "b"] 
    */
    const result = createEmbedFields({
      "test": "testing",
      "": "jkfbdslkfsd",
      "123": "456",
      "mimisor": ""
    });

    expect(result.length).toEqual(2);
    expect(result[0].name).toEqual("123");
    expect(result[1].name).toEqual("test");
  });
});