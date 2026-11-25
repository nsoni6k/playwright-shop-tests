import { faker } from '@faker-js/faker';

export interface UserData {
  name: string;
  email: string;
  password: string;
  title: string;
  birth_date: string;
  birth_month: string;
  birth_year: string;
  firstname: string;
  lastname: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  zipcode: string;
  state: string;
  city: string;
  mobile_number: string;
}

/** Builds a unique user so tests never share state and can run in parallel. */
export function buildUser(overrides: Partial<UserData> = {}): UserData {
  const firstname = faker.person.firstName();
  const lastname = faker.person.lastName();
  const unique = `${Date.now()}${faker.string.alphanumeric(6).toLowerCase()}`;
  return {
    name: `${firstname} ${lastname}`,
    email: `qa.${unique}@example.com`,
    password: faker.internet.password({ length: 12 }),
    title: 'Mr',
    birth_date: '15',
    birth_month: 'May',
    birth_year: '1990',
    firstname,
    lastname,
    company: faker.company.name(),
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: 'Canada',
    zipcode: faker.location.zipCode(),
    state: faker.location.state(),
    city: faker.location.city(),
    mobile_number: faker.string.numeric(10),
    ...overrides,
  };
}
