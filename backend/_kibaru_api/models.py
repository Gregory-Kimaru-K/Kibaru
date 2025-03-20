from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils import timezone
from django.core.exceptions import ValidationError

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
    
class Industry(models.Model):
    name=models.TextField()

class Skills(models.Model):
    name=models.CharField(max_length=50)
    industry = models.ForeignKey(Industry, on_delete=models.CASCADE)

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
    is_active = models.BooleanField(default=True)
    role = models.TextField(choices=ROLE_CHOICES)
    latitude = models.DecimalField(max_digits=15, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=15, decimal_places=6, null=True, blank=True)
    skills = models.ManyToManyField(Skills, blank=True)
    image = models.TextField(null=True, blank=True)
    back_id = models.TextField(null=True, blank=True)
    front_id = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = CustomUserManager()
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["phone_number"]

    def has_module_perms(self, app_label):
        return self.is_staff
    
    def has_perm(self, perm, obj=None):
        return self.is_superuser

class JobListing(models.Model):
    JOB_STATUS =[
        ("PENDING", "Pending"),
        ("CONFIRMED", "Confirmed"),
        ("DONE", "Done")
    ]

    name = models.CharField(max_length=200)
    description = models.TextField()
    budget = models.DecimalField(max_digits=16, decimal_places=2, blank=True, null=True)
    latitude = models.DecimalField(max_digits=15, decimal_places=9)
    longitude = models.DecimalField(max_digits=15, decimal_places=9)
    due_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(CustomUser, related_name="job_by", on_delete=models.CASCADE)
    status = models.TextField(choices=JOB_STATUS, default='PENDING')
    skills = models.ManyToManyField(Skills)
    freelancer = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True)
    
    def accept_proposal(self, proposal):
        self.freelancer = proposal.freelancer
        self.status = "CONFIRMED"

        self.save()

class JobProposal(models.Model):
    PROPOSAL_STATUS = [
        ("PENDING", "Pending"),
        ("REJECTED", "Rejected"),
        ("ACCEPTED", "Accepted")
    ]

    freelancer = models.ForeignKey(CustomUser, related_name="propasals", on_delete=models.CASCADE)
    job = models.ForeignKey(JobListing, related_name="proposals", on_delete=models.CASCADE)
    description = models.TextField(null=True, blank=True)
    proposed_budget = models.DecimalField(max_digits=16, decimal_places=2, blank=True, null=True)
    status = models.TextField(choices=PROPOSAL_STATUS, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.job.status == "CONFIRMED":
            raise ValidationError("Job Closed")
        
        super().save(*args, **kwargs)

    def accept(self):
        self.status = "ACCEPTED"
        self.job.accept_proposal(self)
        self.save()

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