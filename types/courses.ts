export type Course = {
  id: string;
  name: string;
  description: string;
  price: number;
  skills?: string[];
  modules?: Module[];
  image?: React.JSX.Element;
  color?: string;
};

export type Module = {
  id: string;
  name: string;
  description: string;
  topics?: Topic[];
};

export type Topic = {
  id: string;
  name: string;
  description: string;
  videoUrl?: string;
};
