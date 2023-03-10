import {
  BasePrimaryTextCardView,
  IPrimaryTextCardParameters,
  IImageCardParameters,
  BaseImageCardView,
  IExternalLinkCardAction,
  IQuickViewCardAction,
  ICardButton
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'MyOnboardingAdaptiveCardExtensionStrings';
import { IMyOnboardingAdaptiveCardExtensionProps, IMyOnboardingAdaptiveCardExtensionState, QUICK_VIEW_REGISTRY_ID } from '../MyOnboardingAdaptiveCardExtension';

export class CardView extends BaseImageCardView<IMyOnboardingAdaptiveCardExtensionProps, IMyOnboardingAdaptiveCardExtensionState> {
  public get cardButtons(): [ICardButton] | [ICardButton, ICardButton] | undefined {
    return [
      {
        title: strings.QuickViewButton,
        action: {
          type: 'QuickView',
          parameters: {
            view: QUICK_VIEW_REGISTRY_ID
          }
        }
      }
    ];
  }

  public get data(): IImageCardParameters {
    return {
      primaryText: strings.PrimaryText,
      imageUrl: "https://reckittstorage.blob.core.windows.net/viva-connections-icons/onboarding-card.png",
      title: this.properties.title
    };
  }

  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return {
      type: 'QuickView',
      parameters: {
        view: QUICK_VIEW_REGISTRY_ID
      }
    };
  }
}
