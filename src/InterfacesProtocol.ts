export type IUndefinedFunction = (...args: any[]) => any

export type IFunctionProtocol<K extends Function = IUndefinedFunction> = {
  id: number
  exec: K
}

/*
 Example for FunctionProtocol:

 type Method = (a: number, b: number) => number
 const functionProtocolExample: IFunctionProtocol<Method> = {
   id: 1,
   exec: (a, b) => a + b
  }

  functionProtocolExample.exec(1, 2) // => 3
*/
