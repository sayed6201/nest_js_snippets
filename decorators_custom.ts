

import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "src/schemas/user-schema";

//you can get user information from token with this decorator
export const GetUser = createParamDecorator(
    (_data, ctx: ExecutionContext): User=>{
        const req = ctx.switchToHttp().getRequest();
        return req.user
    }
);


//usage in controllers

@Patch('/:id/status')
updateTaskStatus(
  @Param('id') id: string,
  @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  @GetUser() user: User,
): Promise<Task> {
  const { status } = updateTaskStatusDto;
  return this.tasksService.updateTaskStatus(id, status, user);
}

//usage in controllers

@Get()
getTasks(
  @Query() filterDto: GetTasksFilterDto,
  @GetUser() user: User,
): Promise<Task[]> {
  this.logger.verbose(
    `User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(
      filterDto,
    )}`,
  );
  return this.tasksService.getTasks(filterDto, user);
}