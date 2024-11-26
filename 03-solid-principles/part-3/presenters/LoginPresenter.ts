import { UserService } from "../models/UserService";
import { LoginView } from "../views/LoginView";

export class LoginPresenter {
  constructor(private view: LoginView, private service: UserService) {
    this.view = view;
    this.service = service;
  }

  login(userName: string, password: string) {
    this.service.login(userName, password).then((result) => {
      if (result) {
        this.view.showSuccessMessage();
      } else {
        this.view.showErrorMessage();
      }
    });
  }
}