import create from 'zustand';

export interface ILocation {
  lat: number;
  long: number;
}

interface ILocationState {
  locations: ILocation;
  addLocation: (user: ILocation) => void;
}

const useLocationStore = create<ILocationState>((set) => ({
  locations: {} as ILocation,
  addLocation: (location: ILocation) => {
    set((state) => ({ locations: { lat: location.lat, long: location.long } }));
  }
}));

export default useLocationStore;
