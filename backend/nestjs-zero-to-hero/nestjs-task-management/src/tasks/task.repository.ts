import { Repository, EntityRepository } from "typeorm"
import { Task } from "./task.entity"
import { CreateTaskDto } from "./dto/create-task.dto"
import { TaskStatus } from "./task-status-enum"
import { GetTasksFilterDto } from "./dto/get-tasks-filter-dto"
import { User } from "src/auth/user.entity"

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
	async createTask(creteTaskDto: CreateTaskDto, user: User): Promise<Task> {
		const { title, description } = creteTaskDto
		const task = new Task()
		task.title = title
		task.description = description
		task.user = user
		task.status = TaskStatus.OPEN
		await task.save()

		delete task.user
		return task
	}

	async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
		const { status, search } = filterDto
		const query = this.createQueryBuilder("task")
		query.where("task.userId = :userId", { userId: user.id })

		if (status) query.andWhere("status = :status", { status })
		if (search) query.andWhere("title LIKE :search OR description LIKE :search", { search: `%${search}%` })

		const tasks = await query.getMany()
		return tasks
	}

	async deleteTaskById(id: number): Promise<void> {
		await this.delete(id)
	}
}
