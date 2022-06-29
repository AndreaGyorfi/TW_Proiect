from typing import Callable
from django.db import models
from django.db.models.deletion import CASCADE
from user.models import CustomUser

class Answers(models.Model):
    a_res = models.CharField(max_length=200, null=True, blank=True)
    b_res = models.CharField(max_length=200, null=True, blank=True)
    c_res = models.CharField(max_length=200, null=True, blank=True)
    d_res = models.CharField(max_length=200, null=True, blank=True)
    correct_answer = models.CharField(max_length=200, null=True, blank=True)

class Questions(models.Model):
    question_text = models.CharField(max_length=200,null=True, blank=True)
    answer_owner = models.OneToOneField(Answers,on_delete=models.CASCADE,null=True, blank=True)

class Quiz(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    questions = models.ManyToManyField(Questions, blank=True)

class QuizResult(models.Model):
    result = models.CharField(max_length=200, null=True, blank=True)
    quiz = models.OneToOneField(Quiz, on_delete=models.CASCADE,null=True, blank=True)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, null=True, blank=True)







   
    

