from pyexpat import model
from django.db import models
from user.models import CustomUser

class Comment(models.Model):
    comment_content = models.TextField(null=True, blank=True)
    comment_owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True)
    create_time = models.DateTimeField(null=True, blank=True)

class Post(models.Model):
    post_title = models.TextField(null=True, blank=True)
    post_content = models.TextField(null=True, blank=True)
    post_owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True)
    create_time = models.DateTimeField(null=True, blank=True)
    comments = models.ManyToManyField(Comment, blank=True)

class Forum(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    posts = models.ManyToManyField(Post, blank=True)

