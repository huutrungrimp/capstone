import pandas as pd
import geopandas
import json
from datetime import datetime, timedelta



def getDate():
    yesterday = datetime.now() - timedelta(1)
    yesterday = datetime.strftime(yesterday, '%Y-%m-%d')  
    return yesterday 



def get_GraphData(data):      
    confirm = pd.read_csv('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv')
    death = pd.read_csv('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv')
    recovery = pd.read_csv('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv')

    dataset = confirm if data == 'confirm' else death if data == 'death' else recovery
    dataset = dataset.drop(columns=['Long', 'Lat'])
    dataset = dataset.groupby(by=['Country/Region']).sum()
    dataset = dataset.T
    dataset.columns = map(str.lower, dataset.columns)
    return dataset


def get_countryNames():      
    confirm = pd.read_csv('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv')
    confirm = confirm.groupby(by=['Country/Region']).sum()
    result=confirm.to_json(orient='split')
    parsed = json.loads(result)
    
    return parsed['index']


def get_MapData(data):  
    confirm = pd.read_csv('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv')
    death = pd.read_csv('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv')
    recovery = pd.read_csv('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv')
    
    mydataset = confirm if data == 'confirm' else death if data == 'death' else recovery

    dataset1 = mydataset[['Province/State', 'Country/Region', 'Long', 'Lat']]
    dataset2 = mydataset.drop(columns = ['Province/State', 'Country/Region', 'Long', 'Lat'])
    dataset2.columns = pd.to_datetime(dataset2.columns).date
    dataset = pd.merge(dataset1, dataset2, left_index=True, right_index=True)
    dataset.columns = dataset.columns.astype(str)

    date = getDate()
    dataset = dataset.drop(columns=['Province/State']).rename(columns={'Country/Region': 'country'})  
    dataset = dataset[['country', 'Long', 'Lat', date]]
    dataset = dataset.rename(columns = {date: 'covid'+date})
  
    dataset_gdf = geopandas.GeoDataFrame(dataset, geometry=geopandas.points_from_xy(dataset.Long, dataset.Lat))
    dataset_gdf.crs is None
    dataset_gdf.crs = "EPSG:4326"

    return dataset_gdf


def get_vacinationGraph(data):
    vac =  pd.read_csv('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.csv')
    vac_by_age = pd.read_csv('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations-by-age-group.csv')
    vac_by_manu = pd.read_csv('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations-by-manufacturer.csv')

    if data == 'vacination':
        vac = vac.drop(columns=['daily_vaccinations_raw'])
        return vac

    elif data == 'vacination_by_age':
        return vac_by_age
    
    else:
        return vac_by_manu



def get_stats():
    vac = pd.read_csv('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.csv')   
    confirm = pd.read_csv('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv')
    death = pd.read_csv('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv')
    recovery = pd.read_csv('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv')

    # Get vacination statistics

    vac = vac[vac['date']==getDate()]
    vac1 = vac.loc[vac['location'].isin(['World', 'Asia', 'Africa', 'European Union'])]
    vac2 = vac.loc[vac['location'].isin(['High income', 'Low income', 'Lower middle income'])]
    

    vac1 = vac1.drop(columns=['daily_vaccinations_raw', 'total_vaccinations_per_hundred', 'people_vaccinated_per_hundred', 'people_fully_vaccinated_per_hundred', 'daily_vaccinations_per_million'])
    vac1[['total_vaccinations', 'people_vaccinated', 'people_fully_vaccinated', 'daily_vaccinations']] = vac1[['total_vaccinations', 'people_vaccinated', 'people_fully_vaccinated', 'daily_vaccinations']].div(1000000).astype(int)

    vac2 = vac2.drop(columns=['daily_vaccinations_raw', 'total_vaccinations_per_hundred', 'people_vaccinated_per_hundred', 'people_fully_vaccinated_per_hundred', 'daily_vaccinations_per_million'])
    vac2[['total_vaccinations', 'people_vaccinated', 'people_fully_vaccinated', 'daily_vaccinations']] = vac2[['total_vaccinations', 'people_vaccinated', 'people_fully_vaccinated', 'daily_vaccinations']].div(1000000).astype(int)

    result1=vac1.to_json(orient='table')
    vac1_json = json.loads(result1)

    result2=vac2.to_json(orient='table')
    vac2_json = json.loads(result2)

    vac_json = {
        'vac1': vac1_json['data'],
        'vac2': vac2_json['data']
        }

    # Get confirm, death and recovery statistics

    confirm.loc['confirm_Total']= confirm.sum(numeric_only=True, axis=0)
    confirm = confirm[confirm.index.values=='confirm_Total']

    death.loc['death_Total']= death.sum(numeric_only=True, axis=0)
    death = death[death.index.values=='death_Total']

    recovery.loc['recovery_Total']= recovery.sum(numeric_only=True, axis=0)
    recovery = recovery[recovery.index.values=='recovery_Total']

    CDR = pd.concat([confirm, death, recovery])
    CDR = CDR.drop(columns=['Province/State', 'Country/Region', 'Long', 'Lat'])
    CDR.columns = pd.to_datetime(CDR.columns).date
    CDR.columns = CDR.columns.astype(str)


    CDR = CDR.add_prefix('covid')
    CDR = CDR.iloc[:,-2:]
    CDR['change'] = CDR.iloc[:,1] - CDR.iloc[:,0]
    cols = CDR.columns.values

    CDR[cols] = CDR[cols].astype(int)
    CDR[cols] = CDR[cols].applymap('{:,}'.format)

    result=CDR.to_json(orient='table')
    CDR_json = json.loads(result)

    stats = {
        'vac': vac_json,
        'CDR': CDR_json['data']
    }

    return stats
    
    


