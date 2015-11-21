#!/usr/bin/env python
# -*- coding: utf-8 -*-
import __future__
import requests
from datetime import date
from collections import defaultdict

# TODO: change it
APPID = 'cf80840a5a6b45f0658c94ad5b61df48'
DATEFORMAT = '%Y-%m-%d'

class OpenWeatherMapClient(object):
    base_url = 'http://api.openweathermap.org/data/2.5/'
    
    def __init__(self, appid=APPID):
        self.appid = appid

    def get_daily_forecast(self, city, days=14):
        url = self.base_url + 'forecast/daily?'
        params = {'q': city, 'units': 'metric', 'cnt': days, 'APPID': APPID}
        resp = requests.get(url, params=params)
        resp.raise_for_status()
        data = resp.json()
        return data 

def summarize_weather(city, client=None):
    if not client:
        client = OpenWeatherMapClient()
    data = client.get_daily_forecast(city)
    result = {}
    result['city'] = data['city']['name']
    result['min'] = min(day['temp']['min'] for day in data['list'])
    result['max'] = max(day['temp']['max'] for day in data['list'])
    result['forecasts'] = _extract_forecasts(data['list'])
    return result

def _extract_forecasts(data):
    forecasts = defaultdict(list)
    to_date = lambda ts: date.fromtimestamp(ts).strftime(DATEFORMAT)
    weather_by_dates = [(day['weather'][0]['main'], to_date(day['dt'])) for day in data]
    for k, v in weather_by_dates:
        forecasts[k].append(v)
    return dict(forecasts)


if __name__ == '__main__':
    import argparse
    import pprint

    pp = pprint.PrettyPrinter(indent=4).pprint
    parser = argparse.ArgumentParser(description='Shows weather forecast summary.')
    parser.add_argument('city', type=str, help='city to get forecasts for')
    args = parser.parse_args()
    pp(summarize_weather(args.city))