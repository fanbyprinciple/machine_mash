from imutils.object_detection import non_max_suppression
import numpy as np 
import pytesseract
import argparse
import cv2

def decode_predictions(scores, geometry):
    (numRows, numCols) = scores.shape[2:4]
    rects = []
    confidences = []

    for y in range(0, numRows):
        scoresData = scores[0,0,y]
        xData0 = geometry[0,0,y]
        xData1 = geometry[0,1,y]
        xData2 = geometry[0,2,y]
        xData3 = geometry[0,3,y]
        anglesData = geometry[0,4,y]

        for x in range(0,numCols):
            if(scoreData[x] < args["min_confidence"]):
               continue

            (offsetX, offsetY) = (x *4.0,y*4.0)

            angle = anglesData[x]
            cos = np.cos(angle)
            sin = np.sin(angle)

            h = xData0[x] + xData2[x]
            w = xData1[x] + xData3[x]

            endX = int(offsetX + (cos * xData1[x]) + (sin * xData2[x]))
            endY = int(offsetY - (sin * xData1[x]) + (cos * xData2[x]))

            startX = int(endX - w)
            startY = int(endY - h)

            rects.append((startX, startY, endX, endY))
            confidences.append(scoresData[x])

    return (rects,confidences)

    ap = argparse.ArgumentParser()
    ap.add_argument("-i", "--image", type=str, help="path to input image")
    ap.add_argument("-east", "--east", type=str, help="path to input east text detector")
    ap.add_argument("-c", "--min-confidence", type=float, default=0.5, help="min probability required to inspect a region")
    ap.add_argument("-w", "--width", type=int, default=320, help="nearest multiple of 32 for resized width")
    ap.add_argument("-e", "--height", type=int, default=320, help="nearest multiple of 32 for resized height")
    ap.add_argument("-p", "--padding", type=float, default=0.0, help="amount of padding to add to each border of ROI")
    args = vars(ap.parse_args())

    image = cv2.imread(args["image"])
    orig = image.copy()
    (origH, origW) = image.shape[:2]

    (newW, newH) = (args["width"], args["height"])
    rW = origW/ float(newW)
    rH = origH / float(newH)

    image = cv2.resize(image, (newW, newH))
    (H, W) = image.shape[:2]

    


