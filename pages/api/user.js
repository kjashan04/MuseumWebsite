export default async function handler(req, res) {
    if (req.method === 'GET') {
      // Handle GET request
      res.status(200).json({ message: 'Success' });
    } else {
      res.status(404).json({ error: 'Not Found' });
    }
  }
  