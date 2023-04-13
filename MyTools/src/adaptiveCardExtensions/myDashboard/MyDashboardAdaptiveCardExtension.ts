import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { MyDashboardPropertyPane } from './MyDashboardPropertyPane';

export interface IMyDashboardAdaptiveCardExtensionProps {
  title: string;
}

export interface IMyDashboardAdaptiveCardExtensionState {
}

const CARD_VIEW_REGISTRY_ID: string = 'MyDashboard_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'MyDashboard_QUICK_VIEW';

export default class MyDashboardAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IMyDashboardAdaptiveCardExtensionProps,
  IMyDashboardAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: MyDashboardPropertyPane | undefined;

  public onInit(): Promise<void> {
    this.state = { };

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'MyDashboard-property-pane'*/
      './MyDashboardPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.MyDashboardPropertyPane();
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
