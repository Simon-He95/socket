import { ref } from 'vue'
const idMap = new Map()
export const result = ref([])
export function handleStart(id: any, msg: any) {
  // 判断浏览器是否支持websocket
  let CreateWebSocket = (function () {
    return function (urlValue: any) {
      if (window.WebSocket) return new WebSocket(urlValue);
      if (window?.MozWebSocket) return new MozWebSocket(urlValue);
      return false;
    }
  })()
  let webSocket: any
  if (idMap.has(id)) {
    webSocket = idMap.get(id)
    webSocket.send(msg)
  } else {
    // 创建一个websocket
    webSocket = CreateWebSocket("ws://127.0.0.1:3000/websocket/" + id);
    idMap.set(id, webSocket)
    // 监听连接开启
    webSocket.onopen = function () {
      // 主动向后台发送数据
      webSocket.send(msg)
    }
    // 监听websocket通讯
    webSocket.onmessage = function (evt: any) {
      // 这是服务端返回的数据
      let res: string = evt.data
      result.value.push(res)
      console.log('服务端推送：', result)
    }
    // 监听连接关闭
    webSocket.onclose = function () {
      console.log("Connection closed.")
      idMap.delete(id)
    }
  }
  return result
}

