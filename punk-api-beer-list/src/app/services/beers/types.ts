export interface PunkApiBeer {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  volume: PunkApiUnit;
  boil_volume: PunkApiUnit;
  method: {
    mash_temp: [{ temp: PunkApiUnit; duration: number }];
    fermentation: { temp: PunkApiUnit };
    twist: string;
  };
  ingredients: {
    malt: PunkApiMalt[];
    hops: PunkApiHop[];
    yeast: string;
  };
  food_pairing: string[];
  brewers_tips: string;
  contributed_by: string;
}

export interface PunkApiUnit {
  value: number;
  unit: string;
}

export interface PunkApiMalt {
  name: string;
  amount: PunkApiUnit;
}

export interface PunkApiHop {
  name: string;
  amount: PunkApiUnit;
  add: string;
  attribute: string;
}

export interface Pagination {
  currentPage: number;
  prev: boolean;
  next: boolean;
  totalResults: number;
}

export interface PunkApiQueryParams {
  page?: string;
  per_page?: string;
  beer_name?: string;
}
