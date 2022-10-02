import requests
import random

key = 'DmnQSJTgYcEUQI76gscZrw' # key for Carbon Interface API
card_program_uuid = '6ec97b6f-4ef0-4f72-b583-8ca28c6f509a' # for Carbon Interface API
headers = {
    "Authorization": f"Bearer {key}",
    "Content-Type": "application/json"
}



def g_to_tons(x):
    '''Converts given grams to metric tons'''
    return x / 1e6

def estimate(data, headers=headers, tons=True):
    emissions = requests.post('https://www.carboninterface.com/api/v1/estimates', json=data, headers=headers).json()['data']['attributes']['carbon_g']
    return g_to_tons(emissions) if tons else emissions


def elec(value, state, unit='mwh', country='us', tons=True):
    '''
    Returns carbon emissions from electricity usage for given quantity (in the given value)

    Returns carbon emissions in metric tons (if tons=True), else grams
    '''
    data = {
        "type": "electricity",
        "electricity_unit": unit,
        "electricity_value": value,
        "country": "us",
        "state": state
    }

    return estimate(data, tons=tons)


def flight(legs, num_passengers=1, unit='mi', tons=True):
    '''
    Returns carbon emissions from flights as metric tons (if tons=True), else grams

    Legs parameter should be a tuple of (departure, destination) airports for each leg, ex: [('ATL', 'EWR'), ('EWR', 'ATL')] for
      round-trip from ATL to EWR
    '''
    data = {
        "type": "flight",
        "passengers": num_passengers,
        "distance_unit": unit,
        "legs": [{"departure_airport": x, "destination_airport": y} for x,y in legs]
    }

    return estimate(data, tons=tons)


def shipping(weight_value, distance_value, transport_method, weight_unit='lb', distance_unit='mi', tons=True):
    '''
    Returns carbon emissions from shipments as metric tons (if tons=True), else grams

    transport_method parameter can be 'ship', 'train', 'truck,' or 'plane'
    '''
    data = {
        "type": "shipping",
        "weight_value": weight_value,
        "weight_unit": weight_unit,
        "distance_value": distance_value,
        "distance_unit": distance_unit,
        "transport_method": transport_method
    }

    return estimate(data, tons=tons)


def vehicle(distance_value, make, model, year, distance_unit='mi', tons=True):
    '''
    Returns carbon emissions from driving the specified car as metric tons (if tons=True), else grams
    '''

    for x in requests.get("https://www.carboninterface.com/api/v1/vehicle_makes", headers=headers).json():
        if x['data']['attributes']['name'] == make:
            make_id = x['data']['id']
            break

    for x in requests.get(f"https://www.carboninterface.com/api/v1/vehicle_makes/{make_id}/vehicle_models", headers=headers).json():
        if x['data']['attributes']['name'] == model and x['data']['attributes']['year'] == year:
            model_id = x['data']['id']
            break

    if 'model_id' not in vars():
        raise RuntimeError(f'{make} {model} {year} not in database')

    data = {
        "type": "vehicle",
        "distance_value": distance_value,
        "distance_unit": distance_unit,
        "vehicle_model_id": model_id
    }

    return estimate(data, tons=tons)


def fuel(fuel_source_value, fuel_source_type='pg', fuel_source_unit='gallon', tons=True):
    '''
    Returns carbon emissions from fuel combustion as metric tons (if tons=True), else grams

    fuel_source_type and fuel_source_unit default to propane in gallons
    for a list of acceptable values see https://www.notion.so/Carbon-Interface-Fuel-Sources-0166b59ec1514984895cc7dd35836392
    '''
    data = {
        "type": "fuel_combustion",
        "fuel_source_type": fuel_source_type,
        "fuel_source_unit": fuel_source_unit,
        "fuel_source_value": fuel_source_value
    }

    return estimate(data, tons=tons)


# def card_profile(diet_habit, transportation_method):
#     '''
#     Creates a card profile
#     Possible values for diet_habit: 'vegan', 'vegetarian', 'plant_based', and 'omnivore'
#     Possible values for transportation_method: 'public_transport', 'compact_vehicle', 'midsize_vehicle', and 'large_vehicle'
#     '''
#     data = {
#         "external_id": random.getrandbits(16),
#         "diet_habit": diet_habit,
#         "transportation_method": transportation_method
#     }

#     requests.post(f"https://www.carboninterface.com/api/v1/carbon_ledger/programs/{card_program_uuid}/card_profiles", json=data, headers=headers)


card_profile('vegan', 'public_transport')
