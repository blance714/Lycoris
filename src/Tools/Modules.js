class Song {
  constructor(data) {
    Object.assign(this, data);
  }
}

Song.get = function(id) {

}

/*
{
  id, name, 
  artists: [{
    id, name, picUrl(?)
  }],
  album: [{
    id, name, picUrl(get?)
  }],
  duration
}
*/