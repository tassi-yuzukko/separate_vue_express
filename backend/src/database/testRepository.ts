import { createConnection } from "typeorm";
import Test from "@/entity/Test";
import logger from '@/loaders/logger';
import config from './ormconfig';

 export default class testRepository {

    public async add(text: string) {
        logger.debug("repository 開始")
        createConnection(config).then(async connection => {

            console.log("Inserting a new user into the database...");
            const test = new Test(text);
            await connection.manager.save(test);
            console.log("Saved a new test with text: " + test.text);

            console.log("Loading tests from the database...");
            const tests = await connection.manager.find(Test);
            console.log("Loaded tests: ", tests);

        }).catch(error => console.log(error));
        logger.debug("repository 終了")
    }
}
