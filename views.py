# user_data/views.py
import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import UserData
import json

# Désactiver CSRF pour faciliter les tests via cURL ou Postman
@csrf_exempt
def receive_data(request):
    if request.method == 'POST':
        try:
            # Vérifier le format de la requête (application/json)
            if request.content_type != 'application/json':
                return JsonResponse({'error': 'Content-Type must be application/json'}, status=400)
            
            # Charger les données JSON envoyées dans la requête
            data = json.loads(request.body).get('data')  # Obtenir la valeur de 'data'
            if not data:
                return JsonResponse({'error': 'No data provided'}, status=400)

            # Sauvegarder les données dans un fichier texte
            file_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'received_data.txt')
            with open(file_path, 'a') as f:
                f.write(data + '\n')
            
            # Sauvegarder aussi dans la base de données
            user_data = UserData.objects.create(data=data)
            user_data.save()

            return JsonResponse({'message': 'Data saved successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)
