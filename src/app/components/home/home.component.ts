import { Component,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { GithubService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  username: string = '';

  constructor(private router: Router,private elementRef: ElementRef,private githubService: GithubService ) {}

  searchUser(): void {
    if (!this.username) {
      // Handle empty username case
      return;
    }

    // Check if username exists
    this.githubService.checkUsernameExists(this.username).subscribe(
      usernameExists => {
        if (usernameExists) {
          // Username exists, navigate to profile page
          console.log('Navigating to profile:', this.username);
          this.router.navigate(['/profile', this.username]);
        } else {
          // Username does not exist
          // You can display an error message or handle it as per your requirement
           const input_field = this.elementRef.nativeElement.querySelector('input');
           input_field.style.border = '1px solid red';
           input_field.value = '';
        }
      },
      error => {
        // Error handling
        console.error('Error checking username:', error);
        // You can display an error message or handle it as per your requirement
      }
    );
  }

  // searchUser() {
  //   if (this.username) {
  //     this.router.navigate(['/profile', this.username]);
  //   }
  // }
}
