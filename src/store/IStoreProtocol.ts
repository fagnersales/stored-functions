import { IFunctionProtocol, IUndefinedFunction } from '../InterfacesProtocol'

export interface IStoreProtocol {
  create<K extends Function = IUndefinedFunction>(data: IFunctionProtocol<K>): Promise<IFunctionProtocol<K>>
  read<K extends Function = IUndefinedFunction>(id: string | number): Promise<IFunctionProtocol<K> | null>
  update(): Promise<any>
  remove(): Promise<any>
  onCreate(): void
  onRead(): void
  onUpdate(): void
  onRemove(): void
}
