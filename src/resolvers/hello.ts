import { Int, Query, Resolver } from "type-graphql"

@Resolver()
export default class Hello{

  @Query(()=> Int)
  hello(){
    return "helllow workld"
  }
}

