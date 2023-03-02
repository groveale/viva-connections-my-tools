import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { MyLeadersPropertyPane } from './MyLeadersPropertyPane';

export interface IMyLeadersAdaptiveCardExtensionProps {
  title: string;
}

export interface IMyLeadersAdaptiveCardExtensionState {
}

const CARD_VIEW_REGISTRY_ID: string = 'MyLeaders_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'MyLeaders_QUICK_VIEW';

export default class MyLeadersAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IMyLeadersAdaptiveCardExtensionProps,
  IMyLeadersAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: MyLeadersPropertyPane | undefined;

  public onInit(): Promise<void> {
    this.state = { };

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'MyLeaders-property-pane'*/
      './MyLeadersPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.MyLeadersPropertyPane();
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
