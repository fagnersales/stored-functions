# Goals for this project

## Test solutions for handling functions at realtime.

> Requirements:
- Scalable to big amount of functions
- Flexible for updating without rebuild the process
- Every update must work on functions that is already been used (Which means, if a function is saved in the memory, it must update for next usage)
- ...

> Handling functions that returns as string:

Using `newFunction` in a perfomatic way

```typescript
const functionSumBody = `(a, b) => a + b`

type ISum = (a: number, b: number) => number

const sum: ISum = new Function(`return ${functionSumBody}`)()

sum(1, 3) // => 4
```

## Possible solutions for storing functions outside:
- [Firebase RTDB](src/store/RTDB/RTDB.ts);
- Firebase Firestore;


## Possible solutions for realtime CRUD:
- Store at Firebase and listen to its events ADD, MODIFY, REMOVE.