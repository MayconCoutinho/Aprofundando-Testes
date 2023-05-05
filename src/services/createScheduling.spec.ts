import { describe, expect, it } from "vitest";
import { CreateScheduling } from "./createScheduling";
import { Scheduling } from "../entities/scheduling";
import { getFutureDate } from "../tests/utils/getFutureDate";
import { inMemorySchedulesRepository } from "../repositories/inMemory/inMemorySchedulesRepository";


describe('Create Scheduling', () => {
    it('should be able to create an Scheduling', () => {
        const SchedulesRepository = new inMemorySchedulesRepository()
        const createScheduling = new CreateScheduling(SchedulesRepository)

        const startsAt = getFutureDate('2023-05-05')
        const endsAt = getFutureDate('2023-05-06')
        
        startsAt.setDate(startsAt.getDate() + 1)
        endsAt.setDate(endsAt.getDate() + 2)
    
        expect(createScheduling.execute({
            customer: "Maycon Coutinho",
            startsAt,
            endsAt,
        })).resolves.toBeInstanceOf(Scheduling)
    })
    it('should not be able to create an schedulings with overlapping dates', async () => {
        const SchedulesRepository = new inMemorySchedulesRepository()
        const createScheduling = new CreateScheduling(SchedulesRepository)

        const startsAt = getFutureDate('2023-05-05')
        const endsAt = getFutureDate('2023-05-10')
        
        startsAt.setDate(startsAt.getDate() + 1)
        endsAt.setDate(endsAt.getDate() + 2)

        await createScheduling.execute({
            customer: 'Maycon Coutinho',
            startsAt,
            endsAt,
        })
    
        expect(createScheduling.execute({
            customer: 'Maycon Coutinho',
            startsAt: getFutureDate('2023-05-09'),
            endsAt: getFutureDate('2023-05-13'),

        })).rejects.toBeInstanceOf(Error)

        expect(createScheduling.execute({
            customer: 'Maycon Coutinho',
            startsAt: getFutureDate('2023-05-03'),
            endsAt: getFutureDate('2023-05-8'),

        })).rejects.toBeInstanceOf(Error)

        expect(createScheduling.execute({
            customer: 'Maycon Coutinho',
            startsAt: getFutureDate('2023-05-06'),
            endsAt: getFutureDate('2023-05-11'),

        })).rejects.toBeInstanceOf(Error)
        expect(createScheduling.execute({
            customer: 'Maycon Coutinho',
            startsAt: getFutureDate('2023-05-05'),
            endsAt: getFutureDate('2023-05-09'),

        })).rejects.toBeInstanceOf(Error)
    })

    
})