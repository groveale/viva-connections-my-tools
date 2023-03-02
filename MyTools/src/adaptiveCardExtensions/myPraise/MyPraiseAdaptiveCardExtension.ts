import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { MyPraisePropertyPane } from './MyPraisePropertyPane';
import dummyData from './quickView/template/QuickView.data.json'

export interface IMyPraiseAdaptiveCardExtensionProps {
  title: string;
}

export interface IMyPraiseAdaptiveCardExtensionState {
  praise: object[],
  anniversaries: object[]

}

const CARD_VIEW_REGISTRY_ID: string = 'MyPraise_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'MyPraise_QUICK_VIEW';

export default class MyPraiseAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IMyPraiseAdaptiveCardExtensionProps,
  IMyPraiseAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: MyPraisePropertyPane | undefined;

  public onInit(): Promise<void> {
    this.state = {
      praise: dummyData.praise,
      anniversaries: dummyData.anniversaries
     };

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'MyPraise-property-pane'*/
      './MyPraisePropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.MyPraisePropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane?.getPropertyPaneConfiguration();
  }
}
