import boto3
from flask import current_app

def save_media(file):
    # Save to AWS S3
    s3 = boto3.client(
        's3',
        aws_access_key_id=current_app.config['AWS_ACCESS_KEY'],
        aws_secret_access_key=current_app.config['AWS_SECRET_KEY']
    )
    s3.upload_fileobj(file, current_app.config['S3_BUCKET'], file.filename)
    return f"https://{current_app.config['S3_BUCKET']}.s3.amazonaws.com/{file.filename}"
