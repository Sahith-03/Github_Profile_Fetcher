import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  username: string = '';
  profilePhotoUrl: string = '';
  bio: string = '';
  repositories: any[] = [];
  currentPage = 1;
  itemsPerPageOptions = [10, 25, 100];
  itemsPerPage = 10;
  hasMoreRepos: boolean = false;
  twitter: string = '';
  git: string = '';
  loading :boolean = false;

  constructor(private route: ActivatedRoute, private githubService: GithubService) { }

  ngOnInit(): void {
    // Get username from route parameters
    this.route.params.subscribe(params => {
      this.username = params['username'];
      this.fetchUserProfile(this.username);
    });
  }

  fetchUserProfile(username: string): void {
    this.loading = true;
    this.githubService.getUserProfile(username).subscribe(
      profile => {
        this.profilePhotoUrl = profile.avatar_url;
        this.bio = profile.bio;
        this.fetchUserRepositories(username);
        this.twitter = profile.twitter_username;
        this.git = profile.html_url;
      },
      error => {
        console.error('Error fetching user profile:', error);
        this.loading = false;
      }
    );
  }

  fetchUserRepositories(username: string): void {
    this.loading = true;
    this.githubService.getUserRepositories(username,this.currentPage,this.itemsPerPage).subscribe(
      repos => {
      this.repositories = repos;
      this.hasMoreRepos = repos.length === this.itemsPerPage;
      this.loading = false;
      },
      error=> {
      console.error('Error fetching user repositories:', error);
      this.loading = false;
      }
    );
  }

  changeItemsPerPage(value: number): void {
    this.itemsPerPage = Number(value);
    this.currentPage = 1;
    this.fetchUserRepositories(this.username);
  }
  
  changePage(increment: number): void {
    this.currentPage += increment;
    this.fetchUserRepositories(this.username);
  }

  
}
