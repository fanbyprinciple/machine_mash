import googletrans
from googletrans import Translator

print('Available languages: ')

lang_avail = googletrans.LANGUAGES
print(type(lang_avail))
for i in lang_avail:
    print(i, " : ", lang_avail[i])

translator = Translator()

f = open('bengali_result.txt', 'r')
input_text = f.read()


result = translator.translate('আপনি কেমন আছেন', src='bn', dest='en')
# result = translator.translate(input_text, src='bn', dest='en')

print(result.text)
