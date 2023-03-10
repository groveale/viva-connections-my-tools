import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { MyRequestsPropertyPane } from './MyRequestsPropertyPane';

export interface IMyRequestsAdaptiveCardExtensionProps {
  title: string;
}

export interface IMyRequestsAdaptiveCardExtensionState {
}

const CARD_VIEW_REGISTRY_ID: string = 'MyRequests_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'MyRequests_QUICK_VIEW';

export default class MyRequestsAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IMyRequestsAdaptiveCardExtensionProps,
  IMyRequestsAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: MyRequestsPropertyPane | undefined;

  public onInit(): Promise<void> {
    this.state = { };

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'MyRequests-property-pane'*/
      './MyRequestsPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.MyRequestsPropertyPane();
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
