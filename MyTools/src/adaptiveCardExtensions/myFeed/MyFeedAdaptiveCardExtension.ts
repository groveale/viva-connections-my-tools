import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { MyFeedPropertyPane } from './MyFeedPropertyPane';

export interface IMyFeedAdaptiveCardExtensionProps {
  title: string;
}

export interface IMyFeedAdaptiveCardExtensionState {
}

const CARD_VIEW_REGISTRY_ID: string = 'MyFeed_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'MyFeed_QUICK_VIEW';

export default class MyFeedAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IMyFeedAdaptiveCardExtensionProps,
  IMyFeedAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: MyFeedPropertyPane | undefined;

  public onInit(): Promise<void> {
    this.state = { };

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'MyFeed-property-pane'*/
      './MyFeedPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.MyFeedPropertyPane();
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
