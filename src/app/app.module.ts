import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewLeadsComponent } from './view-leads/view-leads.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SplitViewComponent } from './split-view/split-view.component';
import { LeadStatusComponent } from './lead-status/lead-status.component';
import { ViewContactsComponent } from './contact-details/view-contacts/view-contacts.component';
import { ContactStatusComponent } from './contact-details/contact-status/contact-status.component';
import { ContactSplitViewComponent } from './contact-details/contact-split-view/contact-split-view.component';
import { TaskViewComponent } from './Task-detail/task-view/task-view.component';
import { TaskSplitViewComponent } from './Task-detail/task-split-view/task-split-view.component';
import { TaskStatusComponent } from './Task-detail/task-status/task-status.component';
import { ViewAccountsComponent } from './Account-detail/view-accounts/view-accounts.component';
import { AccountStatusComponent } from './Account-detail/account-status/account-status.component';
import { AccountSplitViewComponent } from './Account-detail/account-split-view/account-split-view.component';
import { ViewOpportunityComponent } from './opportunityt-detail/view-opportunity/view-opportunity.component';
import { OpportunitySplitComponent } from './opportunityt-detail/opportunity-split/opportunity-split.component';
import { OppoStatusComponent } from './opportunityt-detail/oppo-status/oppo-status.component';
import { CheckinapplicationComponent } from './components/checkinapplication/checkinapplication.component';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificationComponent } from './notification/notification.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { LoginService } from './login.service';
import { AuthGuard } from './services/auth.guard';
import { SettingComponent } from './setting/setting.component';
import { LogoutComponent } from './logout/logout.component';
import { ChartsModule } from 'ng2-charts';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { GraphComponent } from './graph/graph.component';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common'

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    HeaderComponent,
    ContentComponent,
    ViewLeadsComponent,
    SplitViewComponent,
    LeadStatusComponent,
    ViewContactsComponent,
    ContactStatusComponent,
    ContactSplitViewComponent,
    TaskViewComponent,
    TaskSplitViewComponent,
    TaskStatusComponent,
    ViewAccountsComponent,
    AccountStatusComponent,
    AccountSplitViewComponent,
    ViewOpportunityComponent,
    OpportunitySplitComponent,
    OppoStatusComponent,
    CheckinapplicationComponent,
    LoginComponent,
    DashboardComponent,
    NotificationComponent,
    SettingComponent,
    LogoutComponent,
    GraphComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,MatInputModule,
    FormsModule,BrowserAnimationsModule,
    NgbModule,MatIconModule,MatButtonModule,MatCardModule,
    ChartsModule,ToastrModule.forRoot()

  ],
  providers: [ LoginService, AuthGuard,DatePipe, { provide: HTTP_INTERCEPTORS, 
    useClass: TokenInterceptorService, 
    multi: true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
