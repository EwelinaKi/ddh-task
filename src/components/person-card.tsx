import { ReactElement } from 'react';
import { useRouter } from 'next/router';

import {
  Button,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';

import { PeopleAPI } from '@/types/people';


interface Props {
  data: PeopleAPI;
}

const personDetails: Array<{attribute: keyof PeopleAPI, attributeName: string}> = [
  {
    attribute: 'birth_year',
    attributeName: 'Birth year',
  },
  {
    attribute: 'eye_color',
    attributeName: 'Eye color',
  },
  {
    attribute: 'gender',
    attributeName: 'Gender',
  },
  {
    attribute: 'height',
    attributeName: 'Height',
  },
  {
    attribute: 'mass',
    attributeName: 'Mass',
  },
  {
    attribute: 'skin_color',
    attributeName: 'Skin color',
  },
];

export const PersonCard = ({ data }: Props): ReactElement => {
  const router = useRouter();

  return (
    <Stack alignItems='center' justifyContent='center' my={4}>
      <CardContent>
        <Typography color='text.secondary' variant="h2"  sx={{ fontSize: 24 }} gutterBottom>
          {data.name}
        </Typography>
        {personDetails.map( ({attribute, attributeName}) =>
            // @ts-ignore
            <Typography key={attribute} color='text.secondary'>{attributeName}: {data[attribute]}</Typography>
        )}
      </CardContent>
      <CardActions>
        <Button variant='outlined' size='large' onClick={() => router.push('/')}>Back</Button>
      </CardActions>
    </Stack>
  );


};
