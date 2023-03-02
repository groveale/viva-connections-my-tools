import {
  BasePrimaryTextCardView,
  IPrimaryTextCardParameters,
  IImageCardParameters,
  BaseImageCardView,
  IExternalLinkCardAction,
  IQuickViewCardAction,
  ICardButton
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'MyApprovalsAdaptiveCardExtensionStrings';
import { IMyApprovalsAdaptiveCardExtensionProps, IMyApprovalsAdaptiveCardExtensionState, QUICK_VIEW_REGISTRY_ID } from '../MyApprovalsAdaptiveCardExtension';

export class CardView extends BaseImageCardView<IMyApprovalsAdaptiveCardExtensionProps, IMyApprovalsAdaptiveCardExtensionState> {
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
    let primaryText: string = "😎";
    let descriptionText: string = strings.CardViewDescriptionZero;
    if (this.state.outstandingApprovals.length > 1) {
      primaryText = `${this.state.outstandingApprovals.length.toString()} ${strings.CardViewTextPlural}`;
      descriptionText = strings.CardViewDescription
    } else if (this.state.outstandingApprovals.length > 0) {
      primaryText = `${this.state.outstandingApprovals.length.toString()} ${strings.CardViewTextSingular}`;
      descriptionText = strings.CardViewDescription
    }
    return {
      primaryText: primaryText,
      imageUrl: "https://reckittstorage.blob.core.windows.net/viva-connections-icons/approvalimage.svg",
      title: this.properties.title
    };
  }

  // public get data(): IPrimaryTextCardParameters {
  //   let primaryText: string = "😎";
  //   let descriptionText: string = strings.CardViewDescriptionZero;
  //   if (this.state.outstandingApprovals.length > 1) {
  //     primaryText = `${this.state.outstandingApprovals.length.toString()} ${strings.CardViewTextPlural}`;
  //     descriptionText = strings.CardViewDescription
  //   } else if (this.state.outstandingApprovals.length > 0) {
  //     primaryText = `${this.state.outstandingApprovals.length.toString()} ${strings.CardViewTextSingular}`;
  //     descriptionText = strings.CardViewDescription
  //   }
  //   return {
  //     primaryText: primaryText,
  //     description: descriptionText,
  //     title: this.properties.title
  //   };
  // }

  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return {
      type: 'QuickView',
      parameters: {
        view: QUICK_VIEW_REGISTRY_ID
      }
    };
  }
}
