

import { Pool } from 'pg';
import { config } from 'dotenv';
import { PostgresDataProvider, PostgrestSchemaBuilder } from 'radweb-server-postgres';
import * as passwordHash from 'password-hash';

import { foreachSync } from '../shared/utils';
import { ServerContext, allEntities } from 'radweb';
import '../app.module';

import { ActualSQLServerDataProvider } from 'radweb-server';
import { Users } from '../users/users';


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
    

    Users.passwordHelper = {
        generateHash: p => passwordHash.generate(p),
        verify: (p, h) => passwordHash.verify(p, h)
    }

    let context = new ServerContext();
    var sb = new PostgrestSchemaBuilder(pool);
    await foreachSync(allEntities.map(x => context.for(x).create()), async x => {
        if (x.__getDbName().toLowerCase().indexOf('from ') < 0) {
            await sb.CreateIfNotExist(x);
            await sb.verifyAllColumns(x);
        }
    });
    return new PostgresDataProvider(pool);







}
