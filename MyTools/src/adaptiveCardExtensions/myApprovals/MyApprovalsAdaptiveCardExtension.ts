import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { MyApprovalsPropertyPane } from './MyApprovalsPropertyPane';
import dummyApprovalData from './quickView/template/MyApprovals.data.json'

export interface IMyApprovalsAdaptiveCardExtensionProps {
  title: string;
}

export interface IMyApprovalsAdaptiveCardExtensionState {
  approvalCount: number;
  outstandingApprovals: object[]
  currentApprovalKey: string;
}

const CARD_VIEW_REGISTRY_ID: string = 'MyApprovals_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'MyApprovals_QUICK_VIEW';

export default class MyApprovalsAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IMyApprovalsAdaptiveCardExtensionProps,
  IMyApprovalsAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: MyApprovalsPropertyPane | undefined;

  public onInit(): Promise<void> {
    this.state = { 
      approvalCount: 0,
      outstandingApprovals: dummyApprovalData.approvals,
      currentApprovalKey: ""
    };

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'MyApprovals-property-pane'*/
      './MyApprovalsPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.MyApprovalsPropertyPane();
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
