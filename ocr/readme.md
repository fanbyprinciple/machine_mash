# OCR application

## Initially using tesseract.

![](Screen.png)

## Other Tools to leverage for ocr

1. OCRopus - https://github.com/ocropus/ocropy

1. Ocular - https://github.com/tberg12/ocular

## google translate

It is working well with python

![](googletrans.png)

## Tesseract 5

from : https://nanonets.com/blog/ocr-with-tesseract/

![](tesseract_cots.png)

Tesseract 4.00 includes a new neural network subsystem configured as a text line recognizer. It has its origins in OCRopus' Python-based LSTM implementation but has been redesigned for Tesseract in C++. The neural network system in Tesseract pre-dates TensorFlow but is compatible with it, as there is a network description language called Variable Graph Specification Language (VGSL), that is also available for TensorFlow.

To recognize an image containing a single character, we typically use a Convolutional Neural Network (CNN). Text of arbitrary length is a sequence of characters, and such problems are solved using RNNs and LSTM is a popular form of RNN. Read this post to learn more about LSTM.

![](t5_preprocessed.png)

LSTMs are great at learning sequences but slow down a lot when the number of states is too large. There are empirical results that suggest it is better to ask an LSTM to learn a long sequence than a short sequence of many classes. Tesseract developed from OCRopus model in Python which was a fork of a LSMT in C++, called CLSTM. CLSTM is an implementation of the LSTM recurrent neural network model in C++, using the Eigen library for numerical computations.

TODO:

make pytesseract work
get boxes around text