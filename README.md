# eZdravnik

eZdravnik is an innovative AI doctor that responds to users' health questions. With advanced NLP algorithms and a reliable knowledge base, it provides accurate answers. The interface is simple, answers are tailored, and data is secure. Join us in creating a more accessible health advisor!

## Installation

### Backend Setup
1. Navigate to the `backend` folder.
2. Create a `.env` file with the following content:
    ```plaintext
    SERVICE_ACCOUNT_KEY_PATH=/path/to/service/account/key.json
    PORT=8000
    RAPID_API_KEY='your-rapid-api-key'
    ```
3. Run `npm install` to install dependencies.
4. Run `npm run dev` to start the backend server.

### Frontend Setup
1. Navigate to the `frontend` folder.
2. Create a `.env` file with the following content:
    ```plaintext
    API_KEY=your-firebase-api-key
    AUTH_DOMAIN=your-firebase-auth-domain
    PROJECT_ID=your-firebase-project-id
    STORAGE_BUCKET=your-firebase-storage-bucket
    MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
    APP_ID=your-firebase-app-id
    BASE_URL='http://localhost:8000'
    ```
3. Run `npm install` to install dependencies.
4. Run `npm start` to start the frontend server.

### Additional Configuration
- Create a Firebase project and obtain the necessary credentials.
- Create a RapidAPI profile and generate your own API key for ChatGPT at [RapidAPI ChatGPT API](https://rapidapi.com/rphrp1985/api/chatgpt-42).

## Technologies Used
- TypeScript (Backend)
- React Native (Frontend)
- Firebase (Database and User Authentication)
