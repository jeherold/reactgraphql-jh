Both `type` and `interface` can be used to define the shape of objects, function types, and props in TypeScript. While in many cases they can be used interchangeably, there are some differences between the two, and the decision to use one over the other often comes down to the specific use case and developer preference. Let's outline the differences and when you might prefer one over the other:

### `type`

1. **More Flexible**: `type` can represent not just object shapes but also primitives, unions, tuples, and more. For example:
   
   ```typescript
   type Name = string;
   type UnionType = string | number;
   type TupleType = [string, number];
   ```

2. **Type Operations**: With `type`, you can use operations like mapped types or conditional types.
   
   ```typescript
   type Readonly<T> = { readonly [P in keyof T]: T[P] };
   ```

3. **No Merging**: Unlike `interface`, types don't support declaration merging.

### `interface`

1. **Extendable & Mergable**: `interface` is more extendable. Multiple interfaces with the same name will be automatically merged.

   ```typescript
   interface User {
       name: string;
   }
   
   interface User {
       age: number;
   }
   
   // User is now:
   // {
   //     name: string;
   //     age: number;
   // }
   ```

2. **Extending Interfaces**: You can extend an existing interface using the `extends` keyword.
   
   ```typescript
   interface Person {
       name: string;
   }
   
   interface Employee extends Person {
       jobTitle: string;
   }
   ```

3. **Clearer Intent**: When you see an `interface`, it's clear that its primary purpose is to define the shape of an object. This clarity of intent can be beneficial, especially for defining the shape of props in React components or DTOs (Data Transfer Objects).

### Preference & Recommendations:

- **For React Props**: Both `type` and `interface` are commonly used. Some developers prefer `interface` due to its clear intent and extensibility, while others prefer `type` for its flexibility. The React TypeScript community does not have a strict consensus on this.

- **For Union and Intersection Types**: Use `type` since `interface` can't represent them.

- **For Merging Declarations or Extending**: If you need to use declaration merging or want to use object-oriented techniques (like extending), then `interface` is the better choice.

- **Codebase Consistency**: Whichever you choose, aim for consistency across your codebase.

In summary, the choice between `type` and `interface` often comes down to the specific requirements of your use case and personal/team preferences. Both have their strengths, and understanding those can help you make an informed decision.