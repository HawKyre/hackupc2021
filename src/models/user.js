export default class User {
  constructor(
    nickname,
    email,
    passwd,
    uni,
    name = undefined,
    surname = undefined,
    degree = undefined
  ) {
    this.nickname = nickname;
    this.email = email;
    this.passwd = passwd;
    this.uni = uni;
    this.data = {
      name,
      surname,
      degree,
    };
  }
}

export const getUserFromDB = (email, passwd) => {
  return new User("Joe", email, passwd, "UPV");
};

export const createUserInDB = (email, passwd) => {
  return new User("Joe", email, passwd, "UPV");
};

export const toJSON = (user) => {
  return {
    nickname: user.nickname,
    email: user.email,
    passwd: user.passwd,
  };
};
