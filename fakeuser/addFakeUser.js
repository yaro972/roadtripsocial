'use strict';

const Charlatan = require('charlatan');
const faker = require('faker');
const mongodb = require('mongodb');
const download = require('image-downloader');
const path = require('path');

// Configuration des accès à mongoDb
var config = path.join(__dirname, '../', '/server/app/inc/.config');

// Configuration du module charlatan pour utiliser des noms à consonnance française
Charlatan.setLocale('fr');



/**
 * Génère un faux profile d'un utilisateur
 */
var generateFafkeUser = function () {
  /**
   * generate a fake User content
   */
  var user = {
    'nickname': Charlatan.Internet.userName(),
    'firstname': Charlatan.Name.firstName(),
    'lastname': Charlatan.Name.lastName(),
    'password': Charlatan.Internet.password(),
    'avatar': faker.image.avatar(),
    'city': Charlatan.Address.city(),
    'country': Charlatan.Address.country(),
    'email': Charlatan.Internet.email(),
    'birthday': Charlatan.Date.birthday(),
    'presentation': Charlatan.Lorem.characters(50),
    'visitedCountries': [
      Charlatan.Address.country(),
      Charlatan.Address.country(),
      Charlatan.Address.country(),
      Charlatan.Address.country()
    ],

    'gender': Math.round(Math.random()),
    'role': 'membre'
  };

  return user;
};

/**
 * Extrait le nom de l'image
 * @param {string} url Url de l'image
 */
let extractImageName = function (url) {
  let url = user.avatar.split('/');
  let imageName = url[url.length - 1];

}


// Configuration d'image-downloader
const options = {
  url: user.avatar,
  dest: path.join(__dirname, 'download', imageName)
};


download.image(options)
  .then(({
    filename,
    image
  }) => {
    console.log('File saved to', filename)
  }).catch((err) => {
    throw err
  })

// Download to a directory and save with an another filename 
// options = {
//   url: 'http://someurl.com/image2.jpg',
//   dest: '/path/to/dest/photo.jpg'        // Save to /path/to/dest/photo.jpg 
// }

download.image(options)
  .then(({
    filename,
    image
  }) => {
    console.log('File saved to', filename)
  }).catch((err) => {
    throw err
  })

// downloadIMG()

// console.log('Name: ', name);
// console.log('Email: ', email);
// console.log('Company: ', company);
// console.log('Birthday: ', birthday);
// console.log('City: ', city);
// console.log('Country: ', country);
// console.log('CountryCode: ', countryCode);


// console.log(faker.helpers.contextualCard());
// console.log(faker.helpers.createCard());

console.log('user :', user, 'Image name :', imageName);