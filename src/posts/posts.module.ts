import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../utils/database';
import { Services } from '../utils/constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/guard/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [
    {
      provide: Services.POSTS,
      useClass: PostsService,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [PostsController],
})
export class PostsModule {}
