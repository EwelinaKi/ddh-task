import { ReactElement } from 'react';

import Layout from '@/components/layout';
import { StarshipForm } from '@/components/starship-form';


export default function Starship(): ReactElement {
  return (
    <Layout>
      <StarshipForm />
    </Layout>
  );
}
