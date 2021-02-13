import googletrans
from googletrans import Translator

print('Available languages: ')

lang_avail = googletrans.LANGUAGES
print(type(lang_avail))
for i in lang_avail:
    print(i, " : ", lang_avail[i])

translator = Translator()

result = translator.translate('আপনি কেমন আছেন', src='bn', dest='en')
# result = translator.translate('Mikä on nimesi', src='fi', dest='fr')

print(result.text)
