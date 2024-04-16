import { Container, Flex } from '@rothko-ui/ui';

import { BASIC } from './usage/sourceCode';
import { TSCode } from '../../Code';
import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Basic from './usage/Basic';
import Card from '../Card';
import Example from '../Example';
import textareaCopy from './copy';
import Usage from '../Usage';

const GITHUB_URL =
  'https://github.com/luxo-ai/rothko-ui/tree/main/packages/ui/src/components/Input';

const IMPORT = "import { Textarea } from '@rothko-ui/ui';";

const TextareaCard = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const maxWith = isMobileOrTablet ? undefined : '30rem';

  return (
    <Card codeUrl={GITHUB_URL} copy={textareaCopy}>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Usage />
        <Container maxWidth="32rem">
          <TSCode sourceCode={IMPORT} />
        </Container>
        <Example sourceCode={BASIC}>
          <Container maxWidth={maxWith}>
            <Basic />
          </Container>
        </Example>
      </Flex>
    </Card>
  );
};

export default TextareaCard;