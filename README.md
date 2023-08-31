## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
    - git clone https://github.com/DannStormy/flutterwave-assessment.git
2. Install the dependencies:
    - npm install
3. Set up the PostgreSQL database:
   - Create a new database in PostgreSQL.
   - cp .env.example .env
   - Update .env file and replace the placeholders with your actual values e.g.
    - ASSESSMENT_DB_URL=postgresql://localhost:5432/your_database_name
   - npm run migrate:up

4. Run the application:
## Usage
 - Set the PORT environment variable to specify the port the application will listen on.
 - npm run dev
