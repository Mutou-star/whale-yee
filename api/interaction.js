import { supabase } from '../lib/supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { interaction_type, metadata } = req.body;
  if (!interaction_type) {
    return res.status(400).json({ error: 'interaction_type is required' });
  }

  const { data, error } = await supabase
    .from('interactions')
    .insert([{ interaction_type, metadata: metadata || {} }])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  return res.status(201).json(data);
}
