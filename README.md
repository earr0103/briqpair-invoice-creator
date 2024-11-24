# 🎮 BriqPair - Your Friendly Business Helper!

Hi there! Welcome to BriqPair, a super cool app that helps businesses manage their stuff! 🚀

## 📝 Step-by-Step Setup Guide

### Step 1: Download and Setup Frontend

1. **Create a new folder on your computer:**
   - Open your computer's file explorer
   - Create a new folder named `briqpair-project`
   - Open this folder in Visual Studio Code

2. **Open Terminal in VS Code:**
   - Click on `Terminal` in the top menu
   - Click `New Terminal`
   - The terminal will open at the bottom

3. **Clone the Frontend:**
   ```bash
   git clone [your-repository-url] .
   ```

4. **Install Dependencies:**
   ```bash
   npm install
   # or if you use yarn:
   yarn install
   ```

### Step 2: Set Up Python Backend

1. **Create Backend Folder:**
   ```bash
   # Create a new folder named 'backend' inside your project
   mkdir backend
   cd backend
   ```

2. **Set Up Python Environment:**
   ```bash
   # On Windows:
   python -m venv venv
   venv\Scripts\activate

   # On Mac/Linux:
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Python Packages:**
   ```bash
   pip install fastapi uvicorn reportlab python-jose[cryptography] passlib python-dotenv
   ```

4. **Create Backend Files:**
   Create a file named `main.py` in the backend folder:
   ```python
   from fastapi import FastAPI
   from fastapi.middleware.cors import CORSMiddleware
   from reportlab.pdfgen import canvas

   app = FastAPI()

   # Allow frontend to connect
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["http://localhost:5173"],
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )

   @app.post("/generate-invoice")
   def generate_invoice(invoice_data: dict):
       # Create PDF using ReportLab
       c = canvas.Canvas(f"invoice_{invoice_data['id']}.pdf")
       # Add invoice content
       return {"pdf_url": f"/invoices/invoice_{invoice_data['id']}.pdf"}
   ```

### Step 3: Connect Frontend to Backend

1. **Create Environment File:**
   - In your main project folder (not in backend)
   - Create a new file named exactly `.env`
   - Add this line to the file:
   ```
   VITE_API_URL=http://localhost:8000
   ```

### Step 4: Start Both Servers

1. **Start Backend Server:**
   ```bash
   # Make sure you're in the backend folder
   cd backend
   
   # Start the server
   uvicorn main:app --reload --port 8000
   ```

2. **Start Frontend Server (in a new terminal):**
   ```bash
   # Make sure you're in the main project folder
   cd ..
   
   # Start the frontend
   npm run dev
   # or
   yarn dev
   ```

### Step 5: Test the Connection

1. **Open the App:**
   - Open your web browser
   - Go to: `http://localhost:5173`
   - You should see the BriqPair dashboard

2. **Test Invoice Generation:**
   - Go to the Orders page
   - Add some items to cart
   - Try to generate an invoice
   - Check the backend terminal for API requests
   - Look in the backend folder for generated PDFs

### 📁 Project Structure
```
briqpair-project/           # Main project folder
├── src/                    # Frontend source code
├── backend/                # Backend folder
│   ├── venv/              # Python virtual environment
│   └── main.py            # Backend code
├── .env                    # Environment variables
└── package.json           # Frontend dependencies
```

Need help? Feel free to ask! 🌟