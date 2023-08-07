import { IsArray, IsEnum, IsString, IsUrl } from 'class-validator';
import { Field, InputType, ObjectType } from 'type-graphql';
import { Allow, View } from './post.enum';

class MusicInput {
  @Field()
  @IsUrl({
    require_protocol: true,
  })
  @IsString()
  url: string;

  @Field()
  name: string;

  @Field()
  artist: string;
}

@InputType()
class VideoInput {
  @Field()
  @IsString()
  @IsUrl({
    require_protocol: true,
  })
  videoUrl: string;

  @Field()
  @IsString()
  @IsUrl({
    require_protocol: true,
  })
  thumbnailUrl: string;

  @Field()
  @IsString()
  musicId: string;
}

class PostInput {
  @Field()
  @IsString()
  caption: string;

  @Field()
  @IsEnum(View)
  viewAs: View;

  @Field()
  @IsArray({
    each: true,
  })
  allow: Allow[];

  @Field()
  @IsString()
  videoId: string;
}

@ObjectType()
class PartialPostInput {
  @Field()
  @IsString()
  caption: string;

  @Field()
  @IsEnum(View)
  viewAs: View;

  @Field()
  @IsArray({
    each: true,
  })
  allow: Allow[];
}

@InputType()
export class CreateVideoInput {
  @Field(() => VideoInput)
  input: VideoInput;
}

@InputType()
export class CreatePostInput {
  @Field(() => PostInput)
  input: PostInput;
}

@InputType()
export class CreateMusicInput {
  @Field(() => MusicInput)
  input: MusicInput;
}

@InputType()
export class UpdatePostInput {
  @Field()
  @IsString()
  id: string;

  @Field(() => PartialPostInput)
  input: PartialPostInput;
}

@InputType()
export class IdInput {
  @Field()
  @IsString()
  id: string;
}
