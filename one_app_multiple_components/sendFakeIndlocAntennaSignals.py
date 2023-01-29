import requests
import numpy as np
import random
import time
import os
import json

input_dir = "kkAufbau_movingObjects"
folders = os.listdir(os.path.join(os.getcwd(), input_dir))
all_data_dict = {}
objectsNames = []
for folder in folders:
    folderPath = os.path.join(os.getcwd(), input_dir, folder)
    if os.path.isdir(folderPath):
        dataFiles = os.listdir(folderPath)
        for fileCounter,dataFile in enumerate(dataFiles):
            if ".npy" in dataFile:
                if fileCounter == 0:
                    objectsNames.append(folder)
                numpyData = np.load(os.path.join(folderPath, dataFile))
                print("loaded data of object {0} with shape {1}".format(objectsNames[-1], np.shape(numpyData)))
                fs = np.unique(np.real(numpyData[:,0]))
                cs = np.unique(np.real(numpyData[:,1]))
                print('Unique freqs are: ' + str(fs))
                print('Unique currents are: ' + str(cs))
                ants = np.shape(numpyData)[1] - 2
                if fileCounter == 0:
                    all_data_dict[folder] = {}
                    for f in fs:
                        all_data_dict[folder][f] = {}
                        for c in cs:
                            all_data_dict[folder][f][c] = {}
                            for i in range(np.shape(numpyData)[1] - 2):
                                all_data_dict[folder][f][c][i] = []
                for f in fs:
                    for c in cs:
                        for i in range(np.shape(numpyData)[0]):
                            if (np.real(numpyData[i,0])==f) and (np.real(numpyData[i,1])==c):
                                for ii in range(2,np.shape(numpyData)[1]):
                                    toAdd = {"real": np.real(numpyData[i, ii]),"imag": np.imag(numpyData[i, ii])}
                                    all_data_dict[folder][f][c][ii-2].append(toAdd)



def get_all_for_f(object,c,ant=0, real_imag="real"):
    result = []
    limitData = len(all_data_dict[object][fs[0]][c][ant])
    for idx in range(limitData):
        temp = []
        for f in fs:

            temp.append(all_data_dict[object][f][c][ant][idx][real_imag])
        result.append(temp)

    return result

f = fs[-1]
c = cs[-1]
real_imag = "imag"

signals = []
for objectName in objectsNames:
    for idx in range(len(all_data_dict[objectName][f][c][0])):
        row = []
        for ant in range(ants):
            row.append(np.abs(all_data_dict[objectName][f][c][ant][idx][real_imag]))
        sumRow = np.sum(row)
        normalizedRow = []
        for ant in range(ants):
            normalizedRow.append(row[ant]/sumRow)
        signals.append(normalizedRow)

for i in range(0,len(signals),10):
    time.sleep(0.1)

#
    data = {
        "normalized": signals[i]
    }
    try:
        requests.put('http://localhost:3004/antennasSignals/1', data=data)

    except requests.exceptions.ConnectionError as e:
        print("reconnecting")






#
# antennasIds = [0, 7,6,1,8,5,2,3,4]
#
#
# startTime = time.time()
#
# while True:
#     if time.time() - startTime > 0.4:
#         for id in antennasIds:
#             time.sleep(0.05)
#
#             data = {
#                 "id": id,
#                 "real": random.uniform(-3, 3),
#                 "imag": random.uniform(-3, 3),
#             }
#             try:
#                 requests.put("http://localhost:8976/antennas/"+str(id), data=data)
#
#             except requests.exceptions.ConnectionError as e:
#                 print("reconnecting")
#         startTime = time.time()