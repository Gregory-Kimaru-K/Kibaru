import random
import smtplib
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.cache import cache
from django.core.mail import send_mail


@api_view(["POST"])
def validate_email(request):
    email = request.data.get("email")

    if not email:
        return Response({"detail": "Email required"}, status=status.HTTP_400_BAD_REQUEST)
    
    stored_code = cache.get(email)

    if not stored_code:
        stored_code = str(random.randint(100000, 999999))

        cache.set(email, stored_code, timeout=300)

    subject = "Verification Code"
    message = f"I hope this message finds you well.\nYou verification code is {stored_code}"
    from_email = "gregorykariara1@gmail.com"

    try:
        send_mail(subject, message, from_email, [email])
    
    except smtplib.SMTPException:
        return Response({"detail": "error sending mail"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    return Response({"detail": "Verification code sent successfully"}, status=status.HTTP_200_OK)


@api_view(["POST"])
def validate_code(request):
    email = request.data.get("email")
    code = request.data.get('code')

    if not email or not code:
        return Response({'detail': "Please enter the code"}, status=status.HTTP_400_BAD_REQUEST)
    
    stored_code = cache.get(email)

    if stored_code and stored_code == code:
        cache.delete(email)
        return Response({"detail": "Successfully verified"}, status=status.HTTP_200_OK)
    
    else:
        return Response({"detail": "Invalid code"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def forgot_password(request):
    pass