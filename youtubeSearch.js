function getData(query,x) { //query, number of videos
  var data = $.get(
    'https://www.googleapis.com/youtube/v3/search',
    {
      part:'id',
      q: query + 'music',
      type: 'video',
      maxResults: 5,
      order: 'viewCount',
      topicId: '/m/04rlf',
      key: 'AIzaSyCofayi2gIrdRUYDf-vMEtGcbhOGOytw6c'
    });
  return data;
}

function getVideoId(data, x) {//list of videos, index
  return data.items(x).id.videoId;
}

function getSrcUrl(videoId) {
  return
}