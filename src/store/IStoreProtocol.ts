export interface IStoreProtocol {
  create(): Promise<any>
  read(): Promise<any>
  update(): Promise<any>
  remove(): Promise<any>
}
