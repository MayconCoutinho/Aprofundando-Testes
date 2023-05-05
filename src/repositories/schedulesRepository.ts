import { Scheduling } from "../entities/scheduling";

export interface SchedulesRepository {
    create(scheduling: Scheduling) : Promise<void>;

    findOverlappingScheduling(startsAt: Date, endsAt:Date): Promise<Scheduling | null>
}