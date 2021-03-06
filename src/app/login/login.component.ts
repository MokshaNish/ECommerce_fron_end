import { ShoppingCartService } from './../services/shopping-cart.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  inavalidLogin = false;
  user: User = new User();

  constructor(
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService,
    private router: Router) { }

  ngOnInit() {
  }

  checkLogin() {

    // console.log(this.user);

    (this.authService.authenticate(this.user).subscribe(
      data => {
        // console.log("response", data)

        if (data) {

          this.inavalidLogin = false;
          let userType = data['type'];

          sessionStorage.setItem('email', data['email']);
          sessionStorage.setItem('userId', data['id']);

          if (userType == 'Customer') {

            this.shoppingCartService.getCarByUserId().subscribe(cartData => {
              // console.log(cartData);
              sessionStorage.setItem('cartId', cartData['id']);
            });

            this.router.navigate(['/home'])

          }
          else {
            this.router.navigate(['/admin'])
          }
        }
        else {
          console.log("Invalid credentials")
        }

      },
      error => {
        this.inavalidLogin = true;
      }
    )
    );
  }

}
