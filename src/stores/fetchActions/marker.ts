import api from '../../services/api';

export const getAllMarkers = async () => {
  const response = await api.get('/');

  return response.data;
};
export const addMarker = async (location: FormData) => {
  const response = await api.post('/addMarker', location, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  return response;
};
