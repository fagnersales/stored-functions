import { IFunctionProtocol, IUndefinedFunction } from '../InterfacesProtocol'

export interface IStoreProtocol {
  save<K extends Function = IUndefinedFunction>(data: IFunctionProtocol<K>): Promise<IFunctionProtocol<K>>
  read<K extends Function = IUndefinedFunction>(id: number): Promise<IFunctionProtocol<K> | null>
  update<K extends Function = IUndefinedFunction>(id: number, newFunction: K): Promise<IFunctionProtocol<K> | null>
  remove(id: number): Promise<void>
  onSave(callback: (data: IFunctionProtocol) => any): void
  onRead(): void
  onUpdate(callback: (data: IFunctionProtocol) => any): void
  onRemove(callback: (data: IFunctionProtocol) => any): void
}
