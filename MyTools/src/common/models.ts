export interface IHelpDeskTicket {
    incidentNumber: string;
    requestedBy: DemoUser;
    createDate: string;
    category: string;
    urgency: string;
    state: string;
    description: string;
    location: string;
    requestType?: string;
    overdue?: boolean;
    overdueTime?: string;
  }
  
  export class HelpDeskTicket implements IHelpDeskTicket {
    constructor(
      public incidentNumber: string = "",
      public requestedBy: DemoUser = new DemoUser(),
      public createDate: string = "",
      public category: string = "",
      public urgency: string = "",
      public state: string = "New",
      public description: string = "",
      public location: string = "",
      public requestType: string = "",
      public overdue: boolean = false,
      public overdueTime: string = "",
    ) { }
  }
  
  export interface IDemoUser {
    id: string;
    displayName: string;
    imageUrl: string;
  }
  
  export class DemoUser implements IDemoUser {
    constructor(
      public id: string = "",
      public displayName: string = "",
      public imageUrl: string = ""
    ) { }
  }