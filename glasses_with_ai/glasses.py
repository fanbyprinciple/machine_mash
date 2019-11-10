import cv2
from itertools import count

face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
eye_cascade = cv2. CascadeClassifier('haarcascade_eye.xml')

imgGlasses = cv2.imread('eyes.png')

if imgGlasses is None:
    exit("Could not open the image")

if face_cascade.empty():
    exit("Missing: haarcascade_frontalface_default.xml")

if eye_cascade.empty():
    exit("Missing : haarcascade_eye.xml")

imgGlassesGray = cv2.cvtColor(imgGlasses, cv2.COLOR_BGR2GRAY)
ret, orig_mask = cv2.threshold(imgGlassesGray, 10, 255, cv2.THRESH_BINARY)
orig_mask_inv = cv2.bitwise_not(orig_mask)

imgGlasses = imgGlasses[:,:,0:3]
origGlassesHeight, origGlassesWidth = imgGlasses.shape[:2]

video_capture = cv2.VideoCapture(0)

if not video_capture.isOpened():
    exit('The Camera is not opened')

counter = count(1)

while True:
    print("Iteration ", next(counter))
    ret, frame = video_capture.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    for (x,y,w,h) in faces:
        cv2.rectangle(frame,(x,y),(x+w,y+h), (255,0,0), 2)
        roi_gray = gray[y: y + h, x: x+w]
        roi_color = frame[y:y+h, x: x+w]
        eyes = eye_cascade.detectMultiScale(roi_gray)

        for (ex, ey, ew, eh) in eyes :
            cv2.rectangle(roi_color, (ex, ey), (ex+ew, ey+ eh), (0,255,0),2)
            print("EX: ", ex, " EY ", ey, " EW ", ew, " EH ", eh)

        for (ex, ey, ew, ew, eh) in eyes:
            glassesWidth = 3 *ew
            glassesHeight = glassesWidth * origGlassesHeight / origGlassesWidth

            x1 = ex - (glassesWidth/4)
            x2 = ex + ew + (glassesWidth/4)
            y1 = ey + eh - (glassesHeight/2)
            y2 = ey + eh + (glassesHeight/2)

            if x1 < 0:
                x1 = 0
            if y1 < 0:
                y1 = 0
            if x2 > w:
                x2 = w
            if y2 > h:
                y2 = h

            glassesWidth = x2 - x1
            glassesHeight = y2 - y1

            glasses = cv2.resize(imgGlasses, (glassesWidth, glassesHeight), interpolation = cv2. INTER_AREA)
            mask = cv2.resize(orig_mask, (glassesWidth, glassesHeight), interpolation = cv2.INTER_AREA)
            mask_inv = cv2.resize(orig_mask_inv, (glassesWidth, glassesHeight), interpolation = cv2.INTER_AREA)

            roi = roi_color[y1:y2, x1:x2]
            roi_bg = cv2.bitwise_and(roi, ri, mask=mask_inv)
            roi_fg = cv2.bitwise_and(glasses, glasses, mask = mask)

            dst = cv2.add(roi_bg, roi_fg)

            roi_color[y1:y2, x1:x2] = dst

            cv2.imshow('Video', frame)
            cv2.waitKey()
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

video_capture.release()
cv2.distroyAllWindows()



