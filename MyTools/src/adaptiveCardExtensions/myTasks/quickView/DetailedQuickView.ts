import { ISPFxAdaptiveCard, BaseAdaptiveCardView, IActionArguments, ISubmitActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'MyTasksAdaptiveCardExtensionStrings';
import { IMyTasksAdaptiveCardExtensionProps, IMyTasksAdaptiveCardExtensionState } from '../MyTasksAdaptiveCardExtension';

export interface IDetailedQuickViewData {
  task: any;
  strings: IMyTasksAdaptiveCardExtensionStrings;
}

export class DetailedQuickView extends BaseAdaptiveCardView<
    IMyTasksAdaptiveCardExtensionProps,
    IMyTasksAdaptiveCardExtensionState,
    IDetailedQuickViewData
> {
  public get data(): IDetailedQuickViewData {
    const tasks = this.state.outstandingTasks.filter((task: any) => {
        return task.id === this.state.currentTaskKey;
      });
    return {
      task: tasks[0],
      strings: strings,
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/DetailedViewTemplate.json');
  }

  public async onAction(action: IActionArguments): Promise<void> {
    if ((<ISubmitActionArguments>action).type === 'Submit') {
      const submitAction = <ISubmitActionArguments>action;
      const { id, taskKey } = submitAction.data;
      if (id === 'closeTask') {
        this.setState({ 
            outstandingTasks: this.state.outstandingTasks.filter((item: any) => item.id !== taskKey)
        });
        this.quickViewNavigator.pop();
        }
    }
    }
}