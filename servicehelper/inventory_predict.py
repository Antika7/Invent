from serpapi import GoogleSearch
import json
import random


# file_paths is getting the data now do the changes accordingly
def predict_inventory(file_paths):

    # Search Trend
    params = {
        "engine": "google_trends",
        "q": "energy drink",
        "data_type": "TIMESERIES",
        "api_key": "2e649fda40f71dfc0eb496a7ff4f5760e957d50ec802f10a0938453b4c9a92bd"
    }

    search = GoogleSearch(params)
    results = search.get_dict()

    result = results['interest_over_time']
    time_series_data = result['timeline_data']

    yesterday_value = int(time_series_data[-1]['values'][0]['extracted_value'])
    day_before_value = int(time_series_data[-2]['values'][0]['extracted_value'])
    difference = yesterday_value - day_before_value
    search_trend = (difference / day_before_value) * 100

    # Sales Trend
    file_path = 'sales.json'

    with open(file_path, 'r') as file:
        sales_data = json.load(file)

    def calculate_percentage_change(sale_yesterday, sale_today):
        if sale_yesterday == 0:
            return float('inf')
        return ((sale_today - sale_yesterday) / sale_yesterday) * 100

    def get_sales_trend(store_name, sales_data):
        for store_data in sales_data:
            if store_data["Store"] == store_name:
                sale_yesterday = store_data["Sale Yesterday"]
                sale_today = store_data["Sale Today"]
                percentage_change = calculate_percentage_change(sale_yesterday, sale_today)
                return percentage_change
        return None

    store_to_find = "Simply Fresh"
    sales_trend = get_sales_trend(store_to_find, sales_data)

    # Placement Rating
    placement_rating = random.randint(1, 5)

    # Analysis
    data = {
        'placement_rating': placement_rating,
        'search_trend': search_trend,
        'sales_trend': sales_trend
    }

    def predict_purchase_likelihood(data):
        if data['placement_rating'] == 1 and data['search_trend'] >= 20 and data['sales_trend'] >= 20:
            return 'High Purchase Likelihood'
        elif data['placement_rating'] == 2 and data['search_trend'] >= 15 and data['sales_trend'] >= 15:
            return 'Medium Purchase Likelihood'
        else:
            return 'Low Purchase Likelihood'

    return predict_purchase_likelihood(data)
