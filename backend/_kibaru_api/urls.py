from django.urls import path
from .jwt_view import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("tokens/", MyTokenObtainPairView.as_view(), name="token"),
    path("tokens/refresh/", TokenRefreshView.as_view(), name="token_refresh")
]