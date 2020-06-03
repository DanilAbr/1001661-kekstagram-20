'use strict';

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

var pictureTemplate = document.querySelector('#picture').content.querySelector('a');
var picturesList = document.querySelector('.pictures');

function getRandomArrayItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}


function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function createRandomMessages() {
  var messages = [];
  var randomCountMessages = getRandomNumber(MIN_COUNT_MESSAGES, MAX_COUNT_MESSAGES);

  for (var i = 0; i < randomCountMessages; i++) {
    var message = getRandomArrayItem(MESSAGES);
    messages.push(message);
  }

  return messages;
}


function createComment() {
  var comment = {};

  comment.avatar = 'img/avatar-' + getRandomNumber(MIN_COUNT_AVATAR, MAX_COUNT_AVATAR) + '.svg';
  comment.message = createRandomMessages().join(' ');
  comment.name = getRandomArrayItem(NAMES);

  return comment;
}


function createRandomComments() {
  var comments = [];
  var randomNumber = getRandomNumber(MIN_COUNT_COMMENTS, MAX_COUNT_COMMENTS);

  for (var k = 0; k < randomNumber; k++) {
    comments.push(createComment());
  }

  return comments;
}


function createNumbers() {
  var numbers = [];
  for (var a = 1; a <= PHOTOS_COUNT; a++) {
    numbers.push(a);
  }

  return numbers;
}


function createRandomNumbers() {
  var randomNumbers = [];
  var numbers = createNumbers();

  while (numbers.length > 0) {
    var randomNumber = numbers.splice(getRandomNumber(0, numbers.length - 1), 1)[0];
    randomNumbers.push(randomNumber);
  }

  return randomNumbers;
}


function createRandomUrls() {
  var randomNumbers = createRandomNumbers();
  var urls = [];

  randomNumbers.forEach(function (item) {
    urls.push('photos/' + item + '.jpg');
  });

  return urls;
}


function createPhoto(a) {
  var photoDescription = {};

  photoDescription.url = urls[a];
  photoDescription.description = 'Описание фотографии';
  photoDescription.likes = getRandomNumber(MIN_COUNT_LIKES, MAX_COUNT_LIKES);
  photoDescription.comments = createRandomComments();

  return photoDescription;
}


function createPhotoElement(photo) {
  var photoElement = pictureTemplate.cloneNode(true);
  var image = photoElement.querySelector('.picture__img');
  var likes = photoElement.querySelector('.picture__likes');
  var countComment = photoElement.querySelector('.picture__comments');

  image.src = photo.url;
  likes.textContent = photo.likes;
  countComment.textContent = photo.comments.length;

  return photoElement;
}


function renderPhotos() {
  var fragment = document.createDocumentFragment();

  for (var o = 0; o < PHOTOS_COUNT; o++) {
    var photo = createPhoto(o);
    fragment.appendChild(createPhotoElement(photo));
  }
  picturesList.appendChild(fragment);

  return fragment;
}


var urls = createRandomUrls();
renderPhotos();
