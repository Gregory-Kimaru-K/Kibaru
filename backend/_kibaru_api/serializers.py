from rest_framework import serializers
from .models import Skills, JobListing, Rating, CustomUser, JobProposal

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skills
        fields = "__all__"

class JobListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobListing
        fields = "__all__"

class JobProposalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobProposal
        fields = "__all__"

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = "__all__"

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "password", "first_name", "last_name", "phone_number", "email", "role", "latitude", "longitude", "skills"]
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
        user.save()

        return user