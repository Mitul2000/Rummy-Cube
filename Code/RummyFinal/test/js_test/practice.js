const practice = {
  add: (num1, num2) => num1 + num2,
  createUser: () => {
    const user = { fistName: "Mitul" };
    user["lastName"] = "Patel";
    return user;
  },
};
module.exports = practice;
