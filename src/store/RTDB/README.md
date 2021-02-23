Import the RTDB as Store
```typescript
import { RTDB as Store } from './RTDB'

// will use the path for the commands as '/__tests__/commands'
const store = Store.createTestEnvironment()

// will use the path for the commands as '/commands'
const store = Store.create()
```
Define a type for your function that you're going to create and read
```typescript
type ISum = (a: number, b: number) => number
```

Save a new data on the RTDB (Realtime Database) 
> `store.save({ id: number, exec: function })`
```typescript
store.save<ISum>({
  id: 1,
  exec: (a, b) => a + b
})
```

Read a data from the RTDB
> `store.read(id)`
```typescript
store.read<ISum>(1)
.then((value) => {
  const sum = value.exec
  sum(1, 3) // => 4
})
```

Updates a data from the RTDB
> `store.update(id, newFunction)`
```typescript
const incrementNumber = (a: number) => a + 1
store.update(1, incrementNumber)
```

Removes a data from the RTDB
> `store.remove(id)`
```typescript
store.remove(1)
```

You can also listen for changes from RTDB

> `store.onSave(callback)` - When a new command is saved
> `store.onUpdate(callback)` - When a command is updated
> `store.onRemove(callback)` - When a command is removed
```typescript
store.onUpdate(data => {
  console.log('command updated!', data.id, data.exec.toString())
})
```