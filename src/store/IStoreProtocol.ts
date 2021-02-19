export interface IStoreProtocol {
  create(): Promise<any>
  read(): Promise<any>
  update(): Promise<any>
  remove(): Promise<any>
  onCreate(): void
  onRead(): void
  onUpdate(): void
  onRemove(): void
}
