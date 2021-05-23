'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Pets', [
     {petName: 'Buddy', age: 5, sex: 'male', petType: 'dog', otherPets: 'yes', temperament: 'nervous around new people, but gives everyone a chance to be kind.', specialCare: 'has a displaced kneecap, make sure noone plays too roughly with him.', tricks: 'He can sit, stay, spin, give, and crate.', adoptable: 'no', single: 'no', createdAt: new Date(), updatedAt: new Date() },
     {petName: 'Lillie', age: 4, sex: 'female', petType: 'dog', otherPets: 'yes', temperament: 'nervous around new people, but gives everyone a chance to be kind.', specialCare: 'has a tendency to eat dangerous things, keep trash locked tight.', tricks: 'She also knows tricks and can sit, stay, place, curtsey, high-ten, leave-it, give, shake, watch, and crate', adoptable: 'no', single: 'no', createdAt: new Date(), updatedAt: new Date() },
     {petName: 'Chloe', age: 3, sex: 'female', petType: 'dog', otherPets: 'yes', temperament: 'likes people, loves cats, is scared of other dogs, but could slowly be introduced to new ones', specialCare: 'active dog, rarely ill', tricks: 'knows tons and can easily learn more: sit, stay, spin, turn left, turn right, obstacle course training, high five, shake, speak, hush, watch, fetch, get, go, give, leave-it, etc', adoptable: 'no', single: 'no', createdAt: new Date(), updatedAt: new Date()},
     {petName: 'Tootsie', age: 6, sex: 'female', petType: 'cat', otherPets: 'yes', temperament: 'rules the house; likes high places, and people; tolerates other cats and dogs.', specialCare: 'nope', tricks: 'fetch', adoptable: 'no', single: 'no', createdAt: new Date(), updatedAt: new Date()},
     {petName: 'Goose', age: 6, sex: 'female', petType: 'cat', otherPets: 'yes', temperament: 'likes being outside, gets along with other cats and with dogs, does not cuddle, but will play', specialCare: 'low-ash prescription urinary tract food', tricks: 'fetch and sit', adoptable: 'no', single: 'no', createdAt: new Date(), updatedAt: new Date()},
     {petName: 'Charlie', age: 5, sex: 'male', petType: 'cat', otherPets: 'yes', temperament: 'loves to cuddle, will bite lightly if you don\'t feed him quickly enough', specialCare: 'asthma, albuterol inhaler administered with cat mask', tricks: 'no, but he understands what you want him to do, he just won\'t do it', adoptable: 'no', single: 'no', createdAt: new Date(), updatedAt: new Date()},
     {petName: 'Petal', age: 1, sex: 'female', petType: 'guinea pig', otherPets: 'yes', temperament: 'potato', specialCare: 'appropriate crate size and guinea pig diet', tricks: 'play dead', adoptable: 'no', single: 'no', createdAt: new Date(), updatedAt: new Date()},
     {petName: 'Basil', age: 1, sex: 'female', petType: 'guinea pig', otherPets: 'yes', temperament: 'potato', specialCare: 'appropriate crate size and guinea pig diet', tricks: 'play dead', adoptable: 'no', single: 'no', createdAt: new Date(), updatedAt: new Date()}
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Pets', null, {});
  }
};
