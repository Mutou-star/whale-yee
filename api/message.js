import { supabase } from '../lib/supabase.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const limit = parseInt(req.query.limit) || 50;
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { sender, content, type, metadata } = req.body;
    if (!sender || !content) {
      return res.status(400).json({ error: 'sender and content are required' });
    }

    const { data, error } = await supabase
      .from('messages')
      .insert([{ sender, content, type: type || 'text', metadata: metadata || {} }])
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
