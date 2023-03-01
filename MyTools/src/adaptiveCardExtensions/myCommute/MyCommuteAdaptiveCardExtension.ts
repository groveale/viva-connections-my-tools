import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { MyCommutePropertyPane } from './MyCommutePropertyPane';


export interface IMyCommuteAdaptiveCardExtensionProps {
  title: string;
}

export interface IMyCommuteAdaptiveCardExtensionState {
  latitude: string;
  longitude: string;
}

const CARD_VIEW_REGISTRY_ID: string = 'MyCommute_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'MyCommute_QUICK_VIEW';

export default class MyCommuteAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IMyCommuteAdaptiveCardExtensionProps,
  IMyCommuteAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: MyCommutePropertyPane | undefined;

  public onInit(): Promise<void> {
    this.state = {
      latitude: 'TBD',
      longitude: 'TBD'
    };

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'MyCommute-property-pane'*/
      './MyCommutePropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.MyCommutePropertyPane();
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
