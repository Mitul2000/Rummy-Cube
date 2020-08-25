const practice = require("./js_test/practice.js");

test("adds 1+ 2 to equal 3", () => {
  expect(practice.add(1, 2)).toBe(3);
});

test("users should be a Mitul object", () => {
  expect(practice.createUser()).toEqual({
    fistName: "Mitul",
    lastName: "Patel",
  });
});

test("should be under 1000", () => {
  const load1 = 500;
  const load2 = 500;
  expect(load1 + load2).toBeLessThanOrEqual(1000);
});

test("There is no I in team", () => {
  expect("team").not.toMatch(/I/);
});

test("Admin should be in usernames", () => {
  usernames = ["john", "karen", "admin"];
  expect(usernames).toContain("admin");
});
