from firebase_admin import credentials, initialize_app, db
import random
import collections
import backend


cred = credentials.Certificate("./bamboo-52389-firebase-adminsdk-jdph1-b1ff97c2b8.json")
default_app = initialize_app(cred, {'databaseURL': 'https://bamboo-52389-default-rtdb.firebaseio.com/'})

head = db.reference('/')
companies = db.reference('/companies/')

new_listings = db.reference('/new_listings/')
# sells = db.reference('/listings/sells/')
# buys = db.reference('/listings/buys/')
MAX_BUY = 9223372036854775807
MIN_SELL = -1
DEFAULT_PRICE = 100

books = db.reference('/books/')
monthly_dr_buy_book = db.reference('/books/monthly/direct_removal/buy')
monthly_dr_sell_book = db.reference('/books/monthly/direct_removal/sell')
monthly_beecs_buy_book = db.reference('/books/monthly/beecs/buy')
monthly_beecs_sell_book = db.reference('/books/monthly/beecs/sell')
onetime_dr_buy_book = db.reference('/books/onetime/direct_removal/buy')
onetime_dr_sell_book = db.reference('/books/onetime/direct_removal/sell')
onetime_beecs_buy_book = db.reference('/books/onetime/beecs/buy')
onetime_beecs_sell_book = db.reference('/books/onetime/beecs/sell')

all_books = [monthly_dr_buy_book, monthly_dr_sell_book, monthly_beecs_buy_book, monthly_beecs_sell_book, onetime_dr_buy_book, onetime_dr_sell_book, onetime_beecs_buy_book, onetime_beecs_sell_book]
all_books_paired = [(monthly_dr_buy_book, monthly_dr_sell_book), (monthly_beecs_buy_book, monthly_beecs_sell_book), (onetime_dr_buy_book, onetime_dr_sell_book), (onetime_beecs_buy_book, onetime_beecs_sell_book)]

new_footprints = db.reference('/uncalculated_emissions/')
users = db.reference('/users/')


def overwrite(data, ref=head):
    '''
    Overwrites database at given reference with given data
    '''
    ref.set(data)

def get(ref=head, sort_by=None, descending=False):
    '''
    Returns the database's contents at the given reference
    If key is not None, then orders contents by key
    '''
    if sort_by is None:
        return ref.get()
    else:
        arr = ref.order_by_child(sort_by).get()
        return arr if not descending or arr is None else collections.OrderedDict(reversed(list(arr.items())))

# def getUserIds():
#     return set(get(ref=users).keys())

# def getStores():
#     return set(get(ref=stores).keys())


def add(data, ref=head):
    '''
    Adds data to database at given reference
    NOTE: using an existing key will overwrite that existing data
    '''
    for name,info in data.items():
        ref.child(name).set(info)

def update(key, mapping, ref=head):
    '''
    Updates values at key with the given mapping
    '''
    ref.child(key).update(mapping)

def remove(key, ref=head):
    '''
    Removes key at the given reference
    '''
    ref.child(key).set({})



def rate(tech, price='average'):
    '''
    Returns a rating out of 5 based on the given technology and price
    Technologies are graded based on their permanence, additionality, maturity, commercializability, scalability, and reliability

    Direct Removal: https://www.wri.org/insights/direct-air-capture-resource-considerations-and-costs-carbon-removal
        * Currently considered a 6/9 “technology readiness level”
        * Typical prices $250-600 now, $150-200 in next 5-10 years
        * Reliable, permanent storage
        * Not yet very commercializable
        # Fairly scalable
        * (probably) decent additionality

    BEECS:  https://www.american.edu/sis/centers/carbon-removal/fact-sheet-bioenergy-with-carbon-capture-and-storage-beccs.cfm
            https://psci.princeton.edu/tips/2020/11/15/preventing-climate-change-with-beccs-bioenergy-with-carbon-capture-and-storage
        * Not scalable
        * Maturity is moderate
        * Commercializability is so-so (maybe 3/5?)
        * Permanence eh (maybe 2/5?)
        * Cost: $20-100
    '''
    weights = {
        'price': .25,
        'permanence': .2,
        'additionality': .05,
        'maturity': .1,
        'commercializability': .1,
        'scalability': .15,
        'reliability': .15
    }

    if tech == 'Direct Removal':
        scores = {
            'price': max(5 - (price/400) * 2.5, 0) if price != 'average' else 2.5,
            'permanence': 4.5,
            'additionality': 3,
            'maturity': 3.33,
            'commercializability': 2,
            'scalability': 3,
            'reliability': 4
        }

    elif tech == 'BEECS':
        scores = {
            'price': max(5 - (price/75) * 2.5, 0) if price != 'average' else 2.5,
            'permanence': 2,
            'additionality': 2.5,
            'maturity': 3,
            'commercializability': 3,
            'scalability': 1.5,
            'reliability': 2
        }

    return sum([weights[category]*scores[category] for category in weights.keys()])





def update_book():
    for order_id,fields in get(new_listings).items():
        fields['monthly'] = fields.get('monthly', False)
        fields['tech'] = fields.get('tech', 'any')
        if fields['type'] == 'market':
            fields['price'] = MIN_SELL if fields['order'] == 'sell' else MAX_BUY

        fields['price'] = float(fields['price'])
        fields['tons'] = float(fields['tons'])
        if fields['order'] == 'sell':
            fields['rating'] = rate(fields['tech'], fields['price'] if fields['type'] == 'limit' else 'average')

        if fields['tech'] == 'any' and fields['order'] == 'buy':
            for tech in ['dr', 'beecs']:
                ref = eval('_'.join(['monthly' if fields['monthly'] else 'onetime', tech, fields['order']]) + '_book')
                add({order_id: fields}, ref)
        else:
            ref = eval('_'.join(['monthly' if fields['monthly'] else 'onetime', 'dr' if fields['tech'] == 'Direct Removal' else 'beecs', fields['order']]) + '_book')
            add({order_id: fields}, ref)

        add({order_id:
                dict({
                    'monthly': fields['monthly'],
                    'tons': fields['tons'],
                    'tech': fields['tech'],
                    'type': fields['type']
                }, **({'price': fields['price']} if fields['type'] == 'limit' else {}))
            }, db.reference('/companies/{}/{}/open_orders/'.format(fields['order'].capitalize()+'er', fields['company_id'])))

        remove(order_id, new_listings)


def engine():
    '''
    Executes trades in the market
    '''
    if get(new_listings):
        update_book()


    for buy_book, sell_book in all_books_paired:
        buys,sells = get(buy_book, sort_by='price', descending=True), get(sell_book, sort_by='price')

        if buys is None or sells is None:
            continue

        buys,sells = list(buys.items()), list(sells.items())


        i = j = 0
        while i < len(buys) and j < len(sells):
            buy_id,sell_id = buys[i][0], sells[j][0]
            curr_buy, curr_sell = get(buy_book)[buy_id], get(sell_book)[sell_id]#buys[i][1], sells[j][1]
            if curr_buy['price'] >= curr_sell['price']:
                if curr_buy['type'] == 'limit' and curr_sell['type'] == 'limit':
                    executed_price = (curr_buy['price'] + curr_sell['price']) / 2
                elif curr_buy['type'] == 'limit':
                    executed_price = curr_buy['price']
                elif curr_sell['type'] == 'limit':
                    executed_price = curr_sell['price']
                else:
                    executed_price = get(books).get('last_price', DEFAULT_PRICE)

                if curr_buy['tons'] <= curr_sell['tons']:
                    executed_tons = curr_buy['tons']
                    remove(buy_id, buy_book)
                    remove(buy_id, db.reference('/companies/Buyer/{}/open_orders/'.format(curr_buy['company_id'])))
                    update(sell_id, {'tons': curr_sell['tons'] - executed_tons}, sell_book)
                    update(sell_id, {'tons': curr_sell['tons'] - executed_tons}, db.reference('/companies/Seller/{}/open_orders/'.format(curr_sell['company_id'])))
                    i += 1
                if curr_buy['tons'] >= curr_sell['tons']:
                    executed_tons = curr_sell['tons']
                    remove(sell_id, sell_book)
                    remove(sell_id, db.reference('/companies/Seller/{}/open_orders/'.format(curr_sell['company_id'])))
                    if curr_buy['tons'] != curr_sell['tons']:
                        update(buy_id, {'tons': curr_buy['tons'] - executed_tons}, buy_book)
                        update(buy_id, {'tons': curr_buy['tons'] - executed_tons}, db.reference('/companies/Buyer/{}/open_orders/'.format(curr_buy['company_id'])))
                    j += 1


                buy_data = {'monthly': curr_buy['monthly'], 'price': executed_price, 'tons': executed_tons, 'tech': curr_buy['tech'],
                            # 'order': curr_buy['order'],
                            }
                sell_data = {'monthly': curr_sell['monthly'], 'price': executed_price, 'tons': executed_tons, 'tech': curr_sell['tech'],
                            # 'order': curr_sell['order'],
                            }

                add({'last_price': executed_price}, books)

                buy_ref = db.reference('/companies/Buyer/{}/filled_orders/{}/'.format(curr_buy['company_id'], buy_id))
                sell_ref = db.reference('/companies/Seller/{}/filled_orders/{}/'.format(curr_sell['company_id'], sell_id))
                if get(buy_ref) is None:
                    buy_key = 'order1'
                else:
                    buy_key = 'order' + str(int([*get(buy_ref)][-1][-1])+1)

                if get(sell_ref) is None:
                    sell_key = 'order1'
                else:
                    sell_key = 'order' + str(int([*get(sell_ref)][-1][-1])+1)


                add({buy_key: buy_data}, buy_ref)
                add({sell_key: sell_data}, sell_ref)





                print('ORDER EXECUTED')
                # print(curr_buy['order'], curr_sell['order'])
                print(buy_data)
                print(sell_data)
                print()
            else:
                break



def calc_emissions():
    for user, data in get(new_footprints).items():
        count = 0
        footprints = get(db.reference(f'/users/{user}/footprints/'))
        for footprint in footprints:
            if footprint == 'total_footprint':
                continue
            if footprints[footprint]['type'] == 'Electricity':
                count += backend.elec(footprints[footprint]['amount'], state=footprints[footprint]['state'], unit=footprints[footprint]['units'])
            elif footprints[footprint]['type'] == 'Flight':
                legs = [(footprints[footprint]['start'], footprints[footprint]['end']),] + ([(footprints[footprint]['end'], footprints[footprint]['start'])] if footprints[footprint]['round_trip'] else [])
                count += backend.flight(legs, num_passengers=footprints[footprint]['num_passengers'])
            elif footprints[footprint]['type'] == 'Shipping':
                count += backend.shipping(footprints[footprint]['weight'], footprints[footprint]['distance'],
                                        footprints[footprint]['transport_method'].lower(),
                                        # footprints[footprint]['weight_units'], footprints[footprint]['distance_units']
                                        )
            elif footprints[footprint]['type'] == 'Driving':
                count += backend.vehicle(footprints[footprint]['distance'], footprints[footprint]['make'],
                                       footprints[footprint]['model'], int(footprints[footprint]['year']),
                                       # footprints[footprint]['distance_units']
                                       )
            elif footprints[footprint]['type'] == 'Fuel Combustion':
                #fuel_source_value, fuel_source_type='pg', fuel_source_unit
                count += backend.fuel(int(footprints[footprint]['amount']),
                                      # footprints[footprint]['type'], footprints[footprint]['units']
                                      )

        # update('footprints', {'total_footprint': footprints.get('total_footprint', 0) + count}, db.reference(f'/users/{user}/'))
        add({'total_footprint': count}, db.reference(f'/users/{user}/footprints/'))
    remove('uncalculated_emissions', head)


# for x,y in get(new_listings, sort_by='price').items():
#     print(x, ':\t', y.get('price', float('-inf')), sep='')

# key is unique identifier for the order
# values: desired tech (or 'any'), tons, price (if limit order), order type, monthly (False if one-time), identifier of the company
dummy_buys = {
    3820: {'order': 'buy', 'tech': 'any', 'tons': 100, 'type': 'limit', 'price': 50, 'monthly': True, 'company_id': '12435094'},
    1390: {'order': 'buy', 'tech': 'any', 'tons': 250, 'type': 'market', 'monthly': False, 'company_id': '1235094'},
    5838: {'order': 'buy', 'tech': 'any', 'tons': 10, 'type': 'limit', 'price': 45, 'monthly': False, 'company_id': '1243504'},
    1329: {'order': 'buy', 'tech': 'Direct Removal', 'tons': 493, 'type': 'limit', 'price': 54, 'monthly': True, 'company_id': '3950'},
    1289: {'order': 'buy', 'tech': 'Direct Removal', 'tons': 1000, 'type': 'market', 'monthly': False, 'company_id': '1435094'},
    6930: {'order': 'buy', 'tech': 'Direct Removal', 'tons': 500, 'type': 'market', 'monthly': True, 'company_id': '193200'},
    1345: {'order': 'buy', 'tech': 'BEECS', 'tons': 4920, 'type': 'market', 'monthly': True, 'company_id': '390'},
    6596: {'order': 'buy', 'tech': 'BEECS', 'tons': 12, 'type': 'limit', 'price': 23, 'monthly': True, 'company_id': '543'},
    2834: {'order': 'buy', 'tech': 'BEECS', 'tons': 234, 'type': 'limit', 'price': 130, 'monthly': True, 'company_id': '23567'}
}

# key is unique identifier for the order
# values: tech used (default to tech from seller profile), tons, price (if limit order), order type, monthly (False if one-time), identifier of the company
dummy_sells = {
    5930: {'order': 'sell', 'tech': 'Direct Removal', 'tons': 300, 'type': 'limit', 'price': 49, 'monthly': True, 'company_id': '6442'},
    1849: {'order': 'sell', 'tech': 'Direct Removal', 'tons': 2500, 'type': 'market', 'monthly': False, 'company_id': '1340'},
    2820: {'order': 'sell', 'tech': 'Direct Removal', 'tons': 1000, 'type': 'limit', 'price': 58, 'monthly': False, 'company_id': '1305'},
    6931: {'order': 'sell', 'tech': 'Direct Removal', 'tons': 3894, 'type': 'limit', 'price': 52, 'monthly': True, 'company_id': '9083'},
    4920: {'order': 'sell', 'tech': 'Direct Removal', 'tons': 13, 'type': 'market', 'monthly': False, 'company_id': '123904'},
    4892: {'order': 'sell', 'tech': 'Direct Removal', 'tons': 453, 'type': 'market', 'monthly': True, 'company_id': '1654'},
    3850: {'order': 'sell', 'tech': 'BEECS', 'tons': 109, 'type': 'market', 'monthly': True, 'company_id': '1346'},
    4230: {'order': 'sell', 'tech': 'BEECS', 'tons': 58, 'type': 'limit', 'price': 25, 'monthly': True, 'company_id': '9396'},
    5931: {'order': 'sell', 'tech': 'BEECS', 'tons': 139, 'type': 'limit', 'price': 125, 'monthly': True, 'company_id': '38104'}
}




# engine()
calc_emissions()









#monthly>dr>buy>6930
# add({str(key): dummy_buys.get(key, None) or dummy_sells.get(key, None) for key in list(dummy_buys.keys())+list(dummy_sells.keys())}, new_listings)


# for x in [1849, 3850, 4230, 4892, 5838, 5930, 5931, 6930, 6931]:
#     remove(str(x))
# print([*get(db.reference('/companies/Buyer/{}/filled_orders/{}/'.format(19320, 6930)))])

# for buy_book, sell_book in all_books_paired:
#     buys,sells = list(get(buy_book, sort_by='price', descending=True).items()), list(get(sell_book, sort_by='price').items())

#     if buys is None or sells is None:
#         continue

#     print(buys)
#     print()
#     print(sells)
#     print('\n')



# for book in all_books:
#     add({'price': random.randint(0,50)}, book)

# print(get(books, sort_by='price'))
