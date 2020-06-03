'use strict';

var NAMES = ['Иван', 'Данила', 'Юра', 'Алекс', 'Лена', 'Катя', 'Саша'];
var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо.Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !'];
var PHOTOS_COUNT = 25;
var MIN_COUNT_LIKES = 15;
var MAX_COUNT_LIKES = 200;
var MIN_COUNT_COMMENTS = 1;
var MAX_COUNT_COMMENTS = 100;
var MIN_COUNT_AVATAR = 1;
var MAX_COUNT_AVATAR = 6;
var MIN_COUNT_MESSAGES = 1;
var MAX_COUNT_MESSAGES = 3;

var pictureTemplate = document.querySelector('#picture').content.querySelector('a');
var picturesList = document.querySelector('.pictures');

var photos = [];

function getRandomElementOfArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomElementOfRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function createRandomMessagesArray() {
  var messages = [];
  var randomCountMessages = getRandomElementOfRange(MIN_COUNT_MESSAGES, MAX_COUNT_MESSAGES);

  for (var k = 0; k < randomCountMessages; k++) {
    var message = getRandomElementOfArray(MESSAGES);
    messages.push(message);
  }

  return messages;
}

function createComment() {
  var comment = {};
  var currentSrc = 'img/avatar-'
                 + getRandomElementOfRange(MIN_COUNT_AVATAR, MAX_COUNT_AVATAR)
                 + '.svg';
  var currentMessage = createRandomMessagesArray().join(' ');
  var currentName = getRandomElementOfArray(NAMES);

  comment.avatar = currentSrc;
  comment.message = currentMessage;
  comment.name = currentName;

  return comment;
}

function createRandomCommentsArray() {
  var comments = [];

  for (var o = 0; o < getRandomElementOfRange(MIN_COUNT_COMMENTS, MAX_COUNT_COMMENTS); o++) {
    comments.push(createComment());
  }

  return comments;
}

function createRandomNumbersArray() {
  var randomNumbers = [];
  var currentNumber = 0;
  randomNumbers[0] = getRandomElementOfRange(1, PHOTOS_COUNT);

  do {
    currentNumber = getRandomElementOfRange(1, PHOTOS_COUNT);

    randomNumbers.push(currentNumber);

    for (var i = 0; i < randomNumbers.length - 1; i++) {
      if (currentNumber === randomNumbers[i]) {
        randomNumbers.pop();
      }
    }

  }
  while (randomNumbers.length < PHOTOS_COUNT);

  return randomNumbers;
}

function createRandomUrlsArray() {
  var randomNumbersArray = createRandomNumbersArray();
  var urls = [];

  randomNumbersArray.forEach(function (item) {
    urls.push('photos/' + item + '.jpg');
  });

  return urls;
}

var urls = createRandomUrlsArray();

function createPhotoDescription(a) {
  var photoDescription = {};
  var randomCountLikes = getRandomElementOfRange(MIN_COUNT_LIKES, MAX_COUNT_LIKES);
  var currentUrl = urls[a];

  photoDescription.url = currentUrl;
  photoDescription.description = 'Описание фотографии';
  photoDescription.likes = randomCountLikes;
  photoDescription.comments = createRandomCommentsArray();

  return photoDescription;
}

for (var a = 0; a < PHOTOS_COUNT; a++) {
  photos.push(createPhotoDescription(a));
}

function renderPhoto(photo) {
  var photoElement = pictureTemplate.cloneNode(true);
  var image = photoElement.querySelector('.picture__img');
  var likes = photoElement.querySelector('.picture__likes');
  var countComment = photoElement.querySelector('.picture__comments');

  image.src = photo.url;
  likes.textContent = photo.likes;
  countComment.textContent = photo.comments.length;

  return photoElement;
}

var fragment = document.createDocumentFragment();

for (var i = 0; i < photos.length; i++) {
  fragment.appendChild(renderPhoto(photos[i]));
}
picturesList.appendChild(fragment);
