interface IAuthService {
    executeAuth(id: string, pin: string): Promise<boolean>
}