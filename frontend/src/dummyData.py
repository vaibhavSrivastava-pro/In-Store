
# Class to info map
mp = {
  "Ariel" : {
    "price" : 40,
    "ingredients" : "niubibiyb",
    "nutritional information" : "hbjhbjhbhjb",
    "manufacturing information" : "jjbiuiub"
  },
  "Kurkure" : {
    "price" : 20,
    "ingredients" : "niubibiyb",
    "nutritional information" : "hbjhbjhbhjb",
    "manufacturing information" : "jjbiuiub"
  },
  "Maggie" : {
    "price" : 30,
    "ingredients" : "niubibiyb",
    "nutritional information" : "hbjhbjhbhjb",
    "manufacturing information" : "jjbiuiub"
  }
}


# Json returned from model api

{
  "predictions": [
    {
      "x": 337,
      "y": 302,
      "width": 390,
      "height": 454,
      "confidence": 0.949,
      "class": "Ariel",
      "class_id": 0,
      "detection_id": "bf52eb0c-9aa3-459d-9460-e59ffcc7c3c6"
    },
    {
      "x": 337,
      "y": 302,
      "width": 390,
      "height": 454,
      "confidence": 0.949,
      "class": "Phone",
      "class_id": 0,
      "detection_id": "bf52eb0c-9aa3-459d-9460-e59ffcc7c3c6"
    },
    {
      "x": 337,
      "y": 302,
      "width": 390,
      "height": 454,
      "confidence": 0.949,
      "class": "Kurkure",
      "class_id": 0,
      "detection_id": "bf52eb0c-9aa3-459d-9460-e59ffcc7c3c6"
    }
  ]
}





# curl -X POST "https://detect.roboflow.com/shop_stock_dataset/1?\ api_key=rf_QWt5W4vbn7fJMo7MuBOyrsbwsnh2&\image=https://m.media-amazon.com/images/I/71GN9iowhxL._AC_UF1000,1000_QL80_.jpg

# /Users/vaibhavsrivastava/Desktop/kurkure.jpg

# base64 /Users/vaibhavsrivastava/Desktop/kurkure.jpg | curl -d @- \
# "https://detect.roboflow.com/shop_stock_dataset/1?api_key=rf_QWt5W4vbn7fJMo7MuBOyrsbwsnh"




