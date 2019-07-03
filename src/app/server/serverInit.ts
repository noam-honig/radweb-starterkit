import { Pool } from 'pg';
import { config } from 'dotenv';
import { PostgresDataProvider, PostgrestSchemaBuilder } from 'radweb-server-postgres';

import { foreachSync } from '../shared/utils';
import { ServerContext, allEntities } from '../shared/context';
import '../app.module';
import { evilStatics } from '../shared/auth/evil-statics';
import { ActualSQLServerDataProvider } from 'radweb-server';


export async function serverInit() {

    config();
    let ssl = true;
    if (process.env.DISABLE_POSTGRES_SSL)
        ssl = false;

        if (process.env.logSqls) {
            ActualSQLServerDataProvider.LogToConsole = true;
        }

    if (!process.env.DATABASE_URL) {
        console.log("No DATABASE_URL environment variable found, if you are developing locally, please add a '.env' with DATABASE_URL='postgres://*USERNAME*:*PASSWORD*@*HOST*:*PORT*/*DATABASE*'");
    }
    let dbUrl = process.env.DATABASE_URL;
    

    
    const pool = new Pool({
        connectionString: dbUrl,
        ssl: ssl
    });
    evilStatics.dataSource = new PostgresDataProvider(pool);


    let context = new ServerContext();
    var sb = new PostgrestSchemaBuilder(pool);
    await foreachSync(allEntities.map(x => context.for(x).create()), async x => {
        if (x.__getDbName().toLowerCase().indexOf('from ') < 0) {
            await sb.CreateIfNotExist(x);
            await sb.verifyAllColumns(x);
        }
    });


   




}
