const { Sequelize } = require('sequelize');
const db = require('./db');
const User = require('./mUser');
const Library = require('./mLibrary');
const UsersLibraries = require('./mUsersLibraries');
const Artifact = require('./mArtifact');
const ArtifactsLibraries = require('./mArtifactsLibraries');
const Institute = require('./mInstitute');
const LibrariesInstitutes = require('./mLibrariesInstitutes');
const Contact = require('./mContact');
const InstitutesContacts = require('./mInstitutesContacts');
const UsersContacts = require('./mUsersContacts');
const InstitutesUsers = require('./mInstitutesUsers');
const Tags = require('./mTag');
const ArtifactsTags = require('./mArtifactsTags');

//Relations between users and institutes
User.belongsToMany(Institute, { through: InstitutesUsers,  });
Institute.belongsToMany(User, { through: InstitutesUsers,  });
User.hasMany(InstitutesUsers);
InstitutesUsers.belongsTo(User);
Institute.hasMany(InstitutesUsers);
InstitutesUsers.belongsTo(Institute);

//Relations between users and libraries
User.belongsToMany(Library, { through: UsersLibraries,  });
Library.belongsToMany(User, { through: UsersLibraries,  });
User.hasMany(UsersLibraries);
UsersLibraries.belongsTo(User);
Library.hasMany(UsersLibraries);
UsersLibraries.belongsTo(Library);

//Relations between artifacts and libraries
Artifact.belongsToMany(Library, { through: ArtifactsLibraries,  });
Library.belongsToMany(Artifact, { through: ArtifactsLibraries,  });
Artifact.hasMany(ArtifactsLibraries);
ArtifactsLibraries.belongsTo(Artifact);
Library.hasMany(ArtifactsLibraries);
ArtifactsLibraries.belongsTo(Library);

//Relations between libraries and institutes
Institute.belongsToMany(Library, { through: LibrariesInstitutes,  });
Library.belongsToMany(Institute, { through: LibrariesInstitutes,  });
Institute.hasMany(LibrariesInstitutes);
LibrariesInstitutes.belongsTo(Institute);
Library.hasMany(LibrariesInstitutes);
LibrariesInstitutes.belongsTo(Library);

//Relations between institutes and contacts
Institute.belongsToMany(Contact, { through: InstitutesContacts,  });
Contact.belongsToMany(Institute, { through: InstitutesContacts,  });
Institute.hasMany(InstitutesContacts);
InstitutesContacts.belongsTo(Institute);
Contact.hasMany(InstitutesContacts);
InstitutesContacts.belongsTo(Contact);

//Relations between users and contacts
User.belongsToMany(Contact, { through: UsersContacts, foreignKey: 'idUser' });
Contact.belongsToMany(User, { through: UsersContacts, foreignKey: 'idContact' });
User.hasMany(UsersContacts);
UsersContacts.belongsTo(User);
Contact.hasMany(UsersContacts);
UsersContacts.belongsTo(Contact);

Artifact.belongsToMany(Tags, { through: ArtifactsTags, foreignKey: 'idArtifact' });
Tags.belongsToMany(Artifact, { through: ArtifactsTags, foreignKey: 'idTags' });
Artifact.hasMany(ArtifactsTags);
ArtifactsTags.belongsTo(Artifact);
Tags.hasMany(ArtifactsTags);
ArtifactsTags.belongsTo(Tags);


// db.sync({ alter: true})
//     .then(() => {
//         console.log("All models were synchronized successfully.");
//     })
//     .catch((error) => {
//         console.error("Error synchronizing models:", error);
//     });