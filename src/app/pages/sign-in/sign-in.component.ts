import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';
import { User} from 'src/app/models/user'
import { AuthentificationService } from 'src/app/services/authentification.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  user:User

  constructor(public formBuilder: FormBuilder, public router:Router, public snackBar: MatSnackBar, private auth:AuthentificationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])] 
    });

    this.registerForm = this.formBuilder.group({
      'firstName': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'lastName': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'username': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'phone': ['', Validators.compose([Validators.required,])],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required]
    },{validator: matchingPasswords('password', 'confirmPassword')});

  }

  public onLoginFormSubmit(values:Object):void {
    if (this.loginForm.valid) { 
      console.log(this.user);
      console.log(this.loginForm.value);
      
      this.auth.login(this.loginForm.value).subscribe(result=>{
      if (JSON.parse(JSON.stringify(result)).message="login sucessful") {
        localStorage.setItem("token",result.token);
        this.snackBar.open('login successful', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.router.navigate(['/']);
      } 
      else if (JSON.parse(JSON.stringify(result)).message="password does not matched"){
        this.snackBar.open('email or password does not matched', '×', { panelClass: 'danger', verticalPosition: 'top', duration: 3000 });
        this.loginForm.reset();
      }
      else if (JSON.parse(JSON.stringify(result)).message="no user found"){
        this.snackBar.open('please register before sign in ', '×', { panelClass: 'danger', verticalPosition: 'top', duration: 3000 });
        this.loginForm.reset();

      }
      },error=>{console.log("le serveur ne répond pas");
      })
      

      
    }
  }

  public onRegisterFormSubmit(values:Object):void {
    if (this.registerForm.valid) {
      this.user=this.registerForm.value;
    this.auth.register(this.user).subscribe(result=>{
      console.log(JSON.stringify(result));
      
      if(JSON.parse(JSON.stringify(result)).message=="user added succ"){
        this.snackBar.open('You registered successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      }
      else if(JSON.parse(JSON.stringify(result)).message=="compte existe") {
        this.snackBar.open('Vous avez déjà un compte!', '×', { panelClass: 'danger', verticalPosition: 'top', duration: 3000 });
      }
     
    }
    ,error=>{console.log("le serveur ne repond pas")},
    ()=>{
     this.registerForm.reset()
    });
      
    }
  }

}
