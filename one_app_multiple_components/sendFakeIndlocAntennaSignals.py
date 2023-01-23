import requests
import numpy as np
import random
import time
antennasIds = [0, 7,6,1,8,5,2,3,4]


startTime = time.time()

while True:
    if time.time() - startTime > 0.4:

        for id in antennasIds:
            time.sleep(0.05)

            data = {
                "id": id,
                "real": random.uniform(-3, 3),
                "imag": random.uniform(-3, 3),
            }
            try:
                requests.put("http://localhost:8976/antennas/"+str(id), data=data)

            except requests.exceptions.ConnectionError as e:
                print("reconnecting")
        startTime = time.time()