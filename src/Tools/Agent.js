function getNeteaseType(type) {
  switch (type) {
    case 1: return 1;
    case 2: return 10;
    case 3: return 100;
    case 4: return 1000;
  }
}

const cookie = 'MUSIC_U%3Dcf51b4a715af4cac950642fb5fd4922d44379c6e0ca0aec24416a0be67636971519e07624a9f0053d4798a1fc07d39af2081c802b4fa001c46b14e3f0c3f8af9fe5c85647582a507%3B%20Max-Age%3D1296000%3B%20Expires%3DFri%2C%2022%20Apr%202022%2013%3A43%3A57%20GMT%3B%20Path%3D%2F%3B%3BMUSIC_R_T%3D1519041084222%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2025%20Apr%202090%2016%3A58%3A04%20GMT%3B%20Path%3D%2Feapi%2Fclientlog%3B%3BMUSIC_R_T%3D1519041084222%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2025%20Apr%202090%2016%3A58%3A04%20GMT%3B%20Path%3D%2Fopenapi%2Fclientlog%3B%3BMUSIC_R_T%3D1519041084222%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2025%20Apr%202090%2016%3A58%3A04%20GMT%3B%20Path%3D%2Fweapi%2Ffeedback%3B%3BMUSIC_R_T%3D1519041084222%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2025%20Apr%202090%2016%3A58%3A04%20GMT%3B%20Path%3D%2Fneapi%2Fclientlog%3B%3BMUSIC_A_T%3D1519041021493%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2025%20Apr%202090%2016%3A58%3A04%20GMT%3B%20Path%3D%2Feapi%2Ffeedback%3B%3BMUSIC_R_T%3D1519041084222%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2025%20Apr%202090%2016%3A58%3A04%20GMT%3B%20Path%3D%2Fweapi%2Fclientlog%3B%3BMUSIC_A_T%3D1519041021493%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2025%20Apr%202090%2016%3A58%3A04%20GMT%3B%20Path%3D%2Fweapi%2Ffeedback%3B%3BMUSIC_R_T%3D1519041084222%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2025%20Apr%202090%2016%3A58%3A04%20GMT%3B%20Path%3D%2Fwapi%2Fclientlog%3B%3BMUSIC_A_T%3D1519041021493%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2025%20Apr%202090%2016%3A58%3A04%20GMT%3B%20Path%3D%2Fopenapi%2Fclientlog%3B%3BMUSIC_A_T%3D1519041021493%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2025%20Apr%202090%2016%3A58%3A04%20GMT%3B%20Path%3D%2Fapi%2Fclientlog%3B%3BMUSIC_A_T%3D1519041021493%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2025%20Apr%202090%2016%3A58%3A04%20GMT%3B%20Path%3D%2Fneapi%2Fclientlog%3B%3BMUSIC_A_T%3D1519041021493%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2025%20Apr%202090%2016%3A58%3A04%20GMT%3B%20Path%3D%2Feapi%2Fclientlog%3B%3BMUSIC_R_T%3D1519041084222%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2025%20Apr%202090%2016%3A58%3A04%20GMT%3B%20Path%3D%2Feapi%2Ffeedback%3B%3BMUSIC_R_T%3D1519041084222%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2025%20Apr%202090%2016%3A58%3A04%20GMT%3B%20Path%3D%2Fapi%2Fclientlog%3B%3BMUSIC_A_T%3D1519041021493%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2025%20Apr%202090%2016%3A58%3A04%20GMT%3B%20Path%3D%2Fneapi%2Ffeedback%3B%3BMUSIC_A_T%3D1519041021493%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2025%20Apr%202090%2016%3A58%3A04%20GMT%3B%20Path%3D%2Fwapi%2Fclientlog%3B%3BMUSIC_R_T%3D1519041084222%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2025%20Apr%202090%2016%3A58%3A04%20GMT%3B%20Path%3D%2Fapi%2Ffeedback%3B%3BMUSIC_A_T%3D1519041021493%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2025%20Apr%202090%2016%3A58%3A04%20GMT%3B%20Path%3D%2Fwapi%2Ffeedback%3B%3B__csrf%3Df46a503f7e3379dd98b0a04ed851632b%3B%20Max-Age%3D1296010%3B%20Expires%3DFri%2C%2022%20Apr%202022%2013%3A44%3A07%20GMT%3B%20Path%3D%2F%3B%3BMUSIC_A_T%3D1519041021493%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2025%20Apr%202090%2016%3A58%3A04%20GMT%3B%20Path%3D%2Fweapi%2Fclientlog%3B%3B__remember_me%3Dtrue%3B%20Max-Age%3D1296000%3B%20Expires%3DFri%2C%2022%20Apr%202022%2013%3A43%3A57%20GMT%3B%20Path%3D%2F%3B%3BMUSIC_R_T%3D1519041084222%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2025%20Apr%202090%2016%3A58%3A04%20GMT%3B%20Path%3D%2Fwapi%2Ffeedback%3B%3BMUSIC_SNS%3D%3B%20Max-Age%3D0%3B%20Expires%3DThu%2C%207%20Apr%202022%2013%3A43%3A57%20GMT%3B%20Path%3D%2F%3BMUSIC_A_T%3D1519041021493%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2025%20Apr%202090%2016%3A58%3A04%20GMT%3B%20Path%3D%2Fapi%2Ffeedback%3B%3BMUSIC_R_T%3D1519041084222%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2025%20Apr%202090%2016%3A58%3A04%20GMT%3B%20Path%3D%2Fneapi%2Ffeedback%3B';

const neteaseAPI = 'https://netease-cloud-music-api-sable-ten.vercel.app/';

const Agent = {
  /**
   * 
   * @param {string} keyword 
   * @param {number} type 1: song, 10: album, 100: singer, 1000: playlist
   * @param {string} service 
   */

  getJson: function(url, type = 'GET', data = {}) {
    return fetch(type === 'GET' ? (url + `&cookie=${cookie}`) : url, {
      method: type,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: type === 'POST' ? JSON.stringify(Object.assign(data, {cookie: cookie})) : undefined
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
    
  getSongUrl: function(id) {
    return this.getJson(neteaseAPI + `song/url?id=${id}`)
      .then(v => v.data[0].url);
  },

  getSongLyrics: function(id) {
    return this.getJson(neteaseAPI + `lyric?id=${id}`)
      .then(v => v.lrc.lyric);
  },

  parseSearchResult: async function(data) {
    const res = data.result;
  
    let promiseList = [];
  
    const parseSong = (d) => {
      let song = {};
      song.type = 'song';
      song.platform = 'netease';
      song.id = d.id;
      song.name = d.name;
      song.artists = d.artists;
      // song.getSongData = () => Agent.getSong(song.id)
      // song.getPicUrl = () => Agent.getSong(song.id)
      //   .then(v => v.al.picUrl && (song.picUrl = v.al.picUrl));
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