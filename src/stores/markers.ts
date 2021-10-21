import create from 'zustand';

export interface IMarker {
  lat: number;
  long: number;
}

interface IMarkerState {
  markers: IMarker[];
  addMarker: (marker: IMarker) => void;
}

const useMarkersStore = create<IMarkerState>((set) => ({
  markers: [],

  addMarker: (marker: IMarker) => {
    set((state) => ({ markers: [...state.markers, marker] }));
  }
}));

export default useMarkersStore;
// markers: [],
// addMarker: (marker: IMarker) => {
//   set((state) => [...state, marker]);
