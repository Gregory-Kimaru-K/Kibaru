from rest_framework import serializers
from .models import Skills, JobListing, Rating, CustomUser

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skills
        fields = "__all__"

class JobListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobListing
        fields = "__all__"

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = "__all__"

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__"