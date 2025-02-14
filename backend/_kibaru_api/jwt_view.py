from rest_framework_simplejwt.serializers import TokenObtainPairSerializer # type: ignore
from rest_framework_simplejwt.views import TokenObtainPairView # type: ignore
from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework import serializers

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['first_name'] = user.first_name
        token["last_name"] = user.last_name
        token["phone_number"] = user.phone_number
        token["email"] = user.email
        token["role"] = user.role
        token["latitude"] = user.latitude
        token["longitude"] = user.longitude
        token["skills"] = [skill.name for skill in user.skills.all()]


        return token
    

    def validate(self, attrs):
        UserModel = get_user_model()
        
        phone_or_email = attrs.get("email")
        password = attrs.get("password")

        # Fix: Ensure both credentials are provided
        if not phone_or_email or not password:
            raise serializers.ValidationError({"detail": "Email or Phone Number and Password are required"})

        # Fetch user based on phone number or email
        user = UserModel.objects.filter(
            Q(phone_number=phone_or_email) | Q(email=phone_or_email)
        ).first()

        if user and user.check_password(password):
            if not user.is_active:
                raise serializers.ValidationError({"detail": "User is not active"})
            
            # Fix: Store the correct identifier (email or phone)
            attrs["email"] = user.email

            return super().validate(attrs)

        raise serializers.ValidationError({"detail": "Invalid credentials"})


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer