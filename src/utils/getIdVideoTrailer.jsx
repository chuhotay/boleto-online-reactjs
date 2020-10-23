const getIdVideoTrailer = (urlVideo) => {
  const arr = urlVideo.split("/");
  return arr[arr.length - 1];
};

export default getIdVideoTrailer;
