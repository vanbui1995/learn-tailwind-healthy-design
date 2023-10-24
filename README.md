# Introduction: Funny Video Application

Its just a small application that allow the user can see the shared youtube videos, with un-authen user they can access the video list, they can sign up and login as logged user. With logged user they can share any post from youtube by simple paste the youtube link. They also can get a small notification with any new video shared by other logged user.

The nicest thing on this application, We use 100% Backend features on firebase, so we don't need any backend service, but i still cover all features: authentication, realtime for youtube videos and the in-app notification.

Demo Link : https://funny-movies-vanbui.netlify.app/

<img width="1284" alt="Screenshot 2023-10-24 at 18 58 52" src="https://github.com/vanbui1995/learn-tailwind-healthy-design/assets/47735787/23db4d32-8306-4658-b9da-c90fb6adb02f">


# Prerequisites: 

- NodeJS: Version >= 18
- Yarn: >= 1.22 (optional you are OK to use npm)

# Installation & Configuration
- Make sure you are the root of the project
- Run `yarn install` with yarn or `npm install` with npm
- I build application with firebase (backend + database + authentication), you can use frontend application only that default connect with my firebase, if you really need to touch and use new firebase, please take a look on Backend/Database Setup

# Installation & Configuration

## Running the application
- Make sure you are the root of the project and install dependencies like section: "Installation & Configuration"
- Run `yarn dev` or `npm run dev` to start application in dev server locally
- The URL will be shown like the image below, just click on the link to access the application
<img width="743" alt="Screenshot 2023-10-24 at 18 50 23" src="https://github.com/vanbui1995/learn-tailwind-healthy-design/assets/47735787/20ce9459-807e-4362-b82a-a5e2b398d998">


## Run the test suite
- Make sure you are the root of the project and install dependencies like section: "Installation & Configuration"
- Run `yarn test` or `npm run test` to run the test suite
- The test result will be shown on the console like the image below
<img width="1209" alt="Screenshot 2023-10-24 at 18 49 35" src="https://github.com/vanbui1995/learn-tailwind-healthy-design/assets/47735787/200990b7-5106-4a19-9294-c4f35010e45b">

## Build & Deploy
### Build
- Make sure you are the root of the project and install dependencies like section: "Installation & Configuration"
- yarn build
- the build folder is "./build"
### Deploy
- Upload the dist folder file to whatever CDN service that you want to host: netlify, github page... eg: https://www.netlify.com/blog/2016/07/22/deploy-react-apps-in-less-than-30-seconds/

# Backend/Database Setup
- I recommend you can use directly my firebase config on the current frontend code, you don't need to create a new firebase project to test out the app, but if you really want to setup a new one, please follow these steps:

    - 1. Create new firebase project

	<img width="692" alt="Screenshot 2023-10-24 at 18 35 53" src="https://github.com/vanbui1995/learn-tailwind-healthy-design/assets/47735787/475f1539-51ef-43ae-9ec1-3772ae2b2a49">
    - 2. Add new web application on the new firebase project

	<img width="1056" alt="Screenshot 2023-10-24 at 18 38 28" src="https://github.com/vanbui1995/learn-tailwind-healthy-design/assets/47735787/6bf92092-4c4f-4029-b94a-2759ffd6010e">

    - 3. After create new application please copy the config object

	<img width="687" alt="Screenshot 2023-10-24 at 18 41 57" src="https://github.com/vanbui1995/learn-tailwind-healthy-design/assets/47735787/4429fc4b-f5bd-4376-b0f3-85ab4bb995f9">

    - 3. Add new authentication provider "Email & Password", just make sure turn on it

	<img width="1637" alt="Screenshot 2023-10-24 at 18 38 42" src="https://github.com/vanbui1995/learn-tailwind-healthy-design/assets/47735787/0ecaed9c-3e90-429a-8b0f-1ef256a65e40">
    - 4. Create video collection and first record

	<img width="1463" alt="Screenshot 2023-10-24 at 18 39 56" src="https://github.com/vanbui1995/learn-tailwind-healthy-design/assets/47735787/c2099f45-bb7c-46f8-841d-a1b73013effc">

    - 5. Replace firebase config object to the file `src/modules/common/firebase/firebase.ts`

	<img width="712" alt="Screenshot 2023-10-24 at 18 43 36" src="https://github.com/vanbui1995/learn-tailwind-healthy-design/assets/47735787/867a0af1-f407-461c-b183-b554e285b047">

    - 6. You are done, you can restart the server or rebuild again

# Usage
- User can access the shared videos via home page, they don't have share button to share until they register or login
- Register & login:
	- Just make sure fill correctly format for email & password
	- I have a validation on almost form, after register i will let the user login successfully
  	- I keep the user session by using the sessionStorage, so every tab will have different session for easier testing

	<img width="349" alt="Screenshot 2023-10-24 at 19 12 05" src="https://github.com/vanbui1995/learn-tailwind-healthy-design/assets/47735787/c02337aa-3fb6-4bfa-b3c4-8c5b021a5616">

	<img width="679" alt="Screenshot 2023-10-24 at 19 12 09" src="https://github.com/vanbui1995/learn-tailwind-healthy-design/assets/47735787/6fd14f05-d2f4-4d8a-9d8e-1d8bc080e7d2">

- User can click on share button when logged

	<img width="520" alt="Screenshot 2023-10-24 at 19 13 11" src="https://github.com/vanbui1995/learn-tailwind-healthy-design/assets/47735787/6e6eff7e-39c4-4ef6-8190-4cfee1a73c25">

	<img width="826" alt="Screenshot 2023-10-24 at 19 13 26" src="https://github.com/vanbui1995/learn-tailwind-healthy-design/assets/47735787/1c66e970-5ea9-4d88-8fc1-ce28cb44bb4c">

- When user submit successfully, all users can see new post

- When user submit successfully, all logged users receive a notificaiton about new shared post
	
	<img width="321" alt="Screenshot 2023-10-24 at 19 18 22" src="https://github.com/vanbui1995/learn-tailwind-healthy-design/assets/47735787/495a4caa-f6e3-4a9f-a024-bb67535fb531">

	




# Folder structure
    .
    src
    ├── ...
    ├── pages                     # Contain all main pages, the root component of each page
    │   ├── my-page               # My Page
    ├── components                # Contains all common/general/layout components
    ├── services                  # HTTP service layer, the one connect with backend api
    └── enums                     # Define all enums or const variables
    └── types                     # Define all interface & type of the project (except the component types)
    └── public                    # All public resources (image, svg, font...)
    └── main.tsx                  # React entry point file (Root)
    └── index.css                 # CSS entry point file (Root)
    └── tailwind.config.cjs       # Tailwind config, I configured all colors/spacing of the guideline via this file
    
    
    
