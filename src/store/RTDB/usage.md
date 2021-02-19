Import the RTDB as Store
```typescript
import { RTDB as Store } from './RTDB'

const store = new Store()
```
Define a type for your function that you're going to create and read
```typescript
type ISum = (a: number, b: number) => number
```

Creates a new data on the RTDB (Realtime Database) 
```typescript
store.create<ISum>({
  id: 1,
  exec: (a, b) => a + b
})
```

Reads a data from the RTDB
```typescript
store.read<ISum>(1)
.then((value) => {
  const sum = value.exec
  sum(1, 3) // => 4
})
```