export class UserDto {
  username;
  email;
  userId;
  isActivated;

  constructor(model) {
    this.username = model.username;
    this.email = model.email;
    this.userId = model.user_id;
    this.isActivated = model.is_activated;
  }
}
