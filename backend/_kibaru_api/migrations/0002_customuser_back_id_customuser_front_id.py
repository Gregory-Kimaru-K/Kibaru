# Generated by Django 5.1.6 on 2025-03-19 06:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('_kibaru_api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='back_id',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='customuser',
            name='front_id',
            field=models.TextField(blank=True, null=True),
        ),
    ]
