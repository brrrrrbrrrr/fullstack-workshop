import { faker } from '@faker-js/faker';
import Database from './model/Database.js';
import UserDAO from './model/UserDAO.js';
import RoleDAO from './model/RoleDAO.js';
import AuthorDAO from './model/AuthorDAO.js';
import LanguageDAO from './model/LanguageDAO.js';
import SectorDAO from './model/SectorDAO.js';
import TypeDAO from './model/TypeDAO.js';
import EditorDAO from './model/EditorDAO.js';
import LoanDAO from './model/LoanDAO.js';
import MediaDAO from './model/MediaDAO.js';
import { hashPassword } from './utils/auth.js';

const nbUser = 50;
const nbRole = 3;
const nbAuthor = 30;
const nbLanguage = 10;
const nbSector = 8;
const nbType = 5;
const nbEditor = 5;
const nbLoan = 20;
const nbGenre =

const db = new Database();

// ---- CREATE RANDOM USER ----

const userDAO = new UserDAO(db);
const createUser = async () => {
  const randomFirstname = faker.person.firstName();
  const randomLastname = faker.person.lastName();
  const randomAge = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });
  const role = faker.number.int({ min: 1, max: 3 });
  const phone = faker.phone.number();
  const password = await hashPassword('password');
  await userDAO.create(
    randomFirstname,
    randomLastname,
    randomAge,
    role,
    phone,
    password
  );
};

const createMultiplesUsers = () => {
  for (let i = 0; i < nbUser; i++) {
    createUser();
  }
  console.log(`${nbUser} users are created`);
};

// ---- CREATE RANDOM ROLE ----
const roleDAO = new RoleDAO(db);

const createMultiplesRoles = () => {
  const role = ['Student', 'Employee', 'Admin'];
  for (let i = 0; i < nbRole; i++) {
    createRole(role[i]);
  }
  console.log(`${nbRole} role are created`);
};
const createRole = (value) => {
  roleDAO.create(value);
};

// ---- CREATE RANDOM AUTHOR ----
const authorDAO = new AuthorDAO(db);

const createAuthor = () => {
  const randomAuthor = faker.person.lastName();
  authorDAO.create(randomAuthor);
};

const createMultiplesAuthors = () => {
  for (let i = 0; i < nbAuthor; i++) {
    createAuthor();
  }
  console.log(`${nbAuthor} author are created`);
};

// ---- CREATE RANDOM LANGUAGE ----

const languageDAO = new LanguageDAO(db);
const createLanguage = () => {
  const randomLanguage = faker.location.country();
  languageDAO.create(randomLanguage);
};

const createMultiplesLanguages = () => {
  for (let i = 0; i < nbLanguage; i++) {
    createLanguage();
  }
  console.log(`${nbLanguage} language are created`);
};

// ---- CREATE SECTOR ----
const sectorDAO = new SectorDAO(db);

const createMultiplesSector = () => {
  const genres = [
    'Young Adult',
    'Science Fiction',
    'Fantasy',
    'Romance',
    'Mystery',
    'Horror',
    'Non-fiction',
    'Historical',
  ];
  for (let i = 0; i < nbSector; i++) {
    createSector(genres[i]);
  }
  console.log(`${nbSector} sector are created`);
};

const createSector = (value) => {
  sectorDAO.create(value);
};

// ---- CREATE TYPE ----

const typeDAO = new TypeDAO(db);

const createType = (value) => {
  typeDAO.create(value);
};

const createMultiplesTypes = () => {
  const dataTypes = ['Book', 'CD', 'DVD', 'Magazine', 'Video game'];
  for (let i = 0; i < nbType; i++) {
    createType(dataTypes[i]);
  }
  console.log(`${nbType} types are created`);
};

// ---- CREATE EDITOR ----

const editorDAO = new EditorDAO(db);

const createEditor = (value) => {
  editorDAO.create(value);
};

const createMultiplesEditors = () => {
  const publishingHouses = [
    'Penguin Random House',
    'HarperCollins Publishers',
    'Simon & Schuster',
    'Hachette Livre',
    'Macmillan Publishers',
  ];
  for (let i = 0; i < nbEditor; i++) {
    createEditor(publishingHouses[i]);
  }
  console.log(`${nbEditor} editors are created`);
};

// ---- CREATE EDITOR ----

const loanDAO = new LoanDAO(db);

const createLoan = () => {
  const randomDateEnd = faker.date.recent();
  const randomDateStart = faker.date.recent({
    days: 10,
    refDate: randomDateEnd,
  });
  const randomIdUser = faker.number.int({ min: 1, max: nbUser });
  loanDAO.create(randomDateStart, randomDateEnd, randomIdUser);
};

const createMultiplesLoans = () => {
  for (let i = 0; i < nbLoan; i++) {
    createLoan();
  }
  console.log(`${nbLoan} loans are created`);
};

const createMedia =()=> {
  const randomTitle = faker.person.firstName()
  const radomIsbn = faker.number.int({min:0, max:500})
  const randomShelf = faker.string.alpha()
  const randomPrice = faker.number.int({min:1, max:50})
  const randomeDateOfPublication = faker.date.anytime()
  const randomEditorId = faker.number.int({min:1, max:nbEditor})
  const randomTypeId = faker.number.int({min:1, max:nbType})
  const randomSectorId = faker.number.int({min:1, max:nbSector})
  const randomLanguageId = faker.number.int({min:1, max: nbLanguage})
  const randomGenreId = faker.number.int({min:1, max:nbGenre})
}

const initDbData = () => {
  createMultiplesUsers();
  createMultiplesRoles();
  createMultiplesAuthors();
  createMultiplesLanguages();
  createMultiplesSector();
  createMultiplesTypes();
  createMultiplesEditors();
  createMultiplesLoans();
};

initDbData();
