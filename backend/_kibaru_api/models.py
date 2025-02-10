from django.db import models
from django.contrib.gis.db import models as gis_model
from django.contrib.auth.models import AbstractBaseUser

# Create your models here.
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
    role = models.TextField(choices=ROLE_CHOICES)
    location = gis_model.PointField(null=True, blank=True)
    skills = models.ManyToManyField(Skills, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.skills.count() > 5:
            raise ValueError("Skills cannot exceed 5")
        
        super().save(*args, **kwargs)

class JobListing(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    budget = models.DecimalField(max_digits=16, decimal_places=2, blank=True, null=True)
    location = gis_model.PointField()
    due_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(CustomUser, related_name="job_by", on_delete=models.SET_NULL)



class Rating(models):
    stars = models.DecimalField(max_digits=5)
    review = models.TextField()
    to = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    by = models.ForeignKey(CustomUser, on_delete=models.SET_NULL)

