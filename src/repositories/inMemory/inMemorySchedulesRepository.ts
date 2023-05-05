import { areIntervalsOverlapping } from "date-fns";
import { Scheduling } from "../../entities/scheduling";
import { SchedulesRepository } from "../schedulesRepository";

export class inMemorySchedulesRepository implements SchedulesRepository{
    public items: Scheduling[] = []

    async create(scheduling: Scheduling): Promise<void> {
        this.items.push(scheduling)
        
    }

    async findOverlappingScheduling(startsAt: Date, endsAt: Date): Promise<Scheduling | null> {
        const overlappingScheduling = this.items.find(scheduling => {
            return areIntervalsOverlapping(
                {start: startsAt, end: endsAt},
                {start: scheduling.startsAt , end: scheduling.endsAt},
                {inclusive: true}
            )
        })
        if(!overlappingScheduling){
            return null
        }
        return overlappingScheduling
    }
}