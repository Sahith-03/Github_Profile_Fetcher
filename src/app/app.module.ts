import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from  '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { GithubService } from './services/api.service';
// import { CacheInterceptor } from './cache-interceptor';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile/:username', component: ProfileComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    GithubService,
    // { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
