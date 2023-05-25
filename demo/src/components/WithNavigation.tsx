import { WidthGeqOnly } from '@rothko-ui/ui';
import NavigationList from './Navigation/NavigationList';
import React from 'react';
import styles from './WithNavigation.module.scss';

type WithNavigationProps = {
  selected?: string;
  children: React.ReactNode;
};

const WithNavigation = ({ children, selected }: WithNavigationProps) => (
  <div className={styles.withNavGrid}>
    <WidthGeqOnly threshold={750}>
      <NavigationList selected={selected} />
    </WidthGeqOnly>
    <div>{children}</div>
  </div>
);

export default WithNavigation;