import { ReactElement } from 'react';

import Layout from '@/components/layout';
import Peoples from '@/components/peoples';

export default function Home(): ReactElement {
  return (
    <Layout>
      <Peoples />
    </Layout>
  );
}
