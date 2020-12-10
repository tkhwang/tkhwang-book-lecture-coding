import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common"
import * as uuid from "uuid/v1"
import { CreateTaskDto } from "./dto/create-task.dto"
import { GetTasksFilterDto } from "./dto/get-tasks-filter-dto"
import { TaskRepository } from "./task.repository"
import { InjectRepository } from "@nestjs/typeorm"
import { Task } from "./task.entity"
import { TaskStatus } from "./task-status-enum"
import { User } from "src/auth/user.entity"

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(TaskRepository)
		private taskRepository: TaskRepository,
	) {}

	async getTasks(filterDto: GetTasksFilterDto, user: User) {
		return await this.taskRepository.getTasks(filterDto, user)
	}

	async getTaskById(id: number): Promise<Task> {
		const found = await this.taskRepository.findOne(id)
		if (!found) throw new NotFoundException(`Task with ID "${id}" not found.`)
		return found
	}

	async createTask(creteTaskDto: CreateTaskDto, user: User): Promise<Task> {
		return this.taskRepository.createTask(creteTaskDto, user)
	}

	async deleteTask(id: number): Promise<void> {
		const result = await this.taskRepository.delete(id)
		if (result.affected === 0) throw new NotFoundException(`Task ID ${id} not found.`)
	}

	async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
		const task = await this.getTaskById(id)
		task.status = status
		await task.save()
		return task
	}
}
