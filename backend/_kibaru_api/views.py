from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser, Skills, Rating, JobListing, JobSteps
from .serializers import CustomUserSerializer

# Create your views here.

##########
###############
####################
##### USER SERIALIZERS
####################
###############
##########

@api_view(["POST"])
def create_user(request):
    serializer = CustomUserSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({"access": str(refresh.access_token),"refresh": str(refresh)}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserView(APIView):
    permission_classes = IsAuthenticated
    def get(self, request, pk):
        user = get_object_or_404(CustomUser, id=pk)

        