import { Module } from '@nestjs/common';
import { TRPCModule } from 'nestjs-trpc';
import 'src/trpc/schema-globals';

@Module({
  imports: [
    TRPCModule.forRoot({
      autoSchemaFile: 'src/trpc/@generated',
    }),
  ],
})
export class TrpcModule {}
