export default interface IError {
    name: string,
    message: string,
    [key: string]: unknown,
}
