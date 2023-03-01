import { ISPFxAdaptiveCard, BaseAdaptiveCardView, IActionArguments, ISubmitActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'MyApprovalsAdaptiveCardExtensionStrings';
import { IMyApprovalsAdaptiveCardExtensionProps, IMyApprovalsAdaptiveCardExtensionState } from '../MyApprovalsAdaptiveCardExtension';

export interface IQuickViewData {
  numberOfTasks: string;
  tasks: object[];
  strings: IMyTasksAdaptiveCardExtensionStrings;
}

export class QuickView extends BaseAdaptiveCardView<
  IMyApprovalsAdaptiveCardExtensionProps,
  IMyApprovalsAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    let numberOfApprovals: string = strings.CardViewZero;
    if (this.state.outstandingApprovals.length > 1) {
      numberOfApprovals = `${this.state.outstandingApprovals.length.toString()} ${strings.CardViewTextPlural}`;
    } else {
      numberOfApprovals = `${this.state.outstandingApprovals.length.toString()} ${strings.CardViewTextSingular}`;
    }
    return {
      numberOfTasks: numberOfApprovals,
      tasks: this.state.outstandingApprovals,
      strings: strings,
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/MyApprovalsTemplate.json');
  }

  public async onAction(action: IActionArguments): Promise<void> {
    if ((<ISubmitActionArguments>action).type === 'Submit') {
      const submitAction = <ISubmitActionArguments>action;
      const { id, taskKey } = submitAction.data;
      if (id === 'approve' || id === 'reject') {
        this.setState({ 
          outstandingApprovals: this.state.outstandingApprovals.filter((item: any) => item.id !== taskKey)
      });
      }
    }
  }
}