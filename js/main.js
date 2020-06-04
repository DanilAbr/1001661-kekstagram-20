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
var bigPicture = document.querySelector('.big-picture');

var urls = createRandomUrls();

function getRandomArrayItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function createRandomMessages() {
  var messages = [];
  var randomMessagesCount = getRandomNumber(MIN_COUNT_MESSAGES, MAX_COUNT_MESSAGES);

  for (var i = 0; i < randomMessagesCount; i++) {
    var message = getRandomArrayItem(MESSAGES);
    messages.push(message);
  }

  return messages;
}

function createComment() {
  return {
    avatar: 'img/avatar-' + getRandomNumber(MIN_COUNT_AVATAR, MAX_COUNT_AVATAR) + '.svg',
    message: createRandomMessages().join(' '),
    name: getRandomArrayItem(NAMES),
  };
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
  return createRandomNumbers()
    .map(function (item) {
      return 'photos/' + item + '.jpg';
    });
}

function createPhoto(a) {
  return {
    url: urls[a],
    description: 'Описание этой фотографии',
    likes: getRandomNumber(MIN_COUNT_LIKES, MAX_COUNT_LIKES),
    comments: createRandomComments(),
  };
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

function fillBigPhotoElement() {
  var bigPictureImg = bigPicture.querySelector('img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var socialCaption = bigPicture.querySelector('.social__caption');

  bigPictureImg.src = currentPhoto.url;
  likesCount.textContent = currentPhoto.likes;
  commentsCount.textContent = currentPhoto.comments.length;
  socialCaption.textContent = currentPhoto.description;
}

function createElement(tagName, className, text) {
  var element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
}

function createCommentElement(comment) {
  var commentItem = createElement('li', 'social__comment');
  var img = createElement('img', 'social__picture');
  img.src = comment.avatar;
  img.alt = comment.name;
  commentItem.appendChild(img);

  var commentText = createElement('p', 'social__text', comment.message);
  commentItem.appendChild(commentText);

  return commentItem;
}

var photoFragment = document.createDocumentFragment();
var photos = [];

for (var a = 0; a < PHOTOS_COUNT; a++) {
  var photo = createPhoto(a);
  photos.push(photo);
  photoFragment.appendChild(createPhotoElement(photo));
}

picturesList.appendChild(photoFragment);

var currentPhoto = photos[0];
var currentPhotoComments = currentPhoto.comments;

var socialComments = bigPicture.querySelector('.social__comments');
var commentFragment = document.createDocumentFragment();

currentPhotoComments.forEach(function (item) {
  commentFragment.appendChild(createCommentElement(item));
});
socialComments.appendChild(commentFragment);

var socialCommentCount = bigPicture.querySelector('.social__comment-count');
var commentsLoader = bigPicture.querySelector('.comments-loader');

fillBigPhotoElement();
bigPicture.classList.remove('hidden');

socialCommentCount.classList.add('hidden');
commentsLoader.classList.add('hidden');

document.body.classList.add('modal__open');
