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
```typescript
store.save<ISum>({
  id: 1,
  exec: (a, b) => a + b
})
```

Read a data from the RTDB
```typescript
store.read<ISum>(1)
.then((value) => {
  const sum = value.exec
  sum(1, 3) // => 4
})
```