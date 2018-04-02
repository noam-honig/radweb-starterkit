import * as radweb from 'radweb';
const serverUrl= '/';

export const environment = {
  production: true,
  serverUrl,
  //dataSource: new LocalStorageDataProvider() as DataProviderFactory
  dataSource : new radweb.RestDataProvider(serverUrl+ 'dataapi') as radweb.DataProviderFactory
};
