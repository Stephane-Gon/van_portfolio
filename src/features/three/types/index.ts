
type ThreeActions = {
  setIsZooming: (zoom: boolean) => void;
};

export type ThreeState = {
  isZooming: boolean;
};

export type ThreeStore = ThreeState & ThreeActions;

