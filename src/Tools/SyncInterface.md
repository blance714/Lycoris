# Sync Interfaces

## Client

```ts
interface Client {
  connect,
  roomConnected: { ID: number },
  roomConnectionRefused: { info: string },
  avaliableRooms: { rooms: [{ ID: number, count: number }] },

  sync: { data: { list: [song], time } },
  play: { time },
  pause: { time }
}
```

## Server

```ts
interface Server {
  setUpName: { name: string },
  createRoom: { playList: [song] },
  requestAvaliableRoom,
  joinRoom: { id: number }
}
```