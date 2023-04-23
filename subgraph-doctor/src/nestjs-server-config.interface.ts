export interface NestJsServerConfigInterface {
  port: number;
  cors?: {
    enabled: boolean;
    methods?: string[];
    domain?: string[];
  };
  graphql: GraphqlConfigInterface;
}

export interface GraphqlConfigInterface {
  playgroundEnabled: boolean;
  debug: boolean;
  sortSchema: boolean;
}
