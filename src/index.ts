import { MikroORM} from '@mikro-orm/core'
import { __prod__ } from './constant';
import microConfig from './mikro-orm.config'
import express from 'express'
import { ApolloServer} from "apollo-server-express";
import { buildSchema } from "type-graphql";
import Hello from './resolvers/hello';
import PostsResolver from './resolvers/posts';

const main = async () => {
  const orm = await MikroORM.init(
    microConfig
  ) ;
  await orm.getMigrator().up()
  
  const app = express()
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [Hello, PostsResolver],
      validate:false
    }),
    context: ()=> ({
       em: orm.em
    })
  })

  apolloServer.applyMiddleware({app})

  app.listen(4000, ()=>{
    console.log('express running')
  })
  
}

main().catch(err=> console.error(err))