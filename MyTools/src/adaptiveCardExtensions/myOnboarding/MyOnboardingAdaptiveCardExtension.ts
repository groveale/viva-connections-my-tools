import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { MyOnboardingPropertyPane } from './MyOnboardingPropertyPane';
import dummyOnboardingData from './quickView/template/QuickView.data.json'

export interface IMyOnboardingAdaptiveCardExtensionProps {
  title: string;
}

export interface IMyOnboardingAdaptiveCardExtensionState {
  onboardingData: object
}

const CARD_VIEW_REGISTRY_ID: string = 'MyOnboarding_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'MyOnboarding_QUICK_VIEW';

export default class MyOnboardingAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IMyOnboardingAdaptiveCardExtensionProps,
  IMyOnboardingAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: MyOnboardingPropertyPane | undefined;

  public onInit(): Promise<void> {
    this.state = { 
      onboardingData: dummyOnboardingData.onboardingData
    };

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'MyOnboarding-property-pane'*/
      './MyOnboardingPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.MyOnboardingPropertyPane();
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
