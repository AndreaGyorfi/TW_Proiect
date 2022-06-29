from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [

    path('add_post/',views.add_post),
    path('get_allPosts/', views.get_allPost),
    path('add_comment/<int:pk>' , views.add_comment),
]