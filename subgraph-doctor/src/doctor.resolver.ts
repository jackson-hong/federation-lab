import {Resolver, Query, Args, Mutation, ID} from '@nestjs/graphql';
import {GraphQLUpload, FileUpload} from 'graphql-upload';
import {Doctor} from './entities/doctor.entity';

@Resolver(() => Doctor)
export class DoctorResolver {

  @Query(() => [Doctor])
  async doctors(
  ) {
    return {};
  }

  @Query(() => Doctor)
  async doctor(
  ) {
    return {};
  }

}
