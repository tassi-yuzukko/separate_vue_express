import expressLoader from './express.js';
import Logger from './logger.js';

export default async ({ expressApp }: { expressApp: any }) => {

    await expressLoader({ app: expressApp });
    Logger.info('✌️ Express loaded');
};