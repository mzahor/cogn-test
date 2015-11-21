import unittest
from forecast import summarize_weather, OpenWeatherMapClient

class TestSummarizeWeatherIntegrational(unittest.TestCase):
    def setUp(self):
        self.summary = summarize_weather('lviv')

    def test_city(self):
        self.assertEquals(self.summary['city'], 'Lviv')
    
    def test_min(self):
        self.assertIsInstance(self.summary['min'], float)

    def test_max(self):
        self.assertIsInstance(self.summary['max'], float)

    def test_min_max_values(self):
        self.assertGreater(self.summary['max'], self.summary['min'])

    def test_forecasts(self):
        forecasts = self.summary['forecasts']
        self.assertIsInstance(forecasts, dict)
        self.assertGreater(len(forecasts.keys()), 0)

    def test_forecasts_have_data_for_two_weeks(self):
        forecasts = self.summary['forecasts']
        data = [date for dates in forecasts.values() for date in dates]
        self.assertEquals(len(data), 14)

    def test_forecasts_not_empty(self):
        forecasts = self.summary['forecasts']
        for dates in forecasts.values():
            self.assertIsInstance(dates, list)
            self.assertNotEqual(dates, [])

class TestWeatherClient(unittest.TestCase):
    def setUp(self):
        self.client = OpenWeatherMapClient()

    def test_loading_forecast(self):
        data = self.client.get_daily_forecast('lviv')
        self.assertIsInstance(data, dict)
        self.assertEquals(data['city']['name'], 'Lviv')
        self.assertEquals(data['city']['country'], 'UA')
        self.assertEquals(len(data['list']), 14)