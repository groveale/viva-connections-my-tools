import { ISPFxAdaptiveCard, BaseAdaptiveCardView, IActionArguments, ISubmitActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'MyTasksAdaptiveCardExtensionStrings';
import { IMyTasksAdaptiveCardExtensionProps, IMyTasksAdaptiveCardExtensionState } from '../MyTasksAdaptiveCardExtension';

export interface IDetailedQuickViewData {
  task: object;
  strings: IMyTasksAdaptiveCardExtensionStrings;
}

export class DetailedQuickView extends BaseAdaptiveCardView<
    IMyTasksAdaptiveCardExtensionProps,
    IMyTasksAdaptiveCardExtensionState,
    IDetailedQuickViewData
> {
  public get data(): IDetailedQuickViewData {
    // const tasks = this.state.outstandingTasks.filter((task) => {
    //     return task.key === this.state.currentTaskKey;
    //   });
    return {
      task: this.state.outstandingTasks[2],
      strings: strings,
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/DetailedViewTemplate.json');
  }
}