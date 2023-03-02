import { ISPFxAdaptiveCard, BaseAdaptiveCardView } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'MyPraiseAdaptiveCardExtensionStrings';
import { IMyPraiseAdaptiveCardExtensionProps, IMyPraiseAdaptiveCardExtensionState } from '../MyPraiseAdaptiveCardExtension';

export interface IQuickViewData {
  anniversaries: object[],
  praise: object[]
}

export class QuickView extends BaseAdaptiveCardView<
  IMyPraiseAdaptiveCardExtensionProps,
  IMyPraiseAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    return {
      anniversaries: this.state.anniversaries,
      praise: this.state.praise,
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/QuickViewTemplate.json');
  }
}