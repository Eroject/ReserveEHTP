# user_data/models.py
from django.db import models

class UserData(models.Model):
    data = models.TextField()

    def __str__(self):
        return self.data[:50]  # Afficher un extrait des données
