import { Component, OnInit } from '@angular/core';
import { GithubService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    private apiService: GithubService
  ) {}

  ngOnInit() {
    this.apiService.getUserProfile('johnpapa').subscribe(console.log);
  }
}
