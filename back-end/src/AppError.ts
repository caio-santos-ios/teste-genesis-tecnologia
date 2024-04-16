export class AppErro extends Error {
    code: number;

    constructor(msg: string, status: number) {
        super(msg);
        this.code = status;
    }
}