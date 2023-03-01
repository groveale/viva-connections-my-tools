import { ISPFxAdaptiveCard, BaseAdaptiveCardView } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'MyCommuteAdaptiveCardExtensionStrings';
import { IMyCommuteAdaptiveCardExtensionProps, IMyCommuteAdaptiveCardExtensionState } from '../MyCommuteAdaptiveCardExtension';
import { IGetLocationActionArguments } from '@microsoft/sp-adaptive-card-extension-base';

export interface IQuickViewData {
  subTitle: string;
  title: string;
  latitude: string;
  longitude: string;
}

export class QuickView extends BaseAdaptiveCardView<
  IMyCommuteAdaptiveCardExtensionProps,
  IMyCommuteAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    return {
      subTitle: strings.SubTitle,
      title: strings.Title,
      latitude: "Latitude: " + this.state.latitude,
      longitude: "Longitude: " + this.state.longitude
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/QuickViewTemplate.json');
  }

  public onAction(action: IGetLocationActionArguments): void {
    if (action.type === 'VivaAction.GetLocation') {
      this.setState({
        latitude: action.location.latitude.toString(),
        longitude: action.location.longitude.toString()
      });
    }
  }
}