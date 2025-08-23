ADMIN id creating

Great! With your Postman environment set up and the server running, you're ready to test the entire API workflow.

Follow these steps in order. Each request builds on the one before it.

## 👤 Admin Workflow
First, we'll log in as the Admin and manage an agent. For all these requests, set the Authorization tab to Bearer Token and use {{admin_token}}.

1. Login as Admin
This is the first and most important step to get your authorization token.

Method: POST

URL: {{baseURL}}/api/v1/auth/login

Body: (raw > JSON)

JSON

{
    "email": "admin@example.com",
    "password": "AdminPassword123"
}
Action: Run this request. The script in the Tests tab will automatically save the token to your {{admin_token}} variable. Check your environment variables to confirm it's there.

2. Create a New Agent
Now, as the Admin, create an agent account.

Method: POST

URL: {{baseURL}}/api/v1/admin/agents

Body: (raw > JSON)

JSON

{
    "name": "Sarthak Agent",
    "email": "sarthak.agent@example.com",
    "password": "AgentPassword123"
}
Action: Run this. The test script will save the new agent's ID to your {{agent_id}} variable.

3. Get All Agents
Verify that the agent was created successfully.

Method: GET

URL: {{baseURL}}/api/v1/admin/agents

Action: Run this request. You should see the "Sarthak Agent" in the list.

## ✈️ Agent Workflow
Now we'll switch roles and act as the agent you just created.

4. Login as Agent
Method: POST

URL: {{baseURL}}/api/v1/auth/login

Body: (raw > JSON)

JSON

{
    "email": "sarthak.agent@example.com",
    "password": "AgentPassword123"
}
Action: Run this. The test script will save the token to the {{agent_token}} variable.

5. Create an Itinerary
Now, as the logged-in agent, create a travel itinerary.

Important: For this and all following agent requests, change the Authorization to use the {{agent_token}} variable.

Method: POST

URL: {{baseURL}}/api/v1/itineraries

Body: (raw > JSON)

JSON

{
    "title": "Bhopal City Tour",
    "destination": "Bhopal, Madhya Pradesh",
    "customer": {
        "name": "Rahul Kumar",
        "email": "rahul.k@example.com"
    },
    "duration": {
        "startDate": "2025-12-20",
        "endDate": "2025-12-23"
    },
    "details": "Day 1: Arrival and visit Upper Lake. Day 2: Sanchi Stupa..."
}
Action: Run this request. The new itinerary's ID will be saved to the {{itinerary_id}} variable.

6. Get My Itineraries
Check that the agent can only see their own itineraries.

Method: GET

URL: {{baseURL}}/api/v1/itineraries

Action: Run this. You should see the "Bhopal City Tour" itinerary you just created.

7. Update an Itinerary
Test the update functionality.

Method: PUT

URL: {{baseURL}}/api/v1/itineraries/{{itinerary_id}}

Body: (raw > JSON)

JSON

{
    "title": "UPDATED: Bhopal & Sanchi Exploration"
}
Action: Run this to update the title of the itinerary.

8. Delete an Itinerary
Finally, test the delete functionality for the agent.

Method: DELETE

URL: {{baseURL}}/api/v1/itineraries/{{itinerary_id}}

Action: Run this. The itinerary will be deleted. If you run the "Get My Itineraries" request again, the list should be empty.

9. Logout
The logout endpoint works for any logged-in user.

Method: POST

URL: {{baseURL}}/api/v1/auth/logout

Authorization: Use either {{admin_token}} or {{agent_token}}.

Action: Run this to securely log out the user.


//...............................................................................................................................TEsting API'S

Great! With your Postman environment set up and the server running, you're ready to test the entire API workflow.

Follow these steps in order. Each request builds on the one before it.

## 👤 Admin Workflow
First, we'll log in as the Admin and manage an agent. For all these requests, set the Authorization tab to Bearer Token and use {{admin_token}}.

1. Login as Admin
This is the first and most important step to get your authorization token.

Method: POST

URL: {{baseURL}}/api/v1/auth/login

Body: (raw > JSON)

JSON

{
    "email": "admin@example.com",
    "password": "AdminPassword123"
}
Action: Run this request. The script in the Tests tab will automatically save the token to your {{admin_token}} variable. Check your environment variables to confirm it's there.

2. Create a New Agent
Now, as the Admin, create an agent account.

Method: POST

URL: {{baseURL}}/api/v1/admin/agents

Body: (raw > JSON)

JSON

{
    "name": "Sarthak Agent",
    "email": "sarthak.agent@example.com",
    "password": "AgentPassword123"
}
Action: Run this. The test script will save the new agent's ID to your {{agent_id}} variable.

3. Get All Agents
Verify that the agent was created successfully.

Method: GET

URL: {{baseURL}}/api/v1/admin/agents

Action: Run this request. You should see the "Sarthak Agent" in the list.

## ✈️ Agent Workflow
Now we'll switch roles and act as the agent you just created.

4. Login as Agent
Method: POST

URL: {{baseURL}}/api/v1/auth/login

Body: (raw > JSON)

JSON

{
    "email": "sarthak.agent@example.com",
    "password": "AgentPassword123"
}
Action: Run this. The test script will save the token to the {{agent_token}} variable.

5. Create an Itinerary
Now, as the logged-in agent, create a travel itinerary.

Important: For this and all following agent requests, change the Authorization to use the {{agent_token}} variable.

Method: POST

URL: {{baseURL}}/api/v1/itineraries

Body: (raw > JSON)

JSON

{
    "title": "Bhopal City Tour",
    "destination": "Bhopal, Madhya Pradesh",
    "customer": {
        "name": "Rahul Kumar",
        "email": "rahul.k@example.com"
    },
    "duration": {
        "startDate": "2025-12-20",
        "endDate": "2025-12-23"
    },
    "details": "Day 1: Arrival and visit Upper Lake. Day 2: Sanchi Stupa..."
}
Action: Run this request. The new itinerary's ID will be saved to the {{itinerary_id}} variable.

6. Get My Itineraries
Check that the agent can only see their own itineraries.

Method: GET

URL: {{baseURL}}/api/v1/itineraries

Action: Run this. You should see the "Bhopal City Tour" itinerary you just created.

7. Update an Itinerary
Test the update functionality.

Method: PUT

URL: {{baseURL}}/api/v1/itineraries/{{itinerary_id}}

Body: (raw > JSON)

JSON

{
    "title": "UPDATED: Bhopal & Sanchi Exploration"
}
Action: Run this to update the title of the itinerary.

8. Delete an Itinerary
Finally, test the delete functionality for the agent.

Method: DELETE

URL: {{baseURL}}/api/v1/itineraries/{{itinerary_id}}

Action: Run this. The itinerary will be deleted. If you run the "Get My Itineraries" request again, the list should be empty.

9. Logout
The logout endpoint works for any logged-in user.

Method: POST

URL: {{baseURL}}/api/v1/auth/logout

Authorization: Use either {{admin_token}} or {{agent_token}}.

Action: Run this to securely log out the user.


//.................................................................................................................................
You've got it\! Based on the JSON response you provided, you just need to replace `{{itinerary_id}}` with the actual `_id` from your data.

-----

### \#\# Your PUT URL

Here is the complete and ready-to-use URL to update that specific itinerary:

**URL**: `http://localhost:8000/api/v1/itineraries/68a96ad5c1ec1dbd19f3f293`

-----

### \#\# How to Use It in Postman

1.  **Method**: Set the request method to **`PUT`**.

2.  **URL**: Paste the full URL above.

3.  **Authorization**: Make sure you are using the **Agent's token** (`{{agent_token}}`) in the Authorization tab (`Bearer Token`).

4.  **Body**: Go to the **Body** tab, select **`raw`**, and choose **`JSON`**. Provide only the fields you want to change. For example, to update the title and details:

    ```json
    {
        "title": "UPDATED: Bhopal & Sanchi Exploration",
        "details": "Day 1: Arrival, check-in, and an evening cruise on Upper Lake. Day 2: Full day excursion to Sanchi Stupa and the Udayagiri Caves. Day 3: Morning at Van Vihar National Park, afternoon at the Tribal Museum."
    }
    ```

When you send this request, the backend will find the itinerary with the ID `68a96ad5c1ec1dbd19f3f293` and update its fields with the new data from the body.