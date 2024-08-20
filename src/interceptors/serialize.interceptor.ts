import { NestInterceptor, ExecutionContext, CallHandler, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';

interface ClassConstructor {
    new (...args: any[]): any;
}

export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
    // dto is the variable. so you can use this class for different entities
    constructor(private dto: any) {}
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        // you can write some code to run before request is handled
        return handler.handle().pipe(
            // data is the incoming user entity
            map((data: any) => {
                return plainToInstance(this.dto, data, {
                    //   this takes care of everything. this will expose things that are set in the UserDto
                    excludeExtraneousValues: true,
                    enableImplicitConversion: true,
                });
            }),
        );
    }
}
