import { PersonsService } from '../persons.service'

import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { DRIZZLE_CLIENT, DrizzleClient } from '@repo/drizzle-connection'
import { DeepPartial } from 'utility-types'

// filepath: apps/backend/src/persons/persons.service.test.ts

describe('PersonsService', () => {
  let service: PersonsService
  let dbMock: DeepPartial<DrizzleClient>

  beforeEach(async () => {
    dbMock = {
      query: {
        person: {
          findFirst: jest.fn(),
        },
      },
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonsService,
        { provide: DRIZZLE_CLIENT, useValue: dbMock },
      ],
    }).compile()

    service = module.get<PersonsService>(PersonsService)
  })

  it('should return person data when found', async () => {
    const mockPerson = {
      id: 1,
      name: 'Test Person',
      nationalId: '1234567890',
      legalResidence: 'Hafnargata 10',
      postCode: '101',
      familyNumber: '123456789',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    jest
      .spyOn(dbMock.query?.person ?? {}, 'findFirst')
      .mockResolvedValueOnce(mockPerson)

    const result = await service.getPersonByNationalId('1234567890')

    expect(result).toEqual(mockPerson)
    expect(dbMock.query?.person?.findFirst).toHaveBeenCalledWith({
      where: expect.any(Function),
    })
  })

  it('should throw NotFoundException when person is not found', async () => {
    jest
      .spyOn(dbMock.query?.person ?? {}, 'findFirst')
      .mockResolvedValueOnce(undefined)

    await expect(service.getPersonByNationalId('9999999999')).rejects.toThrow(
      NotFoundException,
    )
    expect(dbMock.query?.person?.findFirst).toHaveBeenCalledWith({
      where: expect.any(Function),
    })
  })
})
