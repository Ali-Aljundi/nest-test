import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    @Inject(ConfigService)
    private readonly config: ConfigService;

    public createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            url: this.config.get<string>('DATABASE_URL'),
            ssl: {
                rejectUnauthorized: false,
            },
            entities: ['dist/**/*.entity{.ts,.js}'],
            synchronize: true, // This for development
            autoLoadEntities: true,
            // migrations: ['dist/migrations/*.{ts,js}'],
            // migrationsTableName: 'typeorm_migrations',
            // logger: 'file',
        };
    }
}