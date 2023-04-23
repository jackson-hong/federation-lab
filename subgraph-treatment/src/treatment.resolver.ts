import { Resolver, Query, ID, Args, Mutation } from "@nestjs/graphql";
import { Treatment } from "./entities/treatment.entity";

@Resolver(() => Treatment)
export class TreatmentResolver {

  @Query(() => Treatment)
  async treatment(
  ) {
    return {}
  }

  @Query(() => [Treatment])
  async treatments(
  ) {
    return {}
  }
  
}
