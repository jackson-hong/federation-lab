import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {graphQLEndpoint, graphqlModule} from "./graphql.module";

@Module({
  imports: [// gql endpoints
    graphqlModule,
    graphQLEndpoint,],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {
}