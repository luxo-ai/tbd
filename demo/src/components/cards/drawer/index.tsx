import { Container, Flex } from '@rothko-ui/ui';

import { BASIC, BLUR } from './usage/sourceCode';
import { TSCode } from '../../Code';
import Basic from './usage/Basic';
import Blur from './usage/Blur';
import Card from '../Card';
import drawerCopy from './copy';
import drawerProps from './props';
import Example from '../Example';
import Props from '../Props';
import Usage from '../Usage';

const GITHUB_URL =
  'https://github.com/luxo-ai/rothko-ui/tree/main/packages/ui/src/components/Drawer';

const IMPORT = "import { Drawer } from '@rothko-ui/ui';";

const DrawerCard = () => {
  return (
    <Card codeUrl={GITHUB_URL} copy={drawerCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Usage />
        <Container maxWidth="32rem">
          <TSCode sourceCode={IMPORT} />
        </Container>
        <Example sourceCode={BASIC}>
          <Container maxWidth="15rem">
            <Basic />
          </Container>
        </Example>
        <Example title="Blur" sourceCode={BLUR}>
          <Container maxWidth="15rem">
            <Blur />
          </Container>
        </Example>
      </Flex>
      <Props copy={{ props: drawerProps }} />
    </Card>
  );
};

export default DrawerCard;
