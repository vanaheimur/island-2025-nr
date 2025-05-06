export class PersonOutput {
  id!: number
  name!: string
  nationalId!: string
  legalResidence!: string
  postCode!: string
  familyNumber!: string

  // this allows us to cast data to an instance of this class
  constructor(partial: Partial<PersonOutput>) {
    Object.assign(this, partial)
  }
}
