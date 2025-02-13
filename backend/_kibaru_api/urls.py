from django.urls import path
from .jwt_view import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path("tokens/", MyTokenObtainPairView.as_view(), name="token"),
    path("tokens/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("user/new/", views.create_user, name="create_user"),
    path("user/<int:pk>/", views.UserView.as_view(), name="update"),
    path("skills/create_new/", views.skills_create, name="create_skills"),
    path("skills/", views.get_skills, name="skills"),
    path("job/new/", views.create_jobs, name="create_job"),
    path("jobs/", views.get_jobs, name="get_prefered_jobs"),
    path("jobs/<int:pk>", views.JobView.as_view(), name="jobs_view"),
    path("rate/new/", views.create_rating, name="create_rating"),
    path("rate/", views.get_ratings, name="get_ratings"),
    path("rate/<int:pk>", views.RatingView.as_view(), name="rating_view"),
]