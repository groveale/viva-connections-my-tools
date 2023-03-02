import {
  BasePrimaryTextCardView,
  IPrimaryTextCardParameters,
  BaseImageCardView,
  IImageCardParameters,
  IExternalLinkCardAction,
  IQuickViewCardAction,
  ICardButton
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'MyRequestsAdaptiveCardExtensionStrings';
import { IMyRequestsAdaptiveCardExtensionProps, IMyRequestsAdaptiveCardExtensionState, QUICK_VIEW_REGISTRY_ID } from '../MyRequestsAdaptiveCardExtension';

export class CardView extends BaseImageCardView<IMyRequestsAdaptiveCardExtensionProps, IMyRequestsAdaptiveCardExtensionState> {
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
      imageUrl: "https://reckittstorage.blob.core.windows.net/viva-connections-icons/requests.svg",
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
