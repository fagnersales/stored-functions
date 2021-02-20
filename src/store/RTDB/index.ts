import { IStoreProtocol } from '../IStoreProtocol'
import { IFunctionProtocol, IUndefinedFunction } from '../../InterfacesProtocol'
import { database } from '../../firebase'

export class RTDB implements IStoreProtocol {
  private BASE_REF = '/commands'
  private idReference = (id: number | string) => database.ref(`${this.BASE_REF}/${id}`)

  async create<K extends Function = IUndefinedFunction> (data: IFunctionProtocol<K>): Promise<IFunctionProtocol<K>> {
    const reference = this.idReference(data.id)
    await reference.set({ exec: String(data.exec) })
    return data
  }

  async read<K extends Function = IUndefinedFunction> (id: number): Promise<IFunctionProtocol<K> | null> {
    const reference = this.idReference(id)
    const value = (await reference.get()).val()

    if (!value) return null

    return {
      id,
      // eslint-disable-next-line no-new-func
      exec: new Function(`return ${value.exec}`)()
    }
  }

  async update<K extends Function = IUndefinedFunction> (id: number, newFunction: K): Promise<IFunctionProtocol<K> | null> {
    const data = await this.read(id)

    if (!data) return null

    return this.create({
      id,
      exec: newFunction
    })
  }

  async remove () {}

  onCreate () {}

  onRead () {}

  onUpdate () {}

  onRemove () {}
}
