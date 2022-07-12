import logger from '@/loaders/logger';
import activeDirectory from 'ad-promise';

export default class AuthService implements IAuthService {

    readonly url: string = 'ldap://kuma-dom.local';
    readonly baseDN: string = 'dc=kuma-dom,dc=local';

    public async executeAuth(username: string, password: string): Promise<boolean> {
        logger.debug("Service 開始");

        const id = username + '@kuma-dom.local';

        var config = {
            url: this.url,
            baseDN: this.baseDN,
            username: id,
            password: password,
        };
        var ad = new activeDirectory(config);

        console.log(config.url);
        console.log(config.baseDN);
        console.log(config.username);
        console.log(config.password);

        // Authenticate
        const ret: boolean = await ad.authenticate(id, password, async function (err, auth) {
            if (err) {
                console.log('ERROR: ' + JSON.stringify(err));
                return;
            }
            if (auth) {
                console.log('Authenticated!');
            }
            else {
                console.log('Authentication failed!');
            }
        }).then((res) => true, (err) => false);

        // ad.getGroupMembershipForUser(id, function (err, groups) {
        //     if (err) {
        //         console.log('ERROR: ' + JSON.stringify(err));
        //         return;
        //     }
        //     if (!groups) console.log('User: ' + id + ' not found.');
        //     else console.log(JSON.stringify(groups));
        // });

        logger.debug("Service 終了");

        return ret;
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
