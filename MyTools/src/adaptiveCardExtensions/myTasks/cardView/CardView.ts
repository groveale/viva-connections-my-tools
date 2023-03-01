import {
  BasePrimaryTextCardView,
  IPrimaryTextCardParameters,
  IExternalLinkCardAction,
  IQuickViewCardAction,
  ICardButton
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'MyTasksAdaptiveCardExtensionStrings';
import { IMyTasksAdaptiveCardExtensionProps, IMyTasksAdaptiveCardExtensionState, QUICK_VIEW_REGISTRY_ID } from '../MyTasksAdaptiveCardExtension';

export class CardView extends BasePrimaryTextCardView<IMyTasksAdaptiveCardExtensionProps, IMyTasksAdaptiveCardExtensionState> {
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

  public get data(): IPrimaryTextCardParameters {
    let primaryText: string = strings.CardViewZero;
    if (this.state.outstandingTasks.length > 1) {
      primaryText = `${this.state.outstandingTasks.length.toString()} ${strings.CardViewTextPlural}`;
    } else {
      primaryText = `${this.state.outstandingTasks.length.toString()} ${strings.CardViewTextSingular}`;
    }
    return {
      primaryText: primaryText,
      description: strings.CardViewDescription,
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
