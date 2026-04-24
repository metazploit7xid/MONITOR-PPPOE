import express from 'express';
import { createServer as createViteServer } from 'vite';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;
  
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  app.use(express.json());

  // In-memory store for events and active sessions
  const events = [];
  const activeSessions = new Map();

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    
    // Send initial state
    socket.emit('initial_state', {
      events: events.slice(-50), // Send last 50 events
      activeSessions: Array.from(activeSessions.values()),
      stats: getStats()
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  function getStats() {
    return {
      activeCount: activeSessions.size,
      totalEvents: events.length
    }
  }

  // Webhook router MikroTik:
  // POST ke /api/mikrotik/webhook
  // Payload: { routerId, user, mac, ip, event: 'login' | 'logout', interface, timestamp }
  app.post('/api/mikrotik/webhook', (req, res) => {
    try {
      const data = req.body;
      const eventData = {
        id: Math.random().toString(36).substring(7),
        ...data,
        receivedAt: new Date().toISOString(),
      };

      events.push(eventData);
      // Keep events array bounded
      if (events.length > 500) events.shift();

      if (data.event === 'login') {
        activeSessions.set(`${data.routerId}-${data.user}`, data);
      } else if (data.event === 'logout') {
        activeSessions.delete(`${data.routerId}-${data.user}`);
      }

      // Broadcast ke klien yang terhubung
      io.emit('new_event', eventData);
      io.emit('stats_update', getStats());
      
      // Kirim notifikasi WA/Telegram jika disetting
      console.log(`[Notifikasi WA/Telegram] -> ${data.routerId}: ${data.user} ${data.event}`);

      res.status(200).json({ success: true });
    } catch (err) {
      console.error('Kesalahan Webhook:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
