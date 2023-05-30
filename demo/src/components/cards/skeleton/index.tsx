import { Container, MaxWidth, SkeletonBoxWithLabel, Slider } from '@rothko-ui/ui';
import { useState } from 'react';

import Card from '../Card';
import { CodeLanguage } from '../CodeExample';
import skeletonCopy from './copy';
import skeletonProps from './props';

const EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
  import { BreadCrumbs, BreadCrumbItem } from '@rothko-ui/ui';

  const Example = () => {
    return (
      <BreadCrumbs>
        <BreadCrumbItem to="ok">One</BreadCrumbItem>
        <BreadCrumbItem onClick={() => console.log('two clicked!')}>Two</BreadCrumbItem>
        <BreadCrumbItem>Three</BreadCrumbItem>
      </BreadCrumbs> 
    );
  }
`,
  [CodeLanguage.JS]: `
  import { BreadCrumbs, BreadCrumbItem } from '@rothko-ui/ui';

  const Example = () => {
    return (
      <BreadCrumbs>
        <BreadCrumbItem to="ok">One</BreadCrumbItem>
        <BreadCrumbItem onClick={() => console.log('two clicked!')}>Two</BreadCrumbItem>
        <BreadCrumbItem>Three</BreadCrumbItem>
      </BreadCrumbs> 
    );
  }
`,
};

const SkeletonCard = () => {
  const [speed, setSpeed] = useState(1.5);
  return (
    <Card
      copy={skeletonCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: skeletonProps }}
    >
      <Container as="section" maxWidth="18rem">
        <SkeletonBoxWithLabel speed={1 / speed} />
      </Container>
      <MaxWidth as="section" maxW="20rem">
        <Slider label="speed" min={0.1} max={5} value={speed} onChange={v => setSpeed(v)} />
      </MaxWidth>
    </Card>
  );
};

export default SkeletonCard;
