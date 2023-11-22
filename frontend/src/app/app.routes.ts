import { Routes } from '@angular/router';
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import {LoginComponent} from "./components/login/login.component";
import {SidebarComponent} from "./components/home/sidebar/sidebar.component";
import {HomeComponent} from "./components/home/home.component";
import {TutorialComponent} from "./components/home/tutorial/tutorial.component";
import {TicketingComponent} from "./components/home/ticketing/ticketing.component";

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, children: [
      { path: 'sidebar', component: SidebarComponent },
      { path: 'tutorial', component: TutorialComponent },
      { path: 'ticketing', component: TicketingComponent },
    ]
  },

];
