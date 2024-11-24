# 🎮 BriqPair - Your Friendly Business Helper!

Hi there! Welcome to BriqPair, a super cool app that helps businesses manage their stuff! 🚀

## 🎯 What Does BriqPair Do?
- Track inventory
- Create orders
- Generate invoices
- View business analytics

## 🚀 Main Features
1. 🏠 Dashboard: Sales overview, trends, and charts
2. 📦 Inventory: Manage products and stock
3. 🛒 Orders: Process sales and create invoices
4. 📄 Invoices: View and manage bills
5. 💰 Payments: Track transactions
6. 👥 Customers: Manage customer info
7. ⚙️ Settings: Configure your business

## 🖥️ Running the Frontend

1. **Install Dependencies:**
```bash
npm install
# or
yarn install
```

2. **Start Development Server:**
```bash
npm run dev
# or
yarn dev
```

3. **Access the App:**
Open your browser and visit `http://localhost:5173`

## 🐍 Complete the Project with Python Backend

1. **Set Up Python Environment:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install fastapi uvicorn reportlab python-jose[cryptography] passlib python-dotenv
```

2. **Create PDF Generator:**
```python
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
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

3. **Run Backend:**
```bash
uvicorn main:app --reload --port 8000
```

## 🔗 Connecting Frontend and Backend

1. **Create Environment Variables:**
Create a `.env` file in your frontend root:
```
VITE_API_URL=http://localhost:8000
```

2. **Update API Endpoints:**
The frontend is already configured to use environment variables for API calls. Example:
```typescript
const API_URL = import.meta.env.VITE_API_URL;
const response = await fetch(`${API_URL}/generate-invoice`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(invoiceData),
});
```

3. **Test the Connection:**
- Start both frontend and backend servers
- Try generating an invoice from the Orders page
- Check the backend console for API requests
- Verify PDF generation in the backend directory

Need help? Check our docs or ask your developer! 🌟