from rest_framework_simplejwt.serializers import TokenObtainPairSerializer # type: ignore
from rest_framework_simplejwt.views import TokenObtainPairView # type: ignore
from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework import serializers # type: ignore

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
        token["skills"] = user.skills


        return token
    
    def validate(self, attr):
        UserModel = get_user_model()
        email_or_phone = attr.get("email") or attr.get('phone_number')
        password = attr.get("password")

        if not email_or_phone or not password:
            raise serializers.ValidationError("Phone number or Email required")
        
        user = UserModel.objects.filter(Q(phone_number = email_or_phone) | Q(email = email_or_phone)).first()

        if user and user.check_password(password):
            attr["email"] = user.email
            return super().validate(attr)
        
        raise serializers.ValidationError("Invalid credentials")
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer