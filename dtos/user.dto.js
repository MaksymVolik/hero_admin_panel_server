export class UserDto {
  username;
  email;
  user_id;
  isActivated;

  constructor(model) {
    this.username = model.username;
    this.email = model.email;
    this.user_id = model.user_id;
    this.isActivated = model.is_activated;
  }
}
