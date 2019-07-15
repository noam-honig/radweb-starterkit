
import { DataProviderFactory, RestDataProvider } from "radweb";

export const evilStatics = {
    dataSource: new RestDataProvider('api') as DataProviderFactory,
}
