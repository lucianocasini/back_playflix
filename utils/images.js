const {
  IMG_API_URL,
  IMG_POSTER_SIZE,
  IMG_POSTER_SIZE_THUMBNAIL,
  IMG_BACKDROP_SIZE,
} = require("../config/api");

const imageUrlGenerator = (arr) => {
  return arr.map((item) => {
    item.backdrop_path =
      item.backdrop_path &&
      `${IMG_API_URL}${IMG_BACKDROP_SIZE}${item.backdrop_path}`;

    item.poster_path_thumb =
      item.poster_path &&
      `${IMG_API_URL}${IMG_POSTER_SIZE_THUMBNAIL}${item.poster_path}`;

    item.poster_path =
      item.poster_path && `${IMG_API_URL}${IMG_POSTER_SIZE}${item.poster_path}`;
    return item;
  });
};

module.exports = { imageUrlGenerator };
