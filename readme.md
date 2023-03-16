<div align="center">

![GitHub repo size](https://img.shields.io/github/repo-size/1pizzaifupn/cloud-storage-webservice?color=green&label=Repo%20Size&style=flat-square) ![GitHub last commit](https://img.shields.io/github/last-commit/1pizzaifupn/cloud-storage-webservice?color=green&label=Last%20Commit&style=flat-square) ![GitHub issues](https://img.shields.io/github/issues/1pizzaifupn/cloud-storage-webservice?color=green&label=Issues&style=flat-square) ![GitHub pull requests](https://img.shields.io/github/issues-pr/1pizzaifupn/cloud-storage-webservice?color=green&label=Pull%20Requests&style=flat-square)

</div>

# Documentation

## Introduction

this is a simple app that can be used to simulate how to use the storage service in GCP via Storage libraries by GCP. This app is built using NodeJS and ExpressJS. You can deploy this app to GCP App Engine and use it to test the storage service. The most important file is the StorageService.js. This file contains the code that can be used to interact with the storage service.

## How to use

Before you use this app to simulate the storage service, you need to create a service account key and a bucket in GCP. You can follow the steps below to create the service account key and the bucket.

How to create a service account key? follow the steps below:

- Go to the GCP console
- Go to the IAM & Admin > Service Accounts page
- Click on the create service account button
- Fill the service account name
- Fill the description
- Give the role to the service account (Storage Admin - with desc: _Full control of GCS resources_) from the grant this service account access to the project
- CLick continue button
- Click done button
- Click on the service account that you want to use
- Click on the keys tab
- Click on the add key button
- Choose the JSON key type
- Click on the create button
- Save the key file (download it)

Now i assume that you already have the service account key file. You can follow the steps below to use use this app to simulate the storage service.

1. Clone this repo
2. Install the dependencies by running `npm install`
3. Upload your service account key file to the root directory of this app (the key file is the file that you have downloaded in the previous step)
4. Create a `.env` file and add the following variables
   - `PORT` = port number for the app (8080 by default)
   - `GOOGLE_APPLICATION_CREDENTIALS` = path to your service account key (file is .json)
   - `BUCKET_NAME` = name of your bucket
   - `PROJECT_ID` = your project id
5. Run the app by running `npm start` to test the app is running.
6. _You can skip this step if you try to run the prev step in cloud shell_. You can use postman to test the app by using the postman collection at testing section below. You can also use the app by using the url `http://localhost:8080/` (8080 is the default port number)
7. Deploy the app to GCP App Engine by running `gcloud app deploy` from cloud shell in the console or from your local machine if you have installed the gcloud sdk
8. Test the app by using the url `https://<your-app-id>.appspot.com/` (you can find the app id in the GCP console)

## What features are available?

1. Upload file

   Notes: You only can upload one file at a time. The file will be uploaded to the bucket that you have set in the .env file. The file will be uploaded to the root directory of the bucket. The file will be uploaded with the name that you have set in the form and prefixed by unix epoch time.

   the file uploaded must be in form data with the key `file` and the value is the file that you want to upload.

   this feature is using POST method and the url is `/`

2. Download file

   Notes: You only can download one file at a time. The file will be downloaded from the bucket that you have set in the .env file.

   this feature is using GET method and the url is `/download/{filename}`

3. Delete file

   Notes: You only can delete one file at a time. The file will be deleted from the bucket that you have set in the .env file.

   this feature is using DELETE method and the url is `/delete/{filename}`

4. List files

   Notes: You can list all the files in the bucket that you have set in the .env file.

   this feature is using GET method and the url is `/`

## Testing

You can run the postman by push the button below

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/23894784-84700de9-e246-47f3-850f-9ce298b19af0?action=collection%2Ffork&collection-url=entityId%3D23894784-84700de9-e246-47f3-850f-9ce298b19af0%26entityType%3Dcollection%26workspaceId%3Dc9e73ac2-130e-490c-97bb-4a9f1ab5966b)

change the url from http://localhost:3000/ to your own url after you successfully deploy the app.
