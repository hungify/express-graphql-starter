import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  EmailAddress: any;
  Time: any;
  URL: any;
  UUID: any;
};

export const Allow = {
  Comment: 'COMMENT',
  Duet: 'DUET',
  Stitch: 'STITCH'
} as const;

export type Allow = typeof Allow[keyof typeof Allow];
export type Comment = {
  __typename?: 'Comment';
  author: User;
  content: Scalars['String'];
  id: Scalars['ID'];
  postId: Scalars['String'];
};

export type Like = {
  __typename?: 'Like';
  author: User;
  id: Scalars['ID'];
  postId: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  message: Scalars['String'];
};

export type Music = {
  __typename?: 'Music';
  artist: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  url: Scalars['String'];
};

export type MusicInput = {
  artist: Scalars['String'];
  name: Scalars['String'];
  url: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  autoLogin: Token;
  changeEmail: Message;
  changeEmailRequest: Message;
  changePassword: Message;
  createMusic: Music;
  createPost: Post;
  createVideo: Video;
  deletePost: Scalars['Boolean'];
  forgotPassword: Message;
  likePost: Scalars['Boolean'];
  login: Token;
  register: Message;
  resetPassword: Message;
  savePost: Scalars['Boolean'];
  sendVerificationEmail: Message;
  sharePost: Scalars['Boolean'];
  updatePost: Post;
  verifyEmail: Message;
};


export type MutationAutoLoginArgs = {
  userId: Scalars['String'];
};


export type MutationChangeEmailArgs = {
  token: Scalars['String'];
};


export type MutationChangeEmailRequestArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  confirmPassword: Scalars['String'];
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};


export type MutationCreateMusicArgs = {
  input: MusicInput;
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationCreateVideoArgs = {
  input: VideoInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLikePostArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  confirmPassword: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationSavePostArgs = {
  id: Scalars['ID'];
};


export type MutationSendVerificationEmailArgs = {
  email: Scalars['String'];
};


export type MutationSharePostArgs = {
  id: Scalars['ID'];
};


export type MutationUpdatePostArgs = {
  id: Scalars['ID'];
  input: UpdatePostInput;
};


export type MutationVerifyEmailArgs = {
  token: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  allow: Array<Allow>;
  caption: Scalars['String'];
  comments?: Maybe<Array<Comment>>;
  id: Scalars['ID'];
  isLiked?: Maybe<Scalars['Boolean']>;
  isSaved?: Maybe<Scalars['Boolean']>;
  likes?: Maybe<Array<Like>>;
  shares?: Maybe<Array<Share>>;
  user: User;
  video: Video;
  viewAs: View;
};

export type PostInput = {
  allow: Array<Allow>;
  caption: Scalars['String'];
  videoId: Scalars['String'];
  viewAs: View;
};

export type Profile = {
  __typename?: 'Profile';
  bio?: Maybe<Scalars['String']>;
  facebookUrl?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  instagramUrl?: Maybe<Scalars['String']>;
  twitterUrl?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  hi: Scalars['String'];
  me: User;
  recommendedPosts?: Maybe<Array<Post>>;
};

export const Role = {
  Admin: 'ADMIN',
  User: 'USER'
} as const;

export type Role = typeof Role[keyof typeof Role];
export type Share = {
  __typename?: 'Share';
  author: User;
  id: Scalars['ID'];
  postId: Scalars['String'];
};

export type Token = {
  __typename?: 'Token';
  accessToken: Scalars['String'];
};

export type UpdatePostInput = {
  allow?: InputMaybe<Array<Allow>>;
  caption?: InputMaybe<Scalars['String']>;
  viewAs?: InputMaybe<View>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstName: Scalars['String'];
  followers?: Maybe<Array<User>>;
  following?: Maybe<Array<User>>;
  id: Scalars['String'];
  isVerified: Scalars['Boolean'];
  lastName: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  profile?: Maybe<Profile>;
  role: Role;
};

export type Video = {
  __typename?: 'Video';
  id: Scalars['ID'];
  music?: Maybe<Music>;
  thumbnailUrl?: Maybe<Scalars['String']>;
  videoUrl: Scalars['String'];
};

export type VideoInput = {
  musicId: Scalars['String'];
  thumbnailUrl: Scalars['String'];
  videoUrl: Scalars['String'];
};

export const View = {
  Friends: 'FRIENDS',
  Private: 'PRIVATE',
  Public: 'PUBLIC'
} as const;

export type View = typeof View[keyof typeof View];


export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Allow: Allow;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Comment: ResolverTypeWrapper<Comment>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Like: ResolverTypeWrapper<Like>;
  Message: ResolverTypeWrapper<Message>;
  Music: ResolverTypeWrapper<Music>;
  MusicInput: MusicInput;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
  PostInput: PostInput;
  Profile: ResolverTypeWrapper<Profile>;
  Query: ResolverTypeWrapper<{}>;
  Role: Role;
  Share: ResolverTypeWrapper<Share>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Time: ResolverTypeWrapper<Scalars['Time']>;
  Token: ResolverTypeWrapper<Token>;
  URL: ResolverTypeWrapper<Scalars['URL']>;
  UUID: ResolverTypeWrapper<Scalars['UUID']>;
  UpdatePostInput: UpdatePostInput;
  User: ResolverTypeWrapper<User>;
  Video: ResolverTypeWrapper<Video>;
  VideoInput: VideoInput;
  View: View;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Comment: Comment;
  Date: Scalars['Date'];
  DateTime: Scalars['DateTime'];
  EmailAddress: Scalars['EmailAddress'];
  ID: Scalars['ID'];
  Like: Like;
  Message: Message;
  Music: Music;
  MusicInput: MusicInput;
  Mutation: {};
  Post: Post;
  PostInput: PostInput;
  Profile: Profile;
  Query: {};
  Share: Share;
  String: Scalars['String'];
  Time: Scalars['Time'];
  Token: Token;
  URL: Scalars['URL'];
  UUID: Scalars['UUID'];
  UpdatePostInput: UpdatePostInput;
  User: User;
  Video: Video;
  VideoInput: VideoInput;
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export type LikeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Like'] = ResolversParentTypes['Like']> = {
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MusicResolvers<ContextType = any, ParentType extends ResolversParentTypes['Music'] = ResolversParentTypes['Music']> = {
  artist?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  autoLogin?: Resolver<ResolversTypes['Token'], ParentType, ContextType, RequireFields<MutationAutoLoginArgs, 'userId'>>;
  changeEmail?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationChangeEmailArgs, 'token'>>;
  changeEmailRequest?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationChangeEmailRequestArgs, 'email'>>;
  changePassword?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationChangePasswordArgs, 'confirmPassword' | 'newPassword' | 'oldPassword'>>;
  createMusic?: Resolver<ResolversTypes['Music'], ParentType, ContextType, RequireFields<MutationCreateMusicArgs, 'input'>>;
  createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'input'>>;
  createVideo?: Resolver<ResolversTypes['Video'], ParentType, ContextType, RequireFields<MutationCreateVideoArgs, 'input'>>;
  deletePost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'id'>>;
  forgotPassword?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationForgotPasswordArgs, 'email'>>;
  likePost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationLikePostArgs, 'id'>>;
  login?: Resolver<ResolversTypes['Token'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  register?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'email' | 'firstName' | 'lastName' | 'password'>>;
  resetPassword?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'confirmPassword' | 'password' | 'token'>>;
  savePost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSavePostArgs, 'id'>>;
  sendVerificationEmail?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationSendVerificationEmailArgs, 'email'>>;
  sharePost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSharePostArgs, 'id'>>;
  updatePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'id' | 'input'>>;
  verifyEmail?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationVerifyEmailArgs, 'token'>>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  allow?: Resolver<Array<ResolversTypes['Allow']>, ParentType, ContextType>;
  caption?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  comments?: Resolver<Maybe<Array<ResolversTypes['Comment']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isLiked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isSaved?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  likes?: Resolver<Maybe<Array<ResolversTypes['Like']>>, ParentType, ContextType>;
  shares?: Resolver<Maybe<Array<ResolversTypes['Share']>>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  video?: Resolver<ResolversTypes['Video'], ParentType, ContextType>;
  viewAs?: Resolver<ResolversTypes['View'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']> = {
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  facebookUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  instagramUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  twitterUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  hi?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  recommendedPosts?: Resolver<Maybe<Array<ResolversTypes['Post']>>, ParentType, ContextType>;
};

export type ShareResolvers<ContextType = any, ParentType extends ResolversParentTypes['Share'] = ResolversParentTypes['Share']> = {
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export type TokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  followers?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  following?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isVerified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Video'] = ResolversParentTypes['Video']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  music?: Resolver<Maybe<ResolversTypes['Music']>, ParentType, ContextType>;
  thumbnailUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  videoUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Comment?: CommentResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  Like?: LikeResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Music?: MusicResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Share?: ShareResolvers<ContextType>;
  Time?: GraphQLScalarType;
  Token?: TokenResolvers<ContextType>;
  URL?: GraphQLScalarType;
  UUID?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  Video?: VideoResolvers<ContextType>;
};

