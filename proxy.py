import asyncio
import aiohttp
import ssl

async def handle_websocket(reader, writer):
    ws = await websockets.connect('ws://localhost:1865/ws', ssl=ssl_context)
    
    async def forward_messages():
        while True:
            data = await reader.read(1024)
            if not data:
                break
            await ws.send(data)

    async def receive_messages():
        while True:
            data = await ws.recv()
            writer.write(data)
            await writer.drain()

    asyncio.gather(forward_messages(), receive_messages())

async def main():
    ssl_context = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
    ssl_context.load_cert_chain('your_cert.pem', 'your_key.pem')  # Sostituisci con i tuoi certificati

    server = await asyncio.start_server(handle_websocket, '0.0.0.0', 8443, ssl=ssl_context)

    addrs = ', '.join(str(sock.getsockname()) for sock in server.sockets)
    print(f'Serving on {addrs}')

    async with server:
        await server.serve_forever()

asyncio.run(main())
