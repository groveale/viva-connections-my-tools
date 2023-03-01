declare interface IMyCommuteAdaptiveCardExtensionStrings {
  PropertyPaneDescription: string;
  TitleFieldLabel: string;
  Title: string;
  SubTitle: string;
  PrimaryText: string;
  Description: string;
  QuickViewButton: string;
  ShowCurrentLocation: string;
}

declare module 'MyCommuteAdaptiveCardExtensionStrings' {
  const strings: IMyCommuteAdaptiveCardExtensionStrings;
  export = strings;
}
