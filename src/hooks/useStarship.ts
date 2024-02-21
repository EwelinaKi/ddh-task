import { MutationStatus, UseMutateFunction, useMutation } from '@tanstack/react-query';

import { Starship } from '@/types/starship';

import { StarshipService } from '@/services/starship';

interface State {
  status: MutationStatus;
  postStarship: UseMutateFunction<object, Error, Starship, unknown>
}

const STARSHIP_KEY = 'starship';

const useStarship = (): State => {
  const peopleService = new StarshipService();

  const { data, status, mutate } = useMutation({
    mutationKey: [STARSHIP_KEY],
    mutationFn: (starship: Starship) => peopleService.postStarship(starship),
  });

  return {
    status,
    postStarship: mutate,
  };
};

export default useStarship;
