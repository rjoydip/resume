import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  // Check if the server is healthy (you can add additional health checks here)
  const isHealthy = true;

  // Return a JSON response with the health status
  res.status(isHealthy ? 200 : 500).json({ status: isHealthy ? 'healthy' : 'unhealthy' });
}
