import { ISPFxAdaptiveCard, BaseAdaptiveCardView } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'MyOnboardingAdaptiveCardExtensionStrings';
import { IMyOnboardingAdaptiveCardExtensionProps, IMyOnboardingAdaptiveCardExtensionState } from '../MyOnboardingAdaptiveCardExtension';

export interface IQuickViewData {
  onboardingData: object;
}

export class QuickView extends BaseAdaptiveCardView<
  IMyOnboardingAdaptiveCardExtensionProps,
  IMyOnboardingAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    return {
      onboardingData: this.state.onboardingData
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/QuickViewTemplate.json');
  }
}