import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseAuthenticationService } from 'src/app/core/services/impl/base-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route:ActivatedRoute,
    private authSvc:BaseAuthenticationService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authSvc.signIn(this.loginForm.value).subscribe({
        next: resp=>{
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
          this.router.navigateByUrl(returnUrl); // Redirige a la página solicitada
        },
        error: err=>{
          console.log(err);
        }
      });
      
    } else {
      console.log('Formulario no válido');
    }
  }

  onRegister(){
    this.loginForm.reset();
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    this.router.navigate(['/register'], {queryParams:{ returnUrl:returnUrl}, replaceUrl:true});
  }

  onForgotPassword(){

  }

  get email(){
    return this.loginForm.controls['email'];
  }

  get password(){
    return this.loginForm.controls['password'];
  }
}
