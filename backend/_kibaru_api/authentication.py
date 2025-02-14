from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.db.models import Q

class CustomBackend(ModelBackend):
    def authenticate(self, request, email=None, password = None, **kwargs):
        UserModel = get_user_model()

        if not email:
            return None

        try:
            user = UserModel.objects.filter(Q(phone_number=email) | Q(email=email)).first()

        except UserModel.DoesNotExist:
            return None

        if user.check_password(password) and self.user_can_authenticate(user):
            return user

        return None