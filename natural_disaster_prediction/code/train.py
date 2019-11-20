import matplotlib

matplotlib.use("Agg")

from tensorFlow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.preprocessing.application import VGG16
from tensorflow.keras.layers import Dropout
from tensorflow.keras.layers import Flatten
from tensorflow.keras.layers import Dense
from tensorflow.keras.layers import Input
from tensorflow.keras.models import SGD
from tensorflow.keras.optimizers import SGD
from sklearn.preprocessing import LabelBinarizer
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

import config
from learningratefinder import learningratefinder
from clr_callback import CyclicLR
from imutils import paths

import matplotlib.pyplot as plt 
import numpy as np 
import argparse
import pickle
import cv2
import sys
import os

ap = argparse.ArgumentParser()
ap.add_argument("-f", "--lr-find", type=int, default=0, help="wether or not to find optimal learning rate")
args = vars(ap.parse_args())

print("Loading images")
imagePaths = list(paths.list_images(config.DATASET_PATH))
data = []
labels = []


for imagePath in imagePaths:
    label = imagePAth.split(os.path.sep)[-2]
    


