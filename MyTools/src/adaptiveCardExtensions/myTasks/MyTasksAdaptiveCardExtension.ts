import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { MyTasksPropertyPane } from './MyTasksPropertyPane';
import dummyTaskData from './quickView/template/MyTasksList.data.json';
import { DetailedQuickView } from './quickView/DetailedQuickView';

export interface IMyTasksAdaptiveCardExtensionProps {
  title: string;
}

export interface IMyTasksAdaptiveCardExtensionState {
  taskCount: number;
  outstandingTasks: object[]
  currentTaskKey: string;
}

const CARD_VIEW_REGISTRY_ID: string = 'MyTasks_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'MyTasks_QUICK_VIEW';
export const DETAILED_VIEW_REGISTRY_ID: string = 'MyTasks_DETAILED_VIEW'


export default class MyTasksAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IMyTasksAdaptiveCardExtensionProps,
  IMyTasksAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: MyTasksPropertyPane | undefined;

  public onInit(): Promise<void> {
    this.state = { 
      taskCount: 0,
      outstandingTasks: dummyTaskData.tasks,
      currentTaskKey: ""
    };

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());
    this.quickViewNavigator.register(DETAILED_VIEW_REGISTRY_ID, () => new DetailedQuickView());


    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'MyTasks-property-pane'*/
      './MyTasksPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.MyTasksPropertyPane();
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
