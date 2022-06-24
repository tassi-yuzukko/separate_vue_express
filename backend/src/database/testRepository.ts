import { DataSource } from "typeorm";
import Test from "@/entity/Test";
import logger from '@/loaders/logger';
import dataSource from './ormconfig';

export default class testRepository {

    public async add(text: string) {
        logger.debug("repository 開始")

        dataSource.initialize()
            .then(async () => {
                console.log("Data Source has been initialized!")
                const manager = dataSource.manager;
                const test = new Test(text);
                await manager.save(test);
                console.log("Saved a new test with text: " + test.text);

                console.log("Loading tests from the database...");
                const tests = await manager.find(Test);
                console.log("Loaded tests: ", tests);
            })
            .catch(err => {
                console.error("Error during Data Source initialization", err)
            });

        // await createConnection(config).then(async connection => {

        //     console.log("Inserting a new user into the database...");
        //     const test = new Test(text);
        //     await connection.manager.save(test);
        //     console.log("Saved a new test with text: " + test.text);

        //     console.log("Loading tests from the database...");
        //     const tests = await connection.manager.find(Test);
        //     console.log("Loaded tests: ", tests);

        // }).catch(error => console.log(error));
        logger.debug("repository 終了")
    }
}
