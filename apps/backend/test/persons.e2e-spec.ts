import { PersonOutput } from '../src/persons/dto/person.output'
import { PersonsController } from '../src/persons/persons.controller'
import { PersonsService } from '../src/persons/persons.service'

import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'

// filepath: apps/backend/src/persons/persons.controller.test.ts

describe('PersonsController (e2e)', () => {
  let app: INestApplication
  let personsServiceMock: Partial<PersonsService>

  beforeAll(async () => {
    personsServiceMock = {
      getPersonByNationalId: jest.fn((nationalId: string) =>
        Promise.resolve({
          id: 1,
          nationalId,
          name: 'John Doe',
          legalResidence: 'Hafnargata 10',
          postCode: '101',
          familyNumber: '123456789',
          createdAt: null,
          updatedAt: null,
        }),
      ),
    }

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [PersonsController],
      providers: [{ provide: PersonsService, useValue: personsServiceMock }],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('GET /persons/:nationalId should return person data', async () => {
    const nationalId = '1234567890'
    const expectedResponse = new PersonOutput({
      id: 1,
      nationalId,
      name: 'John Doe',
      familyNumber: '123456789',
      legalResidence: 'Hafnargata 10',
      postCode: '101',
    })

    const response = await request(app.getHttpServer())
      .get(`/persons/${nationalId}`)
      .expect(200)

    expect(response.body).toEqual(expectedResponse)
    expect(personsServiceMock.getPersonByNationalId).toHaveBeenCalledWith(
      nationalId,
    )
  })
})
