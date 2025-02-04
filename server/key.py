# contains utility functions for generating keys

import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()


def get_openai_key():
    """
    Get the OpenAI API key from the environment.
    """

    try:
        params = {"api_key": os.getenv("OPENAI_API_KEY")}
        if not params["api_key"]:
            raise ValueError("An OpenAI API key must be provided or set as an environment variable.") # noqa
        return params["api_key"]
    except KeyError:
        print("Error: Could not find OpenAI API key in the environment.")
        return None
