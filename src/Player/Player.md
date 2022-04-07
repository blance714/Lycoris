# audio 

## Properties

- buffered: buffered属性会告诉浏览器哪一部分的媒体已经被下载（如果浏览器支持的话），按照标准会返回一个TimeRanges对象
- currentSrc: 用DOMString表示媒体文件的绝对URL。如果networkState 为EMPTY，那么值为空字符串。
- **currentTime**: A double-precision floating-point value indicating the current playback time in seconds;
- **duration**: 媒体以秒为单位的总长度时间，如果媒体不可用，则为0.  如果媒体可用，但时间长度未知, 值为NAN. 如果媒体是以stream形式传输并且没有预定长度，则值为Inf。
- ended: 表示媒体是否已经播放完毕。
- **paused**: Returns a Boolean that indicates whether the media element is paused.
- [readyState](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState): Returns a unsigned short (enumeration) indicating the readiness state of the media

## Functions

- **fastSeek**(): Quickly seeks to the given time with low precision.

- load(): Resets the media to the beginning and selects the best available source from the sources provided using the src attribute or the <source> element.

- **pause**(): Pauses the media playback.

- **play**(): Begins playback of the media.

## Events 

- abort: Fired when the resource was not fully loaded, but not as the result of an error.
- canplay: 可以播，但不完全可以（会卡
- canplaythrough： 可以播完啦（不会卡
- ended: 播放完了或者没有数据了
- pause: 暂停了
- play
- playing: Fired when playback is ready to start after having been paused or delayed due to lack of data
- seeked: Fired when a seek operation completes
- waiting: Fired when playback has stopped because of a temporary lack of data.
- timeupdate: Fired when the time indicated by the currentTime property has been updated.