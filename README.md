# InstaCare -- Connect Seniors with Volunteers during Covid-19

### Team Members:

Shinuo Xu -- Project Manager

Shuyang Miao -- Software Architect

Tianpeng Fan -- Algorithm Specialist

Jie Wang -- Database Specialist

Qingxuan Cao -- UI Specialist

Fengyuan Wu -- QA Lead

Gan Kang -- Software Lead

Zhenyi Xu -- Business Analyst

Yueqian Ma -- Senior System Analyst

Guangyu Yang -- Database Specialist


### Introduction:
The Covid-19 global pandemic has drastically changed the lifestyle of the majority of us. While most of us could simply stay at home and shop online, some seniors are experiencing a really tough time. They are the group of people that need most help during this pandemic. InstaCare, an online platform that connects seniors and volunteers, helps to alleviate the situations when seniors are unable to do something on their own, such as buying food or seeking medication. InstaCare helps both seniors and volunteers feel better, live better during the pandemic. As a registered senior, you can request for help, or an errand, on our plaza, and provide tips to volunteer when they accept your request. For registered volunteers, you can help seniors in need of your neighborhood.

------------


### Requirement
- Web browser supporting React.js and Material-UI (Chrome preferred). See following table for version requirements.

- Browser:  
IE (with version = 11)	  
Edge(with version >= 14)	
Firefox	(with version >= 52)
Chrome	(with version >= 49)
Safari (with version >= 10)
Googlebot 

- Internet connection
- Gmail access

### Login Credentials

Registered senior account: seniorTester1@gmail.com
Password: iloveinstacare

Registered volunteer account: voluntester1@gmail.com
Password: iloveinstacare

*Please do not modify any existing requests in these accounts, as they will be used to pass our test cases. If any changes to account profile or posted/taken requests are made, please set them back before using these accounts for testing.
You are very welcome to register new accounts to play with our application.
*

------------


### Installation Instruction
No installation required.

### How to Run
1. Go to: https://instacare.today
2. Use the account we provided to log in, or use your own email to sign up and login

### Local Install Instruction
Our project can be run fully remotely. If you prefer to run it locally, here is the instruction:
- Get the front-end and back-end code.
- Use java IDE (intelliJ IDEA preferred) to open the back-end code as a project.
- Go to `instaCare-backend/src/main/java/InstacareApplication`
- Right click mouse and click "run InstacareApplication”
- Navigate to the source file of frontend code.
- In command, run `npm install `, and then `npm start `
- With internet access, go to your browser and go to localhost:3000


------------


#### Testing
These are used to replace the placeholder in the test cases.
SENIOR_ACCOUNT = seniorTester1@gmail.com
VOLUN_ACCOUNT = voluntester1@gmail.com
SIGNUP_ACCOUNT = instaCaresignup@gmail.com
GOOGLE_ACCOUNT =  instacaresignupgoggle@gmail.com
DEFAULT_PASSWORD = iloveinstacare
NEW_PASSWORD = 12345678
PHONE_NUMBER = 8584443333
COMMENT_SENIOR = “Test comment from senior”
COMMENT_VOLUN = “Test comment from volunteer”


------------


#### Known Bugs
1. Uploading a new avatar sometimes results in no change and no error message. This error is related to the user's system version and browser. Try to either check the image’s size, try another image, wait a few seconds longer, or refresh the page. 
2. Current version of application does not allow running applications on two tabs with different accounts in the same browser. If you want to test the behavior of multiple users, either log out and then log in with different accounts, or log in on another device.
3. For users in regions with google access limited, our location sharing feature might not function correctly. Try to access our application with VPN on.
4. If the user's current location is too far from the locations of any posts existing in our database (ie. other states or countries), the location sharing feature might not function properly, and there might be no planning routes. Try to zoom in/zoom out/drag to move the map, or give it little more time to run. For users in the area near UCSD this should not be a problem. 
5. For some browsers like Chrome, once you have confirmed to grant the access to share your location, the next time you use our application it will automatically give the access if needed, and the confirmation box will not appear. Currently no good fix to it, but it will only affect the alternative workflow of TC16. We suggest to test the alternative workflow before testing the regular workflow for this test.
6. For some browsers the alignment of elements might be weird. Try using a different browser (Chrome preferred) or refresh the page.
7. For multiple users using the application, the updated information might not update to the page immediately after change. Try to reload the page.
8. In the case the pop up window is in the wrong place and buttons are hidden, try to adjust the display percentage of the browser. 75% displaying size should fix most of it. We have fixed the bug in where we observed, but in case you encounter more during the testing.
9. When the request is over one might still observe the location of the other if the other user chooses to share the location. Currently no good fix to it

For more issues encountered during testing, contact us with the numbers below.


------------


#### Technical Support:
Shinuo Xu      - Project Manager          858-866-4264
Tianpeng Fan - Algorithm Specialist   858-397-3043


