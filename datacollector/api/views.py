from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import boto3
from botocore.exceptions import NoCredentialsError
import os

@api_view(['POST'])
def data_collect(request, source):
    data = request.data
    if source == 's3':
        aws_access_key = data.get('awsAccessKey')
        aws_secret_key = data.get('awsSecretKey')
        bucket_name = data.get('bucketName')
        object_key = data.get('objectKey')
        s3 = boto3.client('s3', aws_access_key_id=aws_access_key, aws_secret_access_key=aws_secret_key)
        try:
            s3.download_file(bucket_name, object_key, f'/tmp/{object_key}')
            return Response({'message': 'Data collected successfully'}, status=status.HTTP_200_OK)
        except NoCredentialsError:
            return Response({'error': 'Invalid AWS credentials'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'error': 'Unsupported source'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def data_visualization(request):
    try:
        with open('/path/to/visualization.png', 'rb') as img:
            return HttpResponse(img.read(), content_type='image/png')
    except FileNotFoundError:
        return Response({'error': 'Visualization not found'}, status=status.HTTP_404_NOT_FOUND)
