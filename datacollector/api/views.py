from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import boto3
from azure.storage.blob import BlobServiceClient
from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive
import pandas as pd
import PyPDF2
import json

@csrf_exempt
def collect_data(request, source):
    if request.method == 'POST':
        params = json.loads(request.body)
        if source == 's3':
            return collect_from_s3(params)
        elif source == 'azure':
            return collect_from_azure(params)
        elif source == 'gdrive':
            return collect_from_gdrive(params)
        elif source == 'csv':
            return collect_from_csv(params)
        elif source == 'pdf':
            return collect_from_pdf(params)
    return JsonResponse({'status': 'Invalid request'}, status=400)

def collect_from_s3(params):
    s3 = boto3.client('s3', aws_access_key_id=params['awsAccessKey'], aws_secret_access_key=params['awsSecretKey'])
    s3.download_file(params['bucketName'], params['objectKey'], '/tmp/data.csv')
    data = pd.read_csv('/tmp/data.csv')
    return JsonResponse({'status': 'success', 'data': data.to_dict()})

def collect_from_azure(params):
    blob_service_client = BlobServiceClient.from_connection_string(params['connectionString'])
    blob_client = blob_service_client.get_blob_client(container=params['containerName'], blob=params['blobName'])
    with open('/tmp/data.csv', "wb") as download_file:
        download_file.write(blob_client.download_blob().readall())
    data = pd.read_csv('/tmp/data.csv')
    return JsonResponse({'status': 'success', 'data': data.to_dict()})

def collect_from_gdrive(params):
    gauth = GoogleAuth()
    gauth.LocalWebserverAuth()
    drive = GoogleDrive(gauth)
    file = drive.CreateFile({'id': params['fileId']})
    file.GetContentFile('/tmp/data.csv')
    data = pd.read_csv('/tmp/data.csv')
    return JsonResponse({'status': 'success', 'data': data.to_dict()})

def collect_from_csv(params):
    data = pd.read_csv(params['filePath'])
    return JsonResponse({'status': 'success', 'data': data.to_dict()})

def collect_from_pdf(params):
    with open(params['filePath'], 'rb') as file:
        reader = PyPDF2.PdfFileReader(file)
        text = ""
        for page in range(reader.numPages):
            text += reader.getPage(page).extract_text()
    return JsonResponse({'status': 'success', 'data': text})
