import { IFunctionProtocol, IUndefinedFunction } from '../InterfacesProtocol'

export interface IStoreProtocol {
  create<K extends Function = IUndefinedFunction>(data: IFunctionProtocol<K>): Promise<IFunctionProtocol<K>>
  read<K extends Function = IUndefinedFunction>(id: number): Promise<IFunctionProtocol<K> | null>
  update<K extends Function = IUndefinedFunction>(id: number, newFunction: K): Promise<IFunctionProtocol<K> | null>
  remove(id: number): Promise<void>
  onCreate(): void
  onRead(): void
  onUpdate(): void
  onRemove(): void
}
