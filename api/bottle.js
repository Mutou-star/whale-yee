import { supabase } from '../lib/supabase.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('drift_bottles')
      .select('*')
      .eq('status', 'floating')
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data || null);
  }

  if (req.method === 'POST') {
    const { sender, content } = req.body;
    if (!sender || !content) {
      return res.status(400).json({ error: 'sender and content are required' });
    }

    const { data, error } = await supabase
      .from('drift_bottles')
      .insert([{ sender, content, status: 'floating' }])
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data);
  }

  if (req.method === 'PUT') {
    const { id, replied_content } = req.body;
    if (!id || !replied_content) {
      return res.status(400).json({ error: 'id and replied_content are required' });
    }

    const { data, error } = await supabase
      .from('drift_bottles')
      .update({ status: 'replied', replied_content, replied_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
