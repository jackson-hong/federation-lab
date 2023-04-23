import {NestJsServerConfigInterface} from './nestjs-server-config.interface';

const config: NestJsServerConfigInterface = {
  port: 4001,
  graphql: {
    playgroundEnabled: true,
    debug: true,
    sortSchema: true,
  },
  cors: {
    enabled: true,
  }
};

export default config;
