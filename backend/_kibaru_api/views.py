from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken
from geopy.distance import geodesic
from .models import CustomUser, Skills, Rating, JobListing, JobSteps
from .serializers import CustomUserSerializer, SkillSerializer, JobListingSerializer, RatingSerializer

# Create your views here.
##########
###############
####################
##### USER VIEWS
####################
###############
##########

@api_view(["POST"])
def create_user(request):
    role = request.data.get("role")
    if role == "SUPERUSER":
        return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
    serializer = CustomUserSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({"access": str(refresh.access_token),"refresh": str(refresh)}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserView(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request, pk):
        user = get_object_or_404(CustomUser, id=pk)
        serializer = CustomUserSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


##########
###############
####################
##### SKILLS VIEWS
####################
###############
##########

@api_view(["POST"])
@permission_classes([IsAdminUser])
def skills_create(request):
    serializer = SkillSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def get_skills(request):
    skills = Skills.objects.all()
    serializer = SkillSerializer(skills, many=True)
    return Response({"message": serializer.data}, status=status.HTTP_200_OK)

##########
###############
####################
##### JOBLISTING VIEWS
####################
###############
##########

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_jobs(request):
    if request.user.role not in ["EMPLOYER", "SUPERUSER"]:
        return Response({"error", "Unauthorized user"}, status=status.HTTP_401_UNAUTHORIZED)

    data = request.data
    data["created_by"] = request.user.id

    serializer = JobListingSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_jobs(request):
    user = request.user
    if user.role not in ["FREELANCER", "SUPERUSER"]:
        return Response({"error": "Unauthorized user"}, status=status.HTTP_401_UNAUTHORIZED)

    user_skills = user.skills.all()

    jobs = JobListing.objects.filter(skills__in = user_skills).distinct()
    has_location = user.latitude is not None and user.longitude is not None

    if has_location:
        jobs = sorted(
            jobs,
            key=lambda job: geodesic((user.latitude, user.longitude), (job.latitude, job.longitude)).km
        )

    jobs = sorted(jobs, key=lambda job: job.due_date)
    serializer = JobListingSerializer(jobs, many=True)
    return Response({"jobs": serializer.data}, status=status.HTTP_200_OK)

class JobView(APIView):
    def get(request, pk):
        pass




##########
###############
####################
##### RATING VIEWS
####################
###############
##########


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_rating(request):    
    job_id = request.data.get("job_id")
    stars = request.data.get('stars')
    review = request.data.get("review")

    job = get_object_or_404(JobListing, id=job_id)

    job_giver = job.created_by

    if request.user.role == "FREELANCER" or request.user != job_giver :
        return Response({"error": "Unauthorized user"}, status=status.HTTP_401_UNAUTHORIZED)
    
    data = {"stars": stars, "review": review, "to": job.freelancer, "by": job}

    serializer = RatingSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_ratings(request):
    if request.user.role == "FREELANCER":
        ratings = Rating.objects.filter(to=request.user)
        serializer = RatingSerializer(data=ratings, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    if request.user.role in ["EMPLOYER", "SUPERUSER"]:
        ratings = Rating.objects.filter(by__created_by=request.user)
        serializer = RatingSerializer(data=ratings, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

class RatingView(APIView):
    permission_classes = IsAuthenticated
    def get(request, pk):

        rate = get_object_or_404(Rating, id=pk)
        serializer = RatingSerializer(data=rate)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(request, pk):
        rate = get_object_or_404(Rating, id=pk)

        job = get_object_or_404(JobListing, id=rate.by)

        if request.user != job.created_by:
            return Response({"error": "Unauthorized user"}, status=status.HTTP_401_UNAUTHORIZED)
        
        serializer = RatingSerializer(rate, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(request, pk):
        rate = get_object_or_404(Rating, id=pk)
        job = get_object_or_404(JobListing, id=rate.by)

        created_by = job.created_by

        if request.user != created_by or request.user != rate.to or request.user.role != "SUPERUSER":
            return Response({"error": "Unauthorized user"},  status=status.HTTP_401_UNAUTHORIZED)

        rate.delete()
        return Response({"message": "Deleted successfully"}, status=status.HTTP_200_OK)