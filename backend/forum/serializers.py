from .models import *
from rest_framework import serializers
from user.serializers import UserSerializer


class CommentSerializer(serializers.ModelSerializer):
    comment_owner = UserSerializer(required=False, allow_null=True)
    class Meta:
        model = Comment
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(required=False,allow_null=True,many=True)
    post_owner = UserSerializer(required=False, allow_null=True)
    class Meta:
        model = Post
        fields = '__all__'

class ForumSerializer(serializers.ModelSerializer):
    posts = PostSerializer(required=False,allow_null=True)
    class Meta:
        model = Forum
        fields = '__all__'