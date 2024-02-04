import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  authForm!: FormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^(\d{9}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/
          ),
        ]),
      ],
      password: [null, Validators.required],
    });
  }



  get f() {
    return this.authForm.controls;
  }



  onSubmit() {

    this.submitted = true;
    this.error = '';

    if (this.authForm.invalid) {
      this.error = 'E-mail and Password not valid !';
      console.log('E-mail and Password not valid !');
      this.submitted = false;
      return;
    }

    const data = {
      email: this.authForm.value['email'],
      //password: sha256(this.authForm.value['password']),
      password: this.authForm.value['password'],
    };


    // Trying to connect user
    this.loading = true;

    this.authService.login(data).subscribe(
      (res) => {
        if (res) {
          this.loading = false;
          const role = sessionStorage.getItem('role');

          if (role === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else if (role === 'MANAGER') {
            this.router.navigate(['/aci']);
          } else {
            this.router.navigate(['/login']);
          }
        } else {
          this.loading = false;
          this.error = 'Invalid Login';
        }
      },
      (error) => {
        this.error = error;
        this.submitted = false;
        console.log('error', error);
      }
    );
  }


}
