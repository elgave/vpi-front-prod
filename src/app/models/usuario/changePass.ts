export class ChangePass {

    password: string;
    confirmPass: string;
    passwordTemporal: string;

    constructor(password: string,confirmPass: string, passwordTemporal: string ){
        this.password = password;
        this.confirmPass = confirmPass;
        this.passwordTemporal = passwordTemporal;
    }
}
