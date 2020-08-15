const ytdl = require('ytdl-core')


module.exports = async function getDirectUrl(url){

    try{
    var id = getVideoIdFromUrl(url)
    let info = await ytdl.getInfo(id);
    let format = ytdl.chooseFormat(info.formats, { 
                                    quality: 'lowest', 
                                    filter: "audioonly"});
                                    
    return format.url;
    } catch {
        return false;
    }
}

function getVideoIdFromUrl(text) {
    var re = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig;
    return text.replace(re,
        '$1');
  }

