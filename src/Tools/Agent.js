function getNeteaseType(type) {
  switch (type) {
    case 1: return 1;
    case 2: return 10;
    case 3: return 100;
    case 4: return 1000;
  }
}

const neteaseAPI = 'https://netease-cloud-music-api-sable-ten.vercel.app/'

const Agent = {
  /**
   * 
   * @param {string} keyword 
   * @param {number} type 1: song, 10: album, 100: singer, 1000: playlist
   * @param {string} service 
   */

  getJson: function(url, type = 'GET', data = {}) {
    return fetch(url, {
      method: type,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: type == 'POST' ? JSON.stringify(data) : undefined
    }).then((v) => v.json());
  },

  search: function(keyword, type = 1, service = 'netease') {
    return this.getJson(neteaseAPI + `search?keywords=${keyword}&type=${type}`);
  },

  searchSuggest: function(keyword) {
    return this.getJson(neteaseAPI + `search/suggest?keywords=${keyword}`)
  },

  getSong: function(id) {
    return this.getJson(neteaseAPI + `song/detail?ids=${id}`)
      .then((v) => v.songs[0]);
  },

  parseSearchResult: async function(data) {
    const res = data.result;
  
    let promiseList = [];
  
    const parseSong = (d) => {
      let song = {};
      song.type = 'song';
      song.id = d.id;
      song.name = d.name;
      song.artists = d.artists;
      song.getPicUrl = () => Agent.getSong(song.id)
        .then(v => v.al.picUrl && (song.picUrl = v.al.picUrl));
      return song;
    }
  
    let resultList = [];
  
    for (let type in res) {
      switch (type) {
        case 'songs': 
          for(let song of res[type])
            resultList.push(parseSong(song));
          break;
      }
    }
  
    await Promise.all(promiseList);
    return resultList;
  }
}

window.Agent = Agent;

export default Agent;