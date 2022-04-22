from PIL import Image
from numpy import asarray
import base64
import requests
import time
import json
import sys
import numpy as np
from multiprocessing import Process, Queue

# Test Parameters
s1 = 1
s2 = 1
s3 = 2
s4 = 2
s5 = 2
sleep = 60
multiplier_sleep = 4
# End Parameters
def inference_request(tnum):
    image = Image.open('images/dog.jpeg')
    instance = np.expand_dims(asarray(image),0).tolist()
    dataSend = json.dumps({"instances": instance})
    num = 0
    reqNumber = 0
    startTs = 0
    while True:
        currTs = int(round(time.time() * 1000))
        if (currTs-startTs) < 1000:
            if reqNumber < 2:
                #print("startTs:{}\nreqNumber:{}\ncurrTs:{}\n".format(startTs, reqNumber, currTs))
                num = num + 1
                json_response = requests.post("http://ts.example.com:30906/v1/models/obj_detection:predict", data=dataSend)
                reqNumber = reqNumber + 1
                # print(json_response.text)
                response = json.loads(json_response.text)["predictions"][0]
#                print("{} Request SENT".format(tnum))
        #        print("[PROCESS {}][REQUEST {}] NEW PREDICTION RESPONSE\nAccuracy: {}%\nClass: {}\nNum Detections: {}\nBoxes: {}\n*********************$
                # time.sleep(0.5)
        else:
            #print("startTs:{}\nreqNumber:{}\ncurrTs:{}\n".format(startTs, reqNumber, currTs))
#            print("{} Another second passed, resetting values".format(tnum))
            reqNumber = 0
            startTs = int(round(time.time() * 1000))

if __name__ == "__main__":
    queue = Queue()
    print("Test started")
    
    batch1 = [Process(target=inference_request, args=(x,)) for x in range(s1)]
    batch2 = [Process(target=inference_request, args=(x,)) for x in range(s2)]
    batch3 = [Process(target=inference_request, args=(x,)) for x in range(s3)]
    batch4 = [Process(target=inference_request, args=(x,)) for x in range(s4)]
    batch5 = [Process(target=inference_request, args=(x,)) for x in range(s5)]

    #PROCESS START 
    print("Starting Process {} - {}".format(s1, time.time() * 1000))
    for p in batch1:
        p.start()
    time.sleep(sleep * multiplier_sleep)

    #PROCESS START 
    print("Starting Process {} - {}".format(s1+s2, time.time() * 1000))
    for p in batch2:
        p.start()
    time.sleep(sleep * multiplier_sleep)

    #PROCESS START 
    print("Starting Process {} - {}".format(s1+s2+s3, time.time() * 1000))
    for p in batch3:
        p.start()
    time.sleep(sleep * multiplier_sleep)

    #PROCESS START 
    print("Starting Process {} - {}".format(s1+s2+s3+s4, time.time() * 1000))
    for p in batch4:
        p.start()
    time.sleep(sleep * multiplier_sleep)

    #PROCESS START 
    print("Starting Process {} - {}".format(s1+s2+s3+s4+s5, time.time() * 1000))
    for p in batch5:
        p.start()
    time.sleep(sleep * multiplier_sleep)

    #PROCESS STOP
    print("Stopping Process {} - {}".format(s1+s2+s3+s4+s5, time.time() * 1000))
    for p in batch5:
        p.terminate()
    time.sleep(sleep * multiplier_sleep)

    #PROCESS STOP
    print("Stopping Process {} - {}".format(s1+s2+s3+s4, time.time() * 1000))
    for p in batch4:
        p.terminate()
    time.sleep(sleep * multiplier_sleep)

    #PROCESS STOP
    print("Stopping Process {} - {}".format(s1+s2+s3, time.time() * 1000))
    for p in batch3:
        p.terminate()
    time.sleep(sleep * multiplier_sleep)

    #PROCESS STOP
    print("Stopping Process {} - {}".format(s1+s2, time.time() * 1000))
    for p in batch2:
        p.terminate()
    time.sleep(sleep * multiplier_sleep)

    #PROCESS STOP
    print("Stopping Process {} - {}".format(s1, time.time() * 1000))
    for p in batch1:
        p.terminate()

    for p in batch1:
        p.join()
    for p in batch2:
        p.join()
    for p in batch3:
        p.join()
    for p in batch4:
        p.join()
    for p in batch5:
        p.join()
    print("Test finished")
    sys.exit(1)
