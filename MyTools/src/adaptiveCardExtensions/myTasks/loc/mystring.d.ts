declare interface IMyTasksAdaptiveCardExtensionStrings {
  PropertyPaneDescription: string;
  GroupName: string;
  TitleFieldLabel: string;
  IconPropertyFieldLabel: string;
  QuickViewButtonText: string;
  CardViewTextSingular: string;
  CardViewTextPlural: string;
  CardViewZero: string;
  CardViewDescription: string;
  QuickViewDescription: string;
  OpenedLabel: string;
  OverdueLabel: string;
}

declare module 'MyTasksAdaptiveCardExtensionStrings' {
  const strings: IMyTasksAdaptiveCardExtensionStrings;
  export = strings;
}
