# calculator
# Calculator Application

## Overview
This is a dynamic calculator application built with a frontend and backend setup. The application supports basic arithmetic operations like addition, subtraction, multiplication, and division, as well as advanced operations like logarithms and power calculations. Users can input expressions, which are processed and evaluated by the backend, and the results are displayed on the frontend.

---

## Features
- **Basic Operations**: Addition (+), Subtraction (-), Multiplication (*), Division (/).
- **Advanced Operations**:
  - Power.
  - Logarithm.
  - SQRT
- **Expression Parsing**: The application parses complex expressions, ensuring correct evaluation order.
- **Error Handling**: Invalid inputs are handled gracefully with descriptive error messages.
- **History**: Keeps track of previous calculations for user reference.

---

## Tech Stack
### Frontend
- **Framework**: React
- **Styling**: CSS/Styled Components (optional)
- **State Management**: React Hooks (useState, useEffect)

### Backend
- **Framework**: FastAPI
- **Language**: Python
- **Additional Libraries**: 
  - `math` for advanced mathematical operations.
  - Custom operation classes (e.g., `Power`, `Log`).

---

## Installation
### Prerequisites
- Node.js (for the frontend)
- Python 3.x (for the backend)
- FastAPI and required dependencies

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd calculator-backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the backend server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd calculator-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

---

## Usage
1. Enter an arithmetic or advanced expression in the input field (e.g., `8POW2 + LOG(100)`).
2. Click the "Submit" button to evaluate the expression.
3. View the result and the history of calculations on the screen.

---

## Example Expressions
- Basic: `5 + 3 * 2`
- Power: `8POW2`
- Logarithm: `LOG(100)`
- Mixed: `2POW3 + LOG(100) / 5`

---

## Error Handling
- **Invalid Operation**: If an unrecognized operation is entered, the application will return an error message.
- **Syntax Errors**: Incorrectly formatted expressions will be rejected with a detailed error message.

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-new-operation
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-new-operation
   ```
5. Create a pull request.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.
