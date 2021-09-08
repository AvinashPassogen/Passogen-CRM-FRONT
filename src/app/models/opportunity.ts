export class Opportunity {

    id: number;
    opportunity:string;
    opportunity_owner:string;
    type:string;
    primary_csource:string;
    budget_confirmed:boolean = false;
    close_date:Date;
    account_name:string;
    next_step:string;
    lead_source:string
    probability:string;
    roi_analysis_completed: boolean = false;
    discovery_completed: boolean = false;
    stage:string;
    amount:number;
    description:string;
    loss_reason:string;

    constructor() {
    }
}


