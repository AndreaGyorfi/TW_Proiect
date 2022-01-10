from typing import Callable
from django.db import models
from django.db.models.deletion import CASCADE

class Quiz(models.Model):
    results = models.CharField(max_length=200, null=True, blank=True)

class Answers(models.Model):
    a_res = models.CharField(max_length=200, null=True, blank=True)
    b_res = models.CharField(max_length=200, null=True, blank=True)
    c_res = models.CharField(max_length=200, null=True, blank=True)
    d_res = models.CharField(max_length=200, null=True, blank=True)
    correct_answer = models.CharField(max_length=200, null=True, blank=True)

class Questions(models.Model):
    question_text = models.CharField(max_length=200,null=True, blank=True)
    quiz_owner = models.ForeignKey(Quiz, on_delete=CASCADE)
    answer_owner = models.OneToOneField(Answers,on_delete=models.CASCADE,primary_key=True)







   
    

