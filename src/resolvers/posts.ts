import { Post } from "../entities/Post";
import { MyContext } from "../types";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export default class PostsResolver {


  @Query(()=> [Post])
  posts(@Ctx() {em}: MyContext ){
    return em.find(Post, {})
  }
}