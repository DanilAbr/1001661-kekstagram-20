'use strict';

(function () {
  var NAMES = ['Иван', 'Данила', 'Юра', 'Алекс', 'Лена', 'Катя', 'Саша'];
  var MESSAGES = [
    'Всё отлично!',
    'В целом всё неплохо.Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !'
  ];
  var PHOTOS_COUNT = 25;
  var MIN_COUNT_LIKES = 15;
  var MAX_COUNT_LIKES = 200;
  var MIN_COUNT_COMMENTS = 1;
  var MAX_COUNT_COMMENTS = 100;
  var MIN_COUNT_AVATAR = 1;
  var MAX_COUNT_AVATAR = 6;
  var MIN_COUNT_MESSAGES = 1;
  var MAX_COUNT_MESSAGES = 3;

  function createRandomMessages() {
    var messages = [];
    var randomMessagesCount = window.util.getRandomNumber(MIN_COUNT_MESSAGES, MAX_COUNT_MESSAGES);

    for (var i = 0; i < randomMessagesCount; i++) {
      var message = window.util.getRandomArrayItem(MESSAGES);
      messages.push(message);
    }

    return messages;
  }

  function createComment() {
    return {
      avatar: 'img/avatar-' + window.util.getRandomNumber(MIN_COUNT_AVATAR, MAX_COUNT_AVATAR) + '.svg',
      message: createRandomMessages().join(' '),
      name: window.util.getRandomArrayItem(NAMES),
    };
  }

  function createRandomComments() {
    var comments = [];
    var randomNumber = window.util.getRandomNumber(MIN_COUNT_COMMENTS, MAX_COUNT_COMMENTS);

    for (var k = 0; k < randomNumber; k++) {
      comments.push(createComment());
    }

    return comments;
  }

  function createRandomUrls() {
    return window.util.createNumbersArray(PHOTOS_COUNT)
      .map(function (item) {
        return 'photos/' + item + '.jpg';
      });
  }

  var urls = createRandomUrls();

  function getPhoto(a) {
    return {
      url: urls[a],
      description: 'Описание этой фотографии',
      likes: window.util.getRandomNumber(MIN_COUNT_LIKES, MAX_COUNT_LIKES),
      comments: createRandomComments(),
    };
  }

  var photos = [];

  for (var a = 0; a < PHOTOS_COUNT; a++) {
    var photo = getPhoto(a);
    photos.push(photo);
  }

  window.data = {
    photos: photos,
  };
})();
