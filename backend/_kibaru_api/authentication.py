from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.db.models import Q

class CustomUserBackend(ModelBackend):
    def authenticate(self, request, phone_number = None, email = None, password = None, **kwargs):
        UserModel = get_user_model()

        try:
            user = UserModel.objects.filter(Q(phone_number=phone_number) | Q(email=email))

        except UserModel.DoesNotExist:
            return

        if user.check_password(password) and self.user_can_authenticate(user):
            return user

        return