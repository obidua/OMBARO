import React from 'react';
import { PortalProvider } from './context/PortalContext';
import { PortalRouter } from './components/portal/PortalRouter';

function AppNew() {
  return (
    <PortalProvider>
      <div className="min-h-screen bg-gray-50">
        <PortalRouter />
      </div>
    </PortalProvider>
  );
}

export default AppNew;
