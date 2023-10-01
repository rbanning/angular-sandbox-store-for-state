

export interface IExample {
  key: string;
  title: string;
  icon: string;
  description: string;
  route: string[];
}


export type ExamplesMenuType = 'side-drawer' | 'full';

export type ExamplesMenuCollection = IExample[];
