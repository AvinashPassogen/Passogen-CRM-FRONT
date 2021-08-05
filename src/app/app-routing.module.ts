import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeadStatusComponent } from './lead-status/lead-status.component';
import { SplitViewComponent } from './split-view/split-view.component';
import { ViewLeadsComponent } from './view-leads/view-leads.component';
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
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './services/auth.guard';
import { NotificationComponent } from './notification/notification.component';
import { SettingComponent } from './setting/setting.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
    { path: 'setting', component: SettingComponent, canActivate:[AuthGuard] },
    { path: 'view', component: ViewLeadsComponent, canActivate:[AuthGuard] },
    { path: 'view/:id', component: ViewLeadsComponent, canActivate:[AuthGuard] },
    { path: 'split',component: SplitViewComponent, canActivate:[AuthGuard]},
    { path: 'lead-status',component: LeadStatusComponent, canActivate:[AuthGuard]},
    { path: 'lead-status/:id',component: LeadStatusComponent, canActivate:[AuthGuard]},
    { path: 'split/:id', component:SplitViewComponent, canActivate:[AuthGuard]},
    
    { path: 'contact-view', component: ViewContactsComponent,canActivate:[AuthGuard]},
    { path: 'contact/:id', component: ViewContactsComponent,canActivate:[AuthGuard]},
    { path: 'contact-split-view', component: ContactSplitViewComponent,canActivate:[AuthGuard]},
    { path: 'contact-split-view/:id', component: ContactSplitViewComponent,canActivate:[AuthGuard]},
    { path: 'contacts-status', component: ContactStatusComponent,canActivate:[AuthGuard] },
    { path: 'contacts-status/:id', component: ContactStatusComponent,canActivate:[AuthGuard] },

    { path: 'Task-view', component: TaskViewComponent,canActivate:[AuthGuard]},
    { path: 'Task-view/:id', component: TaskViewComponent,canActivate:[AuthGuard]},
    { path: 'Task-split-view', component: TaskSplitViewComponent,canActivate:[AuthGuard]},
    { path: 'Task-split-view/:id', component: TaskSplitViewComponent,canActivate:[AuthGuard]},
    { path: 'Task-status', component: TaskStatusComponent,canActivate:[AuthGuard] },
    { path: 'Task-status/:id', component: TaskStatusComponent,canActivate:[AuthGuard] },

    { path: 'Account-view', component: ViewAccountsComponent,canActivate:[AuthGuard]},
    { path: 'Account-view/:id', component: ViewAccountsComponent,canActivate:[AuthGuard]},
    { path: 'splitAccount', component: AccountSplitViewComponent,canActivate:[AuthGuard]},
    { path: 'splitAccount/:id', component: AccountSplitViewComponent,canActivate:[AuthGuard]},
    { path: 'Account-status', component: AccountStatusComponent ,canActivate:[AuthGuard]},
    { path: 'Account-status/:id', component: AccountStatusComponent,canActivate:[AuthGuard] },


    { path: 'Opportunity-view', component: ViewOpportunityComponent,canActivate:[AuthGuard]},
    { path: 'Opportunity-view/:id', component: ViewOpportunityComponent,canActivate:[AuthGuard]},
    
    { path: 'oppo-Split-view', component: OpportunitySplitComponent,canActivate:[AuthGuard]},
    { path: 'oppo-split/:id', component: OpportunitySplitComponent,canActivate:[AuthGuard]},

     
    { path: 'oppoStatus', component: OppoStatusComponent,canActivate:[AuthGuard]},
    { path: 'oppoStatus/:id', component: OppoStatusComponent,canActivate:[AuthGuard]},

    { path: '', component: LoginComponent },
  
    { path: 'notifiation-view', component: NotificationComponent,canActivate:[AuthGuard]},
    { path: 'notification', component:NotificationComponent,canActivate:[AuthGuard] },

    { path: 'logout', component: LogoutComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
