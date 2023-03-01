import {
  BaseImageCardView,
  IImageCardParameters,
  IExternalLinkCardAction,
  IQuickViewCardAction,
  ICardButton
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'MyHelpAdaptiveCardExtensionStrings';
import { IMyHelpAdaptiveCardExtensionProps, IMyHelpAdaptiveCardExtensionState, QUICK_VIEW_REGISTRY_ID } from '../MyHelpAdaptiveCardExtension';

export class CardView extends BaseImageCardView<IMyHelpAdaptiveCardExtensionProps, IMyHelpAdaptiveCardExtensionState> {

  public get data(): IImageCardParameters  {
    return {
      primaryText: strings.CardViewText,
      imageUrl: strings.ImageUrl,
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
