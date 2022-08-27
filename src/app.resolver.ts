import { Query, Resolver } from 'type-graphql';

@Resolver()
export default class AppResolver {
  @Query(() => String)
  helloWorld(): string {
    return 'Hello World!';
  }
}
