import sys

import requests
from py4j.java_gateway import JavaGateway
import numpy as np
import pickle
# to ignore warnings
import warnings
warnings.filterwarnings('ignore')


class WindSpeedModelPython:
    def __init__(self):
        self.gateway = JavaGateway()
        self.java_model = self.gateway.entry_point
        with open("./AI_Models/wind_speed_model.pkl", 'rb') as f:
            self.model = pickle.load(f)

    def predict_wind_speed(self, features):
        try:
            features_2d = np.array(features).reshape(1, -1)
            prediction = self.model.predict(features_2d)
            spring_boot_url = "http://localhost:3269/api/v1/airQuality/predict/res/windSpeed"
            response = requests.post(spring_boot_url, json=float(prediction))
            # print(response.text)

            return prediction
        except Exception as e:
            return str(e)


if __name__ == "__main__":
    wind_speed_model = WindSpeedModelPython()
    data_from_java = [float(arg) for arg in sys.argv[1:]]
    result = wind_speed_model.predict_wind_speed(data_from_java)
