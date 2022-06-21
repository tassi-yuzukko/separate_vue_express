import testRepository from "@/database/testRepository";
import logger from '@/loaders/logger';

export default function service(text: string){
    logger.debug("Service 開始");
    const r = new testRepository();
    r.add(text);
    logger.debug("Service 終了");
}