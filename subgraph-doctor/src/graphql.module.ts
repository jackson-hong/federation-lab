import {
    ApolloFederationDriver,
    ApolloFederationDriverConfig
} from '@nestjs/apollo';

import { Module } from '@nestjs/common';
//TODO: Fix Typo
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import nestJsServerConfig from './nestjs-server.config';
import { graphqlStatusCodeResponse } from './graphql-status-code-response';
import {DoctorResolver} from "./doctor.resolver";

const { debug, sortSchema, playgroundEnabled } = nestJsServerConfig.graphql

const modules = [
];

const resolvers = [
    DoctorResolver
];

const services = [
];

@Module({
    providers: [
        ...resolvers,
        ...services,
    ],
})
export class graphqlModule { }

export const graphQLEndpoint = GraphQLModule.forRoot<ApolloFederationDriverConfig>({
    driver: ApolloFederationDriver,
    debug,
    playground: playgroundEnabled,

    // schema first
    typePaths: [
        join(process.cwd(), 'src/schema.gql')
    ],

    // code first
    // sortSchema,
    // autoSchemaFile: {
    //   path: join(process.cwd(), 'src/schema.gql'),
    //   federation: 2,
    // },

    path: '/graphql',
    formatResponse: graphqlStatusCodeResponse,
    installSubscriptionHandlers: false,
    include: [graphqlModule],
});
