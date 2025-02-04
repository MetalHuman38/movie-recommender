import os
from dotenv import load_dotenv
import json
from openai import OpenAI
# Load environment variables
load_dotenv()


class OpenAIClient:
    """
    OpenAI API client for chat completions.
    """

    def __init__(self, api_key=None, model="gpt-4o"):
        """
        Initialize the OpenAI client.
        :param api_key: OpenAI API key. Defaults to environment
        :variable if not provided.
        :param model: Default model for API requests. Defaults to "gpt-4o".
        """
        self.api_key = api_key or os.getenv("OPENAI_API_KEY")
        if not self.api_key:
            raise ValueError("An OpenAI API key must be provided or set as an environment variable.") # noqa

        self.client = OpenAI(api_key=self.api_key)
        self.model = model

    def chat_completion(self, messages, max_tokens=100, temperature=0.7, top_p=1): # noqa
        """
        Generate chat responses using OpenAI's chat API.
        :param messages: List of dictionaries representing the conversation.
        :return: Assistant's response as a string.
        """
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                max_tokens=max_tokens,
                temperature=temperature,
                top_p=top_p
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            print(f"Error making chat API request: {e}")
            return "I'm sorry, I couldn't process your request right now."

    def extract_movie_query(self, user_message):
        """
        Extracts movie details (genre, count) from user query using OpenAI.
        """

        system_prompt = (
            "You are a movie chatbot. Extract the requested movie genres and number of movies." # noqa
            "Return a valid JSON object in lowercase keys: {'genres': '...', 'count': ...}." # noqa
            "Example: {\"genres\": \"action\", \"count\": 5}."
        )

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ]

        print(f"📤 Sending to OpenAI: {messages}")  # Debugging

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                max_tokens=100,
                temperature=0.7,
                top_p=1
            )

            extracted_text = response.choices[0].message.content.strip()
            print(f"📥 OpenAI Raw Response: {extracted_text}")  # Debugging

            # ✅ Ensure OpenAI response is not empty
            if not extracted_text:
                print("❌ Error: OpenAI response is empty!")
                return {"error": "OpenAI response was empty."}

            # ✅ Fix JSON Parsing Issue (Ensure string before parsing)
            try:
                extracted_text = extracted_text.strip().replace("```json", "").replace("```", "") # noqa
                query_details = json.loads(extracted_text)
                print(f"✅ Parsed OpenAI JSON: {query_details}")  # Debugging
            except json.JSONDecodeError as json_err:
                print(f"❌ JSON Error: {json_err}")
                return {"error": "OpenAI returned an invalid JSON format."}

            # ✅ Normalize keys for consistency
            corrected_response = {
                "genres": query_details.get("genres", "any").lower(),
                "count": query_details.get("Number of movies requested", 10)
            }

            return corrected_response

        except Exception as e:
            print(f"❌ Error extracting movie query: {e}")
            return {"error": "An error occurred while extracting movie details."} # noqa
