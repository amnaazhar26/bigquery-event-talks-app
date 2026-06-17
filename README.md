# BigQuery Release Notes App

A modern, responsive web application that fetches and displays the latest release notes for Google Cloud BigQuery. The app dynamically pulls data from the official Google Cloud XML feed and presents it in a sleek, readable format, complete with quick sharing capabilities.

## 🚀 Features

- **Dynamic Feed Integration:** Automatically fetches the latest updates directly from the official Google Cloud BigQuery XML feed.
- **Modern User Interface:** Features a clean, responsive design with smooth skeleton loading states for a premium user experience.
- **Twitter Integration:** Easily share specific updates with a "Tweet this Update" button that pre-fills a tweet with the update's summary and a link.
- **Manual Refresh:** Pull the absolute latest updates without having to reload the entire web page.

## 🛠️ Technology Stack

- **Backend:** Python, Flask
- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+ async/await)

## 📁 Project Structure

```text
.
├── app.py                  # Main Flask application and API route
├── requirements.txt        # Python dependencies
├── static/
│   ├── css/
│   │   └── styles.css      # Application styling and animations
│   └── js/
│       └── app.js          # Client-side logic for fetching and rendering notes
└── templates/
    └── index.html          # Main HTML template structure
```

## 💻 Running Locally

### Prerequisites
Make sure you have Python 3.7+ installed on your machine.

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/amnaazhar26/bigquery-event-talks-app.git
   cd bigquery-event-talks-app
   ```

2. **Create and activate a virtual environment (optional but recommended):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. **Install the dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Flask application:**
   ```bash
   python app.py
   ```

5. **View the app:**
   Open your browser and navigate to [http://localhost:5000](http://localhost:5000)
