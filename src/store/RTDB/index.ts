import { IStoreProtocol } from '../IStoreProtocol'
import { IFunctionProtocol, IUndefinedFunction } from '../../InterfacesProtocol'
import { database } from '../../firebase'

export class RTDB implements IStoreProtocol {
  private idReference = (id: number | string) => database.ref(`${this.BASE_REF}/${id}`)
  private BASE_REF: string
  private testEnvironment: boolean

  private constructor (testEnvironment: boolean) {
    this.testEnvironment = testEnvironment
    this.BASE_REF = testEnvironment ? '/__tests__/commands' : '/commands'
  }

  static create () {
    return new RTDB(false)
  }

  static createTestEnvironment () {
    return new RTDB(true)
  }

  get isTestEnvironment () {
    return this.testEnvironment
  }

  async save<K extends Function = IUndefinedFunction> (data: IFunctionProtocol<K>): Promise<IFunctionProtocol<K>> {
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

    return this.save({
      id,
      exec: newFunction
    })
  }

  async remove (id: number): Promise<void> {
    const reference = this.idReference(id)
    await reference.set(null)
  }

  onSave (callback: (data: IFunctionProtocol) => any): void {
    database.ref(this.BASE_REF).on('child_added', snapshot => {
      const data = {
        id: Number(snapshot.key),
        // eslint-disable-next-line no-new-func
        exec: new Function(`return ${snapshot.val().exec}`)()
      }

      callback(data)
    })
  }

  onRead () {}

  onUpdate (callback: (data: IFunctionProtocol) => any): void {
    database.ref(this.BASE_REF).on('child_changed', snapshot => {
      const data = {
        id: Number(snapshot.key),
        // eslint-disable-next-line no-new-func
        exec: new Function(`return ${snapshot.val().exec}`)()
      }

      callback(data)
    })
  }

  onRemove () {}
}
