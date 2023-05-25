import { ToastContextProvider } from '@rothko-ui/ui';
import React from 'react';
import ToastCard from '../../components/Cards/toast';
import WithNavigation from '../../components/WithNavigation';

const Toast = () => {
  return (
    <WithNavigation selected="components/toast">
      <ToastContextProvider>
        <ToastCard />
      </ToastContextProvider>
    </WithNavigation>
  );
};

export default Toast;