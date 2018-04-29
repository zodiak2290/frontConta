export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public username: string,
    public pass: string,
    public token = ""
  ){}
}
