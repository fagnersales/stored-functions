import 'dotenv/config'
import '../../firebase'

import { RTDB as Store } from './'

describe('Store RTDB Commands', () => {
  const store = Store.createTestEnvironment()

  type Sum545 = (a: number, b: number) => number

  it('should save with valid properties that does a sum with the id 545', async () => {
    await store.save<Sum545>({
      id: 545,
      exec: (a, b) => a + b
    })

    const command = await store.read<Sum545>(545)

    expect(command).toBeTruthy()
    expect(command).toHaveProperty('id')
    expect(command).toHaveProperty('exec')

    return expect(command?.exec(1, 2)).toBe(3)
  })

  it('should read and delete with the id 545', async () => {
    const getCommand = () => store.read<Sum545>(545)

    const commandBeforeDelete = await getCommand()

    expect(commandBeforeDelete).toBeTruthy()
    expect(commandBeforeDelete).toHaveProperty('id')
    expect(commandBeforeDelete).toHaveProperty('exec')

    await store.remove(545)

    const commandAfterDelete = await getCommand()

    return expect(commandAfterDelete).toBeFalsy()
  })

  it.todo('should not save because the id already exists')

  it.todo('should not save because it has invalid properties')

  it.todo('should not save because does not follow the patterns')

  it.todo('should listen for saves and get its properties')

  it.todo('should listen for updates and get its properties')

  it.todo('should listen for deletions')
})
