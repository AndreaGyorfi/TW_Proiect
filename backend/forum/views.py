from dataclasses import dataclass
from turtle import st
from urllib import response
from django.shortcuts import render
import os
from rest_framework import status

from user.serializers import UserSerializer,CustomGetUser
from user.models import CustomUser
from .serializers import *
from .models import *
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from django.core.files import File
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import Http404
from django.http import QueryDict
from django.core.exceptions import ValidationError
import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
import datetime



@api_view(['POST'])
def add_comment(request,*args,**kwargs):

    if request.method == 'POST':
        post_id = kwargs.get('pk')
        comment_content = request.data.pop('comment_content')
        user_name = request.data.pop('user')

        user = CustomUser.objects.get(username=user_name)
        print(user)

        new_comment = Comment.objects.create()
        new_comment.comment_content = comment_content
        new_comment.comment_owner = user
        new_comment.create_time = datetime.datetime.now()
        new_comment.save()

        print("NEW COMMENt", new_comment)

        post_obj = Post.objects.get(pk=post_id)
        post_obj.comments.add(new_comment)
        print("post_obj", post_obj)

        try:
            post_obj.save()
            response_data = {
                'message': 'success',
            }

            return JsonResponse(response_data, status=status.HTTP_201_CREATED)
        except:
            response_data = {
                'message':'failed',
            }
            return JsonResponse(response_data, status=status.HTTP_400_BAD_REQUEST)


        


@api_view(['GET'])
def get_allPost(request,*args,**kwargs):

    if request.method == 'GET':
        all_posts = Post.objects.all()
        all_posts_ser = PostSerializer(all_posts, many=True)
    
    return Response(all_posts_ser.data)

@api_view(['DELETE'])
def deletePost(request,*args,**kwargs):

    if request.method == 'DELETE':
        pk = kwargs.get('pk')
        print(pk)
        post_obj = Post.objects.get(pk=pk)
        
        try:
            post_obj.delete()
            response_data = {
                'message': 'success',
            }

            return JsonResponse(response_data, status=status.HTTP_201_CREATED)
        except:
            response_data = {
                'message':'failed',
            }
            return JsonResponse(response_data, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteComment(request,*args,**kwargs):

    if request.method == 'DELETE':
        pk = kwargs.get('pk')
        print(pk)
        comment_obj = Comment.objects.get(pk=pk)
        
        try:
            comment_obj.delete()
            response_data = {
                'message': 'success',
            }

            return JsonResponse(response_data, status=status.HTTP_201_CREATED)
        except:
            response_data = {
                'message':'failed',
            }
            return JsonResponse(response_data, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def add_post(request,*args,**kwargs):

    if request.method == 'POST':

        post_title = request.data.pop('post_title')
        post_content = request.data.pop('post_content')
        user_name = request.data.pop('user')

        user = CustomUser.objects.get(username=user_name)
        print(user)

        new_post = Post.objects.create()
        new_post.post_title = post_title
        new_post.post_content = post_content
        new_post.create_time = datetime.datetime.now()
        new_post.post_owner = user

        try:
            new_post.save()
            response_data = {
                'message': 'success',
            }

            return JsonResponse(response_data, status=status.HTTP_201_CREATED)
        except:
            response_data = {
                'message':'failed',
            }
            return JsonResponse(response_data, status=status.HTTP_400_BAD_REQUEST)