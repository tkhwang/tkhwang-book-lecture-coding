import { PipeTransform, BadRequestException } from "@nestjs/common"
import { TaskStatus } from "../task-status-enum"

export class TaskStatusValidationPipes implements PipeTransform {
	readonly allowedStatus = [TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN]
	transform(value: any) {
		console.log("TCL: TaskStatusValidationPipes -> transform -> value", value)
		value = value.toUpperCase()
		if (!this.isStatusValid(value)) throw new BadRequestException(`"${value}" is an invalid status.`)

		return value
	}

	private isStatusValid(status: any): boolean {
		return this.allowedStatus.includes(status)
	}
}
