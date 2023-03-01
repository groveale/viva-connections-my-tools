import { ISPFxAdaptiveCard, BaseAdaptiveCardView, ISubmitActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'MyHelpAdaptiveCardExtensionStrings';
import { HelpDeskTicket } from '../../../common/models';
import { IMyHelpAdaptiveCardExtensionProps, IMyHelpAdaptiveCardExtensionState } from '../MyHelpAdaptiveCardExtension';

export interface IConfirmViewData {
  ticket: HelpDeskTicket;
  strings: IMyHelpAdaptiveCardExtensionStrings;
  confirmLink: string;
}

export class ConfirmView extends BaseAdaptiveCardView<
  IMyHelpAdaptiveCardExtensionProps,
  IMyHelpAdaptiveCardExtensionState,
  IConfirmViewData
> {
  public get data(): IConfirmViewData {
    return {
      ticket: this.state.ticket,
      strings: strings,
      confirmLink: ""
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/ConfirmView.json');
  }

  public async onAction(action: ISubmitActionArguments): Promise<void> {
      if (action.type === 'Submit') {
        const newTicket: HelpDeskTicket = new HelpDeskTicket(this.state.ticket.incidentNumber, this.state.ticket.requestedBy, this.state.ticket.createDate, "", "", "", "", "");
        this.setState({ ticket: newTicket });
        this.quickViewNavigator.close();
      }
    }
}