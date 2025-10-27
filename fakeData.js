const { faker } = require('@faker-js/faker/locale/pt_BR');
const db = require('./src/models/db');

// importa os models
const User = require('./src/models/mUser');
const Library = require('./src/models/mLibrary');
const UsersLibraries = require('./src/models/mUsersLibraries');
const Artifact = require('./src/models/mArtifact');
const ArtifactsLibraries = require('./src/models/mArtifactsLibraries');
const Institute = require('./src/models/mInstitute');
const LibrariesInstitutes = require('./src/models/mLibrariesInstitutes');
const Contact = require('./src/models/mContact');
const InstitutesContacts = require('./src/models/mInstitutesContacts');
const UsersContacts = require('./src/models/mUsersContacts');
const { fa } = require('@faker-js/faker');
const InstitutesUsers = require('./src/models/mInstitutesUsers');

function getRandomInteger(min, max) {
    min = Math.ceil(min); // Ensure min is a whole number
    max = Math.floor(max); // Ensure max is a whole number
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const contactWay = ['email', 'phone', 'whatsapp', 'telegram', 'linkedin', 'instagram', 'facebook', 'website'];
(async () => {
    try {
        console.log('🧹 Limpando tabelas...');
        await db.sync({ force: true }); // limpa e recria tudo
/*
        // ---------- USERS ----------
        console.log('👤 Criando usuários...');
        const users = [];
        let contacts = [];
        for (let i = 0; i < 10; i++) {
            const name = faker.person.fullName();
            const email = faker.internet.email();
            users.push(await User.create({
                name: name,
                email: faker.internet.email({ firstName: name.split(" ")[0].toLowerCase(), lastName: name.split(" ")[name.split(" ").length - 1].toLowerCase() }),
                password: faker.internet.password(),
                userLevel: faker.number.int({ min: 1, max: 3 })
            }));
            // ---------- CONTACTS ----------
            console.log('☎️ Criando contatos...');


            const waySelected = contactWay[getRandomInteger(0, contactWay.length - 1)];
            contacts.push(await Contact.create({
                name: waySelected,
                info: waySelected === 'email' ? email :
                    waySelected === 'phone' ? faker.phone.number() :
                        waySelected === 'whatsapp' ? faker.phone.number('+55 9 ## #####-####') :
                            waySelected === 'telegram' ? `@${faker.internet.username({ firstName: name.split(" ")[0] })}` :
                                waySelected === 'linkedin' ? `https://www.linkedin.com/in/${faker.internet.username({ firstName: name.split(" ")[0] })}` :
                                    waySelected === 'instagram' ? `https://www.instagram.com/${faker.internet.username({ firstName: name.split(" ")[0] })}` :
                                        waySelected === 'facebook' ? `https://www.facebook.com/${faker.internet.username({ firstName: name.split(" ")[0] })}` :
                                            waySelected === 'website' ? faker.internet.url() :
                                                'N/A',
            }));
            await UsersContacts.create({
                UserId: users[i].dataValues.id,
                ContactId: contacts[i].dataValues.id,
            });
        }


        // ---------- LIBRARIES ----------
        console.log('🏛️ Criando bibliotecas...');
        const libraries = [];
        for (let i = 0; i < 5; i++) {
            libraries.push(await Library.create({
                id: faker.string.uuid(),
                vid: faker.helpers.fromRegExp(/[0-9]{4}-[A-Za-z0-9]{6}/),
                name: faker.company.name(),
                description: faker.lorem.paragraph(),
                city: faker.location.city(),
                state: faker.location.state(),
                country: faker.location.country(),
                private: faker.number.int({ min: 0, max: 1 }),
                imagePath: faker.image.urlPicsumPhotos({width:600, height:320, category:'museum', blur:0})
            }));
        }

        // ---------- INSTITUTES ----------
        console.log('🏫 Criando institutos...');
        const institutes = [];
        contacts = [];
        for (let i = 0; i < 5; i++) {
            const name = faker.company.name();
            institutes.push(await Institute.create({
                vid: faker.helpers.fromRegExp(/[0-9]{4}-[A-Za-z0-9]{6}/),
                name: name,
                country: faker.location.country(),
                state: faker.location.state(),
                city: faker.location.city(),
                address: faker.location.street(),
                number: faker.location.buildingNumber(),
            }));
            // Institute ↔ Contact
            for (let j = 0; j < getRandomInteger(1, 4); j++) {
                const waySelected = contactWay[getRandomInteger(0, contactWay.length - 1)];
                contacts.push(await Contact.create({
                    name: waySelected,
                    info: waySelected === 'email' ? faker.internet.email({ firstName: name }) :
                        waySelected === 'phone' ? faker.phone.number() :
                            waySelected === 'whatsapp' ? faker.phone.number('+55 9 ## #####-####') :
                                waySelected === 'telegram' ? `@${faker.internet.username()}` :
                                    waySelected === 'linkedin' ? `https://www.linkedin.com/in/${faker.internet.username()}` :
                                        waySelected === 'instagram' ? `https://www.instagram.com/${faker.internet.username()}` :
                                            waySelected === 'facebook' ? `https://www.facebook.com/${faker.internet.username()}` :
                                                waySelected === 'website' ? faker.internet.url() :
                                                    'N/A',
                }));

                await InstitutesContacts.create({
                    InstituteId: institutes[i].dataValues.id,
                    ContactId: contacts[j].dataValues.id,
                });
            }
        }

        // ---------- ARTIFACTS ----------
        console.log('🏺 Criando artefatos...');
        const artifacts = [];
        for (let i = 0; i < 20; i++) {
            artifacts.push(await Artifact.create({
                vid: faker.helpers.fromRegExp(/[0-9]{4}-[A-Za-z0-9]{6}-[0-9]{2}/),
                name: faker.commerce.productName(),
                description: faker.lorem.paragraph(),
                imagePath: faker.image.urlPicsumPhotos({width:300, height:300, category:'archaeology', blur:0}),
                foundPlace: faker.location.city(),
                age: `${faker.number.int({ min: 500, max: 2000 })} anos`,
                historicalContext: faker.lorem.sentence(),
                whoFound: faker.person.fullName(),
                coordinates: `${faker.location.latitude()}, ${faker.location.longitude()}`,
                dimensions: `${faker.number.int({ min: 5, max: 100 })} cm`,
                weight: `${faker.number.int({ min: 100, max: 10000 })} g`,
                texture: faker.commerce.productMaterial(),
                materiaComposition: faker.commerce.productMaterial(),
                historicalPeople: faker.person.firstName(),
                origin_or_utility: faker.commerce.product(),
                socialRelevance: faker.lorem.sentence(),
                foundDate: faker.date.past(),
            }));
        }

        // ---------- RELACIONAMENTOS ----------
        console.log('🔗 Criando relacionamentos...');

        // User ↔ Library
        for (const user of users) {
            const libs = faker.helpers.arrayElements(libraries, faker.number.int({ min: 1, max: 3 }));
            for (const lib of libs) {
                await UsersLibraries.create({
                    UserId: user.dataValues.id,
                    LibraryId: lib.dataValues.id,
                    userLevel: faker.number.int({ min: 0, max: 3 }),
                });
            }
        }

        // User ↔ Library
        for (const user of users) {
            const libs = faker.helpers.arrayElements(libraries, faker.number.int({ min: 1, max: 3 }));
            for (const institute of institutes) {
                await InstitutesUsers.create({
                    UserId: user.dataValues.id,
                    InstituteId: institute.dataValues.id,
                    userLevel: faker.number.int({ min: 0, max: 4 }),
                });
            }
        }

        // Artifact ↔ Library
        for (const artifact of artifacts) {
            const libs = faker.helpers.arrayElements(libraries, faker.number.int({ min: 1, max: 3 }));
            for (const lib of libs) {
                await ArtifactsLibraries.create({
                    ArtifactId: artifact.dataValues.id,
                    LibraryId: lib.dataValues.id,
                });
            }
        }

        // Library ↔ Institute
        for (const lib of libraries) {
            const insts = faker.helpers.arrayElements(institutes, faker.number.int({ min: 1, max: 2 }));
            for (const inst of insts) {
                console.log(inst);
                await LibrariesInstitutes.create({

                    LibraryId: lib.dataValues.id,
                    InstituteId: inst.dataValues.id,
                });
            }
        }


*/
        console.log('✅ População de dados concluída com sucesso!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Erro ao popular o banco:', error);
        process.exit(1);
    }
})();
