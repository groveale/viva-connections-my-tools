import {
  BasePrimaryTextCardView,
  BaseImageCardView,
  IImageCardParameters,
  IExternalLinkCardAction,
  IQuickViewCardAction,
  ICardButton
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'MyPraiseAdaptiveCardExtensionStrings';
import { IMyPraiseAdaptiveCardExtensionProps, IMyPraiseAdaptiveCardExtensionState, QUICK_VIEW_REGISTRY_ID } from '../MyPraiseAdaptiveCardExtension';

export class CardView extends BaseImageCardView<IMyPraiseAdaptiveCardExtensionProps, IMyPraiseAdaptiveCardExtensionState> {
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
      primaryText: this.state.anniversaries.length.toString() + strings.PrimaryText,
      title: this.properties.title,
      imageUrl: "https://reckittstorage.blob.core.windows.net/viva-connections-icons/priaseheader.png"
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
