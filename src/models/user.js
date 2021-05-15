export default class User {
  constructor(
    nickname,
    email,
    passwd,
    uni,
    photo = undefined,
    name = undefined,
    surname = undefined,
    degree = undefined
  ) {
    this.nickname = nickname;
    this.email = email;
    this.passwd = passwd;
    this.uni = uni;
    this.data = {
      photo,
      name,
      surname,
      degree,
    };
  }
}

export const getUserFromDB = (email, password) => {};
