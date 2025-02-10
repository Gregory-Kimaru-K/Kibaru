from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils import timezone

# Create your models here.
class CustomUserManager(BaseUserManager):
    def create_user(self, phone_number, email, password=None, **extra_fields):
        if not phone_number:
            raise ValueError("Phone number is required")
        if not email:
            raise ValueError("Email is required")
        if not password:
            raise ValueError("Password is required")
        if "role" not in extra_fields or not extra_fields["role"]:
            raise ValueError("Role is required")
        
        user = self.model(phone_number=phone_number, email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user
    def create_superuser(self, phone_number, email, password=None, **extra_fields):
        extra_fields.setdefault("role", "SUPERUSER")
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_staff", True)

        return self.create_user(phone_number, email, password, **extra_fields)

class Skills(models.Model):
    name=models.CharField(max_length=50)

class CustomUser(AbstractBaseUser):
    ROLE_CHOICES = [
        ("EMPLOYER", "Employer"),
        ("FREELANCER", "Freelancer"),
        ("SUPERUSER", "Superuser")
    ]

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=15, unique=True)
    email = models.CharField(max_length=30, unique=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    role = models.TextField(choices=ROLE_CHOICES)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    skills = models.ManyToManyField(Skills)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = CustomUserManager()
    USERNAME_FIELD = "phone_number"
    REQUIRED_FIELDS = ["email"]
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        if self.skills.count() > 5:
            raise ValueError("Skills cannot exceed 5")

class JobListing(models.Model):
    JOB_STATUS =[
        ("PENDING", "Pending"),
        ("CONFIRMED", "Confirmed"),
        ("DONE", "Done")
    ]

    name = models.CharField(max_length=200)
    description = models.TextField()
    budget = models.DecimalField(max_digits=16, decimal_places=2, blank=True, null=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    due_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(CustomUser, related_name="job_by", on_delete=models.CASCADE)
    status = models.TextField()
    freelancer = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True)

class JobSteps(models.Model):
    job = models.ForeignKey(JobListing, related_name="job", on_delete=models.CASCADE)
    description = models.TextField()
    order = models.PositiveIntegerField()
    budget = models.DecimalField(max_digits=20, decimal_places=2)
    
    class Meta:
        ordering = ["order"]

class Rating(models.Model):
    RATING_VALUES = [
        (1,1),
        (2,2),
        (3,3),
        (4,4),
        (5,5),
    ]
    stars = models.IntegerField(choices=RATING_VALUES)
    review = models.TextField()
    to = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    by = models.ForeignKey(JobListing, on_delete=models.SET_NULL, null=True, blank=True)