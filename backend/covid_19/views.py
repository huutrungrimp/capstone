from django.http.response import JsonResponse
from django.shortcuts import render
import pandas as pd
from .getData import get_GraphData, get_MapData, get_countryNames, get_vacinationGraph, getDate, get_stats
import geopandas
import json
import os
from django.conf import settings
from django.http import HttpResponse


def index(request):
    return render(request, 'covid_19/index.html') 


def daily_covid_by_country(request, country_name, health):    
    data = get_GraphData(health)
    countryNames = get_countryNames()
    country = data[country_name]
    country = pd.DataFrame({country_name: country})
    yestoday = country[country_name].shift(1)
    country = country.assign(yestoday=yestoday)
    diff = country[country_name] - country['yestoday']
    country['diff'] = diff
    country = country[country['diff'] >= 0]
    result=country.drop(columns=['yestoday']).to_json(orient='table')
    parsed = json.loads(result)    

    graphData = {
        'countries': countryNames,
        'data': parsed['data']
    }

    return JsonResponse(graphData, safe=False)



def viewMap(request, health):  

    dataset_gdf = get_MapData(health)    
    # filePath = os.path.join(settings.BASE_DIR, 'frontend', 'src', 'data')
    world = geopandas.read_file('https://datahub.io/core/geo-countries/r/countries.geojson')
    joints = geopandas.sjoin(world, dataset_gdf, how="inner", op='intersects')
    result = joints.to_json()
    parsed = json.loads(result)
    
    return JsonResponse(parsed, safe=False)



def vacinationGraph(request, countryName, vac):    
    data = get_vacinationGraph(vac)
    countries = get_countryNames()
    vacination = data.loc[data['location'] == str(countryName).capitalize()]
    result=vacination.to_json(orient='table')
    parsed = json.loads(result)

    graphData = {
        'countries': countries,
        'data': parsed['data']
    }

    return JsonResponse(graphData, safe=False)



def vacinationMap(request):  
    filePath = os.path.join(settings.BASE_DIR, 'data/')
    world = pd.read_json(filePath+'world.json')
    vac = pd.read_csv('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.csv')

    vac = vac[vac['date']==getDate()]
    vac = vac.merge(world, on='iso_code')
    vac_gdf = geopandas.GeoDataFrame(vac, geometry=geopandas.points_from_xy(vac.Long, vac.Lat))
    vac_gdf.crs = "EPSG:4326"
    countries_gdf = geopandas.read_file('https://datahub.io/core/geo-countries/r/countries.geojson')
    joint = geopandas.sjoin(countries_gdf, vac_gdf, how="inner", op='intersects') 

    result=joint.to_json()
    parsed = json.loads(result)
    
    return JsonResponse(parsed, safe=False)



def stats_view(request):

    return JsonResponse(get_stats(), safe=False)

