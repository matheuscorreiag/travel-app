import create from 'zustand';

import { ILocation } from './location';
interface IMarkerState {
  markers: ILocation[];
  addMarker: (location: ILocation) => void;
}

const useMarkersStore = create<IMarkerState>((set) => ({
  markers: [],
  addMarker: (marker: ILocation) => {
    set((state) => ({ markers: [...state.markers, marker] }));
  }
}));

export default useMarkersStore;
