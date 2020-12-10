import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Patch,
	Query,
	UsePipes,
	ValidationPipe,
	ParseIntPipe,
	UseGuards,
	Logger,
} from "@nestjs/common"
import { TasksService } from "./tasks.service"
import { CreateTaskDto } from "./dto/create-task.dto"
import { GetTasksFilterDto } from "./dto/get-tasks-filter-dto"
import { TaskStatusValidationPipes } from "./pipes/task-status-validation-pipe"
import { Task } from "./task.entity"
import { TaskStatus } from "./task-status-enum"
import { AuthGuard } from "@nestjs/passport"
import { User } from "src/auth/user.entity"
import { GetUser } from "src/auth/get-user.decorator"

@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
	private logger = new Logger("TasksController")

	constructor(private tasksService: TasksService) {}

	@Get()
	getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto, @GetUser() user: User) {
		this.logger.verbose(`User ${user.username} retrieving all tasks. Filters: ${JSON.stringify(filterDto)}`)
		return this.tasksService.getTasks(filterDto, user)
	}

	@Get("/:id")
	getTaskById(@Param("id", ParseIntPipe) id: number): Promise<Task> {
		return this.tasksService.getTaskById(id)
	}

	@Post()
	@UsePipes(ValidationPipe)
	createTasks(@Body() creteTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
		return this.tasksService.createTask(creteTaskDto, user)
	}

	@Delete("/:id")
	deleteTask(@Param("id", ParseIntPipe) id: number): Promise<void> {
		return this.tasksService.deleteTask(id)
	}

	@Patch("/:id/status")
	updateTaskStatus(
		@Param("id", ParseIntPipe) id: number,
		@Body("status", TaskStatusValidationPipes) status: TaskStatus,
	): Promise<Task> {
		return this.tasksService.updateTaskStatus(id, status)
	}
}
