import { ISPFxAdaptiveCard, BaseAdaptiveCardView, IActionArguments, ISubmitActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'MyTasksAdaptiveCardExtensionStrings';
import { DETAILED_VIEW_REGISTRY_ID, IMyTasksAdaptiveCardExtensionProps, IMyTasksAdaptiveCardExtensionState } from '../MyTasksAdaptiveCardExtension';

export interface IQuickViewData {
  numberOfTasks: string;
  tasks: object[];
  strings: IMyTasksAdaptiveCardExtensionStrings;
}

export class QuickView extends BaseAdaptiveCardView<
  IMyTasksAdaptiveCardExtensionProps,
  IMyTasksAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    let numberOfTasks: string = strings.CardViewZero;
    if (this.state.outstandingTasks.length > 1) {
      numberOfTasks = `${this.state.outstandingTasks.length.toString()} ${strings.CardViewTextPlural}`;
    } else {
      numberOfTasks = `${this.state.outstandingTasks.length.toString()} ${strings.CardViewTextSingular}`;
    }
    return {
      numberOfTasks: numberOfTasks,
      tasks: this.state.outstandingTasks,
      strings: strings,
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/MyTasksList.json');
  }

  public async onAction(action: IActionArguments): Promise<void> {
    if ((<ISubmitActionArguments>action).type === 'Submit') {
      const submitAction = <ISubmitActionArguments>action;
      const { id, taskKey } = submitAction.data;
      if (id === 'selectTask') {
        this.setState({ currentTaskKey: taskKey });
        this.quickViewNavigator.push(DETAILED_VIEW_REGISTRY_ID);
      }
    }
  }
}