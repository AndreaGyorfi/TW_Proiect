from dataclasses import fields
from urllib import request

from pkg_resources import require
from .models import *
from rest_framework import serializers
from user.serializers import UserSerializer

class AnswersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answers
        fields = '__all__'


class QuestionsSerializer(serializers.ModelSerializer):
    answer_owner = AnswersSerializer(required=False, allow_null=True)
    class Meta:
        model = Questions
        fields = '__all__'

class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionsSerializer(required=False,allow_null=True,many=True)
    class Meta:
        model = Quiz
        fields = '__all__'

class QuizResultSerializer(serializers.ModelSerializer):
    quiz = QuizSerializer(required=False, allow_null=True)
    user = UserSerializer(required=False, allow_null=True)
    class Meta:
        model = QuizResult
        fields = '__all__'