import api from '../../services/api';

export const getAllMarkers = async () => {
  const response = await api.get('/');

  return response.data;
};
export const addMarker = async (location) => {
  const response = await api.post('/addMarker', location);

  return response;
};
