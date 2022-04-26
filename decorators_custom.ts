// import { createParamDecorator, ExecutionContext } from "@nestjs/common";
// import { User } from "src/schemas/user-schema";

// //you can get user information from token with this decorator
// export const GetUser = createParamDecorator(
//     (_data, ctx: ExecutionContext): User=>{
//         const req = ctx.switchToHttp().getRequest();
//         return req.user
//     }
// );