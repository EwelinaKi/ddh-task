import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  Autocomplete,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import debounce from '@mui/utils/debounce';

import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

import { Pilot } from '@/types/people';
import { StarshipClassEnum } from '@/types/starship';

import useSearchPilot from '@/hooks/useSearchPilot';

interface IFormInput {
  name: string,
  pilot: Pilot,
  model: string,
  starship_class: StarshipClassEnum,
  cost_in_credits: number,
  length: string,
  max_atmosphering_speed: string,
}

export const StarshipForm = () => {
  const { register, getValues, handleSubmit, reset, setValue, clearErrors } = useForm<IFormInput>();
  const [submittedData, setSubmittedData] = useState<IFormInput | null>(null);
  const [searchPilotName, setSearchPilotName] = useState('');
  const { pilots, status } = useSearchPilot(searchPilotName);

  const onPilotNameChange = (name: string) => {
    setSearchPilotName(name);
  };

  const debouncedOnChange = debounce((name: string) => onPilotNameChange(name), 300);

  const resetForm = () => {
    reset();
    setSubmittedData(null);
  };

  const onSubmit: SubmitHandler<IFormInput> = (data, event) => {
    setSubmittedData(data);
  };

  const onSelectedPilotName = (selectedName: string) => {
    const filteredPilot = pilots?.find(pilot => pilot.name === selectedName);
    filteredPilot && setValue('pilot', filteredPilot);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack alignItems='center' justifyContent='center' my={4} mx='auto' sx={{ maxWidth: '225px' }}>
          <Typography color='text.secondary' variant='h2' sx={{ fontSize: 24 }} gutterBottom>Add a starship</Typography>
          <TextField
            {...register('name')}
            label={'Starship name'}
            margin='dense'
            fullWidth
            required
          />
          <Autocomplete
            fullWidth
            disableClearable
            options={!pilots ? [] : pilots.map((option) => option.name)}
            onChange={(e) => onSelectedPilotName((e.target as HTMLInputElement).innerText)}
            renderInput={(params) => (
              <TextField
                {...params}
                onChange={ e => debouncedOnChange(e.target.value)}
                margin='dense'
                label='Pilot'
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
                required
              />
            )}
          />
          <TextField
            {...register('model')}
            label={'Model'}
            margin='dense'
            fullWidth
            required
          />
          <TextField
            {...register('starship_class')}
            label='Starship class'
            margin='dense'
            defaultValue=''
            select
            fullWidth
            required
          >
            {Object.values(StarshipClassEnum).map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            {...register('cost_in_credits', { min: 1000, valueAsNumber: true })}
            label={'Cost in credits (min. 1000)'}
            margin='dense'
            type='number'
            defaultValue='1000'
            fullWidth
            required
          />
          <TextField
            {...register('length')}
            label={'Length'}
            margin='dense'
            fullWidth
            required
          />
          <TextField
            {...register('max_atmosphering_speed')}
            label={'Speed'}
            margin='dense'
            fullWidth
            required
          />

          <Button
            variant='outlined'
            size='large'
            type='submit'
            sx={{ m: '1rem', width: '100%' }}
            endIcon={<SendIcon />}
          >
            Submit
          </Button>

        </Stack>
      </form>
      {
        submittedData &&
        <>
          <Typography>
            Submitted data: {JSON.stringify(submittedData)}
          </Typography>
          <Button
            variant='outlined'
            size='small'
            sx={{ m: '1rem' }}
            onClick={resetForm}
            endIcon={<DeleteIcon />}
          >
            Clear form
          </Button>
        </>
      }
    </>
  );
};
