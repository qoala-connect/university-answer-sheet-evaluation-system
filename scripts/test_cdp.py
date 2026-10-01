import asyncio
import json
import os
import subprocess
import time
import urllib.request
import websockets
import base64

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

async def capture_tab(url, output_path, wait_sec=3):
    # Launch Chrome with remote debugging
    chrome_proc = subprocess.Popen([
        CHROME_PATH,
        "--headless=new",
        "--remote-debugging-port=9222",
        "--disable-gpu",
        "--window-size=1920,1080",
        "--no-first-run",
        "--no-default-browser-check"
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    try:
        # Wait for Chrome debug endpoint
        time.sleep(1.5)
        
        # Create a new target tab
        encoded_url = urllib.parse.quote(url, safe=':/?=&')
        req = urllib.request.Request(f"http://127.0.0.1:9222/json/new?{encoded_url}", method='PUT')
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            ws_url = data['webSocketDebuggerUrl']
            target_id = data['id']

        # Connect via WebSocket
        async with websockets.connect(ws_url, max_size=50*1024*1024) as ws:
            # Enable Page
            await ws.send(json.dumps({"id": 1, "method": "Page.enable"}))
            await ws.recv()

            # Set viewport to 1920x1080
            await ws.send(json.dumps({
                "id": 2,
                "method": "Emulation.setDeviceMetricsOverride",
                "params": {
                    "width": 1920,
                    "height": 1080,
                    "deviceScaleFactor": 1,
                    "mobile": False
                }
            }))
            await ws.recv()

            # Wait for React to finish rendering
            await asyncio.sleep(wait_sec)

            # Capture screenshot
            await ws.send(json.dumps({
                "id": 3,
                "method": "Page.captureScreenshot",
                "params": {"format": "png"}
            }))

            while True:
                msg = await ws.recv()
                res = json.loads(msg)
                if res.get("id") == 3:
                    img_data = base64.b64decode(res["result"]["data"])
                    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
                    with open(output_path, "wb") as f:
                        f.write(img_data)
                    print(f"Captured {output_path} ({len(img_data)} bytes)")
                    break

        # Close tab
        urllib.request.urlopen(f"http://127.0.0.1:9222/json/close/{target_id}")

    finally:
        chrome_proc.terminate()
        chrome_proc.wait()

if __name__ == "__main__":
    asyncio.run(capture_tab("http://localhost:3005/?perspective=faculty&tab=dashboard", "public/screenshots/faculty_dashboard.png"))
