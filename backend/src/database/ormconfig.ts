import { ConnectionOptions } from 'typeorm';
import path from 'path'
import Test from "@/entity/Test";

export const config: ConnectionOptions = {
    driver: {
        type: 'sqlite',
        storage: path.join(process.cwd(), 'test2.db'),
        database: 'test2'
    },
    entities: [
        // テーブルクラス
        Test
    ],
    autoSchemaSync: true
};

export default config