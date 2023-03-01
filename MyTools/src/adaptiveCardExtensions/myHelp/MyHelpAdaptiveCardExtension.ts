import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { MyHelpPropertyPane } from './MyHelpPropertyPane';
import { random } from '@microsoft/sp-lodash-subset';
import { DemoUser, HelpDeskTicket } from '../../common/models';
import strings from 'MyHelpAdaptiveCardExtensionStrings';
import { ConfirmView } from './quickView/ConfirmView';

export interface IMyHelpAdaptiveCardExtensionProps {
  title: string;
}

export interface IMyHelpAdaptiveCardExtensionState {
  ticket: HelpDeskTicket;
}

const CARD_VIEW_REGISTRY_ID: string = 'MyHelp_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'MyHelp_QUICK_VIEW';
export const CONFIRM_VIEW_REGISTRY_ID: string = 'MyHelp_CONFIRM_VIEW'

export default class MyHelpAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IMyHelpAdaptiveCardExtensionProps,
  IMyHelpAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: MyHelpPropertyPane | undefined;

  public onInit(): Promise<void> {
    //Create a new blank ticket
    let ticket: HelpDeskTicket = new HelpDeskTicket();
    let user: DemoUser = new DemoUser("0", this.context.pageContext.user.displayName, strings.ProfileImageUrl);
    let today: Date = new Date();
    ticket.incidentNumber = "INC" + random(11111, 99999, false).toString();
    ticket.createDate = today.toISOString().substring(0, 19) + "Z";;
    ticket.requestedBy = user;

    //Set the data into state
    this.state = {
      ticket: ticket
    };

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());
    this.quickViewNavigator.register(CONFIRM_VIEW_REGISTRY_ID, () => new ConfirmView());

    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'MyHelp-property-pane'*/
      './MyHelpPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.MyHelpPropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane?.getPropertyPaneConfiguration();
  }
}
