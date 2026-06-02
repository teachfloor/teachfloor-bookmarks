import React from 'react';
import { ExtensionViewLoader } from '@teachfloor/extension-kit'

import manifest from '../../teachfloor-app.json';

import BookmarksView from './BookmarksView';

const App = () => {
  return (
    <ExtensionViewLoader
      manifest={manifest}
      componentResolver={(componentName) => import(`./${componentName}`)}
    />
  );
};

export default App;
