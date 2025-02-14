from django.contrib import admin
from .models import CustomUser, JobListing, Rating, JobSteps, Skills

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(JobListing)
admin.site.register(JobSteps)
admin.site.register(Rating)
admin.site.register(Skills)