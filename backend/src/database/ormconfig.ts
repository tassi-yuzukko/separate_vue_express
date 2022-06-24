import { DataSource } from 'typeorm';
import path from 'path'
import Test from "@/entity/Test";

const dataSource = new DataSource({
    type: 'sqlite',
    database: path.join(process.cwd(), 'test2.db'),
    entities: [Test],
    synchronize: true
})

export default dataSource