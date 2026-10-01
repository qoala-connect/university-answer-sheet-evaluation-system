import asyncio
import json
import os
import subprocess
import time
import urllib.request
import websockets

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

async def check_dom():
    chrome_proc = subprocess.Popen([
        CHROME_PATH,
        "--headless=new",
        "--remote-debugging-port=9222",
        "--disable-gpu",
        "--window-size=1920,1080"
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    try:
        time.sleep(1.5)
        req = urllib.request.Request("http://127.0.0.1:9222/json/new?http://127.0.0.1:3005/", method='PUT')
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            ws_url = data['webSocketDebuggerUrl']
            target_id = data['id']

        async with websockets.connect(ws_url, max_size=50*1024*1024) as ws:
            await ws.send(json.dumps({"id": 1, "method": "Runtime.enable"}))
            await ws.send(json.dumps({"id": 2, "method": "Page.enable"}))
            
            # Listen for events
            start = time.time()
            while time.time() - start < 4:
                try:
                    msg = await asyncio.wait_for(ws.recv(), timeout=1.0)
                    parsed = json.loads(msg)
                    if parsed.get("method") == "Runtime.exceptionThrown":
                        print("EXCEPTION:", parsed.get("params", {}).get("exceptionDetails", {}).get("text"))
                    elif parsed.get("method") == "Runtime.consoleAPICalled":
                        print("CONSOLE:", [arg.get("value") for arg in parsed.get("params", {}).get("args", [])])
                except asyncio.TimeoutError:
                    pass

    finally:
        chrome_proc.terminate()
        chrome_proc.wait()

if __name__ == "__main__":
    asyncio.run(check_dom())
