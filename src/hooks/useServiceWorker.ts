import { useEffect } from 'react';

const useServiceWorker = () => {
  useEffect(() => {
    const registerWorker = async () => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then(registration => console.log('scope is: ', registration.scope));
      }
    };

    registerWorker();
  }, []);
};

export default useServiceWorker;
