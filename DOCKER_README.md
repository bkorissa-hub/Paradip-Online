# Docker Setu

## Quick Start

1. **Create your environment file**
   ```bash
   make setup
   # Edit .env with your MongoDB, Cloudinary, and JWT credentials
   ```

2. **Start the application**
   ```bash
   make build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Available Commands

| Command | Description |
|---------|-------------|
| `make up` | Start the application |
| `make down` | Stop the application |
| `make build` | Build and start the application |
| `make logs` | View logs from all services |
| `make logs-be` | View backend logs only |
| `make logs-fe` | View frontend logs only |
| `make status` | Check status of services |
| `make restart` | Restart all services |
| `make clean` | Remove all containers and volumes |
| `make shell-be` | Open shell in backend container |
| `make shell-fe` | Open shell in frontend container |

## Environment Variables

Create a `.env` file in the root directory:

```bash
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# JWT
JWT_SECRET=your_secret_key_here
```

## Structure

- **Backend**: Node.js/Express API on port 5000
- **Frontend**: React app served via Nginx on port 3000
- **Network**: Both services communicate via `pol-network`

## Troubleshooting

**View logs:**
```bash
make logs
```

**Rebuild from scratch:**
```bash
make clean
make build
```

**Access container shell:**
```bash
make shell-be   # Backend
make shell-fe   # Frontend
```
