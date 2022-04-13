import ReconnectingWebSocket from "reconnecting-websocket";

/**
 * 
 * @param {string | URL} url 
 */
function Socket(url) {
  const target = new EventTarget();
  const ws = new ReconnectingWebSocket(url, [], {
    connectionTimeout: 1000,
    maxReconnectionDelay: 1000,
    maxRetries: 10,
    minUptime: 1000,
    debug: true
  });

  this.on = (type, callback) =>
    target.addEventListener(type, event =>
      callback.call(this, event.detail));
  this.emit = (type, data) => {
    ws.send(JSON.stringify({
      type: type,
      data: data
    }));
  }

  const parseMessage = (data) => {
    const json = JSON.parse(data);
    target.dispatchEvent(new CustomEvent(json.type, {
      detail: json.data
    }));
  }
  ws.onmessage = (ev) => parseMessage(ev.data);
  ws.onclose = (ev) => target.dispatchEvent(new Event('close'));
  ws.onopen = (ev) => target.dispatchEvent(new Event('open'));
  ws.onerror = (ev) => target.dispatchEvent(new CustomEvent('error', {
    detail: ev.error
  }));
}

export default Socket;