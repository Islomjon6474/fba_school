export type Course = {
  id: string;
  name: string;
  description: string;
  price: number;
  skills?: string[];
  modules?: Module[];
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
