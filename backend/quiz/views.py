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


@api_view(['POST'])
def add_question(request,*args,**kwargs):

    if request.method == 'POST':
        print(request.data)

        question_text = request.data.pop('question_text')
        print("question text", question_text)

        new_answer = AnswersSerializer(data=request.data)

        if new_answer.is_valid():
            new_answer.save()
        
        answer_obj = Answers.objects.get(pk=new_answer.data['id'])
        #answer_obj_ser = AnswersSerializer(answer_obj)
        #print(answer_obj)



        question = {
            "question_text":question_text,
            "answer_owner":None,
        }
        question_new = QuestionsSerializer(data=question)

        if question_new.is_valid():
            print("YES")
        else:
            print(question_new.errors)

        if question_new.is_valid():
            question_new.save()
        
        question_obj = Questions.objects.get(pk=question_new.data['id'])
        print(question_obj)

        question_obj.answer_owner = answer_obj
        question_obj.save()

        try:
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
def get_allQuestion(request,*args,**kwargs):

    if request.method == 'GET':
        all_questions = Questions.objects.all()
        all_questions_ser = QuestionsSerializer(all_questions, many=True)
    
    return Response(all_questions_ser.data)

@api_view(['GET','PUT','DELETE'])
def manageQuestion(request,*args,**kwargs):

    try:
        pk = kwargs.get('pk')
        question = Questions.objects.get(pk=pk)
        question_ser = QuestionsSerializer(question)
    except Questions.DoesNotExist:
        response = {
            'data' : 'Question does not exist',
        }

    if request.method == 'GET':
        question_ser = QuestionsSerializer(question)
        response = {
            'data': question_ser.data,
        }

        return Response(response)

    if request.method == 'PUT':

        print(request.data)

        new_answer_data = request.data.pop('answer_owner')

        old_answer = Answers.objects.get(pk=new_answer_data['id'])
        print("OLD ANSWER")
        new_answer_ser = AnswersSerializer(old_answer, data=new_answer_data)

        if new_answer_ser.is_valid():
            new_answer_ser.save()

        new_answer_obj = Answers.objects.get(pk=new_answer_ser.data['id'])

        question.answer_owner = new_answer_obj
        question.question_text = request.data['question_text']
        question.save()

        

        try:
            response_data = {
                'message': 'success',
            }

            return JsonResponse(response_data, status=status.HTTP_201_CREATED)
        except:
            response_data = {
                'message':'failed',
            }
            return JsonResponse(response_data, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':

        try:
            question.delete()
            response_data = {
                'message':'success',
            }
            return JsonResponse(response_data, status=status.HTTP_201_CREATED)
        except:
            response_data = {
                'message':'failed',
            }
            return JsonResponse(response_data, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def create_quiz(request,*args,**kwargs):

    if request.method == 'POST':

        print(request.method)
        questions = request.data.pop('data')
        quiz_name = request.data.pop('name')
        new_quiz = Quiz.objects.create()
        new_quiz_obj = Quiz.objects.get(pk=new_quiz.id)
        new_quiz_obj.name = quiz_name

        for question in questions:
            print(question['id'])
            question_obj = Questions.objects.get(pk=question['id'])
            new_quiz_obj.questions.add(question_obj)

        
        try:
            new_quiz_obj.save()
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
def get_allQuiz(request,*args,**kwargs):

    if request.method == 'GET':
        all_quiz = Quiz.objects.all()
        all_quiz_ser = QuizSerializer(all_quiz, many=True)
    
    return Response(all_quiz_ser.data)

@api_view(['GET', 'PUT', 'DELETE'])
def manageQuiz(request,*args,**kwargs):
    try:
        pk = kwargs.get('pk')
        quiz = Quiz.objects.get(pk=pk)
        quiz_ser = QuizSerializer(quiz)
    except Quiz.DoesNotExist:
        response = {
            'data' : 'Quiz does not exist',
        }

    
    if request.method == 'GET':
        quiz_ser = QuizSerializer(quiz)

        return Response(quiz_ser.data)
    
    
    if request.method == 'PUT':

        print(request.data)
        quiz.questions.clear()

        questions = request.data.pop('data')

        for question in  questions:
            print(question['id'])
            question_obj = Questions.objects.get(pk=question['id'])
            quiz.questions.add(question_obj)

        quiz.name = request.data['name']

        

        try:
            quiz.save()
            response_data = {
                'message': 'success',
            }

            return JsonResponse(response_data, status=status.HTTP_201_CREATED)
        except:
            response_data = {
                'message':'failed',
            }
            return JsonResponse(response_data, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'DELETE':

        try:
            quiz.delete()
            response_data = {
                'message':'success',
            }
            return JsonResponse(response_data, status=status.HTTP_201_CREATED)
        except:
            response_data = {
                'message':'failed',
            }
            return JsonResponse(response_data, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_quiz_result(request,*args,**kwargs):

    if request.method == 'POST':
        print(request.data)

        result = request.data.pop('result')
        quiz_id = request.data.pop('quiz_id')
        user_name = request.data.pop('user')

        quiz_obj = Quiz.objects.get(pk=quiz_id)
        print(quiz_obj)
        quiz_ser = QuizSerializer(quiz_obj)
        user = CustomUser.objects.get(username=user_name)
        print(user)

        result_dict = {
            "result": result,
            "quiz":None,
            "user":None,
        }

        result_ser = QuizResultSerializer(data=result_dict)
        
        if result_ser.is_valid():
            print("YES")
            result_ser.save()
        else:
            print(result_ser.errors)

        result_obj = QuizResult.objects.get(pk=result_ser.data['id'])
        result_obj.quiz = quiz_obj
        result_obj.user=user

        try:
            result_obj.save()
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
def get_allResult(request,*args,**kwargs):

    if request.method == 'GET':
        all_result = QuizResult.objects.all()
        all_result_ser = QuizResultSerializer(all_result, many=True)
    
    return Response(all_result_ser.data)

@api_view(['GET'])
def getQuizResult(request,*args,**kwargs):
    
    if request.method == 'GET':
        pk = kwargs.get('pk')
        quiz_results = QuizResult.objects.filter(quiz__id=pk)
        print(quiz_results)
        quiz_results_ser = QuizResultSerializer(quiz_results, many=True)
        all_dict = []
        for item in quiz_results_ser.data:
            print(item['id'])
            print(item['result'])
            print(item['user']['username'])
            result_dict = {
                "id":item['id'],
                "result":item['result'],
                "username":item['user']['username'],
            }
            all_dict.append(result_dict)

        print(all_dict)
    return Response(all_dict)




