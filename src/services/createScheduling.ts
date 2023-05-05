import { Scheduling } from "../entities/scheduling";
import { SchedulesRepository } from "../repositories/schedulesRepository";

interface CreateSchedulingRequest {
    customer: string;
    startsAt: Date,
    endsAt: Date,
}

type CreateSchedulingResponse= Scheduling

export class CreateScheduling {
    constructor(
        private schedulesRepository : SchedulesRepository
    ){}

    async execute({customer, startsAt, endsAt}: CreateSchedulingRequest ) : Promise<CreateSchedulingResponse> {
        const overlappingScheduling = await this.schedulesRepository.findOverlappingScheduling(
            startsAt,
            endsAt,
        )
        if (overlappingScheduling){
            throw new Error('Another appointment overlaps this scheduling dates')
        }
        
        const scheduling = new Scheduling({
            customer,
            startsAt,
            endsAt
        })

        await this.schedulesRepository.create(scheduling)

        return scheduling
    }
}