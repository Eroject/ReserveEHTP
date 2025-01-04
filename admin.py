from django.contrib import admin
from .models import UserData

# Créer une classe d'administration personnalisée
class UserDataAdmin(admin.ModelAdmin):
    # Liste des champs à afficher dans la vue "list" de l'admin
    list_display = ('data_excerpt',)  # Afficher un extrait de la donnée dans la liste

    # Personnalisation de l'affichage du champ 'data' dans la liste
    def data_excerpt(self, obj):
        """Afficher un extrait des données dans la liste"""
        return obj.data[:50]  # Extrait les 50 premiers caractères
    data_excerpt.short_description = 'Données (extrait)'  # Nom de la colonne dans l'admin

    # Champ de recherche
    search_fields = ('data',)  # Permet de rechercher dans le champ 'data'

    # Ajouter un filtre (dans ce cas, aucun filtre n'est nécessaire car il n'y a qu'un champ textuel)
    # list_filter = ()

# Enregistrer le modèle UserData avec l'administration personnalisée
#admin.site.register(UserData, UserDataAdmin)
