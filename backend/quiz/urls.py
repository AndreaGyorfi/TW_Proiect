from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [

    path('add_question/',views.add_question),
    path('get_questions/',views.get_allQuestion),
    path('question/<int:pk>', views.manageQuestion),
    path('createQuiz/', views.create_quiz),
    path('getallquiz/', views.get_allQuiz),
    path('quiz/<int:pk>', views.manageQuiz),
    path('result/', views.create_quiz_result),
    path('getAllResult/', views.get_allResult),
    path('getQuizResult/<int:pk>', views.getQuizResult),
   
]