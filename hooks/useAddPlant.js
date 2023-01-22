import { useMutation } from '@tanstack/react-query';
import usePlantsStore from '../store/plantsStore';
import useProfileStore from '../store/profileStore';
import client from '../api/client';

export default useAddPlant = () => {
  const { addPlant } = usePlantsStore();
  const { addPlantToProfile, profile } = useProfileStore();
  const addPlantMutation = useMutation({
    mutationKey: ['addPlant'],
    mutationFn: async plant => {
      console.log('res', plant);
      const response = await client.post('/ProfilePlants/AddPlant', {
        plantId: plant.id,
        profileId: profile.id,
      });
      return response.data;
    },
    onSuccess: data => {
      console.log('data', data);
      addPlant(data);
      // addPlantToProfile(data.plant);
    },
  });
  return addPlantMutation;
};
