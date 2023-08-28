## Healthy Project

This project created from an assignment homework from Arent company

## How to run the project?

- Install NodeJS at least version 16
- Make sure you are correct root folder
- To run the project as local dev:
		- with yarn: `yarn install && yarn dev`
		- with npm: `npm install && npm run dev`
		- Deployment also up on my Netlify: https://64ec8e2c92ae9f0986c81405--jocular-torte-0ff03d.netlify.app/

## How to build the project?

- Install NodeJS at least version 16
- Make sure you are correct root folder
- To build the project
	- with yarn: `yarn install && yarn build`
	- with npm: `npm install && npm run build`
	- Deployment also up on my Netlify: https://64ec8e2c92ae9f0986c81405--jocular-torte-0ff03d.netlify.app/

## Folder structure

    .
    src
    ├── ...
    ├── pages                   # Contain all main pages, the root component of each page
    │   ├── my-page               # My Page
    │   ├── column                # Column Page
    │   └── my-record             # Unit tests
    ├── components                # Contains all common/general/layout components
    ├── services                  # HTTP service layer, the one connect with backend api
    └── enums 					  # Define all enums or const variables
    └── types 					  # Define all interface & type of the project (except the component types)
    └── public 					  # All public resources (image, svg, font...)
    └── main.tsx 			 	  # React entry point file (Root)
    └── index.css 			 	  # CSS entry point file (Root)
    └── tailwind.config.cjs 	  # Tailwind config, I configured all colors/spacing of the guideline via this file
    
    
    

## Notes for the the reviewers

- I supported the site for mobile responsive already
- I simulated the how to get data, pour data, fake API for the application can look like the real world
	- You can see i use the useQuery package in almost screen that we need to show the dynamic data
- Support load more feature:
	- You can check it on any screen have the button: "Load more"
- Support load infinitiy scroll 
	- You can check it on the My Record Page -> Excersise Section
	- You will load more excercise record whenever you scroll to the end of the list
- About the Fonts. I loaded directly from Google Font CDN, the fonts are configured for auto take Janpanese font when use japanese, use correct Latin font when use other words...
- I sticked to define type for any variable
- Charts
	- Support 2 charts:
		- Line
		- Doughnut
	- Some chart can be clicked to fetch and see new value 
		- EG: My Record Page -> Body Record Chart
