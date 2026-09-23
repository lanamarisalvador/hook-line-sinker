# Hook, Line, & Sinker

This project is a Chrome extension that utilizes AI to detect phishing within a chosen Gmail message.

## Features

- Analyzes Gmail messages for phishing indicators using AI
- Assigns a Low, Medium, or High risk level
- Displays warning signs and an explanation of the concluded risk level
- Uses color-coded risk levels for easy identification

## Technologies Used

- HTML
- CSS
- JavaScript
- Chrome Extension APIs (Manifest V3)
- Python
- FastAPI
- Pydantic
- OpenAI API
- Git

## How It Works

1. The user opens an email in Gmail, opens Hook, Line, & Sinker and clicks "Check Email."
2. The Chrome extension extracts the email content and links and sends them to the FastAPI backend for AI analysis.
3. The AI analyzes the email for phishing indicators and assigns a risk level.
4. The risk level, warning signs and an explanation is displayed in the extension popup.
