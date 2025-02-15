from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

@api_view(["POST"])
def validate_phone_number(request):
    pass

@api_view(["POST"])
def validate_email(request):
    pass

@api_view(["POST"])
def forgot_password(request):
    pass