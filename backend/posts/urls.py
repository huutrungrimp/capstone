from django.urls import path
from . import views

app_name='posts'
urlpatterns = [
    path('<str:username>/newPost', views.createPost, name='newPost'),
    path('', views.postList, name='allposts'),
    path('<int:id>', views.postDetail, name='allposts'),    
    path('<int:id>/delete', views.deletePost, name='deletePost'), 
    path('<int:id>/update', views.updatePost, name='updatePost'), 
]