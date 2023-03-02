import {
  BasePrimaryTextCardView,
  IPrimaryTextCardParameters,
  IExternalLinkCardAction,
  BaseImageCardView,
  IImageCardParameters,
  IQuickViewCardAction,
  ICardButton
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'MyTasksAdaptiveCardExtensionStrings';
import { IMyTasksAdaptiveCardExtensionProps, IMyTasksAdaptiveCardExtensionState, QUICK_VIEW_REGISTRY_ID } from '../MyTasksAdaptiveCardExtension';

export class CardView extends BaseImageCardView<IMyTasksAdaptiveCardExtensionProps, IMyTasksAdaptiveCardExtensionState> {
  public get cardButtons(): [ICardButton] | [ICardButton, ICardButton] | undefined {
    return [
      {
        title: strings.QuickViewButtonText,
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
    let primaryText: string = strings.CardViewZero;
    if (this.state.outstandingTasks.length > 1) {
      primaryText = `${this.state.outstandingTasks.length.toString()} ${strings.CardViewTextPlural}`;
    } else {
      primaryText = `${this.state.outstandingTasks.length.toString()} ${strings.CardViewTextSingular}`;
    }
    return {
      primaryText: primaryText,
      imageUrl: "https://reckittstorage.blob.core.windows.net/viva-connections-icons/mytasksimage.svg",
      //description: strings.CardViewDescription,
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
