import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { StockTickerPropertyPane } from './StockTickerPropertyPane';

export interface IStockTickerAdaptiveCardExtensionProps {
  title: string;
}

export interface IStockTickerAdaptiveCardExtensionState {
}

const CARD_VIEW_REGISTRY_ID: string = 'StockTicker_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'StockTicker_QUICK_VIEW';

export default class StockTickerAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IStockTickerAdaptiveCardExtensionProps,
  IStockTickerAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: StockTickerPropertyPane | undefined;

  public onInit(): Promise<void> {
    this.state = { };

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'StockTicker-property-pane'*/
      './StockTickerPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.StockTickerPropertyPane();
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
