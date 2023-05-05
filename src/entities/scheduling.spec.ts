import {expect, test} from 'vitest'
import {Scheduling} from './scheduling'
import { getFutureDate } from '../tests/utils/getFutureDate'

test('create an Scheduling', () => {
    const startsAt = getFutureDate('2023-05-10')
    const endsAt = getFutureDate('2023-05-09')

    const scheduling = new Scheduling({
        customer: 'Maycon Coutinho',
        startsAt,
        endsAt,
    })
    expect(scheduling).toBeInstanceOf(Scheduling)
    expect(scheduling.customer).toEqual('Maycon Coutinho')
})

test('cannot create an scheduling with end date before start date', () => {
    const startsAt = getFutureDate('2023-05-05')
    const endsAt = getFutureDate('2023-05-04')

    expect(() => {
        return new Scheduling({
            customer: 'Maycon Coutinho',
            startsAt,
            endsAt,
        })
    }).toThrow()

})

test('cannot create an scheduling with start date before now', () => {
    
    const startsAt = new Date()
    const endsAt = new Date()

    startsAt.setDate(startsAt.getDate() - 1)
    endsAt.setDate(endsAt.getDate() + 3)

    expect(() => {
        return new Scheduling({
            customer: 'Maycon Coutinho',
            startsAt,
            endsAt,
        })
    }).toThrow()

})