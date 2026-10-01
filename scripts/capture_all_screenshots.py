import asyncio
import json
import os
import subprocess
import time
import urllib.request
import websockets
import base64

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
SCREENSHOTS_DIR = os.path.abspath("public/screenshots")

VIEWS = [
    {
        "name": "faculty_dashboard.png",
        "url": "http://127.0.0.1:3005/?perspective=faculty&tab=dashboard"
    },
    {
        "name": "faculty_ingestion.png",
        "url": "http://127.0.0.1:3005/?perspective=faculty&tab=ingestion"
    },
    {
        "name": "faculty_rubric.png",
        "url": "http://127.0.0.1:3005/?perspective=faculty&tab=rubric"
    },
    {
        "name": "challenge_desk.png",
        "url": "http://127.0.0.1:3005/?perspective=faculty&tab=grievances"
    },
    {
        "name": "student_inspector_assignment.png",
        "url": "http://127.0.0.1:3005/?perspective=student&studentTab=script&mode=Assignment"
    },
    {
        "name": "student_inspector_quiz.png",
        "url": "http://127.0.0.1:3005/?perspective=student&studentTab=script&mode=Quiz"
    },
    {
        "name": "student_inspector_exam.png",
        "url": "http://127.0.0.1:3005/?perspective=student&studentTab=script&mode=Examination"
    },
    {
        "name": "student_performance.png",
        "url": "http://127.0.0.1:3005/?perspective=student&studentTab=performance&mode=Assignment"
    },
    {
        "name": "dean_dashboard.png",
        "url": "http://127.0.0.1:3005/?perspective=dean"
    },
    {
        "name": "coe_dashboard.png",
        "url": "http://127.0.0.1:3005/?perspective=coe"
    }
]

async def capture_all():
    os.makedirs(SCREENSHOTS_DIR, exist_ok=True)
    
    # Launch Chrome once with remote debugging
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
        time.sleep(2.0)

        for item in VIEWS:
            out_file = os.path.join(SCREENSHOTS_DIR, item["name"])
            target_url = item["url"]
            print(f"Navigating to {target_url} for {item['name']}...")

            # Open a blank tab
            req = urllib.request.Request("http://127.0.0.1:9222/json/new", method='PUT')
            with urllib.request.urlopen(req) as resp:
                data = json.loads(resp.read().decode())
                ws_url = data['webSocketDebuggerUrl']
                target_id = data['id']

            async with websockets.connect(ws_url, max_size=50*1024*1024) as ws:
                await ws.send(json.dumps({"id": 1, "method": "Page.enable"}))
                await ws.send(json.dumps({"id": 2, "method": "Runtime.enable"}))
                
                # Set 1920x1080 viewport
                await ws.send(json.dumps({
                    "id": 3,
                    "method": "Emulation.setDeviceMetricsOverride",
                    "params": {
                        "width": 1920,
                        "height": 1080,
                        "deviceScaleFactor": 1,
                        "mobile": False
                    }
                }))

                # Explicitly navigate via CDP
                await ws.send(json.dumps({
                    "id": 4,
                    "method": "Page.navigate",
                    "params": {"url": target_url}
                }))

                # Wait for React DOM, animations, and charts/images to render
                await asyncio.sleep(2.5)

                # Capture screenshot
                await ws.send(json.dumps({
                    "id": 5,
                    "method": "Page.captureScreenshot",
                    "params": {"format": "png"}
                }))

                while True:
                    msg = await ws.recv()
                    parsed = json.loads(msg)
                    if parsed.get("id") == 5:
                        img_bytes = base64.b64decode(parsed["result"]["data"])
                        with open(out_file, "wb") as f:
                            f.write(img_bytes)
                        print(f"Saved {item['name']} ({len(img_bytes)} bytes)")
                        break

            # Close tab
            urllib.request.urlopen(f"http://127.0.0.1:9222/json/close/{target_id}")
            time.sleep(0.5)

        print("\nAll screenshots captured successfully!")

    finally:
        chrome_proc.terminate()
        chrome_proc.wait()

if __name__ == "__main__":
    asyncio.run(capture_all())
