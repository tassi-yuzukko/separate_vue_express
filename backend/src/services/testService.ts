import testRepository from "@/database/testRepository";
import logger from '@/loaders/logger';

export default class TestService {
    public async service(text: string) {
        logger.debug("Service 開始");
        const r = new testRepository();
        await r.add(text);
        logger.debug("Service 終了");
    }
}
