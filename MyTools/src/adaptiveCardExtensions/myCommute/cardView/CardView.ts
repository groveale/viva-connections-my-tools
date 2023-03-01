import {
  BasePrimaryTextCardView,
  IPrimaryTextCardParameters,
  IExternalLinkCardAction,
  IQuickViewCardAction,
  ICardButton
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'MyCommuteAdaptiveCardExtensionStrings';
import { IMyCommuteAdaptiveCardExtensionProps, IMyCommuteAdaptiveCardExtensionState, QUICK_VIEW_REGISTRY_ID } from '../MyCommuteAdaptiveCardExtension';

export class CardView extends BasePrimaryTextCardView<IMyCommuteAdaptiveCardExtensionProps, IMyCommuteAdaptiveCardExtensionState> {
  public get cardButtons(): [ICardButton] | [ICardButton, ICardButton] | undefined {
    return [
      {
        title: strings.ShowCurrentLocation,
        action: {
          type: 'VivaAction.ShowLocation'
        }
      }
    ];
  }

  public get data(): IPrimaryTextCardParameters {
    return {
      primaryText: strings.PrimaryText,
      description: strings.Description,
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
